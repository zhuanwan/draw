import lineSvg from '@/static/imgs/line.svg';
import rectSvg from '@/static/imgs/rect.svg';
import textSvg from '@/static/imgs/text.svg';
import triangleSvg from '@/static/imgs/triangle.svg'
import ellipseSvg from '@/static/imgs/ellipse.svg'
import polygonSvg from '@/static/imgs/polygon.svg'
import polylineSvg from '@/static/imgs/polyline.svg'
import pathSvg from '@/static/imgs/path.svg'

export const menu = ['line', 'rect', 'triangle', 'circle', 'polygon', 'polyline', 'ellipse', 'path'];

export const menuProps = {
    line: {
        img: lineSvg,
        name: '直线',
        type: 'Line',
    },
    rect: {
        img: rectSvg,
        name: '矩形',
        type: 'Rect',
    },
    triangle: {
        img: triangleSvg,
        name: '三角形',
        type: 'Triangle',
    },
    ellipse: {
        img: ellipseSvg,
        name: '椭圆',
        type: 'Ellipse',
    },
    polygon: {
        img: polygonSvg,
        name: '多边形',
        type: 'Ploygon',
    },
    polyline: {
        img: polylineSvg,
        name: '折线',
        type: 'Ployline',
    },
    path: {
        img: pathSvg,
        name: '路径',
        type: 'Path',
    },
    text: {
        img: textSvg,
        name: '文本',
        type: 'Text',
    },
};
