import 'react-native';
import React from 'react';
import HeatMap from '../components/HeatMap';
import renderer from 'react-test-renderer';
import { MapView } from 'expo';

jest.doMock('expo', () => {
  const React = require('react');
  return class MockMapView extends React.Component {
    static Marker = props => React.createElement('Marker', props, props.children);
    static propTypes = { children: React.PropTypes.any };

    render() {
      return React.createElement('MapView', this.props, this.props.children);
    }
  }
});

test('renders correctly', () => {
  const tree = renderer.create(<HeatMap />).toJSON();
  expect(tree).toMatchSnapshot();
});
