import { Router } from "express";
import { addTimeEntryAPI, getTimeEntriesListAPI } from "../controllers";

export const timeEntryRoute = (app: Router) => {
    const router = Router();

    router.get('/', getTimeEntriesListAPI);
    router.post('/', addTimeEntryAPI);

    app.use('/time', router)
}