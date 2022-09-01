import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import TextInputWithSearch from './index';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'TextInputWithSearch',
  component: TextInputWithSearch,
} as ComponentMeta<typeof TextInputWithSearch>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof TextInputWithSearch> = (args) => <TextInputWithSearch {...args} />;

export const TextInputWithSearchBox = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
TextInputWithSearchBox.args = {
  label: 'LabelText!',
  fontSize: '14',
  placeholder: 'Enter text'
};