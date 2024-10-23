import { Button } from 'antd';
import { useState } from 'react';
import JsonPreviewModal from './JsonPreviewModal';
import './index.less';

const Component = () => {
    const [JsonModalVisible, setJsonModalVisible] = useState(false);
    return (
        <>
            <div className="menu-bar">
                <div className="left">1</div>
                <div className="right">
                    <Button onClick={() => setJsonModalVisible(true)}>JSON预览</Button>
                </div>
            </div>
            <JsonPreviewModal visible={JsonModalVisible} setVisible={setJsonModalVisible} />
        </>
    );
};

export default Component;
