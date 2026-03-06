import axios, { AxiosError, AxiosResponse } from "axios";

const axiosResHandle = <T>(res: AxiosResponse<T>) => res.data;
const axiosResErr = <T>(err: AxiosError<T>) => {
    console.log(err.message);
    // @ts-ignore
    if (err.response?.data?.message) {
        // @ts-ignore
        return err.response?.data.message;
    }
    return err.message;
};
const axiosResErrNoRes = <T>(err: AxiosError<T>) => err.message;
const errUnknown = (err: unknown) => `Unknown Error: ${err}`;
const axiosErrHandle = (error: unknown) => {
    console.log({ error });
    if (axios.isAxiosError(error)) {
        console.log("is axios error");
        if (error.response) return axiosResErr(error);
        console.log("is error.response");
        if (error.request) return axiosResErrNoRes(error);
        return errUnknown(error);
    }
    return errUnknown(error);
};

export { axiosResHandle, axiosErrHandle };
