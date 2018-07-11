import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
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
              title="JK"
              />
          </View>
          <View>
            <Text style={{ color: 'black', fontSize: 16, fontWeight: 'bold'}}>Restaurant History of JK</Text>
            <Text style={{ color: 'black', fontSize: 16,}}>San Francisco CA US</Text>
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
            heading={<TabHeading style={{ backgroundColor: colors.background }}><Icon name="globe" size={30} style={{color: 'black'}} /></TabHeading>}>
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
    paddingBottom: 8,
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 6,
  },
  header: {
  },
  avatar: {
    marginRight: 12,
  },
  scroll: {
      backgroundColor: 'white',
  }
});
