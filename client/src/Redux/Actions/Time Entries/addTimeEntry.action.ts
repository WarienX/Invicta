import { createAsyncThunk } from "@reduxjs/toolkit";
import { api, axiosErrHandle, axiosResHandle } from "../../../lib";

type addTimeEntryReq = {
    clientId: number;
    role_id: number;
    total_hours: number;
    entry_date: string;
}

const addTimeEntry = (body: addTimeEntryReq) => api.post("/time", body);

export const addTimeEntryAction = createAsyncThunk(
    "/time/entries/create",
    async (params: addTimeEntryReq, { rejectWithValue }) => {
        try {
            const resp = await addTimeEntry(params);
            return axiosResHandle(resp);
        } catch (err) {
            const error = axiosErrHandle(err);
            return rejectWithValue(error);
        }
    }
)