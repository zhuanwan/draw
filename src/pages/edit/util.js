import * as fabric from 'fabric';
export const drawLine = (canvas, item) => {
    const { x, y } = item;
    const line = new fabric.Line(
        [
            x,
            y, // 起始点坐标
            x + 100,
            y + 100, // 结束点坐标
        ],
        {
            stroke: 'red', // 笔触颜色
            strokeWidth: 10,
        }
    );
    canvas.add(line);
};

export const drawRect = (canvas, item) => {
    const rect = new fabric.Rect({
        ...item,
    });
    canvas.add(rect);
};
