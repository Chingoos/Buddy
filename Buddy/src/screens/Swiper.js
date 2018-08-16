import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Animated,
  Dimensions,
  Image,
  TouchableHighlight,
  Platform,
  TouchableWithoutFeedback
} from 'react-native';
import { Header, Item, Input } from 'native-base';
import IconB from 'react-native-vector-icons/dist/SimpleLineIcons';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import IconC from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import colors from '../styles/colors';
import Card from "../components/Card";
import img1 from '../assets/images/image1.jpeg';
import img2 from '../assets/images/image2.jpeg';
import img3 from '../assets/images/image3.jpeg';
import img4 from '../assets/images/image4.jpeg';
import img5 from '../assets/images/image5.jpeg';
import EmptyState from '../components/emptyCard';
import {ENTRIES1} from '../components/tempData';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;

const getCards = (props) => {
  const cards = props.navigation.state.params.data.businesses
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

export default class Swiper extends React.Component {

  constructor(props) {
    super(props);

    const cards = getCards(props);
    const liked = [];
    this.state = {
      cards,
      title: cards[cards.findIndex(card => card.isActive)].name,
      liked,
    };
  }

  onCardSwiped = (id) => {
    if(((this.state.cards.findIndex(card => card.isActive)) +1)!=this.state.cards.length)
    {
      name = this.state.cards[(this.state.cards.findIndex(card => card.isActive)) +1 ].name;
      this.setState({title: name});
    }

    this.setState(prevState => {
      const swipedIndex = prevState.cards.findIndex(card => card.id === id);
      const isLastIndex = swipedIndex === (prevState.cards.length - 1);
      const nextIndex = swipedIndex + 1;
      const newState = {...prevState};
      newState.cards[swipedIndex]['isActive'] = false;
      if (isLastIndex) return prevState;
      newState.cards[nextIndex]['isActive'] = true;
      return newState;
    });


  }

  handleLikeSelect = (dy=0, position=false) => {
    const activeIndex = this.state.cards.findIndex(card => card.isActive);

    if (activeIndex < 0) return;
    if (!position) {
      position = this.state.cards[activeIndex].position;
    }
    Animated.spring(position, {
      toValue: { x: SCREEN_WIDTH + 100, y: dy }
    }).start(this.onCardSwiped(this.state.cards[activeIndex].id));
  }

  handleNopeSelect = (dy=0, position=false) => {
    const activeIndex = this.state.cards.findIndex(card => card.isActive);
    this.setState({
      liked:  this.state.liked.concat(activeIndex)
    });
    console.log(this.state.liked);
    if (activeIndex < 0) return;
    if (!position) {
      position = this.state.cards[activeIndex].position;
    }
    Animated.spring(position, {
      toValue: { x: -SCREEN_WIDTH - 100, y: dy }
    }).start(this.onCardSwiped(this.state.cards[activeIndex].id));



  }
  filterCards(){
    var cards = this.props.navigation.state.params.data.businesses;
    const array = this.state.liked.reverse();
    for(var a = 0; a<array.length;a++)
    {
      cards.splice(array[a],1);

    }
    this.props.navigation.navigate('SearchList', {data: cards});
  }
  renderCards = (cards) => {

    if (this.isEmptyState()) {this.filterCards(); }
    return cards.map((card, index) => {
      return <Card id={card.id} {...card} navigate={this.props.navigation} data ={card} handleNopeSelect={this.handleNopeSelect} handleLikeSelect={this.handleLikeSelect} />;
    }).reverse();


  }

  reloadCards = () => {
    const cards = getCards();
    this.setState({cards});
  }

  isEmptyState = () => {
    return this.state.cards.findIndex(card => card.isActive) < 0;
  }

  render() {

    return (
      <View style={styles.container} >
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

            <Text   style={{ fontSize: 20,  color: 'black', fontFamily: 'GothamRounded-Medium' }}> {this.state.title} </Text>
            <IconC onPress={() => this.filterCards()} name="format-list-bulleted" size={25} color='black' style={{ position: 'absolute', right: 10 }} />
          </Item>
        </Header>
        <View style={styles.cardArea} >

                {this.renderCards(this.state.cards)}

          <View style={styles.btnContainer}>
            <TouchableOpacity style={styles.btn} onPress={() => this.handleNopeSelect()} >
              <IconB name="dislike" size={32} style={{ color: 'red' }} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.btn} onPress={() => this.handleLikeSelect()} >
              <IconB name="like" size={32} style={{ color: 'green' }} />
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
    bottom: 0,

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
    marginHorizontal: 10,
    backgroundColor: '#efefef',
  },
  btnIcon: {
    height: 25,
    width: 25,
  },
});
