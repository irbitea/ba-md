import styles from './styles/ItemDetails.module.css';

import { Button, Drawer, Flex, InputNumber } from 'antd';
import { IMenuItem } from '../../store/models/IMenuItem.ts';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store/store.ts';
import { addItem } from '../../store/cartSlice.ts';

export interface IItemDetails {
    selectedItem: IMenuItem;
    onClose: () => void;
    isOpen: boolean;
}

function ItemDetails({ selectedItem, onClose, isOpen }: IItemDetails) {
    const dispatch = useDispatch<AppDispatch>();
    const [quantity, setQuantity] = useState<number | null>(1);

    const handleAddToCart = (addedItem: IMenuItem) => {
        dispatch(addItem({ addedItem, quantity }));
        onClose();
    };

    return (
        <Drawer
            title={selectedItem.title}
            placement="right"
            closable={true}
            onClose={() => {
                onClose();
                setQuantity(1);
            }}
            open={isOpen}
            footer={
                <Flex gap="middle" align="center" className={styles.flexContainer}>
                    <InputNumber min={1} max={20} defaultValue={1} value={quantity} onChange={(value) => setQuantity(value)} />
                    <Button type="primary" block onClick={() => handleAddToCart(selectedItem)}>
                        Add to Cart
                    </Button>
                </Flex>
            }
        >
            <div>
                <img src={selectedItem.img} alt={selectedItem.title} className={styles.drawerImage} />
                <p className={styles.drawerPrice}>{`${selectedItem.price.toFixed(2)} €`}</p>
                <p>{selectedItem.description}</p>

                {selectedItem.toppings && selectedItem.toppings.length > 0 && (
                    <div>
                        Toppings:
                        <ul className={styles.drawerToppings}>
                            {selectedItem.toppings.map((topping, index) => (
                                <li key={index}>{topping}</li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </Drawer>
    );
}

export default ItemDetails;
