import { useDrop } from 'react-dnd';
import { useDispatch, useSelector } from 'react-redux';
import { setDroppedItems } from '@/store/features/drawSlice';

import './index.less';

const Component = () => {
    const { droppedItems } = useSelector((state) => state.draw);
    const dispatch = useDispatch();

    const onDrop = (item, clientOffset) => {
        const { x, y } = clientOffset;
        const containerEle = document.getElementById('container');
        const newItem = {
            name: item.name,
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
            <div className="workarea" style={{ width: 1920, height: 1080 }} ref={drop}>
                {droppedItems.map((ele, i) => (
                    <div
                        key={i}
                        style={{
                            position: 'absolute',
                            left: ele.x,
                            top: ele.y,
                            width: 50,
                            height: 50,
                            border: '1px solid red',
                        }}
                    >
                        {ele.name}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Component;
