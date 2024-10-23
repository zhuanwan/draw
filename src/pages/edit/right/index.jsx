import React from 'react';
import { Tabs } from 'antd';
import Custom from './custom';
import Event from './event';

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
    return (
        <div className="tools-panel">
            <Tabs defaultActiveKey="1" items={items} centered />
        </div>
    );
};

export default Component;
