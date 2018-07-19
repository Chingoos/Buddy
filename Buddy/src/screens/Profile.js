import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  FlatList
} from 'react-native';
import {Avatar, Header,} from 'react-native-elements';
import {Tab, Tabs, ScrollableTab, TabHeading } from'native-base';
import Icon from 'react-native-vector-icons/dist/SimpleLineIcons';
import colors from '../styles/colors';

export default class Profile extends Component {
  render() {
    return (
      <ScrollView style ={styles.scroll}>
        <View style={styles.container}>
          <View style={styles.avatar}>
            <Avatar
              large
              rounded
              overlayContainerStyle={{backgroundColor: 'white'}}
              source={{
                uri: 'http://icons.iconarchive.com/icons/icons8/halloween/256/ghost-2-icon.png',
              }}
              />
          </View>
          <View>
            <Text style={styles.fontBold}>Rookie</Text>
            <Text style={styles.font}>Intro</Text>
          </View>
        </View>
        <Tabs
          tabBarUnderlineStyle={{ backgroundColor: colors.accent, height: 3 }}
          prerenderingSiblingsNumber={5}
          initialPage={0}>
          <Tab
            heading={<TabHeading style={{ backgroundColor: colors.background }}><Icon name="like" size={30} style={{color: 'black'}}/></TabHeading>}>
          </Tab>
          <Tab
            heading={<TabHeading style={{ backgroundColor: colors.background }}><Icon name="dislike" size={30} style={{color: 'black'}} /></TabHeading>}>
          </Tab>
          <Tab
            heading={<TabHeading style={{ backgroundColor: colors.background }}><Icon name="notebook" size={30} style={{color: 'black'}} /></TabHeading>}>
          </Tab>
          <Tab
            heading={<TabHeading style={{ backgroundColor: colors.background }}><Icon name="camera" size={30} style={{color: 'black'}} /></TabHeading>}>
          </Tab>
        </Tabs>
      </ScrollView>
    );
  }

}
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingBottom: 2,
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 15,
  },
  header: {
  },
  avatar: {
    marginRight: 12,
  },
  scroll: {
      backgroundColor: 'white',
  },
  font: {
    //fontWeight: 'bold',
    fontSize: 25,
    color: 'black',
    fontFamily: 'GothamRounded-Medium'
  },
  fontBold: {
    fontWeight: 'bold',
    fontSize: 30,
    color: 'black',
    fontFamily: 'GothamRounded-Medium'
  }
});
