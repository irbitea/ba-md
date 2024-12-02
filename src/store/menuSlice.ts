import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IMenuItem } from './models/IMenuItem';
import { fetchMenuItems } from './adapters/fetchMenuItems';

interface MenuState {
    items: IMenuItem[];
    loading: boolean;
}

const initialState: MenuState = {
    items: [],
    loading: false,
};

const menuSlice = createSlice({
    name: 'menu',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchMenuItems.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchMenuItems.fulfilled, (state, action: PayloadAction<IMenuItem[]>) => {
            state.items = action.payload;
            state.loading = false;
        });
        builder.addCase(fetchMenuItems.rejected, (state) => {
            state.loading = false;
        });
    },
});

export default menuSlice.reducer;
