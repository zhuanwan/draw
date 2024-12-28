import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useDispatch } from 'react-redux';
import Right from './right';
import Header from './header';
import Center from './center';
import Left from './left';
import './index.less';
import { useEffect } from 'react';
import { debounce } from '@/utils';
import { setHistoryFlag } from '@/store/features/historySlice';
import { setCvscActiveObject, setIsOptInCanvas } from '@/store/features/drawSlice';

const Component = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        const canvas = window._csv; // 获取你的 fabric.Canvas 实例
        const canvasElement = canvas?.lowerCanvasEl; // 获取底层 canvas 元素

        // 历史记录
        const moveHistory = debounce((e) => {
            const target = canvas?.findTarget(e);
            if (target) {
                dispatch(setCvscActiveObject(target));
                dispatch(setHistoryFlag());
            }
        }, 100);

        let isCanvasTarget = false;
        const handleMouseDown = (e) => {
            // 获取 canvas 的边界信息
            const rect = canvasElement?.getBoundingClientRect();
            const x = e.clientX;
            const y = e.clientY;

            // 判断点击是否在 canvas 内部
            const isClickInsideCanvas = rect && x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom;

            // 使用 canvas.findTarget 来查找点击的目标
            const target = canvas?.findTarget(e);

            if (target) {
                console.log('点击的是画布元素:', target);
                isCanvasTarget = true;
                dispatch(setCvscActiveObject(target));
                dispatch(setIsOptInCanvas(true))
            } else if (isClickInsideCanvas) {
                console.log('点击的是画布');
                dispatch(setIsOptInCanvas(true))
            } else {
                console.log('点击的是外部');
                dispatch(setIsOptInCanvas(false))
            }
        };

        const handleMouseMove = (e) => {
            if (!isCanvasTarget) {
                dispatch(setIsOptInCanvas(false))
                return;
            }
            moveHistory(e);
        };

        const handleMouseUp = () => {
            isCanvasTarget = false;
        };

        document.addEventListener('mousedown', handleMouseDown);
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);

        return () => {
            document.removeEventListener('mousedown', handleMouseDown);
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, []);

    return (
        <DndProvider backend={HTML5Backend}>
            <div className="edit-page">
                <Header />
                <div className="content">
                    <Left />
                    <Center />
                    <Right />
                </div>
            </div>
        </DndProvider>
    );
};

export default Component;
