import { Router } from "express";
import { getClientsProfitListAPI } from "../controllers";

export const revenueRoute = (app: Router) => {
    const router = Router();

    router.post('/', getClientsProfitListAPI)

    app.use('/revenue', router)
}