import { createSlice } from '@reduxjs/toolkit';

// 定义初始状态
const initialState = {
    historyStack: [],
    redoStack: [],
};

// 创建 Slice
const historySlice = createSlice({
    name: 'history',
    initialState,
    reducers: {
        // 保存当前状态到 historyStack
        saveState: (state, action) => {
            state.historyStack.push(action.payload);
            state.redoStack = []; // 每次保存状态时清空 redoStack
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
export const { saveState, undo, redo, clearHistory } = historySlice.actions;

// 导出 reducer
export default historySlice.reducer;
