import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
// eslint-disable-next-line boundaries/element-types
import { authStore } from '@/features/auth/by-token';

const client = axios.create({
    baseURL: 'http://localhost:3000',
});

export const fetcher = <Req, Res>(url: string, options?: AxiosRequestConfig) =>
    client<Req, AxiosResponse<Res>>(url, {
        ...options,
        headers: {
            ...options?.headers,
            'X-Auth-Token': authStore.getState().token,
        },
    });
