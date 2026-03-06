import { Router } from "express";
import { addTimeEntryAPI, getTimeEntriesListAPI } from "../controllers";
import { addTimeEntryValidator, getTimeEntriesValidator } from "../middlewares";

export const timeEntryRoute = (app: Router) => {
    const router = Router();

    router.get('/', getTimeEntriesValidator, getTimeEntriesListAPI);
    router.post('/', addTimeEntryValidator, addTimeEntryAPI);

    app.use('/time', router)
}