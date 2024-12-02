import './index.css';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { Provider } from 'react-redux';
import { store } from './store/store.ts';
import { BrowserRouter } from 'react-router';

const basename = "/ba-md";

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <Provider store={store}>
            <BrowserRouter basename={basename}>
                <App />
            </BrowserRouter>
        </Provider>
    </StrictMode>,
);
