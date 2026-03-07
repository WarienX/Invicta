import { Router } from "express";
import { addTimeEntryAPI, getTimeEntriesListAPI } from "../controllers";
import { addTimeEntryValidator } from "../middlewares";

export const timeEntryRoute = (app: Router) => {
    const router = Router();

    router.get('/', getTimeEntriesListAPI);
    router.post('/', addTimeEntryValidator, addTimeEntryAPI);

    app.use('/time', router)
}