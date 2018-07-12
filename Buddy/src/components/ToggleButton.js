import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableHighlight,
  ImageBackground
} from 'react-native';

export default class ToggleButton extends Component {

  render() {
    return (
      <TouchableHighlight underlayColor='white' style={styles.bubblechoice} onPress={this.props.onPress}>
        <ImageBackground style={styles.bubblechoice} source={{uri: 'http://icons.iconarchive.com/icons/icons8/halloween/256/ghost-2-icon.png'}}>
          <View style={[styles.overlay, this.props.selected ? {backgroundColor: 'rgba(80,94,104,0)'} : {}]}>
            <Text style={styles.choicetext}>{this.props.label}</Text>
          </View>
        </ImageBackground>
      </TouchableHighlight>
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
