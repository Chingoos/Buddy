import React from 'react';
import { StatusBar, View } from 'react-native';
import { StackNavigator, createStackNavigator } from 'react-navigation';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import { Search, Home, Profile, Login,   } from './screens';
import SignUp from './screens/SignUp';
import Calendar from './screens/Calendar';
const Stack = createStackNavigator({

  SignUp:  {
    screen: SignUp,
  }

});

const AppNavigation = createMaterialBottomTabNavigator(
  {
    Home: { screen: Home },
    Search: { screen: Search },
    Profile: { screen: Profile },
    Calendar: {screen: Calendar},
    Login: { screen: Login },
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

const App = () => (
  <View style={{ flex: 1 }}>
    <StatusBar backgroundColor="white" barStyle="dark-content" />
    <AppNavigation />
  </View>
);

export default App;
