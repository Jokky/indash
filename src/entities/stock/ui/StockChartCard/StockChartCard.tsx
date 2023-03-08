'use client';

import { FC, useMemo } from 'react';

import { StockChart } from '@/types';
import Chart from '@/shared/ui/Chart';

import styles from './StockChartCard.module.scss';

interface StockChartProps {
    dataChart: StockChart[];
}

export const StockChartCard: FC<StockChartProps> = ({ dataChart }) => {
    const data = useMemo(
        () =>
            dataChart
                .filter(({ time, close }) => time && close && close > 0)
                .map(({ time, close }) => ({
                    time: time ? time / 1000 : 0,
                    value: close || 0,
                })),
        [dataChart],
    );

    return (
        <div className={styles.root}>
            <Chart data={data}></Chart>
        </div>
    );
};
