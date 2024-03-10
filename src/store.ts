import { configureStore } from "@reduxjs/toolkit";
import { emptySplitApi } from "./slices/baseApi";

export const store = configureStore({
    reducer: {
        [emptySplitApi.reducerPath]: emptySplitApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(emptySplitApi.middleware),
})