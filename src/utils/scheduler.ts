// utils/scheduler.ts
import cron from 'node-cron';
import moment from 'moment-timezone';
import Holidays from 'date-holidays';

export function scheduleTask(
    cronTime: string,
    timeZone: string,
    coworkerTimeZone: string,
    usHolidays: Holidays,
    ukraineHolidays: Holidays,
    task: () => Promise<void>
) {
    const cronExpression = `0 ${cronTime} * * 1-5`; // Run M-F at the specified time

    cron.schedule(cronExpression, async () => {
        const now = moment().tz(coworkerTimeZone);
        const isUsHoliday = usHolidays.isHoliday(now.toDate());
        const isUkraineHoliday = ukraineHolidays.isHoliday(now.toDate());

        if (!isUsHoliday && !isUkraineHoliday) {
            console.log('Running task...');
            await task();
        } else {
            console.log('Skipping task due to holiday.');
        }
    });
}
