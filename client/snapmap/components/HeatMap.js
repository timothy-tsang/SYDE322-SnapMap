import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { MapView } from 'expo';
import { map } from 'lodash';

const { width, height } = Dimensions.get('window');

export default class Maps extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const { region, markers } = this.props;
    return (
      <MapView
        style={styles.map}
        scrollEnabled
        zoomEnabled
        region={region}
      >
        {map(markers, (marker, key) => {
          const { coordinate, title } = marker;
          return(
            <MapView.Marker
              key={key}
              coordinate={coordinate}
              title={title}
            />
          );
        })}
     </MapView>
    );
  }
}

const styles = StyleSheet.create({
  map: {
    width,
    height: height/2
  },
});
