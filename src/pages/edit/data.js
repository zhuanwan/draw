import lineSvg from '@/static/imgs/line.svg';
import rectSvg from '@/static/imgs/rect.svg';
import textSvg from '@/static/imgs/text.svg';

export const menu = ['line', 'rect', 'triangle', 'circle', 'polygon', 'polyline', 'ellipse', 'path'];

export const menuProps = {
    line: {
        img: lineSvg,
        label: '直线',
        type: 'line',
    },
    rect: {
        img: rectSvg,
        label: '矩形',
        type: 'rect',
    },
    text: {
        img: textSvg,
        label: '文本',
        type: 'text',
    },
    // triangle: {
    //     img: '',
    //     name: '三角形',
    // },
};
