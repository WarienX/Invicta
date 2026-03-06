import { createSlice } from "@reduxjs/toolkit";
import { createRoleAction, getRolesListAction } from "../Actions";

export type Role = {
    id: number;
    name: string;
    monthly_salary: number;
    productive_hours: number;
    cost_per_hour: number;
    created_at: Date;
}

export const roleSlice = createSlice({
    name: "roles",
    initialState: {
        list: [] as Role[],
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
        builder.addCase(getRolesListAction.fulfilled, (state, action) => {
            const { list } = action.payload;
            state.list = list;
        })
        builder.addCase(createRoleAction.fulfilled, (state, action) => {
            const { list } = action.payload;
            state.list = list;
        })
    }
})

export const rolesReducer = roleSlice.reducer;