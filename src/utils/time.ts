export function timeSince(date: Date): string {
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
    let interval = seconds / 31536000; // number of seconds in a year

    if (interval > 1) {
        return Math.floor(interval) + " years";
    }
    interval = seconds / 2592000;  // number of seconds in a month
    if (interval > 1) {
        return Math.floor(interval) + " months";
    }
    interval = seconds / 86400; // number of seconds in a day
    if (interval > 1) {
        return Math.floor(interval) + " days";
    }
    interval = seconds / 3600; // number of seconds in an hour
    if (interval > 1) {
        return Math.floor(interval) + " hours";
    }
    interval = seconds / 60; // number of seconds in a minute
    if (interval > 1) {
        return Math.floor(interval) + " minutes";
    }
    return Math.floor(seconds) + " seconds";
}
