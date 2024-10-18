import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { DndContext } from '@dnd-kit/core';

import { setDroppedItems } from '@/store/features/drawSlice';

import './index.less';

import Center from './center';
import Left from './left';

const Component = () => {
    const dispatch = useDispatch();

    // 处理拖拽结束事件
    const handleDragEnd = (event) => {
        console.log(event);
        const { over, active } = event;
        if (over && over.id === 'droppable') {
            const containerEle = document.getElementById('container');
            const workareaEle = document.getElementById('workarea');
            const containerRect = containerEle.getBoundingClientRect();
            const workareaEleRect = workareaEle.getBoundingClientRect();
            const scrollOffsetX = containerEle.scrollLeft;
            const scrollOffsetY = containerEle.scrollTop;

            const x1 = event.delta.x + active.rect.current.translated.width;
            const yi = event.delta.y + active.rect.current.translated.height;

            // 获取当前拖拽元素的位置信息
            const { current: { translated } = {} } = active.rect || {};

    //  debugger
            // 计算元素在容器中的相对位置，考虑滚动条和 margin
            const x = translated.left  + scrollOffsetX;
            const y = translated.top  + scrollOffsetY;

            // 获取元素在右侧的放置位置
            const newItem = {
                id: active.id,
                content: active.id,
                position: { x: event.delta.x - 140, y: event.delta.y -40 }, // 偏移量
            };

            dispatch(setDroppedItems(newItem));
        }
    };

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
        <DndContext onDragEnd={handleDragEnd}>
            <div className="edit-page">
                <div className="menu-bar">1</div>
                <div className="content">
                    <div className="tools-left">
                        <Left />
                    </div>

                    <Center />

                    <div className="tools-panel">3</div>
                </div>
            </div>
        </DndContext>
    );
};

export default Component;
