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
const timer = require('react-native-timer');
import BusinessDetails from '../components/BusinessDetails'
import { Bubbles, DoubleBounce, Bars, Pulse } from 'react-native-loader';
import { Header, Item, Input } from 'native-base';
import Icon from 'react-native-vector-icons/dist/SimpleLineIcons';
import IconC from 'react-native-vector-icons/dist/MaterialCommunityIcons'
import colors from '../styles/colors';
const {width} = Dimensions.get('window');
export const SearchAgainButton = (props) => (
  <TouchableHighlight onPress={() => props.navigate.navigate('Search')}>
    <Text> Search Again </Text>
  </TouchableHighlight>
)
export default class RandomPick extends Component {
  constructor(props){
    super(props);
    this.state ={
      count: true,
      item: null,
      title: null,
    };
  }
  static navigationOptions = ({ navigation }) => ({

      title: 'Random Pick',
      headerRight: <SearchAgainButton navigate={navigation}/>

  })

  componentWillUnmount() {
    timer.clearTimeout(this);
  }
  count() {
    this.setState({count: true}, () => timer.setTimeout(
      this, 'count', () => this.setState({count: false}), 2000
    ));
  }
  refresh(){
    this.count();
    this.random();
  }
  random(){
    let i = this.props.navigation.state.params.data.length -1;
    const r = Math.floor(Math.random() *  i);
    this.setState({item: this.props.navigation.state.params.data[r]});
    this.setState({title: this.props.navigation.state.params.data[r].name})
  }
  componentDidMount()
  {
    this.count();
    this.random();
  }
  render() {
    if(this.state.count){
      return(
        <View style={styles.container}>
          <View style = {styles.card}>
            <View style={styles.bars}>
              <Bars size={50} color='#A4DE02' />
            </View>
          </View>
        </View>
      );
    }
    else {
      const item = this.state.item;
      return (
        <View style={styles.container}>
          <Header
            style={styles.header}
            androidStatusBarColor="white"
            iosBarStyle="dark-content"
            noShadow="false"
            rounded
            onPress
            searchBar
          >
            <Item>
              <IconC onPress={() => this.refresh()} name="refresh" color = 'black' size={25} style={{ paddingRight: 15 }} />
              <Text  numberOfLines={1} style={{ fontSize: 20, alignItems: 'center',  color: 'black', fontFamily: 'GothamRounded-Medium' }}> {this.state.title} </Text>
              <Icon onPress={() => this.props.navigation.navigate('Search')} name="magnifier" color = 'black'size={25} style={{ position: 'absolute', right: 10 }} />
            </Item>
          </Header>

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

  },
  card: {
    flex:1,
    alignItems:'center',
    justifyContent:'center',
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
