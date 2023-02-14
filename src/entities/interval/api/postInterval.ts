import Cookies from 'js-cookie';
import { INTERVALS } from '@/entities/interval';
import { INTERVAL_PARAM } from '@/entities/interval/constants';

interface PostIntervalParams {
    interval: INTERVALS;
}

export const postInterval = async ({ interval }: PostIntervalParams) => {
    Cookies.set(INTERVAL_PARAM, interval);
};
