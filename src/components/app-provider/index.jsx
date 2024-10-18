import { App } from 'antd';

export default ({ children }) => {
    const staticFunction = App.useApp();
    window.$message = staticFunction.message;
    window.$modal = staticFunction.modal;
    window.$notification = staticFunction.notification;
    return children;
};
