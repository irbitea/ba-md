import styles from './styles/Cart.module.css';

import { useDispatch, useSelector } from 'react-redux';
import { Button, Flex, message, Typography } from 'antd';
import CartTable from './CartTable.tsx';
import { clearCart, itemCount, itemTotalPrice } from '../../store/cartSlice.ts';

const { Title } = Typography;

const Cart = () => {
    const dispatch = useDispatch();
    const cartItemCount = useSelector(itemCount);
    const totalPrice = useSelector(itemTotalPrice);
    const [messageApi, contextHolder] = message.useMessage();

    const success = () => {
        messageApi.open({
            type: 'success',
            content: 'Thank you for purchasing! Your order is on the way!',
        });
        dispatch(clearCart());
    };

    const taxes = totalPrice * 0.21;
    const subtotal = totalPrice - taxes;

    return (
        <div className={styles.cartContainer}>
            {contextHolder}
            <Title>Cart ({cartItemCount})</Title>
            <Flex gap="20px" wrap>
                <CartTable />
                <div className={styles.paymentInfo}>
                    <Title level={3} className={styles.paymentHeading}>
                        Payment info
                    </Title>
                    <Flex className={styles.paymentRow} justify="space-between">
                        <span>Subtotal:</span>
                        <span>{subtotal.toFixed(2)} €</span>
                    </Flex>
                    <Flex className={styles.paymentRow} justify="space-between">
                        <span>Taxes:</span>
                        <span>{taxes.toFixed(2)} €</span>
                    </Flex>
                    <Flex className={styles.paymentTotal} justify="space-between">
                        <span>Total:</span>
                        <span>{totalPrice.toFixed(2)} €</span>
                    </Flex>
                    <Button
                        type="primary"
                        block
                        size="large"
                        disabled={cartItemCount === 0}
                        className={styles.checkoutButton}
                        onClick={success}
                    >
                        Proceed to checkout
                    </Button>
                </div>
            </Flex>
        </div>
    );
};

export default Cart;
