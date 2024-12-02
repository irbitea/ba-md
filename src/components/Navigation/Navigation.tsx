import styles from './styles/Navigation.module.css';

import { Button } from 'antd';
import { Link, useNavigate } from 'react-router';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { itemCount } from '../../store/cartSlice.ts';
import CartDrawer from '../Cart/CartDrawer.tsx';

function Navigation() {
    const navigate = useNavigate();
    const cartItemCount = useSelector(itemCount);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const toggleDrawer = () => {
        setIsDrawerOpen(!isDrawerOpen);
    };

    const handleMenuNavigation = () => {
        setIsDrawerOpen(false);
        navigate('/cart');
    };

    return (
        <header className={styles.header}>
            <div className={styles.logo}>
                <Link to="/" className={styles.logoLink}>
                    BigBurgers
                </Link>
            </div>

            <nav className={styles.nav}>
                <ul className={styles.navList}>
                    <li>
                        <Button size="large" type="text" onClick={() => navigate('/')}>
                            Menu
                        </Button>
                    </li>
                    <li>
                        <Button size="large" type="text" onClick={toggleDrawer}>
                            Cart ({cartItemCount})
                        </Button>
                    </li>
                </ul>
            </nav>
            <CartDrawer isOpen={isDrawerOpen} toggleDrawer={toggleDrawer} onClose={handleMenuNavigation} />
        </header>
    );
}

export default Navigation;
