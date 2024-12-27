import { useEffect, useRef } from 'react';
import * as fabric from 'fabric';
import { useSelector } from 'react-redux';

const Component = () => {
    const { scale } = useSelector((state) => state.draw);
    const ruleCanvasRef = useRef();

    const draw = () => {
        const containerEl = document.getElementById('container');
        const width = containerEl.scrollWidth;
        const height = containerEl.scrollHeight;

        if (!ruleCanvasRef.current) {
            ruleCanvasRef.current = new fabric.StaticCanvas(document.getElementById('ruler-canvas'), {
                width: width,
                height: height,
            });
        } else {
            ruleCanvasRef.current.setDimensions({ width, height });
        }

        const tickLength = 10; // 刻度线长度
        const tickSpacing = 10 * scale; // 刻度间隔随着缩放变化
        const pad = 30;

        // 清空画布
        ruleCanvasRef.current.clear();

        // 画水平背景
        const rect1 = new fabric.Rect({
            width: width,
            height: 2 * tickLength,
            fill: '#f2f2f2',
        });
        ruleCanvasRef.current.add(rect1);

        // 画水平刻度
        let i = 0;
        for (let x = pad; x <= width; x += tickSpacing) {
            if (i % 10 === 0) {
                const tick = new fabric.Line([x, 0, x, tickLength * 2], {
                    stroke: '#999',
                    strokeWidth: 1,
                });
                ruleCanvasRef.current.add(tick);
                const text = new fabric.FabricText(String(Math.round((i * tickSpacing) / scale)), {
                    top: tickLength,
                    left: x + 2,
                    fontSize: 10,
                    fill: '#666',
                });
                ruleCanvasRef.current.add(text);
            } else {
                const tick = new fabric.Line([x, 0, x, tickLength], {
                    stroke: '#999',
                    strokeWidth: 1,
                });
                ruleCanvasRef.current.add(tick);
            }
            i++;
        }

        // 画垂直背景
        const rect2 = new fabric.Rect({
            width: 2 * tickLength,
            height,
            fill: '#f2f2f2',
        });
        ruleCanvasRef.current.add(rect2);
        // 画垂直刻度
        i = 0;
        for (let y = pad; y <= height; y += tickSpacing) {
            if (i % 10 === 0) {
                const tick = new fabric.Line([0, y, tickLength * 2, y], {
                    stroke: '#999',
                    strokeWidth: 1,
                });
                ruleCanvasRef.current.add(tick);
                const text = new fabric.FabricText(String(Math.round((i * tickSpacing) / scale)), {
                    top: y + 2,
                    left: tickLength,
                    fontSize: 10,
                    fill: '#666',
                });
                ruleCanvasRef.current.add(text);
            } else {
                const tick = new fabric.Line([0, y, tickLength, y], {
                    stroke: '#999',
                    strokeWidth: 1,
                });
                ruleCanvasRef.current.add(tick);
            }
            i++;
        }
    };

    useEffect(() => {
        // 添加resize事件监听器
        window.addEventListener('resize', draw);

        return () => {
            window.removeEventListener('resize', draw);
        };
    }, []);

    useEffect(() => {
        setTimeout(() => {
            draw();
        }, 200);
    }, [scale]);

    return (
        <div className="ruler">
            <canvas id="ruler-canvas"></canvas>
        </div>
    );
};

export default Component;
