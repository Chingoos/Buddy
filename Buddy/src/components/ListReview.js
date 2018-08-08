import React from 'react';
import {View, Text, StyleSheet, Animated, Dimensions, PanResponder, Platform, Image, TouchableOpacity  } from 'react-native';

const {width} = Dimensions.get('window');
import colors from '../styles/colors'
export default class ListReview extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state={
      item: this.props.item,
    };
  }
  render() {
    const item = this.state.item;

    return (
      <TouchableOpacity onPress={() => this.props.navigation.navigate(
               'Review', {data: item, title: item.restaurant}
            )}
          style={styles.listItem}>
          <View style={styles.row}>
          <Image source={{uri: this.state.item.image}} style={styles.image} />
          <View style = {styles.textContainer}>
            <View style={{flexDirection: 'row',}}>

              <Text style={styles.titleText}> {this.state.item.restaurant} </Text>
              <View style={{right: 0, position: "absolute"}}>
                <Text style={styles.category}> {this.state.item.date} </Text>
              </View>
            </View>

            <View style={{flexDirection: 'row',}}>

              <Text style={styles.category}> {this.state.item.category} </Text>
              <View style={{right: 0, position: "absolute"}}>
                <Text style={styles.category}> {this.state.item.rating} </Text>
              </View>
            </View>
            <View style={{flexDirection: 'row',}}>

              <Text numberOfLines={1} style={styles.category}> {this.state.item.review} </Text>

            </View>
          </View>
        </View>
      </TouchableOpacity>
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
    padding: 10,
    height: 80,

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
    fontSize: 19,
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
    width: 50,
    height: 50,
    marginRight: 15,
    borderRadius: 25,
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
