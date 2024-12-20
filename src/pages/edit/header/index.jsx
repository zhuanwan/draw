import { Button, Dropdown, Space } from 'antd';
import { useState } from 'react';
import JsonPreviewModal from './JsonPreviewModal';
import './index.less';
import { useDispatch } from 'react-redux';
import { setCvscActiveObject } from '@/store/features/drawSlice';
import { clearHistory } from '@/store/features/historySlice';

const Component = () => {
    const [JsonModalVisible, setJsonModalVisible] = useState(false);
    const dispatch = useDispatch();

    const items = [
        {
            key: '1',
            label: (
                <Space>
                    <span>多选</span>
                    <span>框选或左键+Shift</span>
                </Space>
            ),
        },
        {
            key: '2',
            label: (
                <Space>
                    <span>复制</span>
                    <span>Ctrl+C</span>
                </Space>
            ),
        },
        {
            key: '3',
            label: (
                <Space>
                    <span>粘贴</span>
                    <span>Ctrl+V</span>
                </Space>
            ),
        },
        {
            key: '4',
            label: (
                <Space>
                    <span>删除</span>
                    <span>Delete或者Backspace</span>
                </Space>
            ),
        },
        {
            key: '5',
            label: (
                <Space>
                    <span>撤销</span>
                    <span>Ctrl+Z</span>
                </Space>
            ),
        },
        {
            key: '6',
            label: (
                <Space>
                    <span>重做</span>
                    <span>Ctrl+Y</span>
                </Space>
            ),
        },
    ];

    const addNewCanvas = () => {
        window.$modal.confirm({
            centered: true,
            title: '提示',
            width: '340px',
            content: '确认新建画布？',
            onOk: async () => {
                // 清除所有对象
                window._csv.clear();
                // 重置width/height
                window._csv.setDimensions({ width: 1920, height: 1080 });
                // 重置背景
                window._csv.backgroundColor = '#fff';

                // 可选：清除选中的对象
                window._csv.discardActiveObject();

                // 可选：清除画布的所有事件监听器
                // window._csv.off();

                // 刷新画布以更新视图
                window._csv.renderAll();
                dispatch(clearHistory());
                dispatch(setCvscActiveObject(undefined));
            },
            onCancel() {},
        });
    };
    return (
        <>
            <div className="menu-bar">
                <div className="left">
                    <Button className="btn" onClick={addNewCanvas}>
                        新建画布
                    </Button>
                    <Dropdown menu={{ items }} placement="bottom" arrow>
                        <Button className="btn">操作提示</Button>
                    </Dropdown>
                </div>
                <div className="right">
                    <Button onClick={() => setJsonModalVisible(true)}>JSON预览</Button>
                </div>
            </div>
            <JsonPreviewModal visible={JsonModalVisible} setVisible={setJsonModalVisible} />
        </>
    );
};

export default Component;
