import { emptySplitApi } from "./baseApi";
import { LoginResponse } from "../types/responses/authResponses";
import { BaseResponse } from "../types/responses/baseResponse";

interface SignUpData {
    username: string,
    password: string,
    email: string,
    phone: string
}

export const authApiSlice = emptySplitApi.injectEndpoints({
    endpoints: (builder) => ({
        signup: builder.mutation<BaseResponse, SignUpData>({
            query: (body: SignUpData) => ({
                url: `/auth/signup`,
                method: 'POST',
                body
            }),
            invalidatesTags: ['Auth'],
        }),
        login: builder.mutation<LoginResponse, {username: string, password: string}>({
            query: ({username, password}: {username: string, password: string}) => ({
                url: `/auth/login`,
                method: 'POST',
                headers: {Authorization: `Basic ${btoa(`${username}:${password}`)}`},
            }),
            invalidatesTags: ['Auth', 'Subscriptions', 'User'],
        }),
        logout: builder.mutation<BaseResponse, string>({
            query: (accessToken: string) => ({
                url: `/auth/logout`,
                method: 'POST',
                headers: {
                    "Authorization": `Bearer ${accessToken}`,
                },
            }),
            invalidatesTags: ['Auth', 'Subscriptions', 'User'],
        }),
    })
});

export const {
    useLoginMutation,
    useLogoutMutation,
    useSignupMutation,
} = authApiSlice;