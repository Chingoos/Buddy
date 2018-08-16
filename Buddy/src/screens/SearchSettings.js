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
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import { connect } from 'react-redux';
import SwitchSelector from '../components/SwitchSelector';
import ToggleButton from '../components/ToggleButton'
import FoodImages from '../assets/FoodImages';
import Profile from './Profile'
import colors from '../styles/colors';
import { test } from '../actions/testActions';
const {width, height} = Dimensions.get('window');
const options = [
  { label: 'Western', value: '1' },
  { label: 'Asian', value: '1.5' },
  { label: 'Other', value: '2' },
];
const options2 = [
  { label: 'Food', value: '1' },
  { label: 'Cuisine', value: '2' },
];

const priceRange = ['Cheap', 'Average', 'Expensive', 'Fancy'];
const distanceRange = ['Close', 'Moderate', 'Far', 'Very Far'];
const distanceSettings = ['320', '965', '1609', '8046']; // 2 blocks, 6 blocks, 1 mile, 5 miles.

// Made this because you have different naming coventions for state, updateChoice, and images.
// EX: label: 'Chicken Wings', updateChoice('chicken_wings'), FoodImages['Chicken Wings']
const asianFoodList = [
  {
    label: 'Noodles',
    state: 'noodles',
  },
  {
    label: 'Sushi',
    state: 'sushi',
  },
  {
    label: 'Curry',
    state: 'curry',
  },
  {
    label: 'Hotpot',
    state: 'hotpot',
  },
  {
    label: 'Ramen',
    state: 'ramen',
  },
  {
    label: 'Dimsum',
    state: 'dimsum',
  },
  {
    label: 'KBBQ',
    state: 'kbbq',
  },

];
const westernFoodList = [
  {
    label: 'Steak',
    state: 'steak',
  },
  {
    label: 'Burger',
    state: 'burger',
  },
  {
    label: 'Chicken Wing',
    state: 'chicken_wing',
  },
  {
    label: 'Pizza',
    state: 'pizza',
  },
  {
    label: 'Burrito',
    state: 'burrito',
  },
  {
    label: 'Sandwich',
    state: 'sandwich',
  },
  {
    label: 'Taco',
    state: 'taco',
  },
  {
    label: 'Breakfast',
    state: 'breakfast',
  },
];
const otherFoodList = [

  {
    label: 'Coffee',
    state: 'coffee',
  },
  {
    label: 'Boba',
    state: 'boba',
  },

  {
    label: 'Poke',
    state: 'poke',
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
  {
    label: 'Vegan',
    state: 'vegan',
  },
];
const cuisineList = [
  {
    label: 'American',
    state: 'american',
  },
  {
    label: 'Chinese',
    state: 'chinese',
  },
  {
    label: 'Mexican',
    state: 'mexican',
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
    label: 'Vietnamese',
    state: 'vietnamese',
  },
  {
    label: 'Taiwanese',
    state: 'taiwanese',
  },
  {
    label: 'Thai',
    state: 'thai',
  },
  {
    label: 'Indian',
    state: 'indian',
  },
  {
    label: 'Filipino',
    state: 'filipino',
  },
];

const screenDimensions = Dimensions.get('window');
const numColumns = Math.floor((screenDimensions.width - 30) / 62.5);
const defaultState = {
  american: false,
  burger: false,
  chicken_wing: false,
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
  indian: false,
  filipino: false,
  mexican: false,
  thai: false,
  sushi: false,
  ramen: false,
  steak: false,
  poke: false,
  taco: false,
  burrito: false,
  curry: false,
  hotpot: false,
  noodles: false,
};

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFood: '',
      burger: false,
      chicken_wing: false,
      pizza: false,
      sandwich: false,
      breakfast: false,
      vegan: false,
      american: false,
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
      foodList: true,
      category: 'Western',
      indian: false,
      filipino: false,
      mexican: false,
      thai: false,
      noodles: false,
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
         console.log(response);
          Alert.alert(
            `Success! Found ${response.data.businesses.length} results!`
          );

          this.props.navigation.navigate('Swiper', {data: response.data});
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
  switchCategory = (value) =>{
    if(value=='1'){
      this.setState({category: 'Western'});
    }
    else if(value=='1.5')
    {
      this.setState({category: 'Asian'});
    }
    else {
      this.setState({category: 'Other'});
    }
  }
  switchType = (value) =>{
    if(value=='1'){
      this.setState({foodList: true});
    }
    else {
      this.setState({foodList: false});
    }
  }
  renderHeader = () => (
    <View>
    <SwitchSelector
      selectedTextStyle={[styles.font, { color: 'white' }]}
      textStyle={styles.font}
      style={{ padding: 15, paddingBottom: 0, paddingTop: 5, }}
      valuePadding={2}
      buttonColor={colors.accent}
      options={options2}
      initial={0}
      onPress={value => this.switchType(value)}
    />
    <SwitchSelector
      selectedTextStyle={[styles.font, { color: 'white' }]}
      textStyle={styles.font}
      style={{ padding: 15, paddingBottom: 0, paddingTop: 5, }}
      valuePadding={3}
      buttonColor={colors.accent}
      options={options}
      initial={0}
      onPress={value => this.switchCategory(value)}
    />

    </View>
  );

  renderFooter = () => (
    <View style={{ flex: 1 }}>
      <View style={styles.slider}>
        <View style={{flexDirection:'row'}}>
          <View style={{width:  140 , alignItems:'center'}}>
            <Text style={styles.font}> $ </Text>
          </View>
          <View style={{width: 140, alignItems:'center'}}>
          <Text style={styles.font}> Price </Text>
          </View>
          <View style={{width: 140, alignItems: 'center'}}>
          <Text style={styles.font}> $$$$ </Text>
          </View>
        </View>
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

        <View style={{flexDirection:'row'}}>
          <View style={{width: 140 , alignItems:'center'}}>
            <Icon name="walk" size={30} color={'black'}/>
          </View>
          <View style={{width: 140, alignItems:'center'}}>
            <Text style={styles.font}> Distance </Text>
          </View>
          <View style={{width: 140, alignItems: 'center'}}>
            <Icon name="car" size={30} color={'black'}/>
          </View>
        </View>
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
  renderFlatList(){
    if(this.state.foodList && this.state.category=='Western')
    {
      return(
        <FlatList
        style={{ flex: 1, padding: 15, paddingBottom: 0 }}
        contentContainerStyle={{ alignItems: 'center' }}
        data={westernFoodList}
        keyExtractor={item => item.label}
        renderItem={this.renderItem}
        numColumns={numColumns}
        ItemSeparatorComponent={() => <View style={styles.divider} />}
      />);
    }
    else if(this.state.foodList && this.state.category=='Asian')
    {
      return(
        <FlatList
        style={{ flex: 1, padding: 15, paddingBottom: 0 }}
        contentContainerStyle={{ alignItems: 'center' }}
        data={asianFoodList}
        keyExtractor={item => item.label}
        renderItem={this.renderItem}
        numColumns={numColumns}
        ItemSeparatorComponent={() => <View style={styles.divider} />}
      />);
    }
    else if(this.state.foodList && this.state.category=='Other')
    {
      return(
        <FlatList
        style={{ flex: 1, padding: 15, paddingBottom: 0 }}
        contentContainerStyle={{ alignItems: 'center' }}
        data={otherFoodList}
        keyExtractor={item => item.label}
        renderItem={this.renderItem}
        numColumns={numColumns}
        ItemSeparatorComponent={() => <View style={styles.divider} />}
      />);
    }
    else
    {
      return(
        <FlatList
        style={{ flex: 1, padding: 15, paddingBottom: 0 }}
        contentContainerStyle={{ alignItems: 'center' }}
        data={cuisineList}
        keyExtractor={item => item.label}
        renderItem={this.renderItem}
        numColumns={numColumns}
        ItemSeparatorComponent={() => <View style={styles.divider} />}
      />

      )
    }
  }
  render() {
    return (
      <View style={styles.container}>
        {this.renderHeader()}
        {this.renderFlatList()}
        <View style={styles.footerContainer}>
          {this.renderFooter()}
        </View>
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
    bottom: 10,
    left: 0,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerContainer: {
    position: 'absolute',
    right: 0,
    bottom: 150,
    left: 0,
    height: 105,
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
    paddingTop: 0,
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

const mapStateToProps = state => {
  return state.test;
};

export default connect(
  mapStateToProps,
  { test }
)(Search);
