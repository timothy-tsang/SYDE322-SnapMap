import React from 'react';
import { List, ListItem, Left, Right, Button } from 'native-base';
import { View, Text, StyleSheet } from 'react-native';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const { locations } = this.props;
    return (
      <View style={styles.list}>
        <Text style={styles.listTitle}>List of Possible Locations</Text>
        <List dataArray={locations}
          renderRow={data =>
            <ListItem onPress={() => this.props.updateMap(data.coordinate)}>
              <Left>
                <Text>{data.title}</Text>
              </Left>
              <Right>
                <Text>{data.chance}%</Text>
              </Right>
            </ListItem>
          }
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  list: {
    marginBottom: 10
  },
  listTitle: {
    textAlign: 'center',
    fontSize: 18,
    margin: 10
  },
});
