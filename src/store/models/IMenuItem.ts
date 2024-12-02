export interface IMenuItem {
    id: string;
    category: string;
    description: string;
    img: string;
    price: number;
    rating: number;
    title: string;
    toppings: string[];
}

export interface ICartItem {
    addedItem: IMenuItem;
    quantity: number;
    key: string;
}
