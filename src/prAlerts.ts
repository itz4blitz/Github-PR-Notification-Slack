import { config } from 'dotenv';
import * as fs from 'fs';
config();

import { fetchOpenPRs } from './api/github';
import { sendSlackNotification } from './api/slack';
import { scheduleTask } from './utils/scheduler';
import Holidays from 'date-holidays';
import moment from 'moment-timezone';

// Mapping between GitHub usernames and Slack usernames
const usernameMapping: Record<string, string> = JSON.parse(fs.readFileSync('./src/usernameMapping.json', 'utf8'));

const pollingInterval = 10 * 1000;

function logPollingUpdate(nextUpdateTimeUkr: string, nextUpdateTimeUs: string) {
    const currentTime = moment().format('YYYY-MM-DD HH:mm:ss');
    const pollingUpdateMessage = `${currentTime}: GITHUB-PR-NOTIFICATION-BOT is running. Next update for UKR Team Alert is at ${nextUpdateTimeUkr}. Next update for US Team Alert is at ${nextUpdateTimeUs}`;
    console.log(pollingUpdateMessage);
}

async function checkPRsAndNotify() {
    try {
        const prData = await fetchOpenPRs();

        // Sort PRs by their creation date (oldest first)
        prData.sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());

        if (process.env.DEBUG_MODE === 'true') {
            // Print the debug messages to console
            console.log('Reminder: There are outstanding PR\'s. Please review the PR. If additional changes are needed, leave a request inside of the PR and move the corresponding JIRA ticket to \'To Do\'. If the PR is complete, please merge into `master`.\n');

            prData.forEach((pr, index) => {
                const createdDate = moment(pr.created_at).fromNow();
                const author = `Author: @${usernameMapping[pr.user.login]}`;
                const prNumber = pr.html_url.split('/').pop(); // Extract PR number from URL
                const prLink = `[PR-${prNumber}: ${pr.title}](${pr.html_url})`;
                const reviewers = pr.requested_reviewers.length > 0 ? `Reviewers: ${pr.requested_reviewers.map(reviewer => `@${usernameMapping[reviewer.login]}`).join(' ')}` : 'Reviewers: None';
                const message = `${index + 1}) Created: ${createdDate} - ${author} - ${prLink} - ${reviewers}`;
                console.log(`🚨 ${message}`);
            });
        } else {
            const slackNotificationResult = await sendSlackNotification(prData, usernameMapping);
            if (slackNotificationResult) {
                console.log('Slack message sent successfully.');
            } else {
                console.error('Error sending Slack message.');
            }
        }
    } catch (error) {
        console.error('Error fetching PRs or notifying Slack:', error);
    }
}

const ukrTimeZone = 'Europe/Kiev';
const usTimeZone = 'America/New_York';

// Calculate next update times for UKR and US teams
const nextUpdateTimeUkr = moment().tz(ukrTimeZone).hours(10).minutes(0).seconds(0).format('YYYY-MM-DD HH:mm:ss');
const nextUpdateTimeUs = moment().tz(usTimeZone).hours(8).minutes(0).seconds(0).format('YYYY-MM-DD HH:mm:ss');

setInterval(() => logPollingUpdate(nextUpdateTimeUkr, nextUpdateTimeUs), pollingInterval);

// Calculate US holidays (New York time zone)
const usHolidays = new Holidays();
usHolidays.init('US', 'ny');

// Calculate Ukraine holidays (Ukraine time zone)
const ukraineHolidays = new Holidays();
ukraineHolidays.init('UA', 'ua');

if (process.env.DEBUG_MODE === 'true') {
    // If in debug mode, manually invoke the task immediately for testing
    checkPRsAndNotify();
} else {
    // Otherwise, schedule the task using the utility function
    // Schedule the task for the US team at 8 AM NY time
    scheduleTask('0 8 * * 1-5', 'America/New_York', 'US Team', usHolidays, checkPRsAndNotify);

    // Schedule the task for the Ukraine team at 10 AM Kiev time
    scheduleTask('0 10 * * 1-5', 'Europe/Kiev', 'Ukraine Team', ukraineHolidays, checkPRsAndNotify);

}
