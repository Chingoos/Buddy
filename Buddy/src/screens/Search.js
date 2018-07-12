import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableHighlight,
  ImageBackground
} from 'react-native';
import {Container, Content, Button } from'native-base';
import ToggleButton from '../components/ToggleButton'
export default class Search extends Component {
  constructor(props){
    super(props);
    this.state = {
      paleo: false,
      vegan: false,
      vegetarian: false,
    }
  }
  updateChoice(type) {
    let newState = {...this.state};
    newState[type] = !newState[type];
    this.setState(newState);
  }
  render() {
    return (
      <ScrollView style ={styles.scroll}>
        <ToggleButton label='BBQ' onPress={() => { this.updateChoice('vegan')  }} selected={this.state.vegan} />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scroll: {
      backgroundColor: 'white',
  },
  font: {
    //fontWeight: 'bold',
    fontSize: 30,
    color: 'black',
    fontFamily: 'BentonSans Light',
    margin: 6
  },
  choicetext: {
    alignItems: 'center',
    alignSelf: 'center',
    color: 'white',
    marginTop: 35,
    fontWeight: '600',
    marginLeft: -18,
    fontSize: 14,
    flex: 1,
    textAlign: 'center'
  },
  overlay: {
    backgroundColor:'rgba(80,94,104,0.7)',
    height: 100,
    width: 100,
    alignItems:'center'
  },
  bubblechoice: {
   height: window.height/8.335,
   borderRadius: (window.height/8.3350)/2,
   marginRight: 2,
   width: window.height/8.335,
 },
});
