import { Button } from 'antd';
import { useState } from 'react';
import JsonPreviewModal from './JsonPreviewModal';
import './index.less';
import { useDispatch } from 'react-redux';
import { setCvscActiveObject } from '@/store/features/drawSlice';
import { clearHistory } from '@/store/features/historySlice';

const Component = () => {
    const [JsonModalVisible, setJsonModalVisible] = useState(false);
    const dispatch = useDispatch();

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
