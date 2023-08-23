# GitHub PR Notification Bot

This repository contains a GitHub PR Notification Bot that fetches open pull requests from GitHub and sends Slack notifications with the PR details. The bot is designed to run in a Docker container.

## Prerequisites

- **Docker**: Ensure that Docker is installed on your system. You can download and install Docker from the official Docker website.
- **Slack**: Create a Slack incoming webhook:
    1. Go to your Slack workspace settings.
    2. Navigate to `Manage apps` > `Custom Integrations` > `Incoming WebHooks`.
    3. Choose the channel where you want the notifications to be sent and then click on `Add Incoming WebHooks Integration`.
    4. Copy the Webhook URL. You'll use this in the `.env` configuration.

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

## Configuration

Provide appropriate values for the following environment variables:

```
GITHUB_REPO=RepoUser\Name-To-Repo-To-Monitor
GITHUB_TOKEN=abc_123
SLACK_WEBHOOK_URL=https://hooks.slack.com/myWebhook
DEBUG_MODE=false
CRON_INTERVAL=2
CRON_TIME=8
```

**Note**: Adjust `CRON_INTERVAL` and `CRON_TIME` to change the bot's notification schedule. Ensure to consider the timezone settings of your hosting environment.

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
