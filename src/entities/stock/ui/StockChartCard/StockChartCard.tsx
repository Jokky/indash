'use client';

import {
    Chart as ChartJS,
    CategoryScale,
    Legend,
    LinearScale,
    LineElement,
    PointElement,
    Title,
    Tooltip,
    Filler,
    TimeScale,
} from 'chart.js';
import 'chartjs-adapter-date-fns';
import { ChartOptions } from 'chart.js/dist/types';
import { ru } from 'date-fns/locale';

import { FC, useMemo } from 'react';
import { Line } from 'react-chartjs-2';

import { StockChart } from '@/types';

import styles from './StockChartCard.module.scss';

ChartJS.register({
    id: 'tooltipLine',
    afterDraw: (chart: any) => {
        if (chart.tooltip._active && chart.tooltip._active.length) {
            const activePoint = chart.tooltip._active[0];
            const ctx = chart.ctx;
            const x = activePoint.element.x;
            const topY = chart.scales.y.top;
            const bottomY = chart.scales.y.bottom;

            ctx.save();
            ctx.setLineDash([3, 4]);
            ctx.beginPath();
            ctx.moveTo(x, topY);
            ctx.lineTo(x, bottomY);
            ctx.lineWidth = 2;
            ctx.strokeStyle = '#bebebe';
            ctx.stroke();
            ctx.restore();
        }
    },
});

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler,
    TimeScale,
    // zoomPlugin,
);

interface StockChartProps {
    dataChart: StockChart[];
}

const options: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    borderColor: '#000',
    animation: {
        duration: 0,
    },
    plugins: {
        legend: {
            display: false,
        },
        // zoom: {
        //     pan: {
        //         enabled: true,
        //         mode: 'xy',
        //         threshold: 0.5,
        //     },
        //     zoom: {
        //         wheel: {
        //             enabled: true,
        //         },
        //         pinch: {
        //             enabled: true,
        //         },
        //         mode: 'xy',
        //     },
        // },
    },
    elements: {
        line: {
            tension: 0.2,
        },
    },
    scales: {
        x: {
            type: 'time',
            offset: true,
            border: {
                display: false,
            },
            grid: {
                display: false,
            },
            ticks: {
                align: 'inner',
                autoSkip: true,
                autoSkipPadding: 20,
                maxRotation: 0,
                minRotation: 0,
            },
            time: {
                displayFormats: {
                    month: 'MMM yyyy',
                    day: 'dd.MM',
                    hour: 'HH:mm',
                    minute: 'HH:mm',
                    second: 'mm:ss',
                },
                minUnit: 'second',
                round: 'minute',
            },
            adapters: {
                date: {
                    locale: ru,
                },
            },
        },
        y: {
            offset: true,
            border: {
                display: false,
            },
            grid: {
                display: false,
            },
            ticks: {
                display: false,
            },
        },
    },
    layout: {
        autoPadding: true,
    },
    interaction: {
        mode: 'index',
        intersect: false,
    },
};

export const StockChartCard: FC<StockChartProps> = ({ dataChart }) => {
    const { labels, data } = useMemo(
        () =>
            dataChart.reduce(
                (previousValue, { time, close }) => {
                    if (!time) {
                        return previousValue;
                    }

                    previousValue.labels?.push(time);
                    previousValue.data.push(close);

                    return previousValue;
                },
                { labels: [], data: [] } as {
                    labels: number[];
                    data: (number | null)[];
                },
            ),
        [dataChart],
    );

    return (
        <div className={styles.root}>
            <Line
                options={options}
                data={{
                    labels,
                    datasets: [
                        {
                            data,
                            fill: true,
                            pointBorderWidth: 0,
                            pointRadius: 0,
                            pointBackgroundColor: '#000',
                            pointHoverBackgroundColor: '#fff',
                            pointHoverBorderColor: '#000',
                            pointHoverBorderWidth: 4,
                            borderWidth: 2,
                            backgroundColor: ({ chart: { ctx } }) => {
                                const gradient = ctx.createLinearGradient(
                                    0,
                                    0,
                                    0,
                                    200,
                                );
                                gradient.addColorStop(0, 'rgba(0,0,0,0.1)');
                                gradient.addColorStop(0.2, 'rgba(0,0,0,0.05)');
                                gradient.addColorStop(1, 'rgba(0,0,0,0)');
                                return gradient;
                            },
                        },
                    ],
                }}
            />
        </div>
    );
};
