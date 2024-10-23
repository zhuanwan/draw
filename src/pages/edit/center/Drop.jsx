import { useDrop } from 'react-dnd';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';

const Component = ({ children, cb }) => {
    const dispatch = useDispatch();

    const onDrop = (item, clientOffset) => {
        const { x, y } = clientOffset;
        const containerEle = document.getElementById('container');
        const newItem = {
            type: item.type,
            left: x + containerEle.scrollLeft - 140,
            top: y + containerEle.scrollTop - 90,
            data: {
                type: item.type,
                name: item.name,
                uuid: uuidv4()
            }
        };
        cb(newItem)
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
    cb: PropTypes.func
};
export default Component;
