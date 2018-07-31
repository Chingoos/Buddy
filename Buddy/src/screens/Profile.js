import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, FlatList } from 'react-native';
import { Avatar, Header } from 'react-native-elements';
import { Tab, Tabs, ScrollableTab, TabHeading } from 'native-base';
import Icon from 'react-native-vector-icons/dist/SimpleLineIcons';
import colors from '../styles/colors';
import { ENTRIES1 } from '../components/tempData';

export default class Profile extends Component {
  // renderContent(screen) {
  //   if (screen === 'like') {
  //   }
  //   else if (screen === 'dislike'){
  //   }
  //   else if (screen === 'journal'){
  //   }
  //   else {
  //   }
  // }

  render() {
    return (
      <ScrollView style={styles.scroll}>
        <View style={styles.headerContainer}>
          <View style={styles.avatar}>
            <Avatar
              large
              rounded
              overlayContainerStyle={{ backgroundColor: 'white' }}
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
          initialPage={0}
        >
          <Tab
            heading={
              <TabHeading style={{ backgroundColor: colors.background }}>
                <Icon name="like" size={30} style={{ color: 'black' }} />
              </TabHeading>
            }
          />
          <Tab
            heading={
              <TabHeading style={{ backgroundColor: colors.background }}>
                <Icon name="dislike" size={30} style={{ color: 'black' }} />
              </TabHeading>
            }
          />
          <Tab
            heading={
              <TabHeading style={{ backgroundColor: colors.background }}>
                <Icon name="notebook" size={30} style={{ color: 'black' }} />
              </TabHeading>
            }
          />
          <Tab
            heading={
              <TabHeading style={{ backgroundColor: colors.background }}>
                <Icon name="camera" size={30} style={{ color: 'black' }} />
              </TabHeading>
            }
          />
        </Tabs>
        <View style={styles.container}>
          <FlatList
            data={ENTRIES1}
            keyExtractor={item => item.email}
            renderItem={({ item }) =>
              <View style={styles.flatview}>
                <Text style={styles.listFontBold}>{item.title}</Text>
                <Text style={styles.listFont} numberOfLines={2}>
                    { item.category }
                </Text>

                <View style ={{flexDirection: 'row', marginTop: 3}}>
                <Text style={styles.listFont} >
                    { item.review }
                </Text>
                  <Text style={styles.listFont}> { item.price } </Text>
                  <Text style={styles.listFont}> { item.distance } </Text>
                </View>
              </View>
            }
            ItemSeparatorComponent={() => <View style={styles.divider} />}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  headerContainer: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
  },
  container: {
    flex: 1,
  },
  header: {},
  avatar: {
    marginRight: 12,
  },
  scroll: {
    backgroundColor: 'white',
  },
  font: {
    fontSize: 25,
    color: 'black',
    fontFamily: 'GothamRounded-Medium',
  },
  fontBold: {
    fontWeight: 'bold',
    fontSize: 30,
    color: 'black',
    fontFamily: 'GothamRounded-Medium',
  },
  listFont: {
    fontSize: 15,
    color: 'black',
    fontFamily: 'GothamRounded-Medium',
  },
  listFontBold: {
    fontWeight: 'bold',
    fontSize: 20,
    color: 'black',
    fontFamily: 'GothamRounded-Medium',
  },
  flatview: {
    justifyContent: 'center',
    padding: 15,
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: 'black',
  },
});
