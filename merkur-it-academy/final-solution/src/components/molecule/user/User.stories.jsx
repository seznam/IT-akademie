import User from './User';

export default {
  title: 'Molecule/User',
  component: User,
};

const Template = (args) => <User {...args} />;

export const Default = Template.bind({});
Default.args = {
  widget: {
    props: {},
    state: {
      user: {
        password:
          'hyWcfTHibJP0lYhewoyY922EXLouYgZ5GitS0G/M5cuk3eC7d+v9Imugs1tS4xK8n3B1FvoAx/lBCrbGjUlzKw==',
        username: 'john.doe',
        displayName: 'John Doe',
        avatar: 'https://www.blexar.com/avatar.png',
      },
    },
  },
};
