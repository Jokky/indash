// import { cookies } from 'next/headers';
import Cookies from 'js-cookie';
import { AUTH_TOKEN_PARAM } from '@/features/auth/by-token/constants';

export const getAuthToken = async (): Promise<string | null> => {
    const cookieAuthToken = Cookies.get(AUTH_TOKEN_PARAM);

    if (!cookieAuthToken) {
        return null;
    }

    return cookieAuthToken;
};
