import { emptySplitApi } from "./baseApi";
import { EndpointBuilder, BaseQueryFn, FetchArgs, FetchBaseQueryError, FetchBaseQueryMeta } from "@reduxjs/toolkit/query";
import { BaseResponse } from "../types/responses/baseResponse";
import { NotificationMethodType } from "../types/entities/UserType";

interface UpdateNotificationMethodRequestData {
    notification_method: NotificationMethodType,
}
interface UpdateNotifyOnDropOnlyRequestData {
    notify_on_drop_only: boolean,
}

export const userApiSlice = emptySplitApi.injectEndpoints({
    endpoints: (builder: EndpointBuilder<BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError, unknown, FetchBaseQueryMeta>, "Auth", "api">) => ({
        updateNotificationMethod: builder.mutation<BaseResponse, UpdateNotificationMethodRequestData>({
            query: (body: UpdateNotificationMethodRequestData) => ({
                url: `/api/user/notification-method`,
                method: 'PUT',
                credentials: 'include',
                body
            }),
            invalidatesTags: ['User'],
        }),
        updateNotifyOnDropOnly: builder.mutation<BaseResponse, UpdateNotifyOnDropOnlyRequestData>({
            query: (body: UpdateNotifyOnDropOnlyRequestData) => ({
                url: `/api/user/notify-on-drop-only`,
                method: 'PUT',
                credentials: 'include',
                body
            }),
            invalidatesTags: ['User'],
        }),
    })
});

export const {
    useUpdateNotifyOnDropOnlyMutation,
    useUpdateNotificationMethodMutation,
} = userApiSlice;