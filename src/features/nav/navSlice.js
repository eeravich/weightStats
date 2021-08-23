import { createSlice } from '@reduxjs/toolkit';

import defaultState from './defaultState';

export const navSlice = createSlice({
    name: 'nav',
    initialState: defaultState,
    reducers: {
        changeValue: (state, action) => {
            state.currentPage = action.payload;
        }
    }
});

export const { changeValue } = navSlice.actions;

export default navSlice.reducer;
