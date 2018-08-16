import React, { Component } from 'react';

import {View, Text, StyleSheet, Animated, Dimensions, PanResponder, Platform, Image, TouchableOpacity,TouchableWithoutFeedback} from 'react-native';
const {width} = Dimensions.get('window');
import colors from '../styles/colors';

export default class SwipeListItemInfo extends Component {
  constructor(props)
  {
    super(props);
  }

  render() {
    return (
      <TouchableOpacity onPress={() => this.props.navigate.navigate(
               'Business', {data: this.props.data, title: this.props.data.name}
            )}>
      <View style={styles.row}>

        <Image source={{uri: this.props.data.image_url}} style={styles.image} />

        <View style = {styles.textContainer}>
          <Text numberOfLines={1} style={styles.title}> {this.props.data.name} </Text>
          <View style={{flexDirection: 'row',}}>

            <Text style={styles.category}> {this.props.data.categories[0].title} </Text>
            <View style={{right: 0, position: "absolute"}}>
              <Text style={styles.category}> {this.props.data.price} </Text>
            </View>
          </View>
          <View style={{flexDirection: 'row',}}>

            <Text style={styles.category}> {this.props.data.distance} </Text>
            <View style={{right: 0, position: "absolute"}}>

                <Text style={styles.category}> {this.props.data.rating} </Text>

            </View>
          </View>
        </View>
      </View>
        </TouchableOpacity >
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
    padding: 7,
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
  image: {
    width: 60,
    height: 60,
    marginRight: 7,
    borderRadius: 30,
  },
  textContainer:
  {
    padding: 1,
    flex: 1,
  },
  category: {
    fontSize: 15,
    color: colors.black,
    fontFamily: 'GothamRounded-Medium',
  },
  title: {
      fontWeight: 'bold',
      fontSize: 20,
      color: colors.black,
      fontFamily: 'GothamRounded-Medium',
  },
  others: {
    fontSize: 15,
    color: colors.black,
    fontFamily: 'GothamRounded-Medium',
  },
  review: {
    fontSize: 15,
    fontWeight: 'bold',
    color: colors.black,
    fontFamily: 'GothamRounded-Medium',
  },
});
