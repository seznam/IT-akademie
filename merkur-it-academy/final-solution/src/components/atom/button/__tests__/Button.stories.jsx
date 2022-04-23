import { h } from 'preact';

import Button from '../Button';

export default {
  title: 'Atom/Button',
  component: Button,
  args: {
    children: 'Click me',
    primary: false,
  },
  argTypes: {
    onClick: 'action',
  },
  decorators: [
    (Story) => (
      <div style={{ width: '10em' }}>
        <Story />
      </div>
    ),
  ],
};

const Template = (args) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = { primary: true, children: 'Primary Button' };

export const Secondary = Template.bind({});
Secondary.args = {};

export const PrimaryDisabled = Template.bind({});
PrimaryDisabled.args = {
  ...Primary.args,
  disabled: true,
};
