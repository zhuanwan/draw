import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Right from './right';
import Header from './header'
import Center from './center';
import Left from './left';
import './index.less';

const Component = () => {
    // // 监听鼠标全局位置
    // useEffect(() => {
    //     const handleMouseDown = (event) => {
    //         console.log({ x: event.clientX, y: event.clientY });
    //     };

    //     window.addEventListener('mousedown', handleMouseDown);
    //     return () => {
    //         window.removeEventListener('mousedown', handleMouseDown);
    //     };
    // }, []);

    return (
        <DndProvider backend={HTML5Backend}>
            <div className="edit-page">
                <Header />
                <div className="content">
                    <Left />
                    <Center />
                    <Right />
                </div>
            </div>
        </DndProvider>
    );
};

export default Component;
