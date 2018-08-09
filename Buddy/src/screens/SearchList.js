import React, { Component } from 'react';
import {
  Animated,
  Easing,
  StyleSheet,
  Text,
  Image,
  View,
  Dimensions,
  Platform,
  TouchableOpacity,
  ScrollView,
  FlatList,
  TouchableHighlight,


} from 'react-native';
import { ENTRIES1 } from '../components/tempData';
import SwipeList from '../components/SwipeList';
import { Header, Item, Input } from 'native-base';
import Icon from 'react-native-vector-icons/dist/SimpleLineIcons';
const window = Dimensions.get('window');
import listData from '../components/Data';
import colors from '../styles/colors';
export default class SearchList extends Component {
  constructor(props){
    super(props);
    this.state = {
      data : props.navigation.state.params.data,
      sortAsc: true,

    };
  }


  render() {

    return (



      <View style={styles.container}>
        <SwipeList style={styles.list} data={this.state.data} navigation ={this.props.navigation} />
      </View>
    );
  }

}


const styles = StyleSheet.create({
  scroll: {
    backgroundColor: 'white',
  },
  container: {

    flex: 1,
    backgroundColor: '#FFF',
  },
  list: {
    flex: 1,
    marginTop: 10,
  },
  title: {
    fontSize: 20,
    paddingVertical: 20,
    color: '#999999',
  },


  contentContainer: {
    width: window.width,

    ...Platform.select({
      ios: {
        paddingHorizontal: 30,
      },

      android: {
        paddingHorizontal: 0,
      }
    })
  },

  image: {
    width: 50,
    height: 50,
    marginRight: 30,
    borderRadius: 25,
  },

  text: {
    fontSize: 24,
    color: '#222222',
  },
  separatorViewStyle: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  separatorStyle: {
    height: 1,
    backgroundColor: '#000',
  },
  header: {
    borderBottomWidth: Platform.OS !== 'ios' ? 2 : 1,
    borderBottomColor: colors.accent,
    backgroundColor: colors.background,
  },
});
