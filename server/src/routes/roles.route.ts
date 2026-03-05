import { Router } from "express";
import { createRoleAPI, getRolesListAPI } from "../controllers";

export const rolesRoute = (app: Router) => {
    const router = Router();

    router.get('/', getRolesListAPI)
    router.post('/', createRoleAPI)

    app.use('/role', router)
}