import { createAsyncThunk } from '@reduxjs/toolkit';
import { IMenuItem } from '../models/IMenuItem.ts';

export const fetchMenuItems = createAsyncThunk('get/menuitems', async (): Promise<IMenuItem[]> => {
    const response = await fetch('https://ymagyn-76ef3-default-rtdb.europe-west1.firebasedatabase.app/products.json');
    return await response.json();
});
