import React from 'react';
import { Container, Content, Form, Item, Input, Icon, Title, Button, Footer, FooterTab, Spinner } from 'native-base';
import { Text, StyleSheet } from 'react-native';
import firebase from 'firebase';

export default class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      error: null,
      loading: false
    };
    this.onButtonPress = this.onButtonPress.bind(this);
    this.onLoginSuccess = this.onLoginSuccess.bind(this);
    this.onLoginFail = this.onLoginFail.bind(this);
  }

  onButtonPress() {
    const { email, password } = this.state;
    this.setState({
      error: null,
      loading: true
    });
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(this.onLoginSuccess)
      .catch(() => {
        firebase.auth().createUserWithEmailAndPassword(email, password)
          .then(this.onLoginSuccess)
          .catch(this.onLoginFail)
      });
  }

  onLoginFail() {
    this.setState({
      error: 'Oopsie, something went wrong...',
      loading: false
    })
  }

  onLoginSuccess() {
    this.setState({
      email: '',
      password: '',
      loading: false,
      error: ''
    });
  }

  render() {
    const { error, loading } = this.state;
    return (
      <Container>
        <Content style={styles.margin}>
          <Form>
            <Item inlineLabel>
              <Icon>✉️</Icon>
              <Input
                error={error}
                placeholder='Email'
                onChangeText={email => this.setState({ email })}
                autoCorrect={false}
                autoCapitalize='none'
                value={this.state.email}
              />
            </Item>
            <Item inlineLabel last>
              <Icon>🔑</Icon>
              <Input
                error={error}
                placeholder='Password'
                onChangeText={password => this.setState({ password })}
                secureTextEntry
                value={this.state.password}
              />
            </Item>
          </Form>
          {this.state.loading ?
            <Spinner color='#5a9bd2' /> :
            <Button
              style={styles.margin}
              primary
              block
              onPress={this.onButtonPress}
              >
                <Text style={styles.buttonText}>Log In</Text>
              </Button>
          }
          <Text style={styles.error}>{error}</Text>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  margin: {
    margin: 15
  },
  buttonText: {
    color: 'white',
    fontSize: 18
  },
  error: {
    color: 'red',
    textAlign: 'center',
    fontSize: 18
  }
});
