import { ComponentMeta, ComponentStory } from '@storybook/react';
import { StockPropertyItem } from '@/entities/stock';

export default {
    title: 'Entities/StockProperty',
    component: StockPropertyItem,
} as ComponentMeta<typeof StockPropertyItem>;

const Template: ComponentStory<typeof StockPropertyItem> = (args) => (
    <div style={{ maxWidth: '312px' }}>
        <StockPropertyItem {...args}></StockPropertyItem>
    </div>
);

export const Default = Template.bind({});

Default.args = {
    name: 'P/E',
    value: 28.99,
};
