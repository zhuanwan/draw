import React from 'react';
import { Tabs } from 'antd';
import Custom from './Custom';
import Event from './Event';

const Component = () => {
    const items = [
        {
            key: '1',
            label: '定制',
            children: <Custom />,
        },
        {
            key: '2',
            label: '事件',
            children: <Event />,
        },
    ];
    return <Tabs defaultActiveKey="1" items={items} centered />;
};

export default Component;
