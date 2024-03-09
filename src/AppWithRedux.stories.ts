import type { Meta, StoryObj } from '@storybook/react';
import AppWithRedux from "./AppWithRedux";
import {ReduxStoreProviderDecorator} from "./decorators/ReduxStoreProviderDecorator";




// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof AppWithRedux> = {
  title: 'TODOLIST/AppWithRedux',
  component: AppWithRedux,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  decorators: [ReduxStoreProviderDecorator]
}



export default meta;
type Story = StoryObj<typeof AppWithRedux>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const AppWithReduxStory: Story = {}

