import { useState, useEffect } from 'react';
import { useDrop } from 'react-dnd';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import * as fabric from 'fabric';
import { setCvscActiveObject } from '@/store/features/drawSlice';
import { saveState, undo, redo, setHistoryFlag } from '@/store/features/historySlice';
import Ruler from './Ruler';
import store from '@/store';

const Component = ({ children, cb }) => {
    const { historyFlag } = useSelector((state) => state.history);
    const { scale } = useSelector((state) => state.draw);
    const dispatch = useDispatch();
    const [menuVisible, setMenuVisible] = useState(false);
    const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
    const [menuOptions, setMenuOptions] = useState([]);

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
                uuid: uuidv4(),
            },
        };
        cb(newItem);
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

    const handleKeyDown = (e) => {
        // 检查是否按下了Ctrl + C 或 Ctrl + V
        if (e.ctrlKey) {
            if (e.key === 'c' || e.key === 'C') {
                handleCopy();
            } else if (e.key === 'j' || e.key === 'J') {
                e.preventDefault();
                handlePaste();
            } else if (e.key === 'z') {
                handleUndo(); // Ctrl+Z 撤销
            } else if (e.key === 'y') {
                handleRedo(); // Ctrl+Y 重做
            }
        }

        // 检查是否按下了 DELETE 键
        if (e.key === 'Delete' || e.key === 'Backspace') {
            handleDelete();
        }

        // 方向键上下左右
        if (e.key === 'ArrowLeft' || e.key === 'ArrowRight' || e.key === 'ArrowUp' || e.key === 'ArrowDown') {
            handleDirection(e, e.key);
        }
    };

    // 右键点击时显示菜单
    const handleRightClick = (e) => {
        e.preventDefault(); // 阻止默认的右键菜单

        // 获取选中的对象
        const activeObjects = window._csv?.getActiveObjects();

        const options = [];
        if (activeObjects?.length) {
            options.push({ label: '复制', action: handleCopy });
            options.push({ label: '粘贴', action: handlePaste });
            if (activeObjects.length === 1) {
                options.push({ label: '上移', action: handleBringForward });
                options.push({ label: '下移', action: handleSendBackward });
                options.push({ label: '置顶', action: handleBringToFront });
                options.push({ label: '置底', action: handleSendToBack });
                if (activeObjects[0].type === 'group') {
                    options.push({ label: '解除分组', action: handleUngroup });
                }
            } else {
                options.push({ label: '创建分组', action: handleCreateGroup });
                options.push({ label: '左对齐', action: handleAlignLeft });
                options.push({ label: '右对齐', action: handleAlignRight });
                options.push({ label: '顶对齐', action: handleAlignTop });
                options.push({ label: '底对齐', action: handleAlignBottom });
                options.push({ label: '垂直居中对齐', action: handleAlignVertical });
                options.push({ label: '水平居中对齐', action: handleAlignHorizontal });
            }

            options.push({ label: '删除', action: handleDelete });
        }

        setMenuOptions(options);

        // 显示菜单
        const { offsetX, offsetY } = e.nativeEvent;
        setMenuPosition({ x: offsetX, y: offsetY });
        setMenuVisible(true);
    };

    // 隐藏菜单
    const hideMenu = () => {
        setMenuVisible(false);
    };

    // 复制
    const handleCopy = async () => {
        const activeObject = window._csv?.getActiveObject();
        if (activeObject) {
            activeObject.clone().then((cloned) => {
                window._clipboard = cloned;
            });
        }
    };

    // 粘贴
    const handlePaste = async () => {
        if (!window._clipboard) {
            return;
        }
        // clone again, so you can do multiple copies.
        const clonedObj = await window._clipboard.clone();
        window._csv?.discardActiveObject();
        clonedObj.set({
            left: clonedObj.left + 10,
            top: clonedObj.top + 10,
            evented: true,
        });
        if (clonedObj instanceof fabric.ActiveSelection) {
            // active selection needs a reference to the canvas.
            clonedObj.canvas = window._csv;
            clonedObj.forEachObject((obj) => {
                window._csv.add(obj);
            });
            // this should solve the unselectability
            clonedObj.setCoords();
        } else {
            window._csv.add(clonedObj);
        }
        window._clipboard.top += 10;
        window._clipboard.left += 10;
        window._csv.setActiveObject(clonedObj);
        window._csv.requestRenderAll();
        dispatch(setHistoryFlag(+new Date()));
    };

    // 删除对象
    const handleDelete = () => {
        const activeObjects = window._csv?.getActiveObjects();
        activeObjects.forEach((activeObject) => {
            if (activeObject) {
                window._csv?.remove(activeObject);
            }
        });
        window._csv.discardActiveObject();
        window._csv.requestRenderAll();
        dispatch(setHistoryFlag(+new Date()));
        hideMenu();
    };

    // 创建分组
    const handleCreateGroup = () => {
        const activeObjects = window._csv.getActiveObjects();
        if (activeObjects.length > 1) {
            const group = new fabric.Group(activeObjects);

            // 从画布中移除选中的对象
            activeObjects.forEach((obj) => {
                window._csv.remove(obj);
            });

            window._csv.add(group);
            window._csv.setActiveObject(group);
            dispatch(setCvscActiveObject(group));
            window._csv.requestRenderAll();
            dispatch(setHistoryFlag(+new Date()));
        }
        hideMenu();
    };

    // 解除分组
    const handleUngroup = () => {
        const activeObject = window._csv.getActiveObject();
        if (activeObject?.type === 'group') {
            const group = activeObject;
            const items = group._objects;
            items.forEach((item) => {
                // 还原子对象的坐标系
                const groupLeft = group.left || 0;
                const groupTop = group.top || 0;
                item.left += group.width / 2 + groupLeft;
                item.top += group.height / 2 + groupTop;

                // 还原子对象的缩放
                item.scaleX *= group.scaleX || 1;
                item.scaleY *= group.scaleY || 1;

                item.angle += group.angle || 0;

                const objectData = item.toObject(); // 获取对象的属性
                fabric.util.enlivenObjects([objectData]).then(([newObj]) => {
                    newObj.left = item.left;
                    newObj.top = item.top;
                    window._csv.add(newObj);
                });
            });

            // 删除分组
            window._csv.remove(group);
            // 清除当前激活的对象
            window._csv.discardActiveObject();
            dispatch(setCvscActiveObject(null));
            window._csv.requestRenderAll();
            dispatch(setHistoryFlag(+new Date()));
        }
        hideMenu();
    };

    // 上移
    const handleBringForward = () => {
        const activeObject = window._csv?.getActiveObject();
        if (activeObject) {
            window._csv.bringObjectToFront(activeObject);
            window._csv.requestRenderAll();
            dispatch(setHistoryFlag(+new Date()));
        }
    };

    // 下移
    const handleSendBackward = () => {
        const activeObject = window._csv?.getActiveObject();
        if (activeObject) {
            window._csv.sendObjectToBack(activeObject);
            window._csv.requestRenderAll();
            dispatch(setHistoryFlag(+new Date()));
        }
    };

    // 置顶
    const handleBringToFront = () => {
        const activeObject = window._csv?.getActiveObject();
        if (activeObject) {
            window._csv.bringObjectForward(activeObject);
            window._csv.requestRenderAll();
            dispatch(setHistoryFlag(+new Date()));
        }
    };

    // 置底
    const handleSendToBack = () => {
        const activeObject = window._csv?.getActiveObject();
        if (activeObject) {
            window._csv.sendObjectBackwards(activeObject);
            window._csv.requestRenderAll();
            dispatch(setHistoryFlag(+new Date()));
        }
    };

    // 撤销操作
    const handleUndo = () => {
        dispatch(undo());
        restoreCanvasState();
    };

    // 重做操作
    const handleRedo = () => {
        dispatch(redo());
        restoreCanvasState();
    };

    // 方向键移动事件
    const handleDirection = (e, type) => {
        e?.preventDefault();
        const activeObject = window._csv?.getActiveObject();
        if (!activeObject) return;
        const distance = 1;
        switch (type) {
            // 向左
            case 'ArrowLeft':
                {
                    const left = activeObject.left - distance;
                    activeObject.set({
                        left,
                    });
                }
                break;
            // 向右
            case 'ArrowRight':
                {
                    const left = activeObject.left + distance;
                    activeObject.set({
                        left,
                    });
                }
                break;
            // 向上
            case 'ArrowUp':
                {
                    const top = activeObject.top - distance;
                    activeObject.set({
                        top,
                    });
                }
                break;
            // 向下
            case 'ArrowDown':
                {
                    const top = activeObject.top + distance;
                    activeObject.set({
                        top,
                    });
                }
                break;
            default:
        }
        window._csv.requestRenderAll();
        dispatch(setHistoryFlag(+new Date()));
    };

    // 左对齐
    const handleAlignLeft = () => {
        const activeObject = window._csv?.getActiveObject();
        activeObject?._objects?.forEach((el) => {
            const left = activeObject.width / 2 - activeObject.width;
            el.set({
                left,
            });
        });

        window._csv.requestRenderAll();
        dispatch(setHistoryFlag(+new Date()));
    };

    // 右对齐
    const handleAlignRight = () => {
        const activeObject = window._csv?.getActiveObject();
        activeObject?._objects?.forEach((el) => {
            const left = activeObject.width - el.width - activeObject.width / 2;
            el.set({
                left,
            });
        });

        window._csv.requestRenderAll();
        dispatch(setHistoryFlag(+new Date()));
    };

    // 顶对齐
    const handleAlignTop = () => {
        const activeObject = window._csv?.getActiveObject();
        activeObject?._objects?.forEach((el) => {
            const top = activeObject.height / 2 - activeObject.height;
            el.set({
                top,
            });
        });

        window._csv.requestRenderAll();
        dispatch(setHistoryFlag(+new Date()));
    };

    // 底对齐
    const handleAlignBottom = () => {
        const activeObject = window._csv?.getActiveObject();
        activeObject?._objects?.forEach((el) => {
            const top = activeObject.height - el.height - activeObject.height / 2;
            el.set({
                top,
            });
        });

        window._csv.requestRenderAll();
        dispatch(setHistoryFlag(+new Date()));
    };

    // 垂直居中对齐
    const handleAlignVertical = () => {
        const activeObject = window._csv?.getActiveObject();
        activeObject?._objects?.forEach((el) => {
            const left = (activeObject.width - el.width) / 2 - activeObject.width / 2;
            el.set({
                left,
            });
        });

        window._csv.requestRenderAll();
        dispatch(setHistoryFlag(+new Date()));
    };

    // 水平居中对齐
    const handleAlignHorizontal = () => {
        const activeObject = window._csv?.getActiveObject();
        activeObject?._objects?.forEach((el) => {
            const top = (activeObject.height - el.height) / 2 - activeObject.height / 2;
            el.set({
                top,
            });
        });

        window._csv.requestRenderAll();
        dispatch(setHistoryFlag(+new Date()));
    };

    // 存储history
    useEffect(() => {
        if (!historyFlag || !window._csv) {
            return;
        }
        const json = window._csv.toJSON();
        json.width = window._csv.width;
        json.height = window._csv.height;
        const state = JSON.stringify(json);
        dispatch(saveState(state));
    }, [historyFlag]);

    // 恢复 canvas 状态并重新渲染
    const restoreCanvasState = () => {
        const s = store.getState().history.historyStack;
        const state = s[s.length - 1];
        if (state) {
            var object = JSON.parse(state);

            if (!object || !object.objects || object.objects.length === 0) {
                
                window._csv.clear();
                window._csv.backgroundColor = object.background;
            } else {
                window._csv.loadFromJSON(state, () => {
                    window._csv.width = object.width;
                    window._csv.height = object.height;
                    window._csv.requestRenderAll();
                });
            }
            dispatch(setCvscActiveObject(null));
        }
    };

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    return (
        <div className="content-center-top" id="container">
            <Ruler />
            <div
                ref={drop}
                className="scroll-div"
                onContextMenu={handleRightClick}
                onClick={hideMenu}
                style={{ transform: `scale(${scale})` }}
            >
                {children}

                {/* 右键菜单 */}
                {menuVisible && (
                    <div
                        style={{
                            top: menuPosition.y,
                            left: menuPosition.x,
                        }}
                        className="context-menu"
                    >
                        {menuOptions.map((option, index) => (
                            <div key={index} className="item" onClick={option.action}>
                                {option.label}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

Component.propTypes = {
    chidren: PropTypes.element,
    cb: PropTypes.func,
};
export default Component;
