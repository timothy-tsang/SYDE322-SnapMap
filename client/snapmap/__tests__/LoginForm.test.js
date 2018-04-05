import React from 'react';
import LoginForm from '../components/LoginForm';
import renderer from 'react-test-renderer';

test('renders correctly', () => {
  const tree = renderer.create(<LoginForm />).toJSON();
  expect(tree).toMatchSnapshot();
});
