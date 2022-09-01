import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import ActionModal from './index';
import { Typography } from '@mui/material';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Modal',
    component: ActionModal,
} as ComponentMeta<typeof ActionModal>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof ActionModal> = (args) => <ActionModal {...args} />;

export const ModalBox = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
ModalBox.args = {
    title: 'This is modal title',
    open: false,
    children: <Typography>
        Modal body
    </Typography>
};