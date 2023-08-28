// utils/scheduler.ts
import cron from 'node-cron';
import moment from 'moment-timezone';
import Holidays from 'date-holidays';

export function scheduleTask(
    cronTime: string,
    timeZone: string,
    name: string,
    holidays: Holidays,
    task: () => Promise<void>
) {
    cron.schedule(cronTime, async () => {
        const now = moment().tz(timeZone);
        const isHoliday = holidays.isHoliday(now.toDate());
        if (!isHoliday) {
            console.log(`Running ${name} task...`);
            await task();
        } else {
            console.log(`Skipping ${name} task due to holiday.`);
        }
    }, {
        scheduled: true,
        timezone: timeZone
    });
}

