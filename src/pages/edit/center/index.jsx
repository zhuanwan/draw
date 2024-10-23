import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCvs } from '@/store/features/drawSlice';
import * as fabric from 'fabric';
import { drawLine, drawRect } from '../util';
import Drop from './Drop';
import './index.less';

const Component = () => {
    const { droppedItems, cvs } = useSelector((state) => state.draw);
    const dispatch = useDispatch();

    const createCanvas = () => {
        console.log('初始化画布');
        const _canvas = new fabric.Canvas(document.getElementById('canvas'), {
            width: 1920,
            height: 1080,
        });
        drawRect(_canvas, {
            width: 1920,
            height: 1080,
            fill: '#fff',
            left: 0,
            top: 0,
            selectable: false,
            evented: false,
        });
        dispatch(setCvs(_canvas));
        return _canvas;
    };

    const draw = (canvas, droppedItems) => {
        for (let i = 0; i < droppedItems.length; i++) {
            const { type } = droppedItems[i];
            switch (type) {
                case 'line':
                    drawLine(canvas, droppedItems[i]);
                    break;
                default:
                    break;
            }
        }
    };

    useEffect(() => {
        const canvas = cvs || createCanvas();
        draw(canvas, droppedItems);
    }, [droppedItems]);

    return (
        <Drop>
            <canvas id="canvas"></canvas>
        </Drop>
    );
};

export default Component;
