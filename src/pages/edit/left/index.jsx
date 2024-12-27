import { useRef } from 'react';
import * as fabric from 'fabric';
import { useDrag } from 'react-dnd';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { dragMenuProps, clickMenuProps } from '@/pages/edit/data';
import { blobToBase64 } from '@/utils';
import { setHistoryFlag } from '@/store/features/historySlice';
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
            <img src={item.img} alt={item.name} srcSet="" title={item.name} />
        </div>
    );
}

DraggableDiv.propTypes = {
    item: PropTypes.object,
};

const Component = () => {
    const dispatch = useDispatch();
    const picFileUploadRef = useRef(null); // 图片上传对象
    const svgFileUploadRef = useRef(null); // 文件上传对象

    const addElement = (_, item) => {
        switch (item.type) {
            case 'Image':
                picFileUploadRef.current.click();
                break;
            case 'Svg':
                svgFileUploadRef.current.click();
                break;
            default:
        }
    };

    // 添加图片
    const addPicEvent = (ev) => {
        const { files } = ev.target;
        for (const file of files) {
            // 将文件转换为 Base64
            blobToBase64(file).then((base64) => {
                ev.target.value = ''; // 重置文件输入框
                // 创建一个 img 元素
                const img = new Image();
                img.src = base64;
                img.onload = () => {
                    // 使用 FabricImage.fromElement 加载图像
                    const el = new fabric.FabricImage(img, {
                        left: 0,
                        top: 0,
                    });
                    window._csv?.add(el); // 将图片添加到 canvas
                    dispatch(setHistoryFlag(+new Date()));
                };
            });
        }
    };

    // 添加svg
    const addSvgEvent = (ev) => {
        const { files } = ev.target;
        for (const file of files) {
            blobToBase64(file).then((base64) => {
                ev.target.value = '';
                fabric.loadSVGFromURL(base64).then(({ objects }) => {
                    const el = fabric.util.groupSVGElements(objects);
                    el.set({
                        left: 10,
                        top: 10,
                    });
                    window._csv?.add(el);
                });
            });
        }
    };

    return (
        <div className="tools-left">
            {Object.keys(dragMenuProps).map((key) => {
                const item = dragMenuProps[key];
                return <DraggableDiv key={key} item={item} />;
            })}

            {Object.keys(clickMenuProps).map((key) => {
                const item = clickMenuProps[key];
                return (
                    <div className="drag-item" onClick={(e) => addElement(e, item)} key={key}>
                        <img src={item.img} alt={item.name} srcSet="" title={item.name} />
                    </div>
                );
            })}

            <input
                style={{ display: 'none' }}
                type="file"
                accept="image/png,image/jpeg,image/jpg"
                multiple
                ref={picFileUploadRef}
                onChange={addPicEvent}
            />
            <input
                style={{ display: 'none' }}
                type="file"
                accept=".svg"
                multiple
                ref={svgFileUploadRef}
                onChange={addSvgEvent}
            />
        </div>
    );
};

export default Component;
