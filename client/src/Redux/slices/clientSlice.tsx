import { createSlice } from "@reduxjs/toolkit";
import { createClientAction, getClientsListAction } from "../Actions";

export type Client = {
    id: number;
    name: string;
    created_at: Date;
}

export const clientSlice = createSlice({
    name: "client",
    initialState: {
        list: [] as Client[],
        isLoading: false,
        isError: false,
        isCreating: false,
    },
    reducers: {
        saveRolesList: (state, action) => {
            state.list = action.payload
        }
    },

    extraReducers: (builder) => {
        builder.addCase(getClientsListAction.fulfilled, (state, action) => {
            const { list } = action.payload;
            state.list = list;
        })
        builder.addCase(createClientAction.fulfilled, (state, action) => {
            const { list } = action.payload;
            state.list = list;
        })
    }
})

export const clientReducer = clientSlice.reducer;