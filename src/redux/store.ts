import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import { baseApi } from "./api/baseApi";
import {
    persistReducer,
    persistStore,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from "redux-persist";

// Custom Storage Engine for Web/Vite
const createCustomStorage = () => {
    return {
        getItem(key: string) {
            return Promise.resolve(localStorage.getItem(key));
        },
        setItem(key: string, value: string) {
            return Promise.resolve(localStorage.setItem(key, value));
        },
        removeItem(key: string) {
            return Promise.resolve(localStorage.removeItem(key));
        },
    };
};

const storage = createCustomStorage();

const persistConfig = {
    key: "auth",
    storage,
};

const persistedAuthReducer = persistReducer(persistConfig, authReducer);

export const store = configureStore({
    reducer: {
        [baseApi.reducerPath]: baseApi.reducer,
        auth: persistedAuthReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }).concat(baseApi.middleware),
});

export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;