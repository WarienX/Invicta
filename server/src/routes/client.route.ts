import { Router } from "express";
import { createClientAPI, getClientsListAPI, setClientMonthlyRevenueAPI } from "../controllers";

export const clientRoutes = (app: Router) => {
    const router = Router();

    router.get('/', getClientsListAPI);
    router.post('/', createClientAPI);
    router.put('/revenue/monthly', setClientMonthlyRevenueAPI);

    app.use('/client', router)
}