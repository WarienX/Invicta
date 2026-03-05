import { Between, FindOptionsWhere, Repository } from "typeorm";
import { TimeEntity } from "../libs";
import { getMonthStartEndDate, getTypeOrmRepository } from "../utils";

export const addTimeEntry = async (client_id: number, role_id: number, total_hours: number, entry_date: Date) => {
    const clientTimeRepo = getTypeOrmRepository(TimeEntity) as Repository<TimeEntity>;
    const selectedDate = entry_date.getDate();
    const selectedMonth = entry_date.getMonth() + 1;
    const selectedYear = entry_date.getFullYear();

    const newClientTimeEntry = await clientTimeRepo.save({ 
        client_id, 
        role_id, 
        total_hours,
        entry_date: `${selectedYear}-${selectedMonth}-${selectedDate}`
    });
    return newClientTimeEntry;
}

export const getTimeEntries = async (client_id?: number, yearMonth?: string) => {
    const clientTimeRepo = getTypeOrmRepository(TimeEntity) as Repository<TimeEntity>;

    const whereQuery: FindOptionsWhere<TimeEntity> = {}

    if (client_id) {
        whereQuery.client_id = client_id;
    }

    if (yearMonth && yearMonth.trim() != '') {
        const { start, end } = getMonthStartEndDate(yearMonth);

        whereQuery.entry_date = Between(`${start}`, `${end}`)
    }

    let getTimeEntry = await clientTimeRepo.find({
        select: {
            updated_at: false,
            deleted_at: false
        },
        where: whereQuery,
        relations: {
            clientData: true,
            roleData: true
        }
    })

    return getTimeEntry;
}