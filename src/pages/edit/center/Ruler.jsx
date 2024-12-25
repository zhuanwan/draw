import { useEffect, useRef } from 'react';
import * as fabric from 'fabric';
import { useSelector } from 'react-redux';

const Component = () => {
    const { scale } = useSelector((state) => state.draw);
    const canvasRef = useRef();

    const draw = () => {
        const containerEl = document.getElementById('container');
        const width = containerEl.scrollWidth;
        const height = containerEl.scrollHeight;

        if (!canvasRef.current) {
            canvasRef.current = new fabric.StaticCanvas(document.getElementById('ruler-canvas'), {
                width: width,
                height: height,
            });
        } else {
            canvasRef.current.setDimensions({ width, height });
        }

        console.log(777, scale)
        const tickLength = 10; // 刻度线长度
        const tickSpacing = 10 * scale; // 刻度间隔随着缩放变化
        const pad = 30;

        // 清空画布
        canvasRef.current.clear();

        // 画水平背景
        const rect1 = new fabric.Rect({
            width: width,
            height: 2 * tickLength,
            fill: '#f2f2f2',
        });
        canvasRef.current.add(rect1);

        // 画水平刻度
        let i = 0;
        for (let x = pad; x <= width; x += tickSpacing) {
            if (i % 10 === 0) {
                const tick = new fabric.Line([x, 0, x, tickLength * 2], {
                    stroke: '#999',
                    strokeWidth: 1,
                });
                canvasRef.current.add(tick);
                const text = new fabric.FabricText(String(Math.round((i * tickSpacing)/scale)), {
                    top: tickLength,
                    left: x + 2,
                    fontSize: 10,
                    fill: '#666',
                });
                canvasRef.current.add(text);
            } else {
                const tick = new fabric.Line([x, 0, x, tickLength], {
                    stroke: '#999',
                    strokeWidth: 1,
                });
                canvasRef.current.add(tick);
            }
            i++;
        }

        // 画垂直背景
        const rect2 = new fabric.Rect({
            width: 2 * tickLength,
            height,
            fill: '#f2f2f2',
        });
        canvasRef.current.add(rect2);
        // 画垂直刻度
        i = 0;
        for (let y = pad; y <= height; y += tickSpacing) {
            if (i % 10 === 0) {
                const tick = new fabric.Line([0, y, tickLength * 2, y], {
                    stroke: '#999',
                    strokeWidth: 1,
                });
                canvasRef.current.add(tick);
                const text = new fabric.FabricText(String(Math.round((i * tickSpacing)/scale)), {
                    top: y + 2,
                    left: tickLength,
                    fontSize: 10,
                    fill: '#666',
                });
                canvasRef.current.add(text);
            } else {
                const tick = new fabric.Line([0, y, tickLength, y], {
                    stroke: '#999',
                    strokeWidth: 1,
                });
                canvasRef.current.add(tick);
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
