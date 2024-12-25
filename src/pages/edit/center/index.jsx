import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setCvscActiveObject } from '@/store/features/drawSlice';
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
import { setHistoryFlag } from '@/store/features/historySlice';
import CenterBottom from './CenterBottom';

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

        // 历史记录
        const moveHistory = debounce(() => {
            dispatch(setHistoryFlag(+new Date()));
        }, 100);

        let flag = false;
        _canvas.on('mouse:down', (event) => {
            flag = true;
            dispatch(setCvscActiveObject(event.target));
        });
        _canvas.on('mouse:move', (event) => {
            if (!flag) {
                return;
            }

            dispatch(setCvscActiveObject(event.target));
            moveHistory();
        });
        _canvas.on('mouse:up', (event) => {
            flag = false;
        });

        // 禁用浏览器默认的右键菜单
        _canvas.upperCanvasEl.addEventListener('contextmenu', (e) => {
            e.preventDefault();
        });

        return _canvas;
    };

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
            dispatch(setHistoryFlag(+new Date()));
        }
    };

    useEffect(() => {
        if (!window._csv) {
            window._csv = createCanvas();
            dispatch(setHistoryFlag(+new Date()));
        }
    }, []);

    return (
        <div className="content-center">
            <Drop cb={draw}>
                <canvas id="canvas"></canvas>
            </Drop>
            <CenterBottom />
        </div>
    );
};

export default Component;
