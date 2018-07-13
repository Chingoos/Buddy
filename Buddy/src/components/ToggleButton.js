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
      <TouchableHighlight underlayColor='transparent' style={styles.bubblechoice} onPress={this.props.onPress}>
        <ImageBackground style={styles.imageWrap} source={this.props.source}>
          <View style={[styles.overlay, this.props.selected ? {backgroundColor: 'transparent'} : {}]}>
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
    fontFamily: 'GothamRounded-Medium',
    margin: 6
  },
  choicetext: {
    alignItems: 'center',
    //alignSelf: 'center',
    color: 'white',
    marginTop: 25,
    fontWeight: '600',
//    marginLeft: 0,
    fontSize: 12,
  //  flex: 1,
  //  textAlign: 'center'
  },
  overlay: {
    backgroundColor:'rgba(0,0,0,0.5)',
    height: 60,
    width: 60,
    borderRadius: 30,
    alignItems:'center'
  },
  bubblechoice: {
   height: 60,
   borderRadius: 30,
   marginRight: 5 ,
   width: 60,
   borderColor: '#ddd',
   borderBottomWidth: 0,
   shadowColor: 'rgba(0,0,0, .4)', // IOS
   shadowOffset: { height: 1, width: 1 }, // IOS
   shadowOpacity: 1, // IOS
   shadowRadius: 2, //IOS
   elevation: 3, // Android
 },
 imageWrap: {
   flex: 1,
},
});
