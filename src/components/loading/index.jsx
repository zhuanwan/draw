import { Spin } from 'antd';

import './index.less';

const Loading = () => {
    return (
        <div className="page-loading">
            <Spin size="large" />
        </div>
    );
};

export default Loading;
