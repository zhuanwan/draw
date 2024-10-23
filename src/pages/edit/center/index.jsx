import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setCvscActiveObjects } from '@/store/features/drawSlice';
import * as fabric from 'fabric';
import { drawDefaultLine } from '../util';
import Drop from './Drop';
import './index.less';

const Component = () => {
    const dispatch = useDispatch();

    const createCanvas = () => {
        console.log('初始化画布');
        const _canvas = new fabric.Canvas(document.getElementById('canvas'), {
            width: 1920,
            height: 1080,
        });
        _canvas.backgroundColor = '#fff';
        _canvas.renderAll();

        function updateActiveObjects() {
            const allSelectedObjects = _canvas.getActiveObjects(); // 获取所有选中的对象
            dispatch(setCvscActiveObjects(allSelectedObjects));
        }

        _canvas.on('mouse:down', updateActiveObjects);
        _canvas.on('selection:created', updateActiveObjects);
        _canvas.on('selection:updated', updateActiveObjects);

        return _canvas;
    };

    const draw = (droppedItem) => {
        const canvas = window._csv;
        const { type } = droppedItem;
        switch (type) {
            case 'Line':
                drawDefaultLine(canvas, droppedItem);
                break;
            default:
                break;
        }
    };

    useEffect(() => {
        if (!window._csv) {
            window._csv = createCanvas();
        }
    }, []);

    return (
        <Drop cb={draw}>
            <canvas id="canvas"></canvas>
        </Drop>
    );
};

export default Component;
