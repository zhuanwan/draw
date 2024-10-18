import { useSelector } from 'react-redux';
import { useDroppable } from '@dnd-kit/core';
import PropTypes from 'prop-types';

import './index.less';

// Droppable 区域组件
function DroppableArea({ children, onDrop }) {
    const { isOver, setNodeRef } = useDroppable({
        id: 'droppable',
    });

    const style = {
        border: '2px dashed black',
        height: '400px',
        width: '300px',
        backgroundColor: isOver ? 'lightgreen' : 'lightgray',
        position: 'relative',
    };

    return (
        <div ref={setNodeRef} style={style}>
            {children}
        </div>
    );
}

DroppableArea.propTypes = {
    onDrop: PropTypes.func,
    children: PropTypes.arrayOf(PropTypes.element),
};

const Component = () => {
    const { droppedItems } = useSelector((state) => state.draw);

    const { isOver, setNodeRef } = useDroppable({
        id: 'droppable',
    });

    return (
        <div className="content-center" id="container">
            <div className="workarea" style={{ width: 1920, height: 1080 }} ref={setNodeRef} id="workarea">
                {droppedItems.map((item, index) => (
                    <div
                        key={index}
                        style={{
                            position: 'absolute',
                            top: `${item.position.y}px`,
                            left: `${item.position.x}px`,
                            width: 100,
                            backgroundColor: 'lightcoral',
                        }}
                    >
                        <div>{item.content}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Component;
