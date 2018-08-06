import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  ScrollView,
  FlatList
} from 'react-native';
import { Header, Item, Input } from 'native-base';
import Icon from 'react-native-vector-icons/dist/SimpleLineIcons';
import colors from '../styles/colors';
import { ENTRIES1 } from '../components/tempData';
import ListItem from '../components/ListItem';
export default class BusinessSearch extends Component {
  constructor(props){
    super(props);
    this.state = {
        data: ENTRIES1
    };
  }
  renderSeparator() {
    return (
      <View style={styles.separatorViewStyle}>
        <View style={styles.separatorStyle} />
      </View>
    );
  }
  renderItem(item) {
    return (
      <ListItem
        navigation={this.props.navigation}
        item={item}
        title={item.title}
        price={item.price}
        review={item.review}
        category={item.category}
        distance={item.distance}
        image={item.illustration}
        success={this.success}
        text={item.key}
      />
    );
  }
  renderContent(){
    return(
      <View style={{ flex: 1, backgroundColor: colors.background }}>
         <FlatList
           style={{ backgroundColor: colors.background }}
           initialNumToRender={5}
           data={this.state.data}
           ItemSeparatorComponent={this.renderSeparator}
           renderItem={({item}) => this.renderItem(item)}
         />
       </View>
    )
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
            <Icon onPress={() => this.props.navigation.navigate('Home')} name="arrow-left" size={20} style={{ paddingRight: 15 }} />
            <Input autoFocus placeholder="Search" placeholderTextColor={'#bfbfbf'} style={{ color: 'black', fontFamily: 'GothamRounded-Medium' }} />
          </Item>
        </Header>
        {this.renderContent()}
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
  separatorViewStyle: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  separatorStyle: {
    height: 1,
    backgroundColor: '#000',
  },
});
