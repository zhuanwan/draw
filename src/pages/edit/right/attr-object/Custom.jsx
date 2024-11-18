import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Checkbox, ColorPicker, Form, InputNumber, Tooltip, Select, Input, Row, Col } from 'antd';
import * as fabric from 'fabric';
const colorFieldNames = ['fill', 'stroke', 'backgroundColor'];
const jsonFieldNames = ['points', 'strokeDashArray', 'path'];

import {
    globalCompositeOperationOptions,
    originXOptions,
    originYOptions,
    strokeLineCapOptions,
    strokeLineJoinOptions,
    paintFirstOptions,
} from './data';

const Component = () => {
    const [form] = Form.useForm();

    const {
        cvsActiveObjects: [activeObject],
        refreshNum,
    } = useSelector((state) => state.draw);

    function getPolygonPoints(sides, radius = 50, centerX = 0, centerY = 0) {
        const points = [];
        const angle = (2 * Math.PI) / sides; // 每个角度的增量

        // 计算每个顶点的坐标
        for (let i = 0; i < sides; i++) {
            const x = centerX + radius * Math.cos(i * angle);
            const y = centerY + radius * Math.sin(i * angle);
            points.push({ x, y });
        }
        return points;
    }

    // 这里设置x1,x2...
    const onValuesChange = async (changedValues, allValues) => {
        const keys = Object.keys(changedValues);
        for (let i = 0; i < keys.length; i++) {
            const key = keys[i];
            if (colorFieldNames.includes(key)) {
                // 颜色相关
                const colorHex = changedValues[key];
                activeObject.set({ [key]: colorHex === 'string' ? colorHex : colorHex?.toHexString() });
            } else if (jsonFieldNames.includes(key)) {
                // 需要转换数组格式
                try {
                    const value = JSON.parse(changedValues[key]);
                    activeObject.set({ [key]: value });
                    activeObject.setCoords();

                    // 因为这里框选对不准，只能复制object再删除原来的
                    // 创建新的对象
                    let newObject;
                    const { points, path, ...options } = activeObject;
                    switch (activeObject.type) {
                        case 'polygon':
                            newObject = new fabric.Polygon(points, {
                                ...options, // 复制旧的属性
                            });
                            break;
                        case 'polyline':
                            newObject = new fabric.Polyline(points, {
                                ...options, // 复制旧的属性
                            });
                            break;
                        case 'path':
                            newObject = new fabric.Path(path, {
                                ...options, // 复制旧的属性
                            });
                            break;
                        default:
                            break;
                    }

                    if (newObject) {
                        window._csv.add(newObject)
                        window._csv.setActiveObject(newObject);
                        window._csv.remove(activeObject); // 移除旧对象
                    }
                } catch (error) {
                    console.log(error);
                }
            } else if (key === 'self_points') {
                const [_, realKey] = key.split('_');
                const newPoints = getPolygonPoints(changedValues[key]);

                const { points, ...options } = activeObject;

                // 创建新的多边形对象
                const newPolygon = new fabric.Polygon(newPoints, {
                    ...options, // 复制旧的属性
                });

                window._csv.add(newPolygon); // 添加新对象

                // 设置新对象为选中状态
                window._csv.setActiveObject(newPolygon);

                // 替换旧的多边形
                window._csv.remove(activeObject); // 移除旧对象
            } else {
                // 其他
                activeObject.set({ [key]: changedValues[key] });
            }
        }

        window._csv.renderAll();
    };

    useEffect(() => {
        if (!activeObject) {
            return;
        }
        console.log(activeObject);
        Object.keys(activeObject).forEach((key) => {
            if (jsonFieldNames.includes(key)) {
                form.setFieldValue(key, JSON.stringify(activeObject[key]));
            } else if (key.startsWith('self_')) {
            } else {
                form.setFieldValue(key, activeObject[key]);
            }
        });
    }, [activeObject, refreshNum]);

    return (
        <Form form={form} onValuesChange={onValuesChange} className="form-com">
            <Form.Item label="type">{activeObject?.type}</Form.Item>
            <Row gutter={20}>
                <Col span={12}>
                    <Form.Item label="originX" name="originX">
                        <Select options={originXOptions} />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item label="originY" name="originY">
                        <Select options={originYOptions} />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={20}>
                <Col span={12}>
                    <Form.Item label="left" name="left">
                        <InputNumber addonAfter="px" />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item label="top" name="top">
                        <InputNumber addonAfter="px" />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={20}>
                <Col span={12}>
                    <Form.Item label="width" name="width">
                        <InputNumber addonAfter="px" />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item label="height" name="height">
                        <InputNumber addonAfter="px" />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={20}>
                <Col span={12}>
                    <Form.Item label="rx" name="rx">
                        <InputNumber addonAfter="px" />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item label="ry" name="ry">
                        <InputNumber addonAfter="px" />
                    </Form.Item>
                </Col>
            </Row>
            <Form.Item label="fill" name="fill">
                <ColorPicker format="hex" allowClear />
            </Form.Item>
            <div className="sperate"></div>

            <Row gutter={20}>
                <Col span={12}>
                    <Form.Item label="stroke" name="stroke">
                        <ColorPicker format="hex" allowClear />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item label="strokeWidth" name="strokeWidth">
                        <InputNumber addonAfter="px" />
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={20}>
                <Col span={12}>
                    <Form.Item
                        label={
                            <Tooltip placement="top" title="绘制形状轮廓的虚线段和间隙的排列形式,示例: [5,5]">
                                strokeDashArray
                            </Tooltip>
                        }
                        name="strokeDashArray"
                    >
                        <Input />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item label="strokeDashOffset" name="strokeDashOffset">
                        <InputNumber />
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={20}>
                <Col span={12}>
                    <Form.Item
                        label={
                            <Tooltip placement="top" title="如何绘制每一条线段的末端">
                                strokeLineCap
                            </Tooltip>
                        }
                        name="strokeLineCap"
                    >
                        <Select options={strokeLineCapOptions} />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        label={
                            <Tooltip placement="top" title="设置线段如何连接在一起">
                                strokeLineJoin
                            </Tooltip>
                        }
                        name="strokeLineJoin"
                    >
                        <Select options={strokeLineJoinOptions} />
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={20}>
                <Col span={12}>
                    <Form.Item
                        label={
                            <Tooltip placement="top" title="锁定描边的宽度,不会因为缩放而变化">
                                strokeUniform
                            </Tooltip>
                        }
                        name="strokeUniform"
                        valuePropName="checked"
                    >
                        <Checkbox />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        label={
                            <Tooltip
                                placement="top"
                                title="控制线段相交处斜接样式的最大斜接长度的属性。
                        它与 strokeLineJoin 属性（定义线段连接方式，如 miter, round, bevel）相关联，
                        主要在 miter（斜接）样式下生效。当两个线段以锐角相交时，斜接点的长度（从交点到斜接外边缘的距离）可能变得非常长。
                        strokeMiterLimit 定义了允许的最大比率（miter length / strokeWidth），
                        超过这个限制时，斜接会被裁剪为斜面（即类似 bevel 样式）。"
                            >
                                strokeMiterLimit
                            </Tooltip>
                        }
                        name="strokeMiterLimit"
                    >
                        <InputNumber />
                    </Form.Item>
                </Col>
            </Row>

            <Form.Item
                label={
                    <Tooltip placement="top" title="先绘制填充还是先绘制描边">
                        paintFirst
                    </Tooltip>
                }
                name="paintFirst"
            >
                <Select options={paintFirstOptions} />
            </Form.Item>

            <div className="sperate"></div>
            <Row gutter={20}>
                <Col span={12}>
                    <Form.Item label="scaleX" name="scaleX">
                        <InputNumber />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item label="scaleY" name="scaleY">
                        <InputNumber />
                    </Form.Item>
                </Col>
            </Row>
            <Form.Item label="angle" name="angle">
                <InputNumber />
            </Form.Item>
            <Row gutter={20}>
                <Col span={12}>
                    <Form.Item label="flipX" name="flipX" valuePropName="checked">
                        <Checkbox />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item label="flipY" name="flipY" valuePropName="checked">
                        <Checkbox />
                    </Form.Item>
                </Col>
            </Row>

            <Form.Item
                label={
                    <Tooltip placement="top" title="阴影示例: 10px 10px 5px rgba(0, 0, 0, 0.5)">
                        shadow
                    </Tooltip>
                }
                name="shadow"
            >
                <Input />
            </Form.Item>

            <Row gutter={20}>
                <Col span={12}>
                    <Form.Item label="opacity" name="opacity">
                        <InputNumber />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item label="visible" name="visible" valuePropName="checked">
                        <Checkbox />
                    </Form.Item>
                </Col>
            </Row>

            <Form.Item label="backgroundColor" name="backgroundColor">
                <ColorPicker format="hex" allowClear />
            </Form.Item>
            <Form.Item label="globalCompositeOperation" name="globalCompositeOperation">
                <Select options={globalCompositeOperationOptions} />
            </Form.Item>
            <Row gutter={20}>
                <Col span={12}>
                    <Form.Item label="skewX" name="skewX">
                        <InputNumber />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item label="skewY" name="skewY">
                        <InputNumber />
                    </Form.Item>
                </Col>
            </Row>

            <div className="sperate"></div>
            {['polygon', 'polyline'].includes(activeObject?.type) && (
                <Form.Item label="points" name="points">
                    <Input.TextArea />
                </Form.Item>
            )}
            {activeObject?.type === 'polygon' && (
                <Form.Item label="几条边" name="self_points">
                    <InputNumber />
                </Form.Item>
            )}

            {activeObject?.type === 'path' && (
                <Form.Item label="path" name="path">
                    <Input.TextArea />
                </Form.Item>
            )}

            {activeObject?.type === 'line' && (
                <>
                    <Row gutter={20}>
                        <Col span={12}>
                            <Form.Item label="x1" name="x1">
                                <InputNumber addonAfter="px" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="y1" name="y1">
                                <InputNumber addonAfter="px" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={20}>
                        <Col span={12}>
                            <Form.Item label="x2" name="x2">
                                <InputNumber addonAfter="px" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="y2" name="y2">
                                <InputNumber addonAfter="px" />
                            </Form.Item>
                        </Col>
                    </Row>
                </>
            )}
        </Form>
    );
};

export default Component;
