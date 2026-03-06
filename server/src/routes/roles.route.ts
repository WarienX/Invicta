import { Router } from "express";
import { createRoleAPI, getRolesListAPI } from "../controllers";
import { createRoleValidator } from "../middlewares";

export const rolesRoute = (app: Router) => {
    const router = Router();

    router.get('/', getRolesListAPI)
    router.post('/', createRoleValidator, createRoleAPI)

    app.use('/role', router)
}