import { emptySplitApi } from "./baseApi";
import { BaseResponse } from "../types/responses/baseResponse";
import { GetPricesByProductIdsResponse, SubscriptionResponse, SubscriptionsResponse } from "../types/responses/subscriptionResponses";

interface SubscribeRequestData {
    url: string,
}
interface UnsubscribeRequestData {
    id: string,
}
interface GetPricesByProductIdsRequestData {
    product_ids: string[],
}

export const subscriptionApiSlice = emptySplitApi.injectEndpoints({
    endpoints: (builder) => ({
        subscribe: builder.mutation<BaseResponse, SubscribeRequestData>({
            query: (body: SubscribeRequestData) => ({
                url: `/api/subscribe`,
                method: 'POST',
                credentials: 'include',
                body
            }),
            invalidatesTags : ['Subscriptions'],
        }),
        unsubscribe: builder.mutation<BaseResponse, UnsubscribeRequestData>({
            query: (body: UnsubscribeRequestData) => ({
                url: `/api/unsubscribe`,
                method: 'PUT',
                credentials: 'include',
                body
            }),
            invalidatesTags : ['Subscriptions'],
        }),
        getSubscriptions: builder.query<SubscriptionsResponse, void>({
            query: () => ({
                url: `/api/subscriptions`,
                method: 'GET',
                credentials: 'include',
            }),
            providesTags : ['Subscriptions'],
        }),
        getSubscription: builder.query<SubscriptionResponse, {id: string}>({
            query: ({id}: {id: string}) => ({
                url: `/api/subscription/${id}`,
                credentials: 'include',
                method: 'GET',
            }),
            providesTags: ['Subscriptions'],
        }),
        getPricesByProductIds: builder.query<GetPricesByProductIdsResponse, GetPricesByProductIdsRequestData>({
            query: (body: GetPricesByProductIdsRequestData) => ({
                url: `/api/products/prices`,
                credentials: 'include',
                method: 'POST',
                body
            }),
            providesTags: ['Subscriptions'],
        }),
    })
});

export const {
    useSubscribeMutation,
    useUnsubscribeMutation,
    useGetSubscriptionsQuery,
    useGetSubscriptionQuery,
    useGetPricesByProductIdsQuery,
} = subscriptionApiSlice;