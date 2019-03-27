import { Injectable } from './ioc-container';
import { get } from 'http';

@Injectable()
export class HttpClient {
    get<T = any>(url: string): Promise<T> {
        return new Promise<T>(((resolve, reject) => {
            const req = get(url, res => {
                res.setEncoding('utf8');
                let rawData = '';
                res.on('data', (chunk) => { rawData += chunk; });
                res.on('end', () => {
                    try {
                        return resolve(JSON.parse(rawData));
                    } catch (e) {
                        return reject(e);
                    }
                });
            });
            req.on('error', err => reject(err))
        }));
    }
}