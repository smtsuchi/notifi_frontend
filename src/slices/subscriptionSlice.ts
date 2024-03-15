import { emptySplitApi } from "./baseApi";
import { BaseResponse } from "../types/responses/baseResponse";
import { GetPricesByProductIdResponse, GetPricesByProductIdsResponse, SubscriptionResponse, SubscriptionsResponse } from "../types/responses/subscriptionResponses";

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
        subscribe: builder.mutation<BaseResponse, {body: SubscribeRequestData, accessToken: string}>({
            query: ({body, accessToken}:{body: SubscribeRequestData, accessToken: string}) => ({
                url: `/api/subscribe`,
                method: 'POST',
                credentials: 'include',
                headers: {
                    "Authorization": `Bearer ${accessToken}`,
                    "Content-Type": 'application/json'
                },
                body
            }),
            invalidatesTags : ['Subscriptions'],
        }),
        unsubscribe: builder.mutation<BaseResponse, {body: UnsubscribeRequestData, accessToken: string}>({
            query: ({body, accessToken}:{body: UnsubscribeRequestData, accessToken: string}) => ({
                url: `/api/unsubscribe`,
                method: 'PUT',
                credentials: 'include',
                headers: {
                    "Authorization": `Bearer ${accessToken}`,
                    "Content-Type": 'application/json'
                },
                body
            }),
            invalidatesTags : ['Subscriptions'],
        }),
        getSubscriptions: builder.query<SubscriptionsResponse, string>({
            query: (accessToken: string) => ({
                url: `/api/subscriptions`,
                method: 'GET',
                credentials: 'include',
                headers: {
                    "Authorization": `Bearer ${accessToken}`,
                },
            }),
            providesTags : ['Subscriptions'],
        }),
        getSubscription: builder.query<SubscriptionResponse, {id: string, accessToken: string}>({
            query: ({id, accessToken}: {id: string, accessToken: string}) => ({
                url: `/api/subscription/${id}`,
                credentials: 'include',
                method: 'GET',
                headers: {
                    "Authorization": `Bearer ${accessToken}`,
                },
            }),
            providesTags: ['Subscriptions'],
        }),
        getPricesByProductIds: builder.query<GetPricesByProductIdsResponse, {body: GetPricesByProductIdsRequestData, accessToken: string}>({
            query: ({body, accessToken}: {body: GetPricesByProductIdsRequestData, accessToken: string}) => ({
                url: `/api/products/prices`,
                credentials: 'include',
                method: 'POST',
                headers: {
                    "Authorization": `Bearer ${accessToken}`,
                    "Content-Type": 'application/json'
                },
                body
            }),
            providesTags: ['Subscriptions'],
        }),
        getPricesByProductId: builder.query<GetPricesByProductIdResponse, {productId: string, accessToken: string}>({
            query: ({productId, accessToken}: {productId: string, accessToken: string}) => ({
                url: `/api/products/prices/${productId}`,
                credentials: 'include',
                method: 'GET',
                headers: {
                    "Authorization": `Bearer ${accessToken}`,
                },
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
    useGetPricesByProductIdQuery,
} = subscriptionApiSlice;