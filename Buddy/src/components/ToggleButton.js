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
import colors from '../styles/colors';
const ToggleButton = props => {
  return (
    <TouchableOpacity
      style={[styles.button, props.selected ? { backgroundColor: colors.accent, borderColor:colors.accent, elevation: 3, shadowColor: 'rgba(0,0,0, .4)',  shadowOpacity: 1, // IOS
      shadowRadius: 2,} : { shadowColor: 'rgba(0,0,0, .4)',
      shadowOffset: { height: 1, width: 1 }, // IOS
      shadowOpacity: 1, // IOS
      shadowRadius: 2, // IOS
      elevation: 3, // Android
    }]}
      onPress={props.onPress}
      activeOpacity={0.5}
    >

        <View
          style={[
            styles.overlay,
            props.selected ? { backgroundColor: 'rgba(0,0,0,0)' } : {},
          ]}
        >
        <ImageBackground style={styles.imageWrap} source={props.source} resizeMode="contain">
          <Text
            style={[
              styles.choiceText,
              props.label.length > 7 ? { fontSize: 9 } : {},
              props.label.length > 9 ? { fontSize: 8 } : {},
              props.selected ? { color: 'transparent'} :{ textShadowColor: 'rgba(0, 0, 0, 0.75)',
                textShadowOffset: {width: -1, height: 1},
                textShadowRadius: 10},
            ]}
          >
            {props.label}
          </Text>
          </ImageBackground>
        </View>

    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  choiceText: {
    color: 'white',
    fontFamily: 'GothamRounded-Medium',
    fontSize: 12,
    fontWeight: 'bold',
    flexWrap: 'wrap',
    opacity: 1,
  },
  overlay: {
    height: 60,
    width: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(0,0,0,0.25)',
    alignItems: 'center',
    justifyContent: 'center',

  },
  button: {
    height: 60,
    width: 60,
    borderRadius: 30,

    margin: 1.25,
    backgroundColor: 'white',

  },
  imageWrap: {
    opacity: .5,
    height: '100%',
    width: '100%',
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 7,
  },
});

export default ToggleButton;
