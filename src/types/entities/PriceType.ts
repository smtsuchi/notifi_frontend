export interface PriceType {
    product_id: string;
    price_id: string;
    timestamp: string;
    amount: number;
}

export interface ProductPriceData {
    [productId: string]: PriceType[];
}