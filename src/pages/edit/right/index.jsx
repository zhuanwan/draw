import React, { useEffect, useState } from 'react';

import { useSelector } from 'react-redux';
import AttrCanvas from './attr-canvas';
import AttrObject from './attr-object';
import './index.less';

const Component = () => {
    const { cvsActiveObject } = useSelector((state) => state.draw);
    const [type, setType] = useState(1); // 1 画布 2 单个object

    useEffect(() => {
        if (cvsActiveObject) {
            setType(2);
        } else {
            setType(1);
        }
    }, [cvsActiveObject]);

    return (
        <div className="tools-panel">
            {type === 1 && <AttrCanvas />}
            {type === 2 && <AttrObject />}
        </div>
    );
};

export default Component;
