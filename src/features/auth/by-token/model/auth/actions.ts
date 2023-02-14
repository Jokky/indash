import { getAuthToken } from '@/features/auth/by-token/api';
import { postAuthToken } from '@/features/auth/by-token/api/postAuthToken';
import { authStore } from './store';

export const setAuthToken = (token: string) =>
    authStore.setState(() => ({ token }));

export const sendAuthToken = async (token: string) => postAuthToken({ token });

export const fetchAuthToken = () => getAuthToken();
