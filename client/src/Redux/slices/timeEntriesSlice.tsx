import { createSlice } from "@reduxjs/toolkit";
import { addTimeEntryAction, getTimeEntriesListAction } from "../Actions";
import { Client } from "./clientSlice";
import { Role } from "./roleSlice";

export type TimeEntries = {
    id: number;
    client_id: number;
    role_id: number;
    total_hours: number;
    entry_date: string;
    created_at: Date;
    clientData?: Client;
    roleData?: Role;
}

export const timeEntriesSlice = createSlice({
    name: "time_entries",
    initialState: {
        list: [] as TimeEntries[],
        isLoading: false,
        isError: false,
        isCreating: false,
    },
    reducers: {
        saveTimeEntriesList: (state, action) => {
            state.list = action.payload
        }
    },

    extraReducers: (builder) => {
        builder.addCase(getTimeEntriesListAction.fulfilled, (state, action) => {
            const { list } = action.payload;
            state.list = list;
        })
        builder.addCase(addTimeEntryAction.fulfilled, (state, action) => {
            const { list } = action.payload;
            state.list = list;
        })
    }
})

export const timeEntriesReducer = timeEntriesSlice.reducer;