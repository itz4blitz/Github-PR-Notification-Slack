# PulsePR
PulsePR is an automated tool designed to streamline the process of monitoring open pull requests on GitHub repositories and sending notifications to a designated Slack channel. Built within a Docker container, this bot offers flexible configuration options, making it suitable for teams of varying sizes and requirements. It supports username mapping to Slack names and allows scheduling notifications based on different time zones. This bot is perfect for developers and teams who aim to improve visibility and management of pull requests, thus enhancing collaboration and speeding up the code review process.

## Prerequisites

- Docker
- Slack

## Getting Started

1. Clone this repository:

```bash
git clone https://github.com/your-username/PulsePR.git
```
   
2. Navigate to the project directory:

```bash
cd PulsePR
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
docker build -t pulsepr .
```
   
## Running the Bot

You can run the bot as follows:

```bash
docker run --rm -d pulsepr
```

## Testing

To test the bot locally:

```bash
docker run --rm -it pulsepr
```

## Deployment

For production:

 ```bash
docker run --rm -d pulsepr
```

## Monitoring and Logging

You can view logs by executing:

```bash
docker logs <container-id>
```
