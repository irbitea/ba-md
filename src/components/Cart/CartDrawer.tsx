import { Button, Drawer, List, message, Space } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store.ts';
import { clearCart, itemCount, removeItem, updateItemQuantity } from '../../store/cartSlice.ts';
import CartItem from './CartItem.tsx';

interface ICartDrawerProps {
    isOpen: boolean;
    onClose: () => void;
    toggleDrawer: () => void;
}

function CartDrawer({ isOpen, onClose, toggleDrawer }: ICartDrawerProps) {
    const dispatch = useDispatch();
    const cartItems = useSelector((state: RootState) => state.cart.cartItems);
    const cartItemCount = useSelector(itemCount);
    const [messageApi, contextHolder] = message.useMessage();

    const success = () => {
        messageApi.open({
            type: 'success',
            content: 'Thank you for purchasing! Your order is on the way!',
        });
        dispatch(clearCart());
        toggleDrawer();
    };

    const handleQuantityChange = (value: number | null, id: string) => {
        const item = cartItems.find((item) => item.addedItem.id === id);
        if (item) {
            dispatch(updateItemQuantity({ addedItem: item.addedItem, quantity: value }));
        }
    };

    const handleRemoveItem = (id: string) => {
        dispatch(removeItem({ id }));
    };

    const total = cartItems.reduce((total, item) => total + item.quantity * item.addedItem.price, 0).toFixed(2);

    return (
        <>
            {contextHolder}
            <Drawer
                title={`Cart (${cartItemCount})`}
                placement="right"
                onClose={toggleDrawer}
                open={isOpen}
                footer={
                    <Space
                        direction="vertical"
                        style={{
                            width: '100%',
                            textAlign: 'center',
                            paddingBottom: '16px',
                        }}
                    >
                        <div style={{ textAlign: 'right', padding: '0 16px', fontWeight: 'bold' }}>Total: {total} €</div>
                        <Button block onClick={() => onClose()}>
                            View cart
                        </Button>
                        <Button type="primary" block onClick={success} disabled={cartItemCount === 0}>
                            Proceed to checkout
                        </Button>
                    </Space>
                }
            >
                {cartItems.length === 0 ? (
                    <p>Your cart is empty!</p>
                ) : (
                    <List
                        dataSource={cartItems}
                        renderItem={(item) => (
                            <CartItem
                                key={item.addedItem.id}
                                item={item}
                                onQuantityChange={handleQuantityChange}
                                onRemove={handleRemoveItem}
                            />
                        )}
                    />
                )}
            </Drawer>
        </>
    );
}

export default CartDrawer;
