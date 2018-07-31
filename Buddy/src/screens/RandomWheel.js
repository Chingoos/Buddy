import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import Roulette from 'react-native-casino-roulette';
import wheel from '../assets/images/wheel.png';
import marker from '../assets/images/marker.png';

//Roulette numbers
const numbers = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30]
const options  = numbers.map((o)=>({index:o}))

export default class RandomWheel extends Component {
  constructor(props){
    super(props);
    this.onRotate = this.onRotate.bind(this);
    this.onRotateChange = this.onRotateChange.bind(this);
    this.state={
      option:"Option selected:",
      rouletteState:'stop'
    }
  }
  render() {
    const{option, rouletteState} = this.state
    return (
      <View style={{alignItems:"center"}}>
        <Text>
          {`Option selected: ${option}`}
        </Text>
        <Text>
          {`Roulette state: ${rouletteState}`}
        </Text>
        <Roulette
                  enableUserRotate={rouletteState=='stop'}
                  background={wheel}
                  onRotate={this.onRotate}
                  onRotateChange={this.onRotateChange}
                  marker={marker}
                  options={options}
                  markerWidth={20} >
        </Roulette>

      </View>
    );
  }

  onRotateChange(state) {
    this.setState({
      rouletteState: state
    })
  }

  onRotate(option) {

    this.setState({
      option:option.index
    })
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
