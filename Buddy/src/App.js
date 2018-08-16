import React, { Component } from 'react';
import { StatusBar, View } from 'react-native';
import {
  StackNavigator,
  createStackNavigator,
  SwitchNavigator,
} from 'react-navigation';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import configureStore from './store/store';
import {Search, Home, Profile, Login } from './screens';
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


const { store, persistor } = configureStore();

const HomeStack = createStackNavigator({
  Home: {
    screen: Home,
    navigationOptions: () => ({
      header: null,
    }),
  },
  BusinessSearch: {
    screen: BusinessSearch,
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
  Login: {
    screen: Login,
    navigationOptions: () => ({
      header: null,
    }),
  },
  SignUp: {
    screen: SignUp,
    navigationOptions: () => ({
      header: null,
    }),
  },
});

const SearchStack = createStackNavigator({
  Search: {
    screen: Search,
    navigationOptions: () => ({
      header: null,
    }),
  },
  SearchList: {
    screen: SearchList,
    navigationOptions: () => ({
      header: null,
    }),
  },
  RandomPick: {
    screen: RandomPick,
    navigationOptions: () => ({
      header: null,
    }),
  },
  Business:  { screen: Business,
     navigationOptions: () => ({
       header: null
    }),
  },
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
    Search: { screen: SearchStack },
    Home : { screen: HomeStack },
    Login: { screen: LoginStack },
    Profile: { screen: ProfileStack },
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === 'Search') {
          iconName = `ghost`;
        } else if (routeName === 'Home') {
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
    initialRouteName: 'Search',
    activeTintColor: 'black',
    inactiveTintColor: 'grey',
    barStyle: { backgroundColor: 'white' },
  }
);

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: true,
    };
  }

  onButtonPress = () => {
    console.log("CHANGED");
    this.setState({
      loggedIn: true
    });
  };

  renderComponent() {
    if (this.state.loggedIn) {
      return (
        <View style={{ flex: 1 }}>
          <StatusBar backgroundColor="white" barStyle="dark-content" />
          <AppNavigation />
        </View>
      );
    }
    return (
      <View style={{ flex: 1 }}>
        <StatusBar backgroundColor="white" barStyle="dark-content" />
        <LoginStack action={this.onButtonPress} />
      </View>
    );
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <StatusBar backgroundColor="white" barStyle="dark-content" />
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            {this.renderComponent()}
          </PersistGate>
        </Provider>
      </View>
    );
  }
}
