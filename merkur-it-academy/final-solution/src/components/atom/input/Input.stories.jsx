import Input from './Input';

export default {
  title: 'Atom/Input',
  component: Input,
  argTypes: {
    label: { control: 'text' },
  },
};

const Template = (args) => <Input {...args} />;

export const Default = Template.bind({});

export const WithLabel = Template.bind({});
WithLabel.args = {
  label: 'Custom label',
};

export const Disabled = Template.bind({});
Disabled.args = {
  label: 'Custom label',
  disabled: true,
};
