import { createAsyncThunk } from "@reduxjs/toolkit";
import { api, axiosErrHandle, axiosResHandle } from "../../../lib";

type getTimeEntriesReq = { 
    yearMonth?: string; 
    client_id?: string;
}

const getTimeEntriesList = (body: getTimeEntriesReq) => api.get(`/time?clientId=${body.client_id ?? ''}&month=${body.yearMonth ?? ''}`);

export const getTimeEntriesListAction = createAsyncThunk(
    "/time/entries/get",
    async (params: getTimeEntriesReq, { rejectWithValue }) => {
        try {
            const resp = await getTimeEntriesList(params);
            return axiosResHandle(resp);
        } catch (err) {
            const error = axiosErrHandle(err);
            return rejectWithValue(error);
        }
    }
)