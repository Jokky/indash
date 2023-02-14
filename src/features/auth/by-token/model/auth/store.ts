import { createStore } from 'zustand';

interface AuthState {
    token: string | null;
}

export const authStore = createStore<AuthState>(() => ({
    token: '',
}));
