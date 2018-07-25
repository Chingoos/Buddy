import React, { Component } from 'react';
import {
  AppRegistry, StyleSheet, Text, View, TouchableOpacity, Platform, TextInput, SafeAreaView, Image
} from 'react-native';

export default class SignUp extends React.Component {
  static navigationOptions = {
    title: 'Welcome',
  };
  constructor(props){
    super(props)
  }
  render() {
    return (
      <SafeAreaView style={styles.scroll}>
        <View style={styles.logoContainer}>
          <Image style={styles.logo} source={require('../assets/images/ghost-2-icon.png')}>
          </Image>
        </View>

        <View style={styles.container}>
          <TextInput underlineColorAndroid='transparent' placeholder='Email' style={styles.textinput} />
          <TextInput underlineColorAndroid='transparent' placeholder='Password' style={styles.textinput} />
          <TextInput underlineColorAndroid='transparent' placeholder='Confirm Password' style={styles.textinput} />
          <TouchableOpacity style={styles.loginbtn}>
            <Text>Sign Up</Text>
          </TouchableOpacity>
          <View style={styles.signUpTextContainer}>
            <Text style={styles.signUpText}>Already have an account? </Text>
            <TouchableOpacity onPress={() =>         {this.props.navigation}      }>
              <Text style={styles.signUpButton}>Log In</Text></TouchableOpacity>
          </View>
        </View>

      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',

    paddingBottom: 2,
    paddingLeft: 15,
    paddingRight: 15,
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
    width:50,
    height: 50,
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
