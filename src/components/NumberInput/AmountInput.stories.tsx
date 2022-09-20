import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import NumberInput from './index';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'NumberInput',
  component: NumberInput,
} as ComponentMeta<typeof NumberInput>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof NumberInput> = (args) => <NumberInput {...args} />;

export const NumberInputBox = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
NumberInputBox.args = {
  label: 'insert text!',
  fontSize: '14'
};