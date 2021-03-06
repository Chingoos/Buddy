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
  Platform,
  Animated
} from 'react-native';
import { Container, Content } from 'native-base';
import { Slider } from 'react-native-elements'
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import axios from 'axios';
import { connect } from 'react-redux';
import SwitchSelector from '../components/SwitchSelector';
import ToggleButton from '../components/ToggleButton'
import FoodImages from '../assets/FoodImages';
import Profile from './Profile'
import colors from '../styles/colors';
import { test } from '../actions/testActions';
import { Header, Item, Input } from 'native-base';
import IconB from 'react-native-vector-icons/dist/SimpleLineIcons';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import IconC from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import EmptyState from '../components/emptyCard';
import Card from "../components/Card";
const {width, height} = Dimensions.get('window');
import {ENTRIES1} from '../components/tempData';
const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;
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
    const prevPosition = new Animated.ValueXY();
    const prevprevPosition = new Animated.ValueXY()
    this.state = {
      prevPosition,
      prevprevPosition,
      liked: [],
      blocked: [],
      data: [],
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
      cards: [],
      tempCards:[],
      title: ''
    };
    this.onSubmitPressed();

  }
  getCards = () => {
    const cards = ENTRIES1;
    let lastItemPosition = false;
    cards.forEach((card, i) => {
      if(i==0){
        card.isActive = true;
      }
      else {
        card.isActive = false;
      }
      const position = new Animated.ValueXY();
      card.position = position;
      card.parentPosition = lastItemPosition;
      lastItemPosition = position;
    });
    return cards;
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
    const term = 'anything';
    const distance = distanceSettings[this.state.distance[1]];
    var data = [];
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

          const cards = response.data.businesses;
          let lastItemPosition = false;
          cards.forEach((card, i) => {
            if(i==0){
              card.isActive = true;
            }
            else {
              card.isActive = false;
            }
            const position = new Animated.ValueXY();
            card.position = position;
            card.parentPosition = lastItemPosition;
            lastItemPosition = position;
          });
          this.setState({cards: cards});
          if(cards.length>0)
          {
            this.setState({title: cards[0].name});
          }
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
  onCardSwiped = (id) => {


    this.setState(prevState => {
      const swipedIndex = prevState.cards.findIndex(card => card.id === id);
      const isLastIndex = swipedIndex === (prevState.cards.length - 1);
      const nextIndex = swipedIndex+1;
      const newState = {...prevState};
      newState.cards[swipedIndex]['isActive'] = false;
      if (isLastIndex) return prevState;
      newState.cards[nextIndex]['isActive'] = true;
      const position = new Animated.ValueXY()
      console.log(nextIndex);
      console.log("HEYYOU");
      newState.cards[swipedIndex].position= position.setValue({x:0,y:0})


      return newState;
    });

  }
  updateCards =() =>{
    const temp = this.state.cards.slice((this.state.cards.findIndex(card => card.isActive)), (this.state.cards.findIndex(card => card.isActive))+5);
    this.setState({tempCards: temp});
  }
  reloadCards = () => {
    const cards = this.getCards();
    this.setState({cards});
  }

  handleLikeSelect = (dy=0, position=false) => {
    const activeIndex = this.state.cards.findIndex(card => card.isActive);


    if (activeIndex < 0) return;
    if (!position) {
      position = this.state.cards[activeIndex].position;
    }

      Animated.spring(position, {
        toValue: { x: SCREEN_WIDTH + 100, y: dy },
        bounciness: 5,
        speed: 8,
      }).start(this.onCardSwiped(this.state.cards[activeIndex].id));
    this.setState({prevprevPosition: this.state.prevPosition.setValue({ x: 0, y: 0 })});
    const newPosition = new Animated.ValueXY();
    this.setState({prevprevPosition: newPosition});
    this.setState({prevprevPosition: this.state.prevPosition});
    this.setState({prevPosition: this.state.prevprevPosition});
    this.setState({prevPosition: newPosition});
    this.setState({prevPosition: position});
    this.setState({
      liked:  this.state.liked.concat(this.state.cards[activeIndex])
    });



  }
  handleFavoriteSelect = (dy=0, position=false) => {
    const activeIndex = this.state.cards.findIndex(card => card.isActive);
    this.setState({
      liked:  this.state.liked.concat(this.state.cards[activeIndex])
    });
    if (activeIndex < 0) return;
    if (!position) {
      position = this.state.cards[activeIndex].position;
    }
    Animated.spring(position, {
      toValue: { x: 0, y: -SCREEN_HEIGHT-100 }
    }).start(this.onCardSwiped(this.state.cards[activeIndex].id));
    this.setState({prevPosition: position});
    if(activeIndex>0)
    {
      this.state.prevPosition.setValue({ x: 0, y: 0 });
    }
  }
  handleBlockSelect = (dy=0, position=false) => {
    const activeIndex = this.state.cards.findIndex(card => card.isActive);
    this.setState({
      liked:  this.state.blocked.concat(this.state.cards[activeIndex])
    });
    if (activeIndex < 0) return;
    if (!position) {
      position = this.state.cards[activeIndex].position;
    }
    Animated.spring(position, {
      toValue: { x: 0, y: SCREEN_HEIGHT+100 }
    }).start(this.onCardSwiped(this.state.cards[activeIndex].id));
    this.setState({prevPosition: position});
    if(activeIndex>0)
    {
      this.state.prevPosition.setValue({ x: 0, y: 0 });
    }
  }

  handleNopeSelect = (dy=0, position=false) => {
    const activeIndex = this.state.cards.findIndex(card => card.isActive);

    if (activeIndex < 0) return;
    if (!position) {
      position = this.state.cards[activeIndex].position;
    }

    Animated.spring(position, {
      toValue: { x: -SCREEN_WIDTH- 100, y: dy }
    }).start(this.onCardSwiped(this.state.cards[activeIndex].id));

    this.setState({prevPosition: position});
    if(activeIndex>0)
    {
      this.state.prevPosition.setValue({ x: 0, y: 0 });
    }


}
  undoCard(){
    const activeIndex = this.state.cards.findIndex(card => card.isActive);
    if(activeIndex>0)
    {
      const position = this.state.prevPosition;
      Animated.spring(position, {
        toValue: { x: 0, y: 0 }
      }).start();
      this.setState(prevState => {
        const undoIndex = activeIndex-1;

        const newState = {...prevState};
        newState.cards[activeIndex]['isActive'] = false;
        newState.cards[undoIndex]['isActive'] = true;

        return newState;
      });
    }
    else {
      Alert.alert("NO");
    }
  }

  likedCards(){
    if(this.state.liked.length>0)
    {
      this.props.navigation.navigate('SearchList', {data: this.state.liked});
    }
    else {
      Alert.alert('No Liked Restaurants!');
    }

  }
  renderCards = (cards) => {
  //  const tempCards = this.state.tempCards;

  //  console.log("HI");
    //this.setState({tempCards:tempCards});
  //  const newCards = this.state.cards.splice(0, 5);
  //  this.setState({cards: newCards});

  //  console.log(cards.length);
    if (this.isEmptyState()) { }
//    else if(tempCards.findIndex(card => card.isActive) < 0)
  // {
  //    for(let i =0; i< 5; i++)
  //    {
//        tempCards.concat(this.state.cards[i]);
//      }
//    }

    if(this.state.cards.length>0)
    {
      console.log(this.state.cards.length);
      console.log(this.state.cards[this.state.cards.findIndex(card => card.isActive)].name);


    }
    if(this.state.cards.findIndex(card => card.isActive) == 0)
    {
      console.log('ZERO');
      return this.state.cards.slice(this.state.cards.findIndex(card => card.isActive),this.state.cards.findIndex(card => card.isActive)+3).reverse().map((card) => {
            return <Card  {...card} navigate={this.props.navigation} data ={card} handleNopeSelect={this.handleNopeSelect} handleLikeSelect={this.handleLikeSelect} handleFavoriteSelect={this.handleFavoriteSelect} handleBlockSelect={this.handleBlockSelect} />;
          });
    }
    else if(this.state.cards.findIndex(card => card.isActive) % 2 == 1)
    {
        console.log('ONE');
      return this.state.cards.slice(this.state.cards.findIndex(card => card.isActive)-1,this.state.cards.findIndex(card => card.isActive)+2).reverse().map((card, index) => {
            return <Card id={card.id}   {...card} navigate={this.props.navigation} data ={card} handleNopeSelect={this.handleNopeSelect} handleLikeSelect={this.handleLikeSelect} handleFavoriteSelect={this.handleFavoriteSelect} handleBlockSelect={this.handleBlockSelect} />;
          });
    }
    else {
      var activeIndex = this.state.cards.findIndex(card => card.isActive);

      const tempCards = this.state.cards.slice();
      const tempCard = tempCards[activeIndex];
      tempCards[activeIndex] = tempCards[activeIndex-1];
      tempCards[activeIndex-1] =  tempCard;
      console.log(activeIndex);
      console.log('TWO');
      for(let i = 0; i<tempCards.length;i++){
        console.log(tempCards[i].name);
      }
      return tempCards.slice(this.state.cards.findIndex(card => card.isActive)-1,this.state.cards.findIndex(card => card.isActive)+2).reverse().map((card, index) => {
            return <Card id={card.id}   {...card} navigate={this.props.navigation} data ={card} handleNopeSelect={this.handleNopeSelect} handleLikeSelect={this.handleLikeSelect} handleFavoriteSelect={this.handleFavoriteSelect} handleBlockSelect={this.handleBlockSelect} />;
          });

    }







  }



  isEmptyState = () => {
    return this.state.cards.findIndex(card => card.isActive) < 0;
  }
  check = () => {
    return this.state.cards.findIndex(card => card.isActive) == 2;
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
  componentDidMount(){


  }
  render() {

    return (
      <View style={styles.container} >

        <View style={styles.cardArea} >

                {this.renderCards(this.state.cards)}

          <View style={styles.btnContainer}>
            <TouchableOpacity style={styles.btn} onPress={() => this.undoCard()} >
              <IconC name="undo" size={35} style={{ color: 'orange' }} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.smallBtn} onPress={() => this.handleBlockSelect()} >
              <IconB name="ban" size={15} style={{ color: 'black' }} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.btn} onPress={() => this.handleNopeSelect()} >
              <IconB name="dislike" size={40} style={{ color: 'red' }} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.btn} onPress={() => this.handleLikeSelect()} >
              <IconB name="like" size={40} style={{ color: 'green' }} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.smallBtn} onPress={() => this.handleFavoriteSelect()} >
              <IconB name="heart" size={15} style={{ color: 'gold' }} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.btn} onPress={() => this.handleFavoriteSelect()} >
              <IconC name="playlist-play" size={35} style={{ color: 'black' }} />
            </TouchableOpacity>

          </View>
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: 'white',
    alignItems: 'stretch',
  },
  cardArea: {
    flex: 1,
    marginTop: 0,
    height: SCREEN_HEIGHT*.7,
    backgroundColor : "#0000",
    shadowOffset: { width: 10, height: 10 },
    shadowColor: 'black',
    shadowOpacity: 1,
    elevation: 3,

  },
  btnContainer: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: -1,
    position: 'absolute',
    alignSelf: 'center',
    bottom: 7,

  },
  header: {
    borderBottomWidth: Platform.OS !== 'ios' ? 2 : 1,
    borderBottomColor: colors.accent,
    backgroundColor: colors.background,
  },
  btn: {
    height: 70,
    width: 70,
    borderRadius: 35,
    alignItems: 'center',

    justifyContent: 'center',
    marginHorizontal: 1,
    backgroundColor: '#efefef',
  },
  smallBtn: {
    height: 30,
    width: 30,
    alignSelf: 'flex-end',
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 0,
    backgroundColor: '#efefef',

  },
  btnIcon: {
    height: 25,
    width: 25,
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
