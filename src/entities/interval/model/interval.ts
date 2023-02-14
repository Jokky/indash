import { createStore } from 'zustand';
import { postInterval } from '@/entities/interval/api/postInterval';
import { postIntervalUpdate } from '@/entities/interval/api/postIntervalUpdate';

export enum INTERVALS {
    INTERVAL_1M = '1m',
    INTERVAL_5M = '5m',
    INTERVAL_15M = '15m',
    INTERVAL_1H = '1h',
    INTERVAL_1D = '1d',
}

export enum INTERVAL_UPDATES {
    UPDATE_OFF = 'off',
    UPDATE_5s = '5s',
    UPDATE_15s = '15s',
    UPDATE_30s = '30s',
    UPDATE_1m = '1m',
    UPDATE_5m = '5m',
}

export interface IntervalState {
    interval: INTERVALS | null;
    intervalUpdate: INTERVAL_UPDATES;
}

export const initialIntervalStore: IntervalState = {
    interval: null,
    intervalUpdate: INTERVAL_UPDATES.UPDATE_OFF,
};

export const intervalStore = createStore<IntervalState>(() => ({
    ...initialIntervalStore,
}));

export const setIntervalAction = async (interval: INTERVALS) => {
    await postInterval({ interval });
    intervalStore.setState(() => ({ interval }));
};

export const setIntervalUpdate = async (intervalUpdate: INTERVAL_UPDATES) => {
    await postIntervalUpdate({ intervalUpdate });
    intervalStore.setState(() => ({ intervalUpdate }));
};
