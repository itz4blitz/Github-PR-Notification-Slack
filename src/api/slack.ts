import axios from 'axios';
import { formatMessage } from '../utils/formatMessage';
import { SLACK_WEBHOOK_URL } from '../config';
import { PullRequest } from './github';

export function sendSlackNotification(prs: PullRequest[], usernameMapping: Record<string, string>) {
    const slackMessage = formatMessage(prs, usernameMapping);
    return axios.post(SLACK_WEBHOOK_URL!, {
        text: slackMessage,
        mrkdwn: true
    });
}

