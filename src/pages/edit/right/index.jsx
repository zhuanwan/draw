import React, { useEffect, useState } from 'react';

import { useSelector } from 'react-redux';
import AttrCanvas from './attr-canvas';
import AttrObject from './attr-object';
import './index.less';

const Component = () => {
    const { cvsActiveObjects } = useSelector((state) => state.draw);
    const [type, setType] = useState(1); // 1 画布 2 单个object 3 多个object

    useEffect(() => {
        console.log('cvsActiveObjects', cvsActiveObjects);
        if (cvsActiveObjects.length === 0) {
            setType(1);
        } else if (cvsActiveObjects.length === 1) {
            setType(2);
        } else {
            setType(3);
        }
    }, [cvsActiveObjects]);

    return (
        <div className="tools-panel">
            {type === 1 && <AttrCanvas />}
            {type === 2 && <AttrObject />}
        </div>
    );
};

export default Component;
