import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableHighlight
} from 'react-native';

import BusinessDetails from '../components/BusinessDetails'
import {ENTRIES1} from '../components/tempData';
const {width} = Dimensions.get('window');


export default class Business extends Component {
  constructor(props){
    super(props);
    this.state ={
      title: this.props.navigation.state.params.title,
      item: this.props.navigation.state.params.data,
    };
  }
  static navigationOptions = ({ navigation }) => ({

      title: navigation.state.params.title,
    

  })

  render() {

    const item = this.state.item;
    return (
      <View style={styles.container}>
          <BusinessDetails {...item}/>
      </View>
    );

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
