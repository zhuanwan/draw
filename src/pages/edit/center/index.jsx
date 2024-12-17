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
import { saveState } from '@/store/features/historySlice';

const Component = () => {
    const dispatch = useDispatch();

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

    function saveCanvasState() {
        const json = window._csv.toJSON();
        json.width = window._csv.width;
        json.height = window._csv.height;
        const state = JSON.stringify(json);
        dispatch(saveState(state));
    }

    const draw = (droppedItem) => {
        const canvas = window._csv;
        const { type } = droppedItem;
        const drawShapeMap = {
            Line: drawDefaultLine,
            Rect: drawDefaultRect,
            Triangle: drawDefaultTriangle,
            Ellipse: drawDefaultEllipse,
            Ploygon: drawDefaultPloygon,
            Ployline: drawDefaultPloyline,
            Path: drawDefaultPath,
            Text: drawDefaulText,
        };

        const drawShape = drawShapeMap[type];

        if (drawShape) {
            drawShape(canvas, droppedItem);
            saveCanvasState();
        }
    };

    useEffect(() => {
        if (!window._csv) {
            window._csv = createCanvas();
            saveCanvasState();
        }
    }, []);

    return (
        <Drop cb={draw}>
            <canvas id="canvas"></canvas>
        </Drop>
    );
};

export default Component;
