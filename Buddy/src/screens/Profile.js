import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, FlatList, SafeAreaView,Dimensions } from 'react-native';
import { Avatar, Header } from 'react-native-elements';
import { Tab, Tabs, ScrollableTab, TabHeading, Container } from 'native-base';
import Icon from 'react-native-vector-icons/dist/SimpleLineIcons';
import IconB from 'react-native-vector-icons/dist/FontAwesome'
import IconC from 'react-native-vector-icons/dist/MaterialCommunityIcons'
import colors from '../styles/colors';
import { ENTRIES1, ENTRIES2 } from '../components/tempData';
import ListItem from '../components/ListItem';
import ListPhoto from '../components/ListPhoto';
import ListReview from '../components/ListReview';
const {width} = Dimensions.get('window');
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
  renderReview(item) {
    return (
      <ListReview
        navigation={this.props.navigation}
        item={item}
      />
    );
  }
  renderPhotos(item) {
    return (
      <ListPhoto
        navigation={this.props.navigation}
        item={item}
      />
    );
  }
  renderItem(item) {
    return (
      <ListItem
        navigation={this.props.navigation}
        item={item}
      />
    );
  }
  renderSeparator() {
    return (
      <View style={styles.separatorViewStyle}>
        <View style={styles.separatorStyle} />
      </View>
    );
  }
  render() {
    return (

        <Container>
          <View style={styles.scroll}>
            <View style={styles.headerContainer}>
              <View style={{flexDirection:'row'}}>
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
                <View  style={{right: 0, flexDirection:'row', position: "absolute"}}>
                  <View style={{width: width*.22, alignItems:'center'}}>
                    <Text style={styles.font}>2</Text>
                    <Text style={styles.profileFont}>reviews</Text>
                  </View>
                  <View style={{width: width*.22, alignItems:'center'}}>
                    <Text style={styles.font}>6</Text>
                    <Text style={styles.profileFont}>photos</Text>
                  </View>

                  <View style={{width: width*.22, alignItems:'center'}}>
                    <Text style={styles.font}>6</Text>
                    <Text style={styles.profileFont}>friends</Text>
                  </View>

                </View>
              </View>
              <View>
                <View style={{flexDirection:'row'}}>
                  <View style={{marginRight:20}}>
                    <Text style={styles.fontBold}>username</Text>
                  </View>

                  <View style={{right: 0, flexDirection:'row', position: "absolute"}}>
                    <IconB name="edit" size={32} style={{ color: 'black', marginRight: 10 }} />
                    <IconB name="cog" size={32} style={{ color: 'black' }} />
                  </View>
                </View>
                <Text style={styles.intro}>Hi</Text>
              </View>
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
                  <Icon name="notebook" size={30} style={{ color: 'black' }} />
                </TabHeading>
              }
            >
            <FlatList
              data={ENTRIES2}

              renderItem={({item}) => this.renderReview(item)}
              ItemSeparatorComponent={this.renderSeparator}
              showsVerticalScrollIndicator={false}
              />
            </Tab>
            <Tab
              heading={
                <TabHeading style={{ backgroundColor: colors.background }}>
                  <Icon name="camera" size={30} style={{ color: 'black' }} />
                </TabHeading>
              }
            >
            <FlatList
              data={ENTRIES1}
              numColumns={3}
              renderItem={({item}) => this.renderPhotos(item)}
              ItemSeparatorComponent={this.renderSeparator}
              showsVerticalScrollIndicator={false}
              />
            </Tab>
            <Tab
              heading={
                <TabHeading style={{ backgroundColor: colors.background }}>
                  <Icon name="like" size={30} style={{ color: 'black' }} />
                </TabHeading>
              }>
              <View style={styles.container}>
                <FlatList
                  data={ENTRIES1}
                  renderItem={({item}) => this.renderItem(item)}
                  ItemSeparatorComponent={this.renderSeparator}
                  showsVerticalScrollIndicator={false}
                />
              </View>
            </Tab>
            <Tab
              heading={
                <TabHeading style={{ backgroundColor: colors.background }}>
                  <Icon name="dislike" size={30} style={{ color: 'black' }} />
                </TabHeading>
              }
            >
            <View style={styles.container}>
              <FlatList
                data={ENTRIES1}
                renderItem={({item}) => this.renderItem(item)}
                ItemSeparatorComponent={this.renderSeparator}
                showsVerticalScrollIndicator={false}
              />
            </View>
          </Tab>
          </Tabs>
        </Container>


    );
  }
}
const styles = StyleSheet.create({
  headerContainer: {
    marginTop: 10,
    paddingLeft: 15,
    paddingRight: 15,
  },
  container: {
    backgroundColor: 'white',
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
  intro: {
    fontSize: 17,
    color: 'black',

  },
  profileFont: {
    fontSize: 17,
    color: 'black',
    fontFamily: 'GothamRounded-Medium',
  },
  fontBold: {

    fontSize: 25,
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
  separatorViewStyle: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  separatorStyle: {
    height: 1,
    backgroundColor: '#000',
  },
});
