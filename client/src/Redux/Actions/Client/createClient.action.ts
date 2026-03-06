import { createAsyncThunk } from "@reduxjs/toolkit";
import { api, axiosErrHandle, axiosResHandle } from "../../../lib";

type createClientBody = {
    name: string;
}

const createClient = (body: createClientBody) => api.post("/client", body);

export const createClientAction = createAsyncThunk(
    "/client/create",
    async (params: createClientBody, { rejectWithValue }) => {
        try {
            const resp = await createClient(params);
            return axiosResHandle(resp);
        } catch (err) {
            const error = axiosErrHandle(err);
            return rejectWithValue(error);
        }
    }
)