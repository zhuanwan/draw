import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setCvscActiveObjects, setRefreshNum } from '@/store/features/drawSlice';
import * as fabric from 'fabric';
import {
    drawDefaultLine,
    drawDefaultRect,
    drawDefaultTriangle,
    drawDefaultEllipse,
    drawDefaultPloygon,
    drawDefaultPloyline,
    drawDefaultPath,
    drawDefaulText,
} from '../util';
import Drop from './Drop';
import { debounce } from '@/utils';
import './index.less';

const Component = () => {
    const dispatch = useDispatch();
    const ctrlPressedRef = useRef(false);

    const handleKeyDown = (e) => {
        if (e.key === 'Control' || e.key === 'Meta') {
            ctrlPressedRef.current = true;
        }
    };

    const handleKeyUp = (e) => {
        if (e.key === 'Control' || e.key === 'Meta') {
            ctrlPressedRef.current = false;
        }
    };


    const createCanvas = () => {
        console.log('初始化画布');
        const _canvas = new fabric.Canvas(document.getElementById('canvas'), {
            width: 1920,
            height: 1080,
            selection: true,
        });
        _canvas.backgroundColor = '#fff';
        _canvas.renderAll();

        function updateActiveObjects() {
            const allSelectedObjects = _canvas.getActiveObjects(); // 获取所有选中的对象
            dispatch(setCvscActiveObjects(allSelectedObjects));
            dispatch(setRefreshNum());
        }

        _canvas.on('mouse:down', debounce(updateActiveObjects));
        // _canvas.on('mouse:move', debounce(updateActiveObjects));
        _canvas.on('selection:created', debounce(updateActiveObjects));
        _canvas.on('selection:updated', debounce(updateActiveObjects));
        _canvas.on('object:moving', debounce(updateActiveObjects));
        _canvas.on('object:selected', debounce(updateActiveObjects));
        // _canvas.on('object:scaling', debounce(updateActiveObjects));

        // 禁用浏览器默认的右键菜单
        _canvas.upperCanvasEl.addEventListener('contextmenu', (e) => {
            e.preventDefault();
        });

        return _canvas;
    };

    const draw = (droppedItem) => {
        const canvas = window._csv;
        const { type } = droppedItem;
        switch (type) {
            case 'Line':
                drawDefaultLine(canvas, droppedItem);
                break;
            case 'Rect':
                drawDefaultRect(canvas, droppedItem);
                break;
            case 'Triangle':
                drawDefaultTriangle(canvas, droppedItem);
                break;
            case 'Ellipse':
                drawDefaultEllipse(canvas, droppedItem);
                break;
            case 'Ploygon':
                drawDefaultPloygon(canvas, droppedItem);
                break;
            case 'Ployline':
                drawDefaultPloyline(canvas, droppedItem);
                break;
            case 'Path':
                drawDefaultPath(canvas, droppedItem);
                break;
            case 'Text':
                drawDefaulText(canvas, droppedItem);
                break;

            default:
                break;
        }
    };

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);

        if (!window._csv) {
            window._csv = createCanvas();
        }
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
        };
    }, []);

    return (
        <Drop cb={draw}>
            <canvas id="canvas"></canvas>
        </Drop>
    );
};

export default Component;
