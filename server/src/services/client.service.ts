import { Not, Repository } from "typeorm";
import { ClientEntity, IClient } from "../libs";
import { getTypeOrmRepository } from "../utils";

export const getClientsList = async () => {
    const clientRepo = getTypeOrmRepository(ClientEntity) as Repository<ClientEntity>;

    const clientsList: IClient[] = await clientRepo.find({
        select: {
            updated_at: false,
            deleted_at: false
        }
    });

    return clientsList;
}

export const createClient = async (name: string) => {
    const clientRepo = getTypeOrmRepository(ClientEntity) as Repository<ClientEntity>;

    const checkIfClientExists: IClient | null = await clientRepo.findOne({
        where: {
            name
        }
    });

    if (checkIfClientExists) {
        throw new Error("Client already exists");
    }

    const newClient = await clientRepo.save({ name });
    return newClient;
}

export const editClientData = async (id: number, name: string) => {
    const clientRepo = getTypeOrmRepository(ClientEntity) as Repository<ClientEntity>;

    const checkIfClientExists: IClient | null = await clientRepo.findOne({
        where: {
            id
        }
    });

    if (!checkIfClientExists) {
        throw new Error("Client not found");
    }

    const checkIfClientNameExists: IClient | null = await clientRepo.findOne({
        where: {
            name: name.trim(),
            id: Not(id)
        }
    });

    if (checkIfClientNameExists) {
        throw new Error("Client name already exists");
    }

    const updatedClient = await clientRepo.update(id, { name: name.trim() });
    return updatedClient;
}