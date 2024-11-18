import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Right from './right';
import Header from './header'
import Center from './center';
import Left from './left';
import './index.less';

const Component = () => {
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
