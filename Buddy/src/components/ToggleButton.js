import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
  ImageBackground,
  Platform,
} from 'react-native';

const ToggleButton = props => {
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={props.onPress}
      activeOpacity={0.5}
    >
      <ImageBackground style={styles.imageWrap} source={props.source} resizeMode="contain">
        <View
          style={[
            styles.overlay,
            props.selected ? { backgroundColor: 'rgba(0,0,0,0.125)' } : {},
          ]}
        >
          <Text
            style={[
              styles.choiceText,
              props.label.length > 8 ? { fontSize: 7 } : {},
            ]}
          >
            {props.label}
          </Text>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  choiceText: {
    color: 'white',
    fontFamily: 'GothamRounded-Medium',
    fontSize: 10,
    flexWrap: 'wrap',
  },
  overlay: {
    height: 60,
    width: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 2.5,
  },
  button: {
    height: 60,
    width: 60,
    borderRadius: 30,
    shadowColor: 'rgba(0,0,0, .4)', // IOS
    shadowOffset: { height: 1, width: 1 }, // IOS
    shadowOpacity: 1, // IOS
    shadowRadius: 2, // IOS
    elevation: 3, // Android
    margin: 2.5,
    marginLeft: 0,
    backgroundColor: 'white',
  },
  imageWrap: {
    height: 60,
    width: 60,
    borderRadius: 60,
  },
});

export default ToggleButton;
