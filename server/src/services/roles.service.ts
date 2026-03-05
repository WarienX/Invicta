import { Not, Repository } from "typeorm";
import { IRoles, RoleEntity } from "../libs";
import { getTypeOrmRepository } from "../utils";

export const getRolesList = async () => {
    const rolesRepo = getTypeOrmRepository(RoleEntity) as Repository<RoleEntity>;

    const rolesList: IRoles[] = await rolesRepo.find({
        select: {
            updated_at: false,
            deleted_at: false
        }
    });

    return rolesList;
}

export const createRole = async (name: string, monthly_salary: number, productive_hours: number) => {
    const rolesRepo = getTypeOrmRepository(RoleEntity) as Repository<RoleEntity>;

    const checkIfRoleExists: IRoles | null = await rolesRepo.findOne({
        where: {
            name
        }
    });

    if (checkIfRoleExists) {
        throw new Error("Role already exists");
    }

    if (productive_hours <= 0) {
        throw new Error("Productive hours must be greater than 0");
    }

    const newRole = await rolesRepo.save({ name, monthly_salary, productive_hours, cost_per_hour: monthly_salary / productive_hours });
    return newRole;
}

export const editRoleData = async (id: number, name: string, monthly_salary: number, productive_hours: number) => {
    const rolesRepo = getTypeOrmRepository(RoleEntity) as Repository<RoleEntity>;

    const checkIfRoleExists: IRoles | null = await rolesRepo.findOne({
        where: {
            id
        }
    });

    if (!checkIfRoleExists) {
        throw new Error("Role not found");
    }

    const checkIfRoleNameExists: IRoles | null = await rolesRepo.findOne({
        where: {
            name: name.trim(),
            id: Not(id)
        }
    });

    if (checkIfRoleNameExists) {
        throw new Error("Role name already exists");
    }

    const updatedRole = await rolesRepo.update(id, { name, monthly_salary, productive_hours, cost_per_hour: monthly_salary / productive_hours });
    return updatedRole;
}