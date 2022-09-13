import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import SearchableTable from './index';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    // title: 'Modal',
    component: SearchableTable,
} as ComponentMeta<typeof SearchableTable>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof SearchableTable> = (args) => <SearchableTable {...args} />;

export const SearchableTableBox = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
SearchableTableBox.args = {
};