import dotenv from 'dotenv';

dotenv.config();

export const GITHUB_REPO = process.env.GITHUB_REPO;
export const GITHUB_API_URL = `https://api.github.com/repos/${GITHUB_REPO}/pulls`;
export const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
export const SLACK_WEBHOOK_URL = process.env.SLACK_WEBHOOK_URL;

// config.ts
export const DEBUG_MODE = process.env.DEBUG_MODE; 
