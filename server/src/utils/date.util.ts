export const getMonthStartEndDate = (yearMonth: string) => {
    const [year, month] = yearMonth.split('-').map(Number);
    if (!year || !month) throw new Error('Invalid month format. Use YYYY-MM');

    console.log(`year: ${year} - month: ${month}`);
    
    const startOfMonth = new Date(year, (month - 1), 1);
    const endOfMonth = new Date(year, month, 0);
    
    console.log(`startOfMonth: ${startOfMonth} - endOfMonth: ${endOfMonth}`);

    return {
        start: `${startOfMonth.getFullYear()}-${startOfMonth.getMonth() + 1}-${startOfMonth.getDate()}`,
        end: `${endOfMonth.getFullYear()}-${endOfMonth.getMonth() + 1}-${endOfMonth.getDate()}`
    }
}