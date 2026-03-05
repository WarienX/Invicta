import { Request, Response } from "express";
import { requestHandler } from "../utils";
import { StatusCodes } from "http-status-codes";
import { getMonthlyClientProfit } from "../services";

export const getClientsProfitListAPI = requestHandler(async (req: Request, res: Response) => {
    const { yearMonth } = req.body;

    const clientsProfitList = await getMonthlyClientProfit(yearMonth);
    res.status(StatusCodes.OK).json({
        list: clientsProfitList
    });
})