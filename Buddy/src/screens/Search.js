import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  FlatList,
  Alert,
} from 'react-native';
import { Container, Content } from 'native-base';
import { Slider } from 'react-native-elements'
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import axios from 'axios';
import SwitchSelector from '../components/SwitchSelector';
import ToggleButton from '../components/ToggleButton'
import FoodImages from '../assets/FoodImages';
import Profile from './Profile'
import colors from '../styles/colors';

const options = [
  { label: 'All', value: '1' },
  { label: 'New', value: '1.5' },
  { label: 'Liked', value: '2' },
];

const priceRange = ['Cheap', 'Average', 'Expensive', 'Fancy'];
const distanceRange = ['Close', 'Moderate', 'Far', 'Very Far'];
const distanceSettings = ['320', '965', '1609', '8046']; // 2 blocks, 6 blocks, 1 mile, 5 miles.

// Made this because you have different naming coventions for state, updateChoice, and images.
// EX: label: 'Chicken Wings', updateChoice('chicken_wings'), FoodImages['Chicken Wings']
const foodList = [
  {
    label: 'Burgers',
    state: 'burgers',
  },
  {
    label: 'Chicken Wings',
    state: 'chicken_wings',
  },
  {
    label: 'Pizza',
    state: 'pizza',
  },
  {
    label: 'Sandwiches',
    state: 'sandwich',
  },
  {
    label: 'Breakfast',
    state: 'breakfast',
  },
  {
    label: 'Vegan',
    state: 'vegan',
  },
  {
    label: 'Chinese',
    state: 'chinese',
  },
  {
    label: 'Korean',
    state: 'korean',
  },
  {
    label: 'Japanese',
    state: 'japanese',
  },
  {
    label: 'Taiwanese',
    state: 'taiwanese',
  },
  {
    label: 'Vietnamese',
    state: 'vietnamese',
  },
  {
    label: 'Coffee',
    state: 'coffee',
  },
  {
    label: 'Boba',
    state: 'boba',
  },
  {
    label: 'Ice Cream',
    state: 'ice_cream',
  },
  {
    label: 'Dessert',
    state: 'dessert',
  },
  {
    label: 'Bakery',
    state: 'bakery',
  },
  {
    label: 'Bar',
    state: 'bar',
  },
];

const screenDimensions = Dimensions.get('window');
const numColumns = Math.floor((screenDimensions.width - 30) / 62.5);
const defaultState = {
  burgers: false,
  chicken_wings: false,
  pizza: false,
  sandwich: false,
  breakfast: false,
  vegan: false,
  chinese: false,
  korean: false,
  japanese: false,
  taiwanese: false,
  vietnamese: false,
  coffee: false,
  boba: false,
  ice_cream: false,
  dessert: false,
  bakery: false,
  bar: false,
};

export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFood: '',
      burgers: false,
      chicken_wings: false,
      pizza: false,
      sandwich: false,
      breakfast: false,
      vegan: false,
      chinese: false,
      korean: false,
      japanese: false,
      taiwanese: false,
      vietnamese: false,
      coffee: false,
      boba: false,
      ice_cream: false,
      dessert: false,
      bakery: false,
      bar: false,
      price: [0, 1],
      distance: [0, 1],
      priceString: 'Cheap to Average',
      distanceString: 'Close to Moderate',
    };
  }

  // onSubmitPressed = () => {
  //   const foodType = this.state.selectedFood;
  //   if (foodType === '') {
  //     Alert.alert('Please select a food.');
  //   } else {
  //     const URL = `https://api.yelp.com/v3/businesses/search?limit=50&location=sanfrancisco&term=${foodType}`;
  //     console.log(URL);
  //     const KEY =
  //       'Fgz6gxZipSFWMN7LkONPfy20W35ClUg-QyWQbvJlhNmVlTMUDDGINwPfZq-40V2Y95ZDpvTKKOBCI6Xsnj-bXJSKxBY_mYR2TiBtb13VCYTXcCkgqiyyK_vM6TVOW3Yx';
  //     const AUTH = `Bearer ${KEY}`;
  //     console.log(AUTH);
  //     axios
  //       .get(URL, {
  //         headers: { Authorization: AUTH },
  //       })
  //      .then(response => {
  //        Alert.alert(`Success! Found ${response.data.businesses.length} results!`);
  //        console.log(response.data);
  //       })
  //      .catch(error => {
  //        console.log(`error ${error}`);
  //       });
  //   }
  //   // this.props.navigator.push({
  //   //   screen: 'Profile',
  //   //   passProps: {},
  //   //   title: 'Profile',
  //   // });
  // };

  onSubmitPressed = () => {
    const term = this.state.selectedFood;
    const distance = distanceSettings[this.state.distance[1]];
    const price = Array.from(
      { length: this.state.price[1] - this.state.price[0] + 1 },
      (x, i) => i + this.state.price[0] + 1
    ).toString();
    const location = 'San Francisco, CA';

    if (term === '') {
      Alert.alert('Please select a food.');
    } else {
      const URL = `http://tae.hidevmobile.com/search.php`;
      axios
        .post(URL, {
          term,
          location,
          distance,
          price,
        })
       .then(response => {
         Alert.alert(`Success! Found ${response.data.businesses.length} results!`);
         console.log(response);
        })
       .catch(error => {
         console.log(`error ${error}`);
        });
    }
  };

  updateChoice(foodType) {
    // Grab current state of food.
    const typeState = this.state[foodType];

    const newState = { ...this.state, ...defaultState };
    // newState[type] = !newState[type];

    // Toggled Food Button from true and false.
    newState[foodType] = !typeState;

    // Set selectedFood state to empty when deselected, else set as food type.
    newState.selectedFood = !typeState ? foodType : '';
    this.setState(newState);
  }

  updatePrice(price) {
    const priceSelection = price[0];
    const priceSelection2 = price[1];

    this.setState({
      price: [priceSelection, priceSelection2],
      priceString:
        priceSelection === priceSelection2
          ? priceRange[priceSelection]
          : `${priceRange[priceSelection]} to ${priceRange[priceSelection2]}`,
    });
  }

  updateDistance(distance) {
    const distanceSelection = distance[0];
    const distanceSelection2 = distance[1];

    this.setState({
      distance: [distanceSelection, distanceSelection2],
      distanceString:
        distanceSelection === distanceSelection2
          ? distanceRange[distanceSelection]
          : `${distanceRange[distanceSelection]} to ${
              distanceRange[distanceSelection2]
            }`,
    });
  }

  renderHeader = () => (
    <SwitchSelector
      selectedTextStyle={[styles.font, { color: 'white' }]}
      textStyle={styles.font}
      style={{ padding: 15, paddingBottom: 0 }}
      valuePadding={3}
      buttonColor={colors.accent}
      options={options}
      initial={0}
      onPress={value => console.log(`Call onPress with value: ${value}`)}
    />
  );

  renderFooter = () => (
    <View style={{ flex: 1 }}>
      <View style={styles.slider}>
        <Text style={styles.font}> {this.state.priceString}</Text>
        <MultiSlider
          values={[this.state.price[0], this.state.price[1]]}
          min={0}
          max={3}
          step={1}
          allowOverlap
          snapped
          markerStyle={styles.sliderMarker}
          selectedStyle={styles.sliderSelected}
          // minimumTrackTintColor = {colors.accent}
          // thumbTintColor = {colors.accent}
          onValuesChange={price => this.updatePrice(price)}
        />
      </View>
      <View style={styles.slider}>
        <Text style={styles.font}>{this.state.distanceString}</Text>
        <MultiSlider
          values={[this.state.distance[0], this.state.distance[1]]}
          min={0}
          max={3}
          step={1}
          allowOverlap
          snapped
          markerStyle={styles.sliderMarker}
          selectedStyle={styles.sliderSelected}
          // enabledTwo=  {true}
          // trackStyle: { color: 'blue' },
          // thumbTintColor = {colors.accent}
          // maximumTrackTintColor =
          // minimumTrackTintColor = {colors.accent}
          onValuesChange={distance => this.updateDistance(distance)}
        />
      </View>
    </View>
  );

  renderItem = ({ item }) => {
    return (
      <View>
        <ToggleButton
          label={item.label}
          onPress={() => {
            this.updateChoice(item.state);
          }}
          selected={this.state[item.state]}
          source={FoodImages[item.label]}
        />
      </View>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        {this.renderHeader()}
        <FlatList
          style={{ flex: 1, marginBottom: 70, padding: 15, paddingBottom: 0 }}
          contentContainerStyle={{ alignItems: 'center' }}
          data={foodList}
          keyExtractor={item => item.label}
          renderItem={this.renderItem}
          numColumns={numColumns}
          ListFooterComponent={this.renderFooter}
          ItemSeparatorComponent={() => <View style={styles.divider} />}
        />
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            shadowOpacity={0.5}
            shadowRadius={10}
            style={styles.button}
            onPress={this.onSubmitPressed}
          >
            <Text style={[styles.font, { color: 'white' }]}>Search!</Text>
          </TouchableOpacity>
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
  scroll: {
    backgroundColor: 'white',
  },
  font: {
    fontSize: 20,
    color: 'black',
    fontFamily: 'GothamRounded-Medium',
  },
  buttonContainer: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    left: 0,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    height: 50,
    width: screenDimensions.width * 0.8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.accent,
    borderRadius: 20,
    shadowColor: 'rgba(0,0,0, .4)', // IOS
    shadowOffset: { height: 1, width: 1 }, // IOS
    shadowOpacity: 1, // IOS
    shadowRadius: 2, // IOS
    elevation: 3, // Android
  },
  slider: {
    alignItems: 'center',
    // flex: 1,
    paddingTop: 15,
    paddingLeft: 30,
    paddingRight: 30,
    marginLeft: 20,
    marginRight: 20,
    // alignItems: 'stretch',
    justifyContent: 'center',
  },
  sliderMarker: {
    backgroundColor: colors.accent,
    height: 20,
    width: 20,
    borderRadius: 20,
  },
  sliderSelected: {
    backgroundColor: colors.accent,
    height: 2.5,
    width: 0,
    borderRadius: 0,
  },
  divider: {
    height: 2.5,
  },
});
