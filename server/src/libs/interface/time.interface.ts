import { IClient } from "./client.interface";
import { IRoles } from "./roles.interface";

export interface ITime {
    id: number;
    client_id: number;
    role_id: number;
    total_hours: number;
    entry_date: string;
    created_at: Date;
    clientData?: IClient;
    roleData?: IRoles;
}