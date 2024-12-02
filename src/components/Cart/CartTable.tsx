import styles from './styles/Cart.module.css';
import { removeItem, updateItemQuantity } from '../../store/cartSlice.ts';
import { Button, InputNumber, Table } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store.ts';
import { ICartItem } from '../../store/models/IMenuItem.ts';

function CartTable() {
    const dispatch = useDispatch();
    const cartItems = useSelector((state: RootState) => state.cart.cartItems);

    const handleQuantityChange = (value: number | null, id: string) => {
        const item = cartItems.find((item) => item.addedItem.id === id);
        if (item) {
            dispatch(updateItemQuantity({ addedItem: item.addedItem, quantity: value }));
        }
    };

    const handleRemoveItem = (id: string) => {
        dispatch(removeItem({ id }));
    };

    const columns = [
        {
            title: 'Product',
            key: 'img',
            render: (record: ICartItem) => <img src={record.addedItem.img} alt={record.addedItem.title} className={styles.productImage} />,
        },
        {
            title: 'Title',
            key: 'name',
            render: (record: ICartItem) => {
                return `${record.addedItem.title}`;
            },
        },
        {
            title: 'Price €',
            key: 'price',
            render: (record: ICartItem) => {
                return `${record.addedItem.price.toFixed(2)}`;
            },
        },
        {
            title: 'Quantity',
            dataIndex: 'quantity',
            key: 'quantity',
            render: (quantity: number, record: ICartItem) => (
                <InputNumber min={1} value={quantity} onChange={(value) => handleQuantityChange(value, record.addedItem.id)} />
            ),
        },
        {
            title: 'Total price €',
            key: 'total',
            render: (record: ICartItem) => {
                const total = record.quantity * record.addedItem.price;
                return `${total.toFixed(2)}`;
            },
        },
        {
            title: 'Action',
            key: 'action',
            render: (record: ICartItem) => (
                <Button type="text" danger icon={<DeleteOutlined />} onClick={() => handleRemoveItem(record.addedItem.id)}>
                    Remove
                </Button>
            ),
        },
    ];

    return <Table dataSource={cartItems} columns={columns} pagination={false} scroll={{ x: 400 }} className={styles.cartDetails} />;
}

export default CartTable;
