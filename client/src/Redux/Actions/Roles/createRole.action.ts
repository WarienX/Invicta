import { createAsyncThunk } from "@reduxjs/toolkit";
import { api, axiosErrHandle, axiosResHandle } from "../../../lib";

type createRoleBody = {
    name: string;
    monthly_salary: number;
    productive_hours: number;
}

const createRole = (body: createRoleBody) => api.post("/role", body);

export const createRoleAction = createAsyncThunk(
    "/role/create",
    async (params: createRoleBody, { rejectWithValue }) => {
        try {
            const resp = await createRole(params);
            return axiosResHandle(resp);
        } catch (err) {
            const error = axiosErrHandle(err);
            return rejectWithValue(error);
        }
    }
)