import { ColorType, createChart } from 'lightweight-charts';
import { FC, useEffect, useRef } from 'react';

interface DataItem {
    time: number;
    value: number;
}

interface ChartProps {
    data: DataItem[];
}

export const Chart: FC<ChartProps> = ({ data }) => {
    const chartContainerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (!chartContainerRef.current) {
            return;
        }

        const chart = createChart(chartContainerRef.current, {
            layout: {
                background: {
                    type: ColorType.Solid,
                    color: 'white',
                },
                textColor: '#000',
            },
            grid: {
                horzLines: {
                    visible: false,
                },
                vertLines: {
                    visible: false,
                },
            },
            height: 156,
        });

        const newSeries = chart.addAreaSeries({
            lineColor: '#000000',
            topColor: '#a4a4a4',
            baseLineColor: 'rgba(41, 98, 255, 0.28)',
            bottomColor: 'white',
            lineWidth: 2,
        });

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        newSeries.setData(data);
        chart.timeScale().fitContent();

        const handleResize = () => {
            chart.applyOptions({
                width: chartContainerRef.current?.clientWidth,
            });
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            chart.remove();
        };
    }, [data]);

    return <div ref={chartContainerRef} />;
};
