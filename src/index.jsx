import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { App, ConfigProvider } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import dayjs from 'dayjs';

import AppProvider from '@/components/app-provider';
import RouterComponent from '@/router/routerComponent';
import store from '@/store';

import 'dayjs/locale/zh-cn';
import '@/less/index.less';

import 'antd/dist/reset.css';

dayjs.locale('zh-cn');

ReactDOM.createRoot(document.getElementById('root')).render(
    <ConfigProvider
        locale={zhCN}
        theme={{
            token: {
                colorPrimary: '#00A8EC',
            },
        }}
    >
        <App>
            <AppProvider>
                <Provider store={store}>
                    <RouterComponent />
                </Provider>
            </AppProvider>
        </App>
    </ConfigProvider>
);
