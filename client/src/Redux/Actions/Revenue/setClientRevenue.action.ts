import { createAsyncThunk } from "@reduxjs/toolkit";
import { api, axiosErrHandle, axiosResHandle } from "../../../lib";

type setClientRevenueBody = {
    client_id: number;
    month: number;
    year: number;
    revenue: number;
    estimated_hours?: number;
}

const setClientRevenue = (body: setClientRevenueBody) => api.put("/client/revenue/monthly", body);

export const setClientRevenueAction = createAsyncThunk(
    "/client/revenue/set",
    async (params: setClientRevenueBody, { rejectWithValue }) => {
        try {
            const resp = await setClientRevenue(params);
            return axiosResHandle(resp);
        } catch (err) {
            const error = axiosErrHandle(err);
            return rejectWithValue(error);
        }
    }
)