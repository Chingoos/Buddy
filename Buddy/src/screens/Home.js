import React, { Component } from 'react';
import { View,  Text,  StyleSheet,  ScrollView,  Platform, StatusBar, SafeAreaView} from 'react-native';
import {Header, Item, Input, Button } from'native-base';
import Icon from 'react-native-vector-icons/dist/SimpleLineIcons';
import LinearGradient from 'react-native-linear-gradient';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import SliderEntry from '../components/SliderEntry';
import colors from '../styles/colors';
import styles from '../styles/styles';
import { sliderWidth, itemWidth } from '../styles/sliderStyle';
import { ENTRIES1} from '../components/tempData';


export default class Home extends Component {

    _renderItem ({item, index}) {
        return <SliderEntry data={item} even={(index + 1) % 2 === 0} />;
    }
  render() {

    style = {
        borderBottomWidth: (Platform.OS !== 'ios') ? 2 : 1,
        borderBottomColor: colors.accent,
        backgroundColor: colors.background, };
    return (
      <ScrollView style ={styles.scroll}>
        <Header
          style={style}
          androidStatusBarColor='white'
          noShadow='false'
          searchBar rounded>
          <Item>
            <Icon name="magnifier" size={20} style={{paddingRight: 15}} />
            <Input placeholder="Search" />
          </Item>

        </Header>
        <View style = {styles.container}>
          <Text style={styles.font}>
            Popular nearby
          </Text>
        </View>
        <View style={styles.exampleContainer}>
            <Carousel
              data={ENTRIES1}
              renderItem={this._renderItem}
              sliderWidth={sliderWidth}
              itemWidth={itemWidth}
              containerCustomStyle={styles.slider}
              contentContainerCustomStyle={styles.sliderContentContainer}
              layout={'stack'}
              loop={true}
            />
        </View>
        <View style = {styles.container}>
          <Text style={styles.font}>
            Popular nearby
          </Text>
        </View>
        <View style={styles.exampleContainer}>
            <Carousel
              data={ENTRIES1}
              renderItem={this._renderItem}
              sliderWidth={sliderWidth}
              itemWidth={itemWidth}
              containerCustomStyle={styles.slider}
              contentContainerCustomStyle={styles.sliderContentContainer}
              layout={'stack'}
              loop={true}
            />
        </View>
      </ScrollView>
    );
  }
}
