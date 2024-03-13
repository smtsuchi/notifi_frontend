import { emptySplitApi } from "./baseApi";
import { EndpointBuilder, BaseQueryFn, FetchArgs, FetchBaseQueryError, FetchBaseQueryMeta } from "@reduxjs/toolkit/query";
import { LoginResponse } from "../types/responses/authResponses";
import { BaseResponse } from "../types/responses/baseResponse";

interface SignUpData {
    username: string,
    password: string,
    email: string,
    phone: string
}

export const authApiSlice = emptySplitApi.injectEndpoints({
    endpoints: (builder: EndpointBuilder<BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError, unknown, FetchBaseQueryMeta>, "Auth", "api">) => ({
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
            invalidatesTags: ['Auth'],
        }),
        logout: builder.mutation<BaseResponse, void>({
            query: () => ({
                url: `/auth/logout`,
                method: 'POST',
            }),
            invalidatesTags: ['Auth'],
        }),
    })
});

export const {
    useLoginMutation,
    useLogoutMutation,
    useSignupMutation,
} = authApiSlice;