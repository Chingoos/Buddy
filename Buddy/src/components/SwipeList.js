import React, {Component} from 'react';
import {FlatList, StyleSheet, View, Platform, TouchableOpacity, Text} from 'react-native';
import ListItem from '../components/ListItem';

export default class SwipeableList extends Component {
  constructor(props) {
    super(props);
    this.renderSeparator = this.renderSeparator.bind(this);
    this.success = this.success.bind(this);
    this.setScrollEnabled = this.setScrollEnabled.bind(this);

    this.state = {
      enable: true,
      data: this.props.data,
      sortAscTitle: true,
      sortAscPrice: true,
      sortAscDistance: true,
      sortAscReview: true,

    };
  }
  sortTitle = () =>
  {
    if(this.state.sortAscPrice)
    {
      this.setState({data: this.state.data.sort(function(a, b){
      if(a.title > b.title) return -1;
      if(a.title < b.title) return 1;
      return 0;
      }) })
      this.setState({sortAscPrice: false})
    }
    else {
      this.setState({data: this.state.data.sort(function(a, b){
      if(a.title < b.title) return -1;
      if(a.title > b.title) return 1;
      return 0;
      }) })
      this.setState({sortAscPrice: true})
    }
  }
  sortPrice = () =>
  {
    console.log(this.state.data);
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
    console.log(this.state.data);
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
    console.log(this.state.data);
    if(this.state.sortAscReview)
    {
      this.setState({data: this.state.data.sort(function(a, b){
      if(a.title > b.review) return -1;
      if(a.title < b.review) return 1;
      return 0;
      }) })
      this.setState({sortAscReview: false})
    }
    else {
      this.setState({data: this.state.data.sort(function(a, b){
      if(a.title < b.review) return -1;
      if(a.title > b.review) return 1;
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
        title={item.title}
        price={item.price}
        review={item.review}
        category={item.category}
        distance={item.distance}
        image={item.illustration}
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
        <View style={{flexDirection: 'row'}}>
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
    padding: 15,
    height: 30,
    marginTop: 2,
    marginBottom: 2,
    borderRadius: 4,

  },
  font: {
    //fontWeight: 'bold',
    fontSize: 15,
    color: 'black',
    fontFamily: 'GothamRounded-Medium'
  },
});
