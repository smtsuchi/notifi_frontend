export interface ProductType {
    id: string;
    url: string;
    product_name: string;
    image_url: string;
    description: string;
    last_checked: string;
    date_created: string;
    last_updated?: string;
    subscriber_count: number;
    current_price: number;
    lowest_recorded_price: number;
}