import React from 'react';
import { Container, Content, Header, Button, Left, Right, Body, Title, ActionSheet } from 'native-base';
import { Text, StyleSheet } from 'react-native';
import { EvilIcons } from '@expo/vector-icons';
import { StackNavigator } from 'react-navigation';
import firebase from 'firebase';

const BUTTONS = ['Delete', 'Cancel'];
const DELETE_INDEX = 0;
const CANCEL_INDEX = 1;

export default class Settings extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      error: ''
    };
    this.deleteAccount = this.deleteAccount.bind(this)
  }

  deleteAccount() {
    const user = firebase.auth().currentUser;
    user.delete().then(() => {
      return;
    }).catch((error) => {
      this.setState({
        error: 'Error has occurred.'
      })
    })
  }

  render() {
    return (
      <Container>
        <Header>
          <Left>
            <Button
              transparent
              onPress={() => this.props.navigation.goBack()}
              >
              <EvilIcons name='chevron-left' size={30}/>
            </Button>
          </Left>
          <Body>
            <Title style={styles.margin}>Settings</Title>
          </Body>
          <Right />
        </Header>

        <Content style={styles.margin}>
          <Button
            block
            style={styles.button}
            danger
            onPress={() =>
            ActionSheet.show(
              {
                options: BUTTONS,
                cancelButtonIndex: 1,
                destructiveButtonIndex: 0,
                title: "Delete account? This can't be undone."
              },
              buttonIndex => {
                if (buttonIndex === DELETE_INDEX) {
                  this.deleteAccount();
                }
              }
            )}>
            <Text style={styles.buttonText}>Delete Account</Text>
          </Button>
          <Button
            block
            style={styles.button}
            dark
            onPress={() => firebase.auth().signOut()}>
            <Text style={styles.buttonText}>Sign Out</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  margin: {
    margin: 10
  },
  button: {
    marginBottom: 10
  },
  buttonText: {
    color: 'white',
    fontSize: 18
  },
});
