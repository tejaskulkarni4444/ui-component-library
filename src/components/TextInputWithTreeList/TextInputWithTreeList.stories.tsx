import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import TextInputWithTreeList from './index';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'TextInputWithTreeList',
  component: TextInputWithTreeList,
} as ComponentMeta<typeof TextInputWithTreeList>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof TextInputWithTreeList> = (args) => <TextInputWithTreeList {...args} />;

export const TextInputWithTreeListBox = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
TextInputWithTreeListBox.args = {
  label: 'LabelText!',
  fontSize: '14',
  placeholder: 'Enter text',
  border: 'standard',
  multipleSelection: true,
  fontColor: '#000000'
};