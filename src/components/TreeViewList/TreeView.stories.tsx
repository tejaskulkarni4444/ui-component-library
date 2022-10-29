import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import TreeViewList from './index';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'TreeViewList',
  component: TreeViewList,
} as ComponentMeta<typeof TreeViewList>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof TreeViewList> = (args) => <TreeViewList {...args} />;

export const TreeViewListBox = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
TreeViewListBox.args = {
  
};