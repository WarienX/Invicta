import { createAsyncThunk } from "@reduxjs/toolkit";
import { api, axiosErrHandle, axiosResHandle } from "../../../lib";

const getClientsList = () => api.get("/client");

export const getClientsListAction = createAsyncThunk(
    "/client/get",
    async (_, { rejectWithValue }) => {
        try {
            const resp = await getClientsList();
            return axiosResHandle(resp);
        } catch (err) {
            const error = axiosErrHandle(err);
            return rejectWithValue(error);
        }
    }
)