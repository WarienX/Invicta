import { createAsyncThunk } from "@reduxjs/toolkit";
import { api, axiosErrHandle, axiosResHandle } from "../../../lib";

const getClientProfits = (body: { yearMonth: string }) => api.post("/revenue", body);

export const getClientProfitsAction = createAsyncThunk(
    "/client/profits/get",
    async (params: { yearMonth: string }, { rejectWithValue }) => {
        try {
            const resp = await getClientProfits(params);
            return axiosResHandle(resp);
        } catch (err) {
            const error = axiosErrHandle(err);
            return rejectWithValue(error);
        }
    }
)