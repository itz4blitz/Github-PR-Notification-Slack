import axios from 'axios';
import { GITHUB_API_URL, GITHUB_TOKEN } from '../config';

export interface PullRequest {
    created_at: string;
    html_url: string;
    title: string;
    user: {
      login: string;
    };
    requested_reviewers: {
      login: string;
    }[];
}

export async function fetchOpenPRs(): Promise<PullRequest[]> {
    const response = await axios.get(GITHUB_API_URL, {
        headers: {
            'Authorization': `token ${GITHUB_TOKEN}`,
            'Accept': 'application/vnd.github.v3+json',
        }
    });
    
    return response.data;
}

