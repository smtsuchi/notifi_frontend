import { ProductType } from "./ProductType";

export interface SubscriptionType {
    id: string;
    user_id: string;
    product_id: string;
    subscription_date: string;
    product: ProductType;
}