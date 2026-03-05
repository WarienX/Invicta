import { Router } from "express";
import { clientRoutes } from "./client.route";
import { revenueRoute } from "./revenue.route";
import { rolesRoute } from "./roles.route";
import { timeEntryRoute } from "./time.route";

export const router = Router()

clientRoutes(router)
revenueRoute(router)
rolesRoute(router)
timeEntryRoute(router)