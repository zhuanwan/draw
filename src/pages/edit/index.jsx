import { useEffect } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useDispatch, useSelector } from 'react-redux';

import { setDroppedItems } from '@/store/features/drawSlice';

import './index.less';

import Center from './center';
import Left from './left';

const Component = () => {
    const dispatch = useDispatch();

    // 监听鼠标全局位置
    useEffect(() => {
        const handleMouseDown = (event) => {
            console.log({ x: event.clientX, y: event.clientY });
        };

        window.addEventListener('mousedown', handleMouseDown);
        return () => {
            window.removeEventListener('mousedown', handleMouseDown);
        };
    }, []);

    return (
        <DndProvider backend={HTML5Backend}>
            <div className="edit-page">
                <div className="menu-bar">1</div>
                <div className="content">
                    <Left />
                    <Center />

                    <div className="tools-panel">3</div>
                </div>
            </div>
        </DndProvider>
    );
};

export default Component;
