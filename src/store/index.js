import { configureStore } from '@reduxjs/toolkit';
import canvasReducer from '../features/canvas/canvasSlice';
import navReducer from '../features/nav/navSlice';

export default configureStore({
    reducer: {
        canvas: canvasReducer,
        nav: navReducer,
    }
});
