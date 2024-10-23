import { useDrop } from 'react-dnd';
import { useDispatch } from 'react-redux';
import { setDroppedItems } from '@/store/features/drawSlice';
import PropTypes from 'prop-types';

const Component = ({ children }) => {
    const dispatch = useDispatch();

    const onDrop = (item, clientOffset) => {
        const { x, y } = clientOffset;
        const containerEle = document.getElementById('container');
        const newItem = {
            ...item,
            x: x + containerEle.scrollLeft - 140,
            y: y + containerEle.scrollTop - 90,
        };
        dispatch(setDroppedItems(newItem));
    };

    const [{ isOver }, drop] = useDrop(() => ({
        accept: 'BOX',
        drop: (item, monitor) => {
            const clientOffset = monitor.getClientOffset();
            onDrop(item, clientOffset);
        },
        collect: (monitor) => ({
            isOver: monitor.isOver(),
        }),
    }));

    return (
        <div className="content-center" id="container">
            <div ref={drop}>{children}</div>
        </div>
    );
};

Component.propTypes = {
    chidren: PropTypes.element,
};
export default Component;
