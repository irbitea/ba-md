import styles from './styles/Cart.module.css';
import { ICartItem } from '../../store/models/IMenuItem.ts';
import { Button, InputNumber, Space } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

interface ICartItemProps {
    item: ICartItem;
    onQuantityChange: (value: number | null, id: string) => void;
    onRemove: (id: string) => void;
}

function CartItem({ item, onQuantityChange, onRemove }: ICartItemProps) {
    return (
        <Space className={styles.cartItemWrapper}>
            <div>
                <div>{item.addedItem.title}</div>
                <div>{item.addedItem.price.toFixed(2)} €</div>
            </div>
            <Space>
                <InputNumber
                    min={1}
                    value={item.quantity}
                    onChange={(value) => onQuantityChange(value, item.addedItem.id)}
                    style={{ width: 50 }}
                />
                <Button type="text" danger onClick={() => onRemove(item.addedItem.id)}>
                    <DeleteOutlined />
                </Button>
            </Space>
        </Space>
    );
}

export default CartItem;
