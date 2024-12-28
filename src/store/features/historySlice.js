import { createSlice } from '@reduxjs/toolkit';

// 定义初始状态
const initialState = {
    historyStack: [],
    redoStack: [],
    maxHistoryCount: 50, // 最大历史记录数
    historyFlag: 0,
};

// 创建 Slice
const historySlice = createSlice({
    name: 'history',
    initialState,
    reducers: {
        // 保存状态flag
        setHistoryFlag: (state, action) => {
            if (state.historyFlag > 1000000) {
                state.historyFlag = 0;
            } else {
                state.historyFlag = state.historyFlag + 1;
            }
        },
        // 保存当前状态到 historyStack
        saveState: (state, action) => {
            // 先把当前状态加入 historyStack
            state.historyStack.push(action.payload);

            // 如果历史记录超过最大数量，则删除最早的记录
            if (state.historyStack.length > state.maxHistoryCount) {
                console.log(`历史记录超过了${state.maxHistoryCount}条`);
                state.historyStack.shift(); // 删除第一个元素
            }

            // 清空 redoStack，因为每次保存新状态时需要清空 redoStack
            state.redoStack = [];
        },
        // 撤销操作
        undo: (state) => {
            if (state.historyStack.length > 0) {
                const lastState = state.historyStack.pop();
                state.redoStack.unshift(lastState); // 将撤销的状态放到 redoStack
            }
        },
        // 重做操作
        redo: (state) => {
            if (state.redoStack.length > 0) {
                const redoState = state.redoStack.shift();
                state.historyStack.push(redoState); // 将重做的状态放回 historyStack
            }
        },
        // 清除历史记录
        clearHistory: () => initialState,
    },
});

// 导出 actions
export const { setHistoryFlag, saveState, undo, redo, clearHistory } = historySlice.actions;

// 导出 reducer
export default historySlice.reducer;
