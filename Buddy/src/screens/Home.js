import React, { Component } from 'react';
import { View, Text, ScrollView, Platform, StyleSheet, TouchableOpacity } from 'react-native';
import { Header, Item, Input } from 'native-base';
import Icon from 'react-native-vector-icons/dist/SimpleLineIcons';
import LinearGradient from 'react-native-linear-gradient';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import SliderEntry from '../components/SliderEntry';
import colors from '../styles/colors';
// import styles from '../styles/styles';
import { sliderWidth, itemWidth } from '../styles/sliderStyle';
import { ENTRIES1 } from '../components/tempData';

export default class Home extends Component {
  constructor(props)
  {
    super(props);
  }
  _renderItem({ item, index }) {
    return <SliderEntry data={item} even={(index + 1) % 2 === 0} />;
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <Header
          style={styles.header}
          androidStatusBarColor="white"
          iosBarStyle="dark-content"
          noShadow="false"
          searchBar
          rounded
          onPress
        >
          <Item>
            <Icon name="magnifier" size={20} style={{ paddingRight: 15 }} />
            <TouchableOpacity onPress={() => this.props.navigation.navigate('BusinessSearch')} style={{flex:1,}}>
              <Text   style={{ fontSize: 17,  color: '#bfbfbf', fontFamily: 'GothamRounded-Medium' }}> Search </Text>
            </TouchableOpacity>
          </Item>
        </Header>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Popular nearby</Text>
        </View>
        <View style={{ borderWidth: 0 }}>
          <Carousel
            data={ENTRIES1}
            renderItem={this._renderItem}
            sliderWidth={sliderWidth}
            itemWidth={itemWidth}
            containerCustomStyle={styles.slider}
            contentContainerCustomStyle={styles.sliderContentContainer}
            layout="stack"
            layoutCardOffset={`18`}
            loop
          />
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Recently Viewed</Text>
        </View>
        <View style={{ borderWidth: 0 }}>
          <Carousel
            data={ENTRIES1}
            renderItem={this._renderItem}
            sliderWidth={sliderWidth}
            itemWidth={itemWidth}
            containerCustomStyle={styles.slider}
            contentContainerCustomStyle={styles.sliderContentContainer}
            layout="default"
            loop
          />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    borderBottomWidth: Platform.OS !== 'ios' ? 2 : 1,
    borderBottomColor: colors.accent,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  titleContainer: {
    padding: 10,
  },
  title: {
    fontSize: 25,
    color: 'black',
    fontFamily: 'GothamRounded-Medium',
  },
  slider: {
    marginTop: 0,
    overflow: 'visible', // for custom animations
  },
  sliderContentContainer: {
    paddingVertical: 0, // for custom animation
  },
});
