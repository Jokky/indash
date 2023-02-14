import { useInterval } from 'react-use';
import { INTERVAL_UPDATES, setIntervalUpdate } from '@/entities/interval';
import { useIntervalStore } from '@/entities/interval/model/useIntervalStore';
import { fetchPrices } from '@/entities/stock';
import { Select } from '@/shared/ui/Select';

interface IntervalUpdateItem {
    id: INTERVAL_UPDATES;
    label: string;
}

const MapIntervalUpdate: IntervalUpdateItem[] = Object.entries(
    INTERVAL_UPDATES,
).map(([, value]) => ({
    id: value,
    label: value,
}));

const MapIntervalUpdateToNumber: Record<INTERVAL_UPDATES, number | null> = {
    [INTERVAL_UPDATES.UPDATE_OFF]: null,
    [INTERVAL_UPDATES.UPDATE_5s]: 5_000,
    [INTERVAL_UPDATES.UPDATE_15s]: 15_000,
    [INTERVAL_UPDATES.UPDATE_30s]: 30_000,
    [INTERVAL_UPDATES.UPDATE_1m]: 60_000,
    [INTERVAL_UPDATES.UPDATE_5m]: 5 * 60_000,
};

export const ChangeIntervalUpdate = () => {
    const { intervalUpdate, interval } = useIntervalStore();
    const delay = intervalUpdate
        ? MapIntervalUpdateToNumber[intervalUpdate]
        : intervalUpdate;

    useInterval(() => {
        if (interval) {
            fetchPrices({ interval });
        }
    }, delay);

    const onChange = async (intervalUpdate: string) => {
        await setIntervalUpdate(intervalUpdate as INTERVAL_UPDATES);
    };

    return (
        <Select
            id={intervalUpdate}
            items={MapIntervalUpdate}
            onChange={onChange}
        />
    );
};
