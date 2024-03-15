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
        updateNotificationMethod: builder.mutation<BaseResponse, {body:UpdateNotificationMethodRequestData, accessToken:string}>({
            query: ({body, accessToken}:{body: UpdateNotificationMethodRequestData, accessToken:string}) => ({
                url: `/api/user/notification-method`,
                method: 'PUT',
                credentials: 'include',
                headers: {
                    "Authorization": `Bearer ${accessToken}`,
                    "Content-Type": 'application/json'
                },
                body
            }),
            invalidatesTags: ['User'],
        }),
        updateNotifyOnDropOnly: builder.mutation<BaseResponse, {body:UpdateNotifyOnDropOnlyRequestData, accessToken:string}>({
            query: ({body, accessToken}:{body: UpdateNotifyOnDropOnlyRequestData, accessToken:string}) => ({
                url: `/api/user/notify-on-drop-only`,
                method: 'PUT',
                credentials: 'include',
                headers: {
                    "Authorization": `Bearer ${accessToken}`,
                    "Content-Type": 'application/json'
                },
                body
            }),
            invalidatesTags: ['User'],
        }),
        editProfile: builder.mutation<UserResponse, {body:EditProfileRequestData, accessToken:string}>({
            query: ({body, accessToken}:{body: EditProfileRequestData, accessToken:string}) => ({
                url: `/api/user/profile`,
                method: 'PUT',
                credentials: 'include',
                headers: {
                    "Authorization": `Bearer ${accessToken}`,
                    "Content-Type": 'application/json'
                },
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