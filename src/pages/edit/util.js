import * as fabric from 'fabric';
export const drawDefaultLine = (canvas, item) => {
    const { left, top } = item;
    const line = new fabric.Line(
        [
            left,
            top, // 起始点坐标
            left + 200,
            top, // 结束点坐标
        ],
        {
            stroke: '#000', // 笔触颜色
            strokeWidth: 10,
        }
    );
    canvas.add(line);
};

export const drawDefaultRect = (canvas, item) => {
    const { left, top } = item;
    const line = new fabric.Rect({
        top: top, // 距离画布顶部距离
        left: left, // 距离画布左侧距离
        width: 60,
        height: 40,
        fill: '#f00',
        stroke: '#000', // 笔触颜色
        strokeWidth: 6,
    });
    canvas.add(line);
};

export const drawDefaultTriangle = (canvas, item) => {
    const { left, top } = item;
    const triangle = new fabric.Triangle({
        top: top, // 距离画布顶部距离
        left: left, // 距离画布左侧距离
        width: 60,
        height: 40,
        fill: '#f00',
        stroke: '#000', // 笔触颜色
        strokeWidth: 6,
    });
    canvas.add(triangle);
};

export const drawDefaultEllipse = (canvas, item) => {
    const { left, top } = item;
    const ellipse = new fabric.Ellipse({
        top: top, // 距离画布顶部距离
        left: left, // 距离画布左侧距离
        rx: 100,
        ry: 50,
        fill: '#f00',
        strokeWidth: 10,
        stroke: '#0f0',
    });
    canvas.add(ellipse);
};

export const drawDefaultPloygon = (canvas, item) => {
    const { left, top } = item;
    const ploygon = new fabric.Polygon(
        [
            { x: 50, y: 0 },
            { x: 15.45, y: 47.55 },
            { x: -40.45, y: 29.39 },
            { x: -40.45, y: -29.39 },
            { x: 15.45, y: -47.55 },
        ],
        {
            left,
            top,
            fill: '#ffd3b6', // 填充色
            stroke: '#6639a6', // 线段颜色：紫色
            strokeWidth: 5, // 线段粗细 5
        }
    );
    canvas.add(ploygon);
};

export const drawDefaultPloyline = (canvas, item) => {
    const { left, top } = item;
    const ploygon = new fabric.Polyline(
        [
            { x: 30, y: 30 },
            { x: 150, y: 100 },
            { x: 80, y: 100 },
            { x: 100, y: 30 },
        ],
        {
            left,
            top,
            fill: 'transparent', // 如果画折线，需要填充透明
            stroke: '#6639a6', // 线段颜色：紫色
            strokeWidth: 5, // 线段粗细 5
        }
    );
    canvas.add(ploygon);
};

export const drawDefaultPath = (canvas, item) => {
    const { left, top } = item;
    let path = new fabric.Path('M 20 20 L 100 80 L 70 100 L 80 100', {
        fill: '#6639a6', // 填充
        stroke: '#000', // 描边颜色 黑色
        left,
        top,
    });

    // 将路径添加到画布中
    canvas.add(path);
};
