import styles from './styles/ItemDetails.module.css';

import { useSelector } from 'react-redux';
import { RootState } from '../../store/store.ts';
import { useState } from 'react';
import { IMenuItem } from '../../store/models/IMenuItem.ts';
import { Badge, Card, Col, Flex, Row, Spin, Typography } from 'antd';
import ItemDetails from './ItemDetails.tsx';
import { LoadingOutlined } from '@ant-design/icons';

const { Meta } = Card;
const { Title } = Typography;

function Items() {
    const { items, loading } = useSelector((state: RootState) => state.menu);
    const [isOpen, setIsOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState<IMenuItem | null>(null);

    const showDrawer = (item: IMenuItem) => {
        setSelectedItem(item);
        setIsOpen(true);
    };

    const onClose = () => {
        setIsOpen(false);
        setSelectedItem(null);
    };

    if (loading) {
        return (
            <Flex align="center" gap="middle" justify="center" className={styles.spinner}>
                <Spin indicator={<LoadingOutlined spin />} size="large" />
            </Flex>
        );
    }

    return (
        <div className={styles.itemContainer}>
            <Title>Menu</Title>
            <Row gutter={[24, 24]} justify="start">
                {items.map((item) => (
                    <Col key={item.id} xs={24} sm={12} md={8} lg={4} xl={4}>
                        <Badge.Ribbon text={`${item.rating} ☆`} color="gold">
                            <Card
                                hoverable
                                style={{ width: '100%' }}
                                cover={<img alt={item.title} src={item.img} />}
                                onClick={() => showDrawer(item)}
                                size="small"
                            >
                                <Meta title={item.title} description={`${item.price.toFixed(2)} €`} />
                            </Card>
                        </Badge.Ribbon>
                    </Col>
                ))}
            </Row>
            {selectedItem && <ItemDetails selectedItem={selectedItem} onClose={onClose} isOpen={isOpen} />}
        </div>
    );
}

export default Items;
