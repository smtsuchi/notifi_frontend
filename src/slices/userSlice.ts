import { emptySplitApi } from "./baseApi";
import { BaseResponse } from "../types/responses/baseResponse";
import { UserResponse } from "../types/responses/userResponses";
import { NotificationMethodType } from "../types/entities/UserType";

interface UpdateNotificationMethodRequestData {
    notification_method: NotificationMethodType,
}
interface UpdateNotifyOnDropOnlyRequestData {
    notify_on_drop_only: boolean,
}
interface EditProfileRequestData {
    username: string,
    email: string,
    phone: string,
}

export const userApiSlice = emptySplitApi.injectEndpoints({
    endpoints: (builder) => ({
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
        editProfile: builder.mutation<UserResponse, EditProfileRequestData>({
            query: (body: EditProfileRequestData) => ({
                url: `/api/user/profile`,
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
    useEditProfileMutation,
} = userApiSlice;