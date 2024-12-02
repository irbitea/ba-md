import { createSlice } from '@reduxjs/toolkit';
import { RootState } from './store.ts';
import { ICartItem } from './models/IMenuItem.ts';

interface CartState {
    cartItems: ICartItem[];
}

const initialState: CartState = {
    cartItems: [],
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem: (state, action) => {
            const { addedItem, quantity } = action.payload;
            const existingItem = state.cartItems.find((item) => item.addedItem.id === addedItem.id);

            if (existingItem) {
                existingItem.quantity += quantity;
            } else {
                state.cartItems.push({ addedItem, quantity, key: addedItem.id });
            }
        },
        removeItem: (state, action) => {
            state.cartItems = state.cartItems.filter((item) => item.addedItem.id !== action.payload.id);
        },
        updateItemQuantity: (state, action) => {
            const { addedItem, quantity } = action.payload;
            const item = state.cartItems.find((item) => item.addedItem.id === addedItem.id);
            if (item) {
                item.quantity = quantity;
            }
        },
        clearCart: (state) => {
            state.cartItems = [];
        },
    },
});

export const itemCount = (state: RootState) => state.cart.cartItems.reduce((total, item) => total + item.quantity, 0);
export const itemTotalPrice = (state: RootState) =>
    state.cart.cartItems.reduce((sum, item) => sum + item.addedItem.price * item.quantity, 0);

export const { addItem, removeItem, updateItemQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
