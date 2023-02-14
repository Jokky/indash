import Cookies from 'js-cookie';
import { AUTH_TOKEN_PARAM } from '@/features/auth/by-token/constants';

interface PostAuthTokenParams {
    token: string;
}

export const postAuthToken = async ({
    token,
}: PostAuthTokenParams): Promise<void> => {
    Cookies.set(AUTH_TOKEN_PARAM, token);
};
