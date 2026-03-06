import { Router } from "express";
import { createClientAPI, getClientsListAPI, setClientMonthlyRevenueAPI } from "../controllers";
import { createClientValidator, setClientMonthlyRevenueValidator } from "../middlewares";

export const clientRoutes = (app: Router) => {
    const router = Router();

    router.get('/', getClientsListAPI);
    router.post('/', createClientValidator, createClientAPI);
    router.put('/revenue/monthly', setClientMonthlyRevenueValidator, setClientMonthlyRevenueAPI);

    app.use('/client', router)
}