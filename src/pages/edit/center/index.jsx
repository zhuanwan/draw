import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
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
import './index.less';
import { setHistoryFlag } from '@/store/features/historySlice';
import { setIsOptInCanvas } from '@/store/features/drawSlice';
import CenterBottom from './CenterBottom';

const Component = () => {
    const dispatch = useDispatch();

    const createCanvas = () => {
        console.log('初始化画布');
        const _canvas = new fabric.Canvas(document.getElementById('canvas'), {
            width: 1000,
            height: 800,
            selection: true,
        });
        _canvas.backgroundColor = '#fff';
        _canvas.renderAll();

        // 导出自定义属性 data
        fabric.BaseFabricObject.prototype.toObject = (function (toObject) {
            return function () {
                return Object.assign(toObject.call(this), {
                    data: this.data || null,
                });
            };
        })(fabric.BaseFabricObject.prototype.toObject);

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
            dispatch(setIsOptInCanvas(true));
            dispatch(setHistoryFlag());
        }
    };

    useEffect(() => {
        if (!window._csv) {
            window._csv = createCanvas();
            dispatch(setHistoryFlag());
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
