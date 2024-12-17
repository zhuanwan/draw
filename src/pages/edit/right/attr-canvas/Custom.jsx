import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { ColorPicker, Form, InputNumber } from 'antd';
import { saveState } from '@/store/features/historySlice';

const Component = () => {
    const dispatch = useDispatch();
    const [form] = Form.useForm();

    const saveCanvasState = () => {
        const json = window._csv.toJSON();
        json.width = window._csv.width;
        json.height = window._csv.height;
        const state = JSON.stringify(json);
        dispatch(saveState(state));
    };

    // 这里设置window._csv 的 宽度、高度、颜色
    const onValuesChange = async (changedValues, allValues) => {
        window._csv.setDimensions({ width: allValues.width, height: allValues.height });
        if (changedValues.backgroundColor) {
            const colorHex = changedValues.backgroundColor;
            window._csv.backgroundColor = colorHex === 'string' ? colorHex : colorHex?.toHexString();
        }
        window._csv.renderAll();
        saveCanvasState();
    };

    useEffect(() => {
        const width = window._csv.width;
        const height = window._csv.height;
        const backgroundColor = window._csv.backgroundColor;
        form.setFieldsValue({ width, height, backgroundColor });
    }, []);

    return (
        <Form form={form} onValuesChange={onValuesChange} className="form-com">
            <Form.Item label="宽度" name="width">
                <InputNumber addonAfter="px" />
            </Form.Item>
            <Form.Item label="高度" name="height">
                <InputNumber addonAfter="px" />
            </Form.Item>
            <Form.Item label="背景颜色" name="backgroundColor">
                <ColorPicker format="hex" allowClear />
            </Form.Item>
        </Form>
    );
};

export default Component;
