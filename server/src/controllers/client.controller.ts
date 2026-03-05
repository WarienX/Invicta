import { Request, Response } from "express";
import { createClient, getClientsList, updateClientMonthlyRevenue } from "../services";
import { requestHandler } from "../utils";
import { StatusCodes } from "http-status-codes";

export const getClientsListAPI = requestHandler(async (req: Request, res: Response) => {
    const clientsList = await getClientsList();
    res.status(StatusCodes.OK).json({
        list: clientsList
    });
})

export const createClientAPI = requestHandler(async (req: Request, res: Response) => {
    const { name } = req.body;

    const newClient = await createClient(name);
    const clientsList = await getClientsList();
    res.status(StatusCodes.CREATED).json({
        data: newClient,
        list: clientsList
    });
})

export const setClientMonthlyRevenueAPI = requestHandler(async (req: Request, res: Response) => {
    const { client_id, month, year, revenue, estimated_hours } = req.body;

    const updatedRevenue = await updateClientMonthlyRevenue(client_id, month, year, revenue, estimated_hours);
    res.status(StatusCodes.OK).json({
        data: updatedRevenue
    });
})