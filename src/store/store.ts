import { configureStore } from '@reduxjs/toolkit';
import menuReducer from './menuSlice.ts';
import cartReducer from './cartSlice.ts';

export const store = configureStore({
    reducer: {
        menu: menuReducer,
        cart: cartReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
