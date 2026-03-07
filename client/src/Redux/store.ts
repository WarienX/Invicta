import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { clientReducer, revenueReducer, rolesReducer, timeEntriesReducer } from "./slices";

const store = configureStore({
    reducer: {
        revenue: revenueReducer,
        roles: rolesReducer,
        client: clientReducer,
        time_entries: timeEntriesReducer
    },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export default store;