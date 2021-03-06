import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableHighlight,
  Platform
} from 'react-native';
import { Header, Item, Input } from 'native-base';
import Icon from 'react-native-vector-icons/dist/SimpleLineIcons';
import colors from '../styles/colors';
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


  render() {

    const item = this.state.item;
    return (
      <View style={ { flex: 1,  backgroundColor: colors.background,}}>
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
        <View style={styles.container}>

          <BusinessDetails {...item}/>
        </View>
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
  },
  header: {
    borderBottomWidth: Platform.OS !== 'ios' ? 2 : 1,
    borderBottomColor: colors.accent,
    backgroundColor: colors.background,
  },
});
