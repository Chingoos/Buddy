import React from 'react';
import { StatusBar, View, TouchableHighlight, Text } from 'react-native';
import { StackNavigator, createStackNavigator, SwitchNavigator } from 'react-navigation';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import { Search, Home, Profile, Login,   } from './screens';
import SignUp from './screens/SignUp';
import Calendar from './screens/Calendar';
import SearchList from './screens/SearchList';
import RandomWheel from './screens/RandomWheel';
import Swiper from './screens/Swiper';
import RandomPick from './screens/RandomPick';
import BusinessSearch from './screens/BusinessSearch'
import Business from './screens/Business'
import Photo from './screens/Photo'
import Review from './screens/Review'
const HomeStack = createStackNavigator({
  Home: { screen: Home,

     navigationOptions: () => ({
      header: null
    }),
  },
  BusinessSearch:  { screen: BusinessSearch,
    navigationOptions: () => ({
     header: null
   }),
 },
 Business:  { screen: Business,
   navigationOptions: () => ({
     header: null
  }),
 }
});
const LoginStack = createStackNavigator({
  Login: { screen: Login,

     navigationOptions: () => ({
      header: null
    }),
  },
  SignUp:  { screen: SignUp,
    navigationOptions: () => ({
     header: null
   }),
  }
});
const SearchStack = createStackNavigator({
  Search: { screen: Search,

     navigationOptions: () => ({
      header: null
    }),
  },
    Swiper:  { screen: Swiper,
      navigationOptions: () => ({

     }),
   },
    SearchList: {screen: SearchList,
   },
  RandomPick: {screen: RandomPick},
});
const ProfileStack = createStackNavigator({
  Profile: { screen: Profile,

     navigationOptions: () => ({
      header: null
    }),
  },
  Business:  { screen: Business,
     navigationOptions: () => ({
       header: null
    }),
  },
  Photo:  { screen: Photo,
    navigationOptions: () => ({
      header: null
     }),
   },
   Review:  { screen: Review,
     navigationOptions: () => ({
       header: null
      }),
    },
});
const AppNavigation = createMaterialBottomTabNavigator(
  {
    Home: { screen: HomeStack },
    Search: { screen: SearchStack },
    Login: { screen: LoginStack },
    Calendar: {screen: Calendar},
    Profile: { screen: ProfileStack },
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === 'Home') {
          iconName = `ghost`;
        } else if (routeName === 'Search') {
          iconName = `magnifier`;
        } else if (routeName === 'Profile') {
          iconName = `user`;
        } else if (routeName === 'Calendar') {
          iconName = `calendar`;
        } else {
          iconName = `emotsmile`;
        }
        // You can return any component that you like here! We usually use an
        // icon component from react-native-vector-icons
        return <Icon name={iconName} size={22.5} color={tintColor} />;
      },
    }),
    labeled: false,
    initialRouteName: 'Login',
    activeTintColor: 'black',
    inactiveTintColor: 'grey',
    barStyle: { backgroundColor: 'white' },
  }
);



export default class App extends React.Component{
  constructor(props)
  {
    super(props);
    this.state = {loggedIn: true
    };
  }





  onButtonPress = () => {
    console.log("CHANGED");
    this.setState({
      loggedIn: true
    });
  }
  render(){
    if(this.state.loggedIn){
      return(
      <View style={{ flex: 1 }}>
        <StatusBar backgroundColor="white" barStyle="dark-content" />
        <AppNavigation />
      </View>
    )}
    else {
      return(<View style={{ flex: 1 }}>
        <StatusBar backgroundColor="white" barStyle="dark-content" />
        <LoginStack action={this.onButtonPress}/>
      </View>)
    }
  }
}
