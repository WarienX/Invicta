import { requestHandler } from "../utils";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { addTimeEntry, getTimeEntries } from "../services";

export const getTimeEntriesListAPI = requestHandler(async (req: Request, res: Response) => {
    const clientId = req.query.clientId ? Number(req.query.clientId) : null;
    const month = req.query.month ? (req.query.month as string).trim() : null;

    const entriesList = await getTimeEntries(clientId,month);
    res.status(StatusCodes.OK).json({
        list: entriesList
    });
})

export const addTimeEntryAPI = requestHandler(async (req: Request, res: Response) => {
    const { clientId, role_id , total_hours , entry_date } = req.body;

    const timeEntryData = await addTimeEntry(clientId, role_id , total_hours , new Date(entry_date));
    const entriesList = await getTimeEntries();

    res.status(StatusCodes.CREATED).json({
        data: timeEntryData,
        list: entriesList
    });
})