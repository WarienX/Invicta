import { IClient } from "./client.interface";

export interface IRevenue {
    id: number;
    client_id: number;
    month: string;
    monthly_revenue: number;
    estimated_hours: number;
    clientData: IClient;
    created_at: Date;
}

export interface IMonthlyProfit {
    client_name: string;
    revenue: number;
    actual_hours: number;
    delivery_cost: number;
    gross_margin: number;
    margin_percent: number;
    variance_percent: number | null;
}