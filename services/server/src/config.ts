import { safeLoad } from 'js-yaml';
import { readFileSync } from 'fs';

let config: Config = null;

export interface Config {
    agents: string[];
    database: string;
}

export function loadSync(): Config {
    if (!config) {
        const content = readFileSync('./config.yml', 'utf8');
        config = safeLoad(content);
    }
    return config;
}