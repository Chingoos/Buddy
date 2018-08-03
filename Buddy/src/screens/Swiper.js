import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Animated,
  Dimensions,
  Image,
} from 'react-native';
import checkIcon from '../assets/images/checked.png';
import cancelIcon from '../assets/images/x.png';
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

const getCards = () => {
  const cards = ENTRIES1
  let lastItemPosition = false;
  cards.forEach((card, i) => {
    const position = new Animated.ValueXY();
    card.position = position;
    card.parentPosition = lastItemPosition;
    lastItemPosition = position;
  });
  return cards;
}

export default class Swiper extends React.Component {

  constructor() {
    super();

    const cards = getCards();

    this.state = {cards};
  }

  onCardSwiped = (key) => {
    this.setState(prevState => {
      const swipedIndex = prevState.cards.findIndex(card => card.key === key);
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
    }).start(this.onCardSwiped(this.state.cards[activeIndex].key));
  }

  handleNopeSelect = (dy=0, position=false) => {
    const activeIndex = this.state.cards.findIndex(card => card.isActive);
    if (activeIndex < 0) return;
    if (!position) {
      position = this.state.cards[activeIndex].position;
    }
    Animated.spring(position, {
      toValue: { x: -SCREEN_WIDTH - 100, y: dy }
    }).start(this.onCardSwiped(this.state.cards[activeIndex].key));
  }

  renderCards = (cards) => {
    if (this.isEmptyState()) {this.props.navigation.navigate("SearchList")}

    return cards.map((card, index) => {
      return <Card key={card.key} {...card} handleNopeSelect={this.handleNopeSelect} handleLikeSelect={this.handleLikeSelect} />;
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
        <View style={styles.cardArea} >
          {this.renderCards(this.state.cards)}
        </View>
        <View style={styles.btnContainer}>
          <TouchableOpacity style={styles.btn} onPress={() => this.handleNopeSelect()} >
            <Image source={cancelIcon} style={styles.btnIcon} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.btn} onPress={() => this.handleLikeSelect()} >
            <Image source={checkIcon} style={styles.btnIcon} />
          </TouchableOpacity>

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
    flex: 10,
    marginTop: 10,
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
  },
  btn: {
    height: 70,
    width: 70,
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 15,
    backgroundColor: '#efefef',
  },
  btnIcon: {
    height: 25,
    width: 25,
  },
});
