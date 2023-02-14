import { cookies } from 'next/headers';
import { INTERVALS } from '@/entities/interval';
import { INTERVAL_PARAM } from '@/entities/interval/constants';

const isInterval = (value: string): value is INTERVALS =>
    Object.entries(INTERVALS).some(([, v]) => v === value);

export const getInterval = async (): Promise<INTERVALS> => {
    const cookieStore = cookies();
    const cookieInterval = cookieStore.get(INTERVAL_PARAM);

    if (cookieInterval && isInterval(cookieInterval.value)) {
        return cookieInterval.value;
    }

    return INTERVALS.INTERVAL_1H;
};
