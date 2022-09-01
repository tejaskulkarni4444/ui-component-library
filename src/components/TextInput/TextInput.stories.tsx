import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import TextInput from './index';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'TextInput',
  component: TextInput,
} as ComponentMeta<typeof TextInput>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof TextInput> = (args) => <TextInput {...args} />;

export const TextInputBox = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
TextInputBox.args = {
  label: 'insert text!',
  fontSize: '14'
};