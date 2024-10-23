// JSON预览
import PropTypes from 'prop-types';
import { Modal } from 'antd';
import { useEffect, useState } from 'react';
import ReactJson from 'react-json-view';

const Component = (props) => {
    const { visible = false, setVisible = () => {} } = props;
    const [jsonData, setJsonData] = useState({});

    useEffect(() => {
        if (visible) {
            const json = window._csv.toJSON();
            json.width = window._csv.width
            json.height = window._csv.height
            setJsonData(json);
        }
    }, [visible]);

    return (
        <Modal
            title="JSON预览"
            open={visible}
            footer={false}
            onCancel={() => setVisible(false)}
            destroyOnClose
            centered
        >
            <ReactJson src={jsonData} name={false} displayDataTypes={false} />
        </Modal>
    );
};

Component.propTypes = {
    visible: PropTypes.bool,
    setVisible: PropTypes.func,
};
export default Component;
