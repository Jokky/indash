import { ComponentMeta, ComponentStory } from '@storybook/react';
import { StockChart, StockProperty } from '@/types';
import { StockEmpty, StockPropertyItem } from '@/entities/stock';
import { StockChartCard } from '@/entities/stock/ui/StockChartCard';
import { StockCard } from './StockCard';

export default {
    title: 'Entities/StockCard',
    component: StockCard,
} as ComponentMeta<typeof StockCard>;

const Template: ComponentStory<typeof StockCard> = (args) => (
    <div style={{ maxWidth: '418px' }}>
        <StockCard {...args}></StockCard>
    </div>
);

export const Default = Template.bind({});

Default.args = {
    name: 'Apple',
    ticker: 'AAPL',
    color: 'default',
    icon: 'https://invest-brands.cdn-tinkoff.ru/US0378331005x640.png',
    price: {
        amount: 129,
        currency: '$',
    },
};

export const WithProperties = Template.bind({});

const stockProperties: StockProperty[] = [
    {
        name: 'P/E',
        value: '28,99',
    },
    {
        name: 'P/S',
        value: '7,53',
    },
    {
        name: 'ROE',
        value: '145,57%',
    },
];

WithProperties.args = {
    ...Default.args,
    after: (
        <>
            {stockProperties.map((props, index) => (
                <StockPropertyItem {...props} key={index} />
            ))}
        </>
    ),
};

export const WithChart = Template.bind({});

const times = Array.from({ length: 6 }, (v, k) =>
    new Date(`${k}-01-2023`).getTime(),
);

const dataChart: StockChart[] = times.map((time, index) => ({
    time,
    open: index + 1,
    close: index + 1,
}));

WithChart.args = {
    ...Default.args,
    after: <StockChartCard dataChart={dataChart} />,
};

export const WithEmpty = Template.bind({});

WithEmpty.args = {
    ...Default.args,
    after: <StockEmpty />,
};
