import React from 'react';
import {View, Text, StyleSheet, Animated, Dimensions, PanResponder, Platform, Image} from 'react-native';

const {width} = Dimensions.get('window');

export default class ListItem extends React.PureComponent {
  constructor(props) {
    super(props);

    this.gestureDelay = -35;
    this.scrollViewEnabled = true;

    const position = new Animated.ValueXY();
    const panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => false,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onPanResponderTerminationRequest: (evt, gestureState) => false,
      onPanResponderMove: (evt, gestureState) => {
        if (gestureState.dx > 35) {
          this.setScrollViewEnabled(false);
          let newX = gestureState.dx + this.gestureDelay;
          position.setValue({x: newX, y: 0});
        }
      },
      onPanResponderRelease: (evt, gestureState) => {
        if (gestureState.dx < 150) {
          Animated.timing(this.state.position, {
            toValue: {x: 0, y: 0},
            duration: 150,
          }).start(() => {
            this.setScrollViewEnabled(true);
          });
        } else {
          Animated.timing(this.state.position, {
            toValue: {x: width, y: 0},
            duration: 300,
          }).start(() => {
            this.props.success(this.props.text);
            this.setScrollViewEnabled(true);
          });
        }
      },
    });

    this.panResponder = panResponder;
    this.state = {position};
  }

  setScrollViewEnabled(enabled) {
    if (this.scrollViewEnabled !== enabled) {
      this.props.setScrollEnabled(enabled);
      this.scrollViewEnabled = enabled;
    }
  }

  render() {
    return (
      <View style={styles.listItem}>
        <Animated.View style={[this.state.position.getLayout()]} {...this.panResponder.panHandlers}>
          <View style={styles.absoluteCell}>
            <Text style={styles.absoluteCellText}>DELETE</Text>
          </View>
          <View style={styles.row}>
          <Image source={{uri: this.props.image}} style={styles.image} />
            <View style={styles.firstRow}>
              <View style={styles.secondRow}>
                <View style={styles.title}>
                  <Text style={styles.titleText}>
                    {this.props.title}
                  </Text>
                </View>
                <View style={styles.etc}>
                  <Text style={styles.subTitle}>
                    {this.props.price}
                  </Text>
                  <Text style={styles.subTitle}>
                    {this.props.distance}
                  </Text>
                  <Text style={styles.subTitle}>
                    {this.props.review}
                  </Text>
                </View>
              </View>
              <View style={styles.secondRow}>
                <Text style={styles.category}>
                  {this.props.category}
                </Text>
              </View>
            </View>
          </View>
        </Animated.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  listItem: {
    height: 80,
    marginLeft: -100,
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  absoluteCell: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    width: 100,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  absoluteCellText: {
    margin: 16,
    color: '#FFF',
  },
  innerCell: {
    width: width,
    height: 80,
    marginLeft: 100,
    backgroundColor: 'yellow',
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    width: width,
    marginLeft: 100,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    height: 60,

    marginTop: 2,
    marginBottom: 2,
    borderRadius: 4,


    ...Platform.select({
      ios: {
        width: window.width - 5 * 2,
        shadowColor: 'rgba(0,0,0,0.2)',
        shadowOpacity: 1,
        shadowOffset: {height: 2, width: 2},
        shadowRadius: 2,
      },

      android: {
        width: window.width - 5 * 2,
        elevation: 0,
        marginHorizontal: 5,
      },
    })
  },
  firstRow:{
    flex: 1,

  },
  secondRow:{
    flexDirection: 'row',


  },
  etc:{
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  title: {
    //fontWeight: 'bold',
    alignSelf: 'flex-start',
  },
  titleText: {
    //fontWeight: 'bold',
    fontSize: 20,
    color: 'black',
    fontFamily: 'GothamRounded-Medium'
  },
  subTitle: {
    //fontWeight: 'bold',
    fontSize: 15,
    color: 'black',
    fontFamily: 'GothamRounded-Medium',
    marginLeft: 5
  },
  review: {
    //fontWeight: 'bold',
    fontSize: 15,
    color: 'black',
    fontFamily: 'GothamRounded-Medium',

  },
  category: {
    //fontWeight: 'bold',
    fontSize: 17,
    color: 'black',
    fontFamily: 'GothamRounded-Medium',

  },
  image: {
    width: 50,
    height: 50,
    marginRight: 15,
    borderRadius: 25,
  },
});
