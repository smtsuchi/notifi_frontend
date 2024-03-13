import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const emptySplitApi = createApi({
    tagTypes: [
        'Auth',
        'Subscriptions',
        'User'
    ],
    baseQuery: fetchBaseQuery({
        baseUrl: `${BACKEND_URL}`,
        credentials: 'include',
    }),
    endpoints: () => ({})
});