import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Select } from '@/shared/ui/Select/Select';

export default {
    title: 'UI/Select',
    component: Select,
} as ComponentMeta<typeof Select>;

const Template: ComponentStory<typeof Select> = (args) => (
    <div style={{ maxWidth: '128px' }}>
        <Select {...args} />
    </div>
);

export const Default = Template.bind({});

Default.args = {
    id: '1',
    items: [
        {
            id: '1',
            label: 'Label 1',
        },
        {
            id: '2',
            label: 'Label 2',
        },
        {
            id: '3',
            label: 'Label 3',
        },
    ],
};
