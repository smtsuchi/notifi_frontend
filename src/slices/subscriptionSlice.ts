import { emptySplitApi } from "./baseApi";
import { EndpointBuilder, BaseQueryFn, FetchArgs, FetchBaseQueryError, FetchBaseQueryMeta } from "@reduxjs/toolkit/query";
import { BaseResponse } from "../types/responses/baseResponse";
import { SubscriptionResponse, SubscriptionsResponse } from "../types/responses/subscriptionResponses";

interface SubscribeRequestData {
    url: string,
}
interface UnsubscribeRequestData {
    id: string,
}

export const subscriptionApiSlice = emptySplitApi.injectEndpoints({
    endpoints: (builder: EndpointBuilder<BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError, unknown, FetchBaseQueryMeta>, "Auth", "api">) => ({
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
            providesTags: ['Subscription'],
        }),
    })
});

export const {
    useSubscribeMutation,
    useUnsubscribeMutation,
    useGetSubscriptionsQuery,
    useGetSubscriptionQuery,
} = subscriptionApiSlice;