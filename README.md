
# GitHub PR Notification Bot

This repository contains a GitHub PR Notification Bot that fetches open pull requests from a designated GitHub repository and sends Slack notifications with the PR details. The bot is designed to run in a Docker container.

## Prerequisites

- **Docker**: Ensure that Docker is installed on your system. You can download and install Docker from the official Docker website.

## Getting Started

1. Clone this repository to your local machine:
   ```bash
   git clone https://github.com/your-username/github-pr-notification-bot.git
   ```

2. Navigate to the project directory:
   ```bash
   cd github-pr-notification-bot
   ```

3. Copy the example environment file:
   ```bash
   cp ./src/.env.example ./src/.env
   ```

4. Open the `./src/.env` file in a text editor and provide your GitHub and Slack configuration details.

5. Configure User Mapping: Navigate to `./src/usernameMapping.json` and update the file with the desired mapping between GitHub usernames and Slack usernames. This mapping ensures accurate notifications, translating GitHub usernames to Slack display names. The structure should look like:
   ```json
   {
       "githubUsername1": "SlackName1",
       "githubUsername2": "SlackName2",
       ...
   }
   ```

## Configuration

Provide appropriate values for the following environment variables:

```
GITHUB_REPO=RepoUser/Name-To-Repo-To-Monitor
GITHUB_TOKEN=abc_123
SLACK_WEBHOOK_URL=https://hooks.slack.com/myWebhook
DEBUG_MODE=false
CRON_INTERVAL=2
CRON_TIME=8
```

**Note**: Adjust `CRON_INTERVAL` and `CRON_TIME` to change the bot's notification schedule. Ensure to consider the timezone settings of your hosting environment when setting these values.

## Building the Docker Image

Build the Docker image using the provided Dockerfile:
```bash
docker build -t github-pr-notification-bot .
```

## Running the Bot

You can run the bot as a Docker container. It will automatically fetch PRs and send notifications based on the specified schedule.

```bash
docker run --rm -d github-pr-notification-bot
```

## Testing

To test the bot locally before deploying, you can run it in the foreground without detaching using the following command:

```bash
docker run --rm -it github-pr-notification-bot
```

## Deployment

For production deployment, you can run the bot as a background service in detached mode:

```bash
docker run --rm -d github-pr-notification-bot
```

## Monitoring and Logging

You can view logs of the running container by executing:

```bash
docker logs <container-id>
```

Ensure to monitor logs regularly to address any issues or misconfigurations that may arise.
