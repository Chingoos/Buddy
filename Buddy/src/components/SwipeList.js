import React, {Component} from 'react';
import {FlatList, StyleSheet, View, Platform, TouchableOpacity, Text} from 'react-native';
import ListItem from '../components/SwipeListItem';
import Icon from 'react-native-vector-icons/dist/FontAwesome'
import colors from '../styles/colors';
export default class SwipeableList extends Component {
  constructor(props) {
    super(props);
    this.renderSeparator = this.renderSeparator.bind(this);
    this.success = this.success.bind(this);
    this.setScrollEnabled = this.setScrollEnabled.bind(this);

    this.state = {
      enable: true,
      data: this.getData(),
      sortAscTitle: true,
      sortAscPrice: true,
      sortAscDistance: true,
      sortAscReview: true,

    };
  }
  getData(){
    const cards = this.props.data;
    cards.forEach((card, i) => {
      card.key = card.id
    });
    return cards;
  }
  sortTitle = () =>
  {
    if(this.state.sortAscPrice)
    {
      this.setState({data: this.state.data.sort(function(a, b){
      if(a.name > b.name) return -1;
      if(a.name < b.name) return 1;
      return 0;
      }) })
      this.setState({sortAscPrice: false})
    }
    else {
      this.setState({data: this.state.data.sort(function(a, b){
      if(a.name < b.name) return -1;
      if(a.name > b.name) return 1;
      return 0;
      }) })
      this.setState({sortAscPrice: true})
    }
  }
  sortPrice = () =>
  {

    if(this.state.sortAscPrice)
    {
      this.setState({data: this.state.data.sort(function(a, b){
      if(a.price > b.price) return -1;
      if(a.price < b.price) return 1;
      return 0;
      }) })
      this.setState({sortAscPrice: false})
    }
    else {
      this.setState({data: this.state.data.sort(function(a, b){
      if(a.price < b.price) return -1;
      if(a.price > b.price) return 1;
      return 0;
      }) })
      this.setState({sortAscPrice: true})
    }
  }
  sortDistance = () =>
  {

    if(this.state.sortAscDistance)
    {
      this.setState({data: this.state.data.sort(function(a, b){
      if(a.distance > b.distance) return -1;
      if(a.distance < b.distance) return 1;
      return 0;
      }) })
      this.setState({sortAscDistance: false})
    }
    else {
      this.setState({data: this.state.data.sort(function(a, b){
      if(a.distance < b.distance) return -1;
      if(a.distance > b.distance) return 1;
      return 0;
      }) })
      this.setState({sortAscDistance: true})
    }
  }
  sortReview = () =>
  {
    if(this.state.sortAscReview)
    {
      this.setState({data: this.state.data.sort(function(a, b){
      if(a.rating > b.rating) return -1;
      if(a.rating < b.rating) return 1;
      return 0;
      }) })
      this.setState({sortAscReview: false})
    }
    else {
      this.setState({data: this.state.data.sort(function(a, b){
      if(a.rating < b.rating) return -1;
      if(a.rating > b.rating) return 1;
      return 0;
      }) })
      this.setState({sortAscReview: true})
    }
  }
  renderSeparator() {
    return (
      <View style={styles.separatorViewStyle}>
        <View style={styles.separatorStyle} />
      </View>
    );
  }

  success(key) {
    const data = this.state.data.filter(item => item.key !== key);
    this.setState({
      data,
    });
  }

  setScrollEnabled(enable) {
    this.setState({
      enable,
    });
  }

  renderItem(item) {
    return (
      <ListItem
        title={item.name}
        price={item.price}
        review={item.rating}
        category={item.categories[0].title}
        distance={(Math.round(item.distance*0.000621371*100)/100)}
        image={item.image_url}
        success={this.success}
        text={item.key}
        setScrollEnabled={enable => this.setScrollEnabled(enable)}
      />
    );
  }
  componentDidMount() {
  this.setState({ data: this.props.data });
 }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            shadowOpacity={0.5}
            shadowRadius={10}
            style={styles.row}
            onPress={this.sortTitle}
          >
            <Text style={styles.font}>Title</Text>
          </TouchableOpacity>
          <TouchableOpacity
            shadowOpacity={0.5}
            shadowRadius={10}
            style={styles.row}
            onPress={this.sortPrice}
          >
            <Text style={styles.font}>Price</Text>
          </TouchableOpacity>
          <TouchableOpacity
            shadowOpacity={0.5}
            shadowRadius={10}
            style={styles.row}
            onPress={this.sortDistance}
          >
            <Text style={styles.font}>Distance</Text>
          </TouchableOpacity>
          <TouchableOpacity
            shadowOpacity={0.5}
            shadowRadius={10}
            style={styles.row}
            onPress={this.sortReview}
          >
            <Text style={styles.font}>Review</Text>
          </TouchableOpacity>
          <Icon onPress={() => this.props.navigation.navigate('RandomPick', {data: this.state.data})} name="question-square" size={20} color={'black'} style={{ position: 'absolute', right: 15, pddingTop:10 }} />
        </View>
        <FlatList
          style={this.props.style}
          data={this.state.data}
          extraData={this.state}
          ItemSeparatorComponent={this.renderSeparator}
          renderItem={({item}) => this.renderItem(item)}
          scrollEnabled={this.state.enable}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  separatorViewStyle: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  separatorStyle: {
    height: 1,
    backgroundColor: '#000',
  },
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginRight: 15,

  },
  font: {
    //fontWeight: 'bold',
    fontSize: 20,
    color: 'black',
    fontFamily: 'GothamRounded-Medium'
  },
  header:{
    borderBottomWidth: Platform.OS !== 'ios' ? 2 : 1,
    borderBottomColor: colors.accent,
    backgroundColor: colors.background,
    flexDirection: 'row', paddingLeft: 10
  }
});
