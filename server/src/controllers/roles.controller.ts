import { Request, Response } from "express";
import { requestHandler } from "../utils";
import { createRole, getRolesList } from "../services";
import { StatusCodes } from "http-status-codes";

export const getRolesListAPI = requestHandler(async (req: Request, res: Response) => {
    const rolesList = await getRolesList();
    res.status(StatusCodes.OK).json({
        list: rolesList
    });
})

export const createRoleAPI = requestHandler(async (req: Request, res: Response) => {
    const { name, monthly_salary, productive_hours } = req.body;

    const newRole = await createRole(name, monthly_salary, productive_hours);
    const rolesList = await getRolesList();
    res.status(StatusCodes.CREATED).json({
        data: newRole,
        list: rolesList
    });
})