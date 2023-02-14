import { NextApiRequest, NextApiResponse } from 'next';

type Context = {
    token: string;
};

type Callback<T> = (
    request: NextApiRequest,
    response: NextApiResponse<T>,
    context: Context,
) => Promise<void> | void;

export const withAuth =
    <T>(callback: Callback<T>) =>
    (request: NextApiRequest, response: NextApiResponse<T>) => {
        const token = (request.cookies['auth-token'] ||
            request.headers['x-auth-token']) as string | null;

        if (!token) {
            throw new Error('Undefined token');
        }

        callback(request, response, { token });
    };
