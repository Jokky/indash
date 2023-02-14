'use client';

import { authStore } from '@/features/auth/by-token/model';
import AuthStoreContext from '@/features/auth/by-token/model/auth/AuthStoreContext';
import { useCreateStore } from '@/shared/zustand';

const useAuthStore = () => useCreateStore(authStore, AuthStoreContext);

export default useAuthStore;
