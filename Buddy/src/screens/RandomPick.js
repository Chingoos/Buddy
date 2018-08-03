import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView
} from 'react-native';
const timer = require('react-native-timer');
import BusinessDetails from '../components/BusinessDetails'
import { Bubbles, DoubleBounce, Bars, Pulse } from 'react-native-loader';
import {ENTRIES1} from '../components/tempData';
const {width} = Dimensions.get('window');
export default class RandomPick extends Component {
  constructor(props){
    super(props);
    this.state ={
      count: true,
      item: null,
    };
  }
  componentWillUnmount() {
    timer.clearTimeout(this);
  }
  count() {
    this.setState({count: true}, () => timer.setTimeout(
      this, 'count', () => this.setState({count: false}), 2000
    ));
  }
  random(){
    let i = ENTRIES1.length -1;
    const r = Math.floor(Math.random() *  i);
    this.setState({item: ENTRIES1[r]});
  }
  componentDidMount()
  {
    this.count();
    this.random();
  }
  render() {
    if(this.state.count){
      console.log(this.state.item)
      return(
        <View style={styles.container}>
          <View style={styles.bars}>
            <Bars size={50} color='#A4DE02' />
          </View>
        </View>
      );
    }
    else {
      const item = this.state.item;
      return (
        <View style={styles.container}>

            <BusinessDetails {...item}/>

        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: "#FFF",
    alignItems:'center',
    justifyContent:'center',
  },
  scroll: {

    backgroundColor: "#FFF",

  },
  bars:
  {
    alignSelf: 'center',
    justifyContent:"flex-start",
    alignItems: 'center',
    position:"absolute",
  }
});
