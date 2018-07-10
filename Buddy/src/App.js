import React from 'react';
import {
  createStackNavigator,
} from 'react-navigation';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import { Search, Home } from './screens';

const Stack = createStackNavigator({
  Search: {
    screen: Search,
  },
  Home: {
    screen: Home,
  },
});

export default createMaterialBottomTabNavigator(
  {
    Home: { screen: Home },
    Search: { screen: Search },
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === 'Home') {
          iconName = `ios-home`;
        } else if (routeName === 'Search') {
          iconName = `ios-search`;
        } else {
          iconName = `ios-ionic`;
        }
        // You can return any component that you like here! We usually use an
        // icon component from react-native-vector-icons
        return <Icon name={iconName} size={22.5} color={tintColor} />;
      },
    }),
    initialRouteName: 'Search',
    activeTintColor: 'black',
    inactiveTintColor: 'grey',
    barStyle: { backgroundColor: 'white' },
  }
);
