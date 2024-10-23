import React, { useEffect } from 'react';

import './index.less';
import { useSelector } from 'react-redux';

const Component = () => {
    const { cvsActiveObjects } = useSelector((state) => state.draw);

    useEffect(() => {
        console.log('cvsActiveObjects', cvsActiveObjects);
    }, [cvsActiveObjects]);

    return <div>定制</div>;
};

export default Component;
