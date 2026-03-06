import { Router } from "express";
import { getClientsProfitListAPI } from "../controllers";
import { getClientProfitsValidator } from "../middlewares";

export const revenueRoute = (app: Router) => {
    const router = Router();

    router.post('/', getClientProfitsValidator, getClientsProfitListAPI)

    app.use('/revenue', router)
}