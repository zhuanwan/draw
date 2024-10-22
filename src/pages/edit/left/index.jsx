import { useDrag } from 'react-dnd';
import PropTypes from 'prop-types';

import { menuProps } from '@/pages/edit/data';

import './index.less';

// 生成可拖拽的 Div 组件
function DraggableDiv({ item }) {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: 'BOX',
        item,
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    }));

    return (
        <div
            ref={drag}
            style={{
                opacity: isDragging ? 0.5 : 1,
            }}
            className="drag-item"
        >
            <img src={item.img} alt={item.name} srcSet="" />
        </div>
    );
}

DraggableDiv.propTypes = {
    item: PropTypes.object,
};

const Component = () => {
    return (
        <div className="tools-left">
            {Object.keys(menuProps).map((key) => {
                const item = menuProps[key];
                return <DraggableDiv key={key} item={item} />;
            })}
        </div>
    );
};

export default Component;
