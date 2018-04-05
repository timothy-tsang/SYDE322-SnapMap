import React from 'react';
import List from '../components/List';
import renderer from 'react-test-renderer';

test('renders correctly', () => {
  const tree = renderer.create(<List />).toJSON();
  expect(tree).toMatchSnapshot();
});
