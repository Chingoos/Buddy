import React, { Component } from 'react';
import {
  AppRegistry, StyleSheet, Text, View, TouchableOpacity, Platform, TextInput, SafeAreaView, Image
} from 'react-native';
import { SocialIcon } from 'react-native-elements'
import { GoogleSignin, GoogleSigninButton } from 'react-native-google-signin';
import FBSDK, {LoginManager} from 'react-native-fbsdk';
import config from '../config';
import Stack from '../App';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      error: null,
    };
  }
  async componentDidMount() {
     await this._configureGoogleSignIn();
     await this._getCurrentUser();
   }

   async _configureGoogleSignIn() {
     await GoogleSignin.hasPlayServices({ autoResolve: true });
     const configPlatform = {
       ...Platform.select({
         ios: {
           iosClientId: config.iosClientId,
         },
         android: {},
       }),
     };

     await GoogleSignin.configure({
       ...configPlatform,
       webClientId: config.webClientId,
       offlineAccess: false,
     });
   }

   async _getCurrentUser() {
     try {
       const user = await GoogleSignin.currentUserAsync();
       this.setState({ user, error: null });
     } catch (error) {
       this.setState({
         error,
       });
     }
   }
   _fbAuth(){
     LoginManager.logInWithReadPermissions(['public_profile']).then(function(result) {
       if (Result.isCancelled) {
         console.log('Login was cancelled ');
       } else {
         console.log('Login was a sucess' +result.grantedPersmissions.toString());
       }
     }, function(error){
       console.log('An error occured: '+error);
     })
   }

  render() {
    const { user, error } = this.state;
    const {navigate} = this.props.navigation;
    if (!user) {
      return (
        <SafeAreaView style={styles.scroll}>
          <View style={styles.logoContainer}>
            <Image style={styles.logo} source={require('../assets/images/ghost-2-icon.png')}>
            </Image>
          </View>
          <View style={styles.container}>
            <SocialIcon
              title='Sign In'
              style={{ width: 350, height: 48 }}
              button
              onPress={this._fbAuth}
              type='facebook'
              />
            <GoogleSigninButton
              style={{ width: 350, height: 48 }}
              size={GoogleSigninButton.Size.Standard}
              color={GoogleSigninButton.Color.Auto}
              onPress={this._signIn}
            />
            {error && (
              <Text>
                {error.toString()} code: {error.code}
              </Text>
            )}
          </View>

          <View style={styles.container}>
            <TextInput underlineColorAndroid='transparent' placeholder='Email' style={styles.textinput} />
            <TextInput underlineColorAndroid='transparent' placeholder='Password' style={styles.textinput} />
            <TouchableOpacity style={styles.loginbtn}>
              <Text>Log In</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.signUpTextContainer}>
            <Text style={styles.signUpText}>No account? </Text>
            <TouchableOpacity onPress={() => navigate('Stack', {}, NavigationActions.navigate({ routeName: 'Home' })) }>
              <Text style={styles.signUpButton}>Sign Up</Text></TouchableOpacity>
          </View>
        </SafeAreaView>
      );
    } else {
      return (
        <View style={styles.container}>
          <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 20 }}>
            Welcome {user.name}
          </Text>
          <Text>Your email is: {user.email}</Text>
          <TouchableOpacity onPress={this._signOut}>
            <View style={{ marginTop: 50 }}>
              <Text>Log out</Text>
            </View>
          </TouchableOpacity>
        </View>
      );
    }
  }
  _signIn = async () => {
    try {
      const user = await GoogleSignin.signIn();
      this.setState({ user, error: null });
    } catch (error) {
      if (error.code === 'CANCELED') {
        error.message = 'user canceled the login flow';
      }
      this.setState({
        error,
      });
    }
  };

  _signOut = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      this.setState({ user: null });
    } catch (error) {
      this.setState({
        error,
      });
    }
  };


}
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',

    paddingBottom: 2,
    paddingLeft: 25,
    paddingRight: 25,
    paddingTop: 15,
  },
  textinput: {
    color:'black',
    alignSelf: 'stretch',
    padding: 12,
    marginBottom: 10,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderColor: 'gray',
    borderWidth: 0.6,
  },
  scroll: {
    backgroundColor: 'white',
    flex: 1,
    flexDirection: 'column',
  },
  loginbtn:{
    backgroundColor: '#ecf0f1',
    alignSelf: 'stretch',
    alignItems: 'center',
    padding: 14,
    marginTop: 10,
  },
  logoContainer:{
    alignItems: 'center',
    justifyContent: 'center',
    flex:1
  },
  logo:{
    width:80,
    height: 80,
  },
  signUpTextContainer:{

    alignItems:'flex-end',
    justifyContent: 'center',
    paddingVertical: 16,
    flexDirection: 'row'
  },
  signUpText:{
    color:'black',
    fontSize:16
  },
  signUpButton:{
    color: 'black',
    fontSize: 16,
    fontWeight: '500'
  }
});
