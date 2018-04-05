import React from 'react';
import Settings from '../components/Settings';
import renderer from 'react-test-renderer';

test('renders correctly', () => {
  const tree = renderer.create(<Settings />).toJSON();
  expect(tree).toMatchSnapshot();
});
