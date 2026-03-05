import { Between, Repository } from "typeorm";
import { IMonthlyProfit, IRevenue, RevenueEntity, TimeEntity } from "../libs";
import { getMonthStartEndDate, getTypeOrmRepository } from "../utils";

export const updateClientMonthlyRevenue = async (client_id: number, month: number, year: number, revenue: number, estimated_hours?: number) => {
    const clientRevenueRepo = getTypeOrmRepository(RevenueEntity) as Repository<RevenueEntity>;

    if (month < 1 || month > 12) {
        throw new Error('Invalid month value. Month should be between 1 and 12.');
    }

    const selectedMonth = `${year}-${month}`;

    const checkClientMonthlyRevenue = await clientRevenueRepo.findOne({ where: { client_id, month: selectedMonth } });

    let clientRevenue: IRevenue;
    if (checkClientMonthlyRevenue) {
        checkClientMonthlyRevenue.monthly_revenue = revenue;
        if (estimated_hours) checkClientMonthlyRevenue.estimated_hours = estimated_hours;
        clientRevenue = await clientRevenueRepo.save(checkClientMonthlyRevenue);
    } else {
        clientRevenue = await clientRevenueRepo.save({ client_id, month: selectedMonth, monthly_revenue: revenue, estimated_hours });
    }

    return clientRevenue;
}

export const getMonthlyClientProfit = async (yearMonth: string) => {
    const clientRevenueRepo = getTypeOrmRepository(RevenueEntity) as Repository<RevenueEntity>;
    const clientTimeRepo = getTypeOrmRepository(TimeEntity) as Repository<TimeEntity>;

    const [year, month] = yearMonth.split('-').map(Number);
    if (!year || !month) throw new Error('Invalid month format. Use YYYY-MM');

    const { start, end } = getMonthStartEndDate(yearMonth);

    const revenuesList: IRevenue[] = await clientRevenueRepo.find({ 
        where: { month: yearMonth }, 
        relations: {
            clientData: true
        } 
    });

    if (revenuesList.length === 0) {
      return [];
    }

    const results: IMonthlyProfit[] = await Promise.all(revenuesList.map(async (revenue) => {
        const timeEntries = await clientTimeRepo.find({
            where: {
                client_id: revenue.client_id,
                entry_date: Between(`${start}`, `${end}`)
            },
            relations: {
                roleData: true
            }
        })

        let totalHours = 0;
        let totalCost = 0;

        for (const entry of timeEntries) {
            totalHours += entry.total_hours;
            totalCost += entry.total_hours * (entry.roleData?.cost_per_hour ?? 0);
        }

        const grossMargin = revenue.monthly_revenue - totalCost;
        const marginPercent = revenue.monthly_revenue > 0 ? (grossMargin / revenue.monthly_revenue) * 100 : 0;

        let variancePercent: number = 0;
        if (revenue.estimated_hours && revenue.estimated_hours > 0) {
            variancePercent = ((totalHours - revenue.estimated_hours) / revenue.estimated_hours) * 100;
        }

        return {
            client_name: revenue.clientData.name,
            revenue: revenue.monthly_revenue,
            actual_hours: totalHours,
            delivery_cost: totalCost,
            gross_margin: grossMargin,
            margin_percent: Number(marginPercent.toFixed(2)),
            variance_percent: revenue.estimated_hours ? Number(variancePercent.toFixed(2)) : null
        }
    }));

    results.sort((a, b) => b.margin_percent - a.margin_percent);

    return results;
}