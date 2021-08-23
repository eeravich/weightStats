import { createSlice } from '@reduxjs/toolkit';
import defaultState from './defaultState';

export const canvasSlice = createSlice({
    name: 'canva',
    initialState: defaultState,
    reducers: {
        addNewData: (state) => {
            const w = Math.floor(Math.random() * 120) + 1;
            state.items.push({
                id: state.items.length + 1,
                name: 'name' + (state.items.length + 1),
                startWeight: w,
                currentWeight: w - Math.floor(Math.random() * 10) + 1,
                vzv: 1,
                isYoung: false
            });
        },
        deleteData: (state) => {
            state.items.pop();
        },
        returnDefault: (state) => {
            state.items = defaultState.items;
        },
        setFilter: (state, action) => {
            if (action.payload.name === 'isOnlyOld') {
                state.filters.isOnlyOld = action.payload.value;
            } else if (action.payload.name === 'isOneVzv') {
                state.filters.isOneVzv = action.payload.value;
                state.filters.vzvNum = action.payload.vzvNum;
            }
        },
        clearFilter: (state) => {
            state.filters = defaultState.filters;
        }
    }
});

// Action creators are generated for each case reducer function
export const {
    addNewData,
    deleteData,
    returnDefault,
    setFilter,
    clearFilter
} = canvasSlice.actions;

export default canvasSlice.reducer;
