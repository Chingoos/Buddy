import React, { Component } from 'react';
import { View,  Text,  StyleSheet,  ScrollView,  Platform,} from 'react-native';
import {Header, Item, Input, Button } from'native-base';
import Icon from 'react-native-vector-icons/dist/SimpleLineIcons';
import colors from '../styles/colors';

export default class Home extends Component {
  render() {
    style = {
        borderBottomWidth: (Platform.OS !== 'ios') ? 2 : 1,
        borderBottomColor: colors.accent,
        backgroundColor: colors.background, };
    return (
      <ScrollView style ={styles.scroll}>
        <Header
          style={style}
          androidStatusBarColor='white'
          noShadow='false'
          searchBar rounded>
          <Item>
            <Icon name="magnifier" size={20} style={{paddingRight: 15}} />
            <Input placeholder="Search" />
          </Item>
          
        </Header>
        <View style = {styles.container}>
          <Text style={styles.font}>
            Popular nearby
          </Text>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingBottom: 8,
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 15,
  },
  scroll: {
      backgroundColor: 'white',
  },
  font: {
    //fontWeight: 'bold',
    fontSize: 30,
    color: 'black',
    fontFamily: 'GothamRounded-Medium'
  }
});
