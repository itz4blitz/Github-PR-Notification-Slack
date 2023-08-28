# GitHub PR Notification Bot

## Prerequisites

- Docker
- Slack

## Getting Started

1. Clone this repository:

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
cp ./src/usernameMapping.json.example ./src/usernameMapping.json
```

4. Open the `./src/.env` and `./src/usernameMapping.json` file in a text editor and provide your GitHub and Slack configuration details. 

### Configuration

Provide appropriate values for the following environment variables:

```env
GITHUB_REPO=RepoUser\\Name-To-Repo-To-Monitor
GITHUB_TOKEN=abc_123
SLACK_WEBHOOK_URL=https://hooks.slack.com/myWebhook
DEBUG_MODE=false
```
   
### Username Mapping

Open `usernameMapping.json` and populate it as shown below:

```json
{
    "githubUsername": "Slack Name"
}
```

### Timezone Configuration

The default timezone for the Docker container is set to UTC.

## Building the Docker Image

Build the Docker image:

```bash
docker build -t github-pr-notification-bot .
```
   
## Running the Bot

You can run the bot as follows:

```bash
docker run --rm -d github-pr-notification-bot
```

## Testing

To test the bot locally:

```bash
docker run --rm -it github-pr-notification-bot
```

## Deployment

For production:

 ```bash
docker run --rm -d github-pr-notification-bot
```

## Monitoring and Logging

You can view logs by executing:

```bash
docker logs <container-id>
```
