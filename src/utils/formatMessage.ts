import { timeSince } from './time';
import { PullRequest } from '../api/github';

export function formatMessage(prs: PullRequest[], usernameMapping: Record<string, string>): string {
    const MAX_TITLE_LENGTH = 50;

    let slackMessage = ':information_source: *SnapNurse Automation QA Pull Requests*\n\n';

    if (prs.length > 0) {
        slackMessage += `:warning: There are ${prs.length} open PRs that need review:\n\n`;

        prs.sort((a: PullRequest, b: PullRequest) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());

        prs.forEach((pr: PullRequest) => {
            const reviewers = pr.requested_reviewers.map((reviewer: { login: string }) => usernameMapping[reviewer.login] || reviewer.login).join(', ') || 'None';
            const daysOld = timeSince(new Date(pr.created_at));

            const truncatedTitle = pr.title.length > MAX_TITLE_LENGTH ? pr.title.slice(0, MAX_TITLE_LENGTH - 3) + '...' : pr.title;

            slackMessage += `- "${truncatedTitle}" created by *${usernameMapping[pr.user.login] || pr.user.login}* (${daysOld}). <${pr.html_url}|Link to PR>. Reviewers: ${reviewers}\n`;
        });
    } else {
        slackMessage += ":tada: Great job, team! There are no outstanding PRs at the moment.";
    }

    return slackMessage;
}