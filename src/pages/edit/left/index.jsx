import { useDraggable } from '@dnd-kit/core';
import PropTypes from 'prop-types';

// 生成可拖拽的 Div 组件
function DraggableDiv({ id, children }) {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id,
    });

    const style = {
        transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
        width: 100,
        margin: '10px',
        backgroundColor: 'lightblue',
        cursor: 'grab',
    };

    return (
        <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
            {children}
        </div>
    );
}

DraggableDiv.propTypes = {
    id: PropTypes.string,
    children: PropTypes.element,
};

const Component = () => {
    return (
        <div>
            {['div1', 'div2', 'div3'].map((id) => (
                <DraggableDiv key={id} id={id}>
                    <div>{id}</div>
                </DraggableDiv>
            ))}
        </div>
    );
};

export default Component;
