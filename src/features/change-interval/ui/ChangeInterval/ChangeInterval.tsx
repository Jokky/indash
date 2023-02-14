import { FC } from 'react';
import { INTERVALS, setIntervalAction } from '@/entities/interval/model';
import { useIntervalStore } from '@/entities/interval/model/useIntervalStore';
import { fetchPrices } from '@/entities/stock';
import { TabItem, Tabs } from '@/shared/ui';

interface Interval {
    id: INTERVALS;
    name: string;
}

const intervals: Interval[] = [
    {
        id: INTERVALS.INTERVAL_1M,
        name: '1m',
    },
    {
        id: INTERVALS.INTERVAL_5M,
        name: '5m',
    },
    {
        id: INTERVALS.INTERVAL_15M,
        name: '15m',
    },
    {
        id: INTERVALS.INTERVAL_1H,
        name: '1H',
    },
    {
        id: INTERVALS.INTERVAL_1D,
        name: '1D',
    },
];

export const ChangeInterval: FC = () => {
    const { interval } = useIntervalStore();
    const onChangeInterval = (interval: INTERVALS) => async () => {
        await setIntervalAction(interval);
        await fetchPrices({ interval });
    };

    return (
        <Tabs>
            {intervals.map(({ id, name }) => (
                <TabItem
                    isActive={interval === id}
                    onClick={onChangeInterval(id)}
                    key={id}
                >
                    {name}
                </TabItem>
            ))}
        </Tabs>
    );
};
