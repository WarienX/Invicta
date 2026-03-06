import { createSlice } from "@reduxjs/toolkit";
import { getClientProfitsAction } from "../Actions";

type Profitability = {
    client_name: string;
    revenue: number;
    actual_hours: number;
    delivery_cost: number;
    gross_margin: number;
    margin_percent: number;
    variance_percent: number | null;
};

export const revenueSlice = createSlice({
    name: "revenue",
    initialState: {
        list: [] as Profitability[]
    },
    reducers: {
        saveRevenueList: (state, action) => {
            state.list = action.payload
        }
    },

    extraReducers: (builder) => {
        builder.addCase(getClientProfitsAction.fulfilled, (state, action) => {
            const { list } = action.payload;
            state.list = list;
        })
    }
})

export const revenueReducer = revenueSlice.reducer;