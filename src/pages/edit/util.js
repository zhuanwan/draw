import * as fabric from 'fabric';
export const drawDefaultLine = (canvas, item) => {
    const { left, top, ...reset } = item;
    const line = new fabric.Line(
        [
            left,
            top, // 起始点坐标
            left + 100,
            top, // 结束点坐标
        ],
        {
            ...reset,
            stroke: '#f00', // 笔触颜色
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
