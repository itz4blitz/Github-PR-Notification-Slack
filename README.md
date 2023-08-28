# GitHub PR Notification Bot

This repository contains a GitHub PR Notification Bot that fetches open pull requests from GitHub and sends Slack notifications with the PR details. The bot is designed to run in a Docker container.

## Prerequisites

1. **Docker**: Ensure that Docker is installed on your system. You can download and install Docker from the official Docker website.
2. **Slack**: Create a Slack incoming webhook:
    - Go to your Slack workspace settings.
    - Navigate to Manage apps > Custom Integrations > Incoming WebHooks.
    - Choose the channel where you want the notifications to be sent and then click on Add Incoming WebHooks Integration.
    - Copy the Webhook URL. You'll use this in the .env configuration.

## Getting Started

1. Clone this repository to your local machine:
    ```bash
    git clone https://github.com/your-username/github-pr-notification-bot.git
    ```
2. Navigate to the project directory:
    ```bash
    cd github-pr-notification-bot
    ```
3. Copy the example environment file and username mapping file:
    ```bash
    cp ./src/.env.example ./src/.env
    cp ./src/usernameMapping.json.example ./src/usernameMapping.json
    ```
4. Open the `./src/.env` and `./src/usernameMapping.json` files in a text editor and provide your GitHub and Slack configuration details.

## Configuration

Provide appropriate values for the following environment variables:

- `GITHUB_REPO=RepoUser\\Name-To-Repo-To-Monitor`
- `GITHUB_TOKEN=abc_123`
- `SLACK_WEBHOOK_URL=https://hooks.slack.com/myWebhook`
- `DEBUG_MODE=false`

For username mapping, modify `usernameMapping.json`:

```json
{
    "githubUsername": "Slack Name"
}
```

Note: Adjust your CRON settings to change the bot's notification schedule. We are using Moment.js to manage time, so your hosting environment's timezone settings will affect the bot's notification times.

## Building the Docker Image

Build the Docker image using the provided Dockerfile:

```bash
docker build -t github-pr-notification-bot .
```

## Running the Bot

You can run the bot as a Docker container. It will automatically fetch PRs and send notifications.

```bash
docker run --rm -d github-pr-notification-bot
```

## Testing

To test the bot locally before deploying, you can run it in the foreground without detaching:

```bash
docker run --rm -it github-pr-notification-bot
```

If you want to test the bot in debug mode, set `DEBUG_MODE=true` in your `.env` file. This will allow the bot to print debug messages to the console instead of sending Slack messages.

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
