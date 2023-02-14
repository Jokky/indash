'use client';

import { authStore } from '@/features/auth/by-token/model';
import { CreateStoreProvider } from '@/shared/zustand';

const [AuthStoreContext, AuthStoreProvider] = CreateStoreProvider(authStore);

export { AuthStoreProvider };

export default AuthStoreContext;
