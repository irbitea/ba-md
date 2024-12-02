import { useDispatch } from 'react-redux';
import { AppDispatch } from './store/store.ts';
import { useEffect } from 'react';
import { fetchMenuItems } from './store/adapters/fetchMenuItems.ts';
import { Route, Routes } from 'react-router';
import Items from './components/MenuItems/Items.tsx';
import Cart from './components/Cart/Cart.tsx';
import Navigation from './components/Navigation/Navigation.tsx';

function App() {
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(fetchMenuItems());
    }, []);

    return (
        <>
            <Navigation />
            <Routes>
                <Route path="/" element={<Items />} />
                <Route path="/cart" element={<Cart />} />
            </Routes>
        </>
    );
}

export default App;
