import { cookies } from 'next/headers';

import { Login } from '@/pages/login';
import { AUTH_TOKEN_PARAM } from '@/features/auth/by-token';
import { AuthStoreProvider } from '@/features/auth/by-token/model/auth/AuthStoreContext';

export default async function Auth() {
    // await fetchAuthToken();
    const token = cookies().get(AUTH_TOKEN_PARAM);

    return (
        <AuthStoreProvider state={{ token: token?.value ?? null }}>
            <Login />
        </AuthStoreProvider>
    );
}
