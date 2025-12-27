import { configureStore } from "@reduxjs/toolkit";
import { typingSessionListener } from "./middleware/typingSessionListener";
import typingSessionReducer from "./reducers/typingSessionReducer";

export const store = configureStore({
    reducer: {
        typingSession: typingSessionReducer
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().prepend(typingSessionListener.middleware)
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch