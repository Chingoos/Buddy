import React from 'react';
import {
  StyleSheet,
  Text,
  Image as RNImage,
  Dimensions,
  Animated,
  PanResponder,
  View,
} from 'react-native';
import colors from '../styles/colors'
import Icon from 'react-native-vector-icons/dist/FontAwesome';
const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;

export default class Card extends React.Component {
  constructor(props) {
    super(props);
    this.position = this.props.position;
    this.rotate = this.position.x.interpolate({
      inputRange: [-SCREEN_WIDTH, 0, SCREEN_WIDTH],
      outputRange: ['-10deg', '0deg', '10deg'],
      extrapolate: 'clamp',
    });
    const defaultScale = this.props.isActive ? 0.9 : 0.85;
    this.nextCardScale = this.props.parentPosition ? this.props.parentPosition.x.interpolate({
      inputRange: [-SCREEN_WIDTH/2, 0, SCREEN_WIDTH/2],
      outputRange: [0.9, 0.85, 0.9],
      extrapolate: 'clamp',
    }) : defaultScale;
    this.rotateAndTranslate = {
      transform: [
        { rotate: this.rotate },
        { scale: this.nextCardScale },
        ...this.position.getTranslateTransform()
      ]
    };
    this.likeOpacity = this.position.x.interpolate({
      inputRange: [-SCREEN_WIDTH/2, 0, SCREEN_WIDTH/2],
      outputRange: [0, 0, 1],
      extrapolate: 'clamp',
    });
    this.nopeOpacity = this.position.x.interpolate({
      inputRange: [-SCREEN_WIDTH/2, 0, SCREEN_WIDTH/2],
      outputRange: [1, 0, 0],
      extrapolate: 'clamp',
    });
  }

  componentWillMount() {
    this.PanResponder = PanResponder.create({
      onStartShouldSetPanResponder:(evt, gestureState) => this.props.isActive,
      onPanResponderMove:(evt, gestureState) => {
        this.position.setValue({x: gestureState.dx, y: gestureState.dy});
      },
      onPanResponderRelease:(evt, gestureState) => {
        if (gestureState.dx > 120) {
          this.props.handleLikeSelect(gestureState.dy, this.position);
        } else if (gestureState.dx < -120) {
          this.props.handleNopeSelect(gestureState.dy, this.position);


        } else {
          Animated.spring(this.position, {
            toValue: {x: 0, y: 0},
            friction: 4
          }).start();
        }
      }
    })
  }

  render() {
    return (
      <Animated.View {...this.PanResponder.panHandlers} // <----- This is what binds to the PanResponder's onPanResponderMove handler
        style={[
          this.rotateAndTranslate,
          styles.card,
        ]} >

        <Animated.View
          style={[
            styles.cardTextContainer,
            styles.cardTextContainerLike,
            { opacity: this.likeOpacity }
          ]}
        >
          <Text style={[styles.cardText, styles.cardTextLike]} >Sure</Text>
        </Animated.View>
        <Animated.View
          style={[
            styles.cardTextContainer,
            styles.cardTextContainerNope,
            { opacity: this.nopeOpacity }
          ]}
        >
          <Text style={[styles.cardText, styles.cardTextNope]} >Nah</Text>
        </Animated.View>

        <RNImage style={styles.cardImg} source={{uri: this.props.image_url}} />
        <View style={styles.textContainer}>
          <View>
            <Text style={styles.title} numberOfLines={2}>
                { this.props.name.toUpperCase() }
            </Text>
            <View style={{flexDirection:'row'}}>
              <Text style={styles.etc} >
                  { this.props.categories[0].title}
              </Text>
              <View style={{right: 0, position: "absolute"}}>
                <Text style={styles.others}> { this.props.price } </Text>
              </View>
            </View>
            <View style ={{flexDirection: 'row', marginTop: 3}}>
              <Text style={styles.others}> { Math.round(this.props.distance*0.000621371*100)/100   } miles </Text>
              <View style={{right: 0, position: "absolute"}}>
                <Text style={styles.review}> { this.props.rating } </Text>
              </View>

            </View>
            <Text style={styles.openNow} numberOfLines={2}>
                Open Now
            </Text>
            <View style ={{flexDirection: 'row', marginTop: 3}}>
              <Icon name="calendar" size={25} style={{ paddingRight: 10 }} />
              <Text style={styles.others}> Reservation </Text>
            </View>
            <View style ={{flexDirection: 'row', marginTop: 3}}>
              <Icon name="shopping-bag" size={25} style={{ paddingRight: 10 }} />
              <Text style={styles.others}> Take Out </Text>
            </View>
            <View style ={{flexDirection: 'row', marginTop: 3}}>
              <Icon name="truck" size={25} style={{ paddingRight: 10 }} />
              <Text style={styles.others}> Delivery </Text>
            </View>
          </View>
        </View>

      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  cardImg: {

    height: SCREEN_HEIGHT*.3,
    width: SCREEN_WIDTH,
    resizeMode: 'cover',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,

  },
  card: {
    position: 'absolute',
    height: '80%',
    width: SCREEN_WIDTH,
    borderRadius: 15,
    shadowColor: 'rgba(0,0,0, .4)', // IOS
    shadowOffset: { height: 1, width: 1 }, // IOS
    shadowOpacity: 1, // IOS
    shadowRadius: 2, // IOS
    elevation: 5, // Android
  },
  cardTextContainer: {

    position: 'absolute',
    top: 45,
    zIndex: 999,

  },
  cardText: {
    borderWidth: 2,
    fontSize: 30,
    fontWeight: '800',
    padding: 10,
    borderRadius: 4,
  },
  cardTextContainerLike: {
    left: 45,
    transform: [
      {rotate: '-15deg'}
    ]

  },
  cardTextLike: {
    color: '#4bdb79',
    borderColor: '#4bdb79',
  },
  cardTextContainerNope: {

    right: 45,
    transform: [
      {rotate: '15deg'}
    ]
  },
  cardTextNope: {
    color: '#D80027',
    borderColor: '#D80027',
  },
  subtitle: {
      marginTop: 6,
      fontSize: 18,
      color: colors.gray,
      fontFamily: 'GothamRounded-Medium',
  },
  etc: {
    fontSize: 18,
    color: colors.gray,
    fontFamily: 'GothamRounded-Medium',
  },
  review: {
    fontSize: 18,
    color: 'red',
    fontFamily: 'GothamRounded-Medium',
  },
  others: {
    fontSize: 18,
    color: colors.black,
    fontFamily: 'GothamRounded-Medium',
  },
  openNow: {
    fontSize: 18,
    color: 'green',
    fontFamily: 'GothamRounded-Medium',
    fontWeight: 'bold',
  },
  textContainer: {
    flex: 1,

    paddingTop: 12,
    paddingBottom: 20,
    paddingHorizontal: 16,
    backgroundColor: 'white',
    borderBottomLeftRadius :15,
    borderBottomRightRadius: 15,
  },
  title: {
      fontWeight: 'bold',
      fontSize: 24,
      color: colors.black,
      fontFamily: 'GothamRounded-Medium',
  },
});
