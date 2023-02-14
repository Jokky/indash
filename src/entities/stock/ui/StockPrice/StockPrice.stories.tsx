import { ComponentMeta, ComponentStory } from '@storybook/react';
import { StockPrice } from '@/entities/stock/ui/StockPrice/StockPrice';

export default {
    title: 'Entities/StockPrice',
    component: StockPrice,
} as ComponentMeta<typeof StockPrice>;

const Template: ComponentStory<typeof StockPrice> = (args) => (
    <StockPrice {...args} />
);

export const Default = Template.bind({});

Default.args = {
    previousAmount: 121,
    amount: 124,
    currency: '$',
};
