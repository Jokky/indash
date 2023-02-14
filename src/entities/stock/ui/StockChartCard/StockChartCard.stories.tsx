import { ComponentMeta, ComponentStory } from '@storybook/react';
import { StockChartCard } from '@/entities/stock/ui';

export default {
    title: 'Entities/StockChartCard',
    component: StockChartCard,
} as ComponentMeta<typeof StockChartCard>;

const Template: ComponentStory<typeof StockChartCard> = (args) => (
    <div style={{ maxWidth: '312px' }}>
        <StockChartCard {...args} />
    </div>
);

export const Default = Template.bind({});

Default.args = {
    dataChart: [
        { close: 1, time: 1, open: null },
        { close: 4, time: 1, open: null },
        { close: 10, time: 1, open: null },
        { close: 3, time: 1, open: null },
    ],
};
