import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableHighlight,
  ImageBackground,
  Button
} from 'react-native';
import {Container, Content,  } from'native-base';
import { Slider } from 'react-native-elements'
import ToggleButton from '../components/ToggleButton'
import FoodImages from '../assets/FoodImages';
import Profile from './Profile'
export default class Search extends Component {
  constructor(props){
    super(props);
    this.state = {
      chinese: false,
      fastfood: false,
      burger: false,
      korean: false,
      japanese: false,
      price: 1,
      distance:1,
      priceString: "Moderate",
      distanceString: "Moderate"
    };
  }
  updateChoice(type) {
    let newState = {...this.state};
    newState[type] = !newState[type];
    this.setState(newState);
  }
  updatePrice(price)
  {
    if (price == 0)
    {
      this.setState({
           price : 0,
           priceString: "Cheap"
        })
    }
    else if(price  == 1)
    {
      this.setState({
            price : 1,
            priceString: "Moderate"
        })
    }
    else if(price == 2)
    {
      this.setState({
            price : 2,
            priceString: "Expensive"
        })
    }
    else
    {
      this.setState({
            price : 3,
            priceString: "Fancy"
        })
    }
  }
  updateDistance(distance)
  {
    if (distance == 0)
    {
      this.setState({
           distance : 0,
           distanceString: "Close"
        })
    }
    else if(distance  == 1)
    {
      this.setState({
            distance : 1,
            distanceString: "Moderate"
        })
    }
    else if(distance == 2)
    {
      this.setState({
            distance : 2,
            distanceString: "Far"
        })
    }
    else
    {
      this.setState({
            distance : 3,
            distanceString: "Very Far"
        })
    }
  }
  render() {
    return (
      <View style={{flex: 1}}>
        <ScrollView style ={styles.scroll}>
          <View style={styles.container}>
            <ToggleButton label='Chinese' onPress={() => { this.updateChoice('chinese')  }} selected={this.state.chinese} source={FoodImages['Chinese']}/>
            <ToggleButton label='Korean' onPress={() => { this.updateChoice('korean')  }} selected={this.state.korean} source={FoodImages['Korean']}/>
            <ToggleButton label='Japanese' onPress={() => { this.updateChoice('japanese')  }} selected={this.state.japanese} source={FoodImages['Japanese']}/>
            <ToggleButton label='Fast Food' onPress={() => { this.updateChoice('fastfood')  }} selected={this.state.fastfood} source={FoodImages['FastFood']}/>
            <ToggleButton label='BBQ' onPress={() => { this.updateChoice('burger')  }} selected={this.state.burger} source={FoodImages['Ghost']}/>
            <ToggleButton label='BBQ' onPress={() => { this.updateChoice('burger')  }} selected={this.state.burger} source={FoodImages['Ghost']}/>
          </View>
          <View style={styles.container}>
            <ToggleButton label='Chinese' onPress={() => { this.updateChoice('chinese')  }} selected={this.state.chinese} source={FoodImages['Chinese']}/>
            <ToggleButton label='Korean' onPress={() => { this.updateChoice('korean')  }} selected={this.state.korean} source={FoodImages['Korean']}/>
            <ToggleButton label='Japanese' onPress={() => { this.updateChoice('japanese')  }} selected={this.state.japanese} source={FoodImages['Japanese']}/>
            <ToggleButton label='Fast Food' onPress={() => { this.updateChoice('fastfood')  }} selected={this.state.fastfood} source={FoodImages['FastFood']}/>
            <ToggleButton label='BBQ' onPress={() => { this.updateChoice('burger')  }} selected={this.state.burger} source={FoodImages['Ghost']}/>
            <ToggleButton label='BBQ' onPress={() => { this.updateChoice('burger')  }} selected={this.state.burger} source={FoodImages['Ghost']}/>
          </View>
          <View style={styles.slider}>
            <Slider
              value={this.state.price}
              minimumValue = {0}
              maximumValue = {3}
              step = {1}
              onValueChange={(price) => this.updatePrice(price)} />
            <Text> {this.state.priceString}</Text>
          </View>
          <View style={styles.slider}>
            <Slider
              value={this.state.distance}
              minimumValue = {0}
              maximumValue = {3}
              step = {1}
              onValueChange={(distance) => this.updateDistance(distance)} />
            <Text>{this.state.distanceString}</Text>
          </View>
        </ScrollView>
        <View style={styles.submitButton}>
          <Button
            //onPress={()}
            title="Search!"
            color="black"
          />
        </View>
      </View>
    );
  }
  onSubmitPressed() {
        this.props.navigator.push({
            screen: 'Profile',
            passProps: {},
            title: 'Profile',
        });
    }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingBottom: 15,
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 15,
  },
  slider: {
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  scroll: {
      backgroundColor: 'white',
  },
  font: {
    //fontWeight: 'bold',
    fontSize: 30,
    color: 'black',
    fontFamily: 'BentonSans Light',
    margin: 6
  },
  submitButton: {
    position: 'absolute',
    right: 0,
    bottom:0,
    left:0,
}
});
