import { cookies } from 'next/headers';
import { INTERVAL_UPDATES } from '@/entities/interval';
import { INTERVAL_UPDATE_PARAM } from '@/entities/interval/constants';

const isIntervalUpdate = (value: string): value is INTERVAL_UPDATES =>
    Object.entries(INTERVAL_UPDATES).some(([, v]) => v === value);

export const getIntervalUpdate = async (): Promise<INTERVAL_UPDATES> => {
    const cookieIntervalUpdate = cookies().get(INTERVAL_UPDATE_PARAM);

    if (cookieIntervalUpdate && isIntervalUpdate(cookieIntervalUpdate.value)) {
        return cookieIntervalUpdate.value;
    }

    return INTERVAL_UPDATES.UPDATE_OFF;
};
