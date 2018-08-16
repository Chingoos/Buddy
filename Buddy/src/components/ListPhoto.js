import React from 'react';
import {View, Text, StyleSheet, Animated, Dimensions, PanResponder, Platform, Image, TouchableOpacity  } from 'react-native';

const {width} = Dimensions.get('window');
import colors from '../styles/colors'
export default class ListPhoto extends React.PureComponent {
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
               'Photo', {data: item, title: item.title}
            )}
          style={styles.listItem}>
          <Image source={{uri: this.state.item.image_url}} style={styles.image} />
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  listItem: {
    width: width/3,
    height: width/3,
    backgroundColor: 'white',
    padding: 1
  },

  image: {

    width: (width/3)-2,
    height: (width/3)-2,
    marginRight: 1,
    borderRadius: 2,
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
