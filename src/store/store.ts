import { configureStore } from "@reduxjs/toolkit";
import unprocessedTokensReducer from "./reducers/unprocessedTokensReducer";
import processedTokensReducer from "./reducers/processedTokensReducer";
import { unprocessedTokensListener } from "./middleware/unprocessedTokensListener";

export const store = configureStore({
    reducer: {
        unprocessedTokens: unprocessedTokensReducer,
        processedTokens: processedTokensReducer,
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().prepend(unprocessedTokensListener.middleware)
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch