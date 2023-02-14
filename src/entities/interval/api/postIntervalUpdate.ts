import Cookies from 'js-cookie';
import { INTERVAL_UPDATES } from '@/entities/interval';
import { INTERVAL_UPDATE_PARAM } from '@/entities/interval/constants';

interface PostIntervalUpdateParams {
    intervalUpdate: INTERVAL_UPDATES;
}

export const postIntervalUpdate = ({
    intervalUpdate,
}: PostIntervalUpdateParams) => {
    Cookies.set(INTERVAL_UPDATE_PARAM, intervalUpdate);
};
