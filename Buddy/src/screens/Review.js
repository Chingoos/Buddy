import React, { Component, PropTypes } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  Platform,
} from 'react-native';
import colors from '../styles/colors';
import { Header, Item, Input } from 'native-base';
import Icon from 'react-native-vector-icons/dist/SimpleLineIcons';
const {width, height} = Dimensions.get('window');
export default class Review extends Component {
  constructor(props){
    super(props);
    this.state={
      data: this.props.navigation.state.params.data,
      title:  this.props.navigation.state.params.title,
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <Header
          style={styles.header}
          androidStatusBarColor="white"
          iosBarStyle="dark-content"
          noShadow="false"
          rounded
          onPress
        >
          <Item>
            <Icon onPress={() => this.props.navigation.goBack()} name="arrow-left" size={20} style={{ paddingRight: 15 }} />
            <Text   style={{ fontSize: 20,  color: 'black', fontFamily: 'GothamRounded-Medium' }}> {this.state.title} </Text>
          </Item>
        </Header>
        <View >
          <View style={{flexDirection: 'row',}}>

            <Text style={styles.category}> Rating: {this.state.data.rating} </Text>
            <View style={{right: 0, position: "absolute"}}>
              <Text style={styles.category}> {this.state.data.date} </Text>
            </View>
          </View>
          <Text style={styles.category}> {this.state.data.review} </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  imageContainer:{
    flex:1,
    justifyContent: 'center',
    alignSelf: 'stretch',

  },
  image: {
    width: width,
    height: height-100,


  },
  header: {
    borderBottomWidth: Platform.OS !== 'ios' ? 2 : 1,
    borderBottomColor: colors.accent,
    backgroundColor: colors.background,
  },
  category: {
    fontSize: 18,
    color: colors.black,
    fontFamily: 'GothamRounded-Medium',
  },
});
