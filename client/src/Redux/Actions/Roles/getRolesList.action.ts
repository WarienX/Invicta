import { createAsyncThunk } from "@reduxjs/toolkit";
import { api, axiosErrHandle, axiosResHandle } from "../../../lib";

const getRolesList = () => api.get("/role");

export const getRolesListAction = createAsyncThunk(
    "/roles/get",
    async (_, { rejectWithValue }) => {
        try {
            const resp = await getRolesList();
            return axiosResHandle(resp);
        } catch (err) {
            const error = axiosErrHandle(err);
            return rejectWithValue(error);
        }
    }
)