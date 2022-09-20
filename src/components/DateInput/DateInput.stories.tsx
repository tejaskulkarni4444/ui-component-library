import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import DateInput from './index';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'DateInput',
  component: DateInput,
} as ComponentMeta<typeof DateInput>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof DateInput> = (args) => <DateInput {...args} />;

export const DateInputBox = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
DateInputBox.args = {
  label: 'insert text!',
  fontSize: '14'
};