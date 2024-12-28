import { useDispatch, useSelector } from 'react-redux';
import { Button, Dropdown, Space } from 'antd';
import { setIsLockScale, setScale } from '@/store/features/drawSlice';
import { Select, Slider } from 'antd';
import lockImg from '@/static/imgs/lock.svg';
import unlockImg from '@/static/imgs/unlock.svg';
import './index.less';

const Component = () => {
    const { scale, isLockScale } = useSelector((state) => state.draw);
    const dispatch = useDispatch();

    const lock = () => {
        if (isLockScale) {
            dispatch(setIsLockScale(false));
        } else {
            dispatch(setIsLockScale(true));
        }
    };

    const changeSlider = (v) => {
        dispatch(setScale(v / 100));
    };

    const changeSelect = (v) => {
        dispatch(setScale(v));
    };

    const items = [
        {
            key: '0',
            label: '如果快捷键不生效，点下画布'
        },
        {
            key: '1',
            label: (
                <Space>
                    <span>多选</span>
                    <span>框选或左键+Shift</span>
                </Space>
            ),
        },
        {
            key: '2',
            label: (
                <Space>
                    <span>复制</span>
                    <span>Ctrl+c</span>
                </Space>
            ),
        },
        {
            key: '3',
            label: (
                <Space>
                    <span>粘贴</span>
                    <span>Ctrl+v</span>
                </Space>
            ),
        },
        {
            key: '4',
            label: (
                <Space>
                    <span>删除</span>
                    <span>Delete或者Backspace</span>
                </Space>
            ),
        },
        {
            key: '5',
            label: (
                <Space>
                    <span>撤销</span>
                    <span>Ctrl+z</span>
                </Space>
            ),
        },
        {
            key: '6',
            label: (
                <Space>
                    <span>重做</span>
                    <span>Ctrl+y</span>
                </Space>
            ),
        },
    ];
    return (
        <div className="content-center-bottom">
            <Dropdown menu={{ items }} placement="bottom" arrow>
                <Button className="btn">操作提示</Button>
            </Dropdown>
            <Select
                disabled={isLockScale}
                value={scale}
                labelRender={({ value }) => `${Math.round(value * 100)}%`}
                options={[
                    { value: 2, label: '200%' },
                    { value: 1.5, label: '150%' },
                    { value: 1, label: '100%' },
                    { value: 0.5, label: '50%' },
                ]}
                onChange={changeSelect}
            />
            <img src={isLockScale ? lockImg : unlockImg} alt="" srcSet="" className="lock-img" onClick={lock} />
            <div style={{ width: 200 }}>
                <Slider
                    value={Math.round(scale * 100)}
                    disabled={isLockScale}
                    min={0}
                    max={200}
                    onChange={changeSlider}
                />
            </div>
        </div>
    );
};

export default Component;
