
import { PriceType } from "../entities/PriceType";
import { SubscriptionType } from "../entities/SubscriptionType";
import { BaseResponse } from "./baseResponse";

export interface SubscriptionsResponse extends BaseResponse {
    data: SubscriptionType[],
}

export interface SubscriptionResponse extends BaseResponse {
    data: SubscriptionType,
}

export interface GetPricesByProductIdsResponse extends BaseResponse {
    data: {
        [productId: string]: PriceType;
    },
}
