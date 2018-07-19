import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableHighlight,
  ImageBackground,
  TouchableOpacity
} from 'react-native';
import {Container, Content,  } from'native-base';
import { Slider } from 'react-native-elements'
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import SwitchSelector from 'react-native-switch-selector';
import ToggleButton from '../components/ToggleButton'
import FoodImages from '../assets/FoodImages';
import Profile from './Profile'
import colors from '../styles/colors';

const options = [
  { label: 'All', value: '1' },
  { label: 'New', value: '1.5' },
  { label: 'Liked', value: '2' }
];

export default class Search extends Component {
  constructor(props){
    super(props);
    this.state = {
      buregers: false,
      chicken_wings: false,
      pizza: false,
      sandwich: false,
      breakfast: false,
      vegan: false,
      chinese: false,
      korean: false,
      japanese: false,
      taiwanese: false,
      vietnamese: false,
      coffee: false,
      boba: false,
      ice_cream: false,
      dessert: false,
      bakery: false,
      bar: false,
      price: [0,1],
      distance:[0,1],
      priceString: "Cheap to Average",
      distanceString: "Close to Moderate"
    };
  }

  updateChoice(type) {
    let newState = {...this.state};
    newState[type] = !newState[type];
    this.setState(newState);
  }
  updatePrice(price)
  {
    if (price[0]== 0 && price[1]== 0)
    {
      this.setState({
           price : [0,0],
           priceString: "Cheap"
        })
    }
    else if(price[0]== 0 && price[1]== 1)
    {
      this.setState({
            price : [0,1],
            priceString: "Cheap to Average"
        })
    }
    else if(price[0]== 0 && price[1]== 2)
    {
      this.setState({
            price : [0,2],
            priceString: "Cheap to Expensive"
        })
    }
    else if(price[0]== 0 && price[1]== 3)
    {
      this.setState({
            price : [0,3],
            priceString: "Cheap to Fancy"
        })
    }
    else if(price[0]== 1 && price[1]== 1)
    {
      this.setState({
            price : [1,1],
            priceString: "Average"
        })
    }
    else if(price[0]== 1 && price[1]== 2)
    {
      this.setState({
            price : [1,2],
            priceString: "Average to Expensive"
        })
    }
    else if(price[0]== 1 && price[1]== 3)
    {
      this.setState({
            price : [1,3],
            priceString: "Average to Fancy"
        })
    }
    else if(price[0]== 2 && price[1]== 2)
    {
      this.setState({
            price : [2,2],
            priceString: "Expensive"
        })
    }
    else if(price[0]== 2 && price[1]== 3)
    {
      this.setState({
            price : [2,3],
            priceString: "Expensive to Fancy"
        })
    }
    else {
      this.setState({
            price : [3,3],
            priceString: "Fancy"
        })
    }

  }
  updateDistance(distance)
  {
    if (distance[0]== 0 && distance[1]== 0)
    {
      this.setState({
           distance : [0,0],
           distanceString: "Close"
        })
    }
    else if(distance[0]== 0 && distance[1]== 1)
    {
      this.setState({
            distance : [0,1],
            distanceString: "Close to Moderate"
        })
    }
    else if(distance[0]== 0 && distance[1]== 2)
    {
      this.setState({
            distance : [0,2],
            distanceString: "Close to Far"
        })
    }
    else if(distance[0]== 0 && distance[1]== 3)
    {
      this.setState({
            distance : [0,3],
            distanceString: "Close to Very Far"
        })
    }
    else if(distance[0]== 1 && distance[1]== 1)
    {
      this.setState({
            distance : [1,1],
            distanceString: "Moderate"
        })
    }
    else if(distance[0]== 1 && distance[1]== 2)
    {
      this.setState({
            distance : [1,2],
            distanceString: "Moderate to Far"
        })
    }
    else if(distance[0]== 1 && distance[1]== 3)
    {
      this.setState({
            distance : [1,3],
            distanceString: "Mderate to Very Far"
        })
    }
    else if(distance[0]== 2 && distance[1]== 2)
    {
      this.setState({
            distance : [2,2],
            distanceString: "Far"
        })
    }
    else if(distance[0]== 2 && distance[1]== 3)
    {
      this.setState({
            distance : [2,3],
            distanceString: "Far to Very Far"
        })
    }
    else {
      this.setState({
            distance : [3,3],
            distanceString: "Very Far"
        })
    }
  }
  render() {
    return (
      <View style={{flex: 1}}>
        <ScrollView style ={styles.scroll}>
          <SwitchSelector buttonColor={colors.accent} options={options} initial={0} onPress={value => console.log(`Call onPress with value: ${value}`)} />
          <View style={styles.container}>
            <ToggleButton label='Burgers' onPress={() => { this.updateChoice('burgers')  }} selected={this.state.burgers} source={FoodImages['Burgers']}/>
            <ToggleButton label='Chicken Wings' onPress={() => { this.updateChoice('chicken_wings')  }} selected={this.state.chicken_wings} source={FoodImages['Chicken Wings']}/>
            <ToggleButton label='Pizza' onPress={() => { this.updateChoice('pizza')  }} selected={this.state.pizza} source={FoodImages['Pizza']}/>
            <ToggleButton label='Sandwich' onPress={() => { this.updateChoice('sandwich')  }} selected={this.state.sandwich} source={FoodImages['Sandwich']}/>
            <ToggleButton label='Breakfast' onPress={() => { this.updateChoice('breakfast')  }} selected={this.state.breakfast} source={FoodImages['Breakfast']}/>
            <ToggleButton label='Vegan' onPress={() => { this.updateChoice('vegan')  }} selected={this.state.vegan} source={FoodImages['vegan']}/>
          </View>
          <View style={styles.container}>
            <ToggleButton label='Chinese' onPress={() => { this.updateChoice('chinese')  }} selected={this.state.chinese} source={FoodImages['Chinese']}/>
            <ToggleButton label='Korean' onPress={() => { this.updateChoice('korean')  }} selected={this.state.korean} source={FoodImages['Korean']}/>
            <ToggleButton label='Japanese' onPress={() => { this.updateChoice('japanese')  }} selected={this.state.japanese} source={FoodImages['Japanese']}/>
            <ToggleButton label='Taiwanese' onPress={() => { this.updateChoice('taiwanese')  }} selected={this.state.taiwanese} source={FoodImages['Taiwanese']}/>
            <ToggleButton label='Vietnamese' onPress={() => { this.updateChoice('Vietnamese')  }} selected={this.state.vietnamese} source={FoodImages['Vietnamese']}/>
            <ToggleButton label='Other Asian' onPress={() => { this.updateChoice('asian')  }} selected={this.state.asian} source={FoodImages['Other Asian']}/>
          </View>
          <View style={styles.container}>
            <ToggleButton label='Coffee' onPress={() => { this.updateChoice('coffee')  }} selected={this.state.coffee} source={FoodImages['Coffee']}/>
            <ToggleButton label='Boba' onPress={() => { this.updateChoice('boba')  }} selected={this.state.boba} source={FoodImages['Boba']}/>
            <ToggleButton label='Ice Cream' onPress={() => { this.updateChoice('ice_cream')  }} selected={this.state.ice_cream} source={FoodImages['Ice Cream']}/>
            <ToggleButton label='Dessert' onPress={() => { this.updateChoice('dessert')  }} selected={this.state.dessert} source={FoodImages['Dessert']}/>
            <ToggleButton label='Bakery' onPress={() => { this.updateChoice('bakery')  }} selected={this.state.bakery} source={FoodImages['Bakery']}/>
            <ToggleButton label='Bar' onPress={() => { this.updateChoice('bar')  }} selected={this.state.bar} source={FoodImages['Bar']}/>
          </View>

          <View style={styles.slider}>
            <Text style={styles.font}> {this.state.priceString}</Text>
            <MultiSlider
              values= {[this.state.price[0],this.state.price[1]]}
              min= {0}
              max = {3}
              step = {1}
              allowOverlap
              snapped
              markerStyle = {{backgroundColor: colors.accent, height: 20, width: 20, borderRadius: 20}}
              selectedStyle = {{backgroundColor: colors.accent, height: 2.5, width: 0, borderRadius: 0}}
              //minimumTrackTintColor = {colors.accent}
              //thumbTintColor = {colors.accent}
              onValuesChange={(price) => this.updatePrice(price)}
              />

          </View>
          <View style={styles.slider}>
            <Text style={styles.font}>{this.state.distanceString}</Text>
            <MultiSlider
              values= {[this.state.distance[0],this.state.distance[1]]}
              min= {0}
              max = {3}
              step = {1}
              allowOverlap
              snapped
              markerStyle = {{backgroundColor: colors.accent, height: 20, width: 20, borderRadius: 20}}
              selectedStyle = {{backgroundColor: colors.accent, height: 2.5, width: 0, borderRadius: 0}}
              //enabledTwo=  {true}
              //trackStyle: { color: 'blue' },
              //thumbTintColor = {colors.accent}
              //maximumTrackTintColor =
              //minimumTrackTintColor = {colors.accent}
              onValuesChange={(distance) => this.updateDistance(distance)}
              />

          </View>
        </ScrollView>
        <View style={styles.buttonContainer}>
          <TouchableOpacity shadowOpacity={ 0.5 } shadowRadius = {10} style = {styles.button} >
            <Text style={styles.font}>Search!</Text>
          </TouchableOpacity>

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
    paddingBottom: 0,
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 15,
  },
  slider: {
    alignItems: 'center',
    //flex: 1,
    paddingTop: 15,
    paddingLeft: 30,
    paddingRight: 30,
    marginLeft: 20,
    marginRight: 20,
    //alignItems: 'stretch',
    justifyContent: 'center',
  },
  scroll: {
      backgroundColor: 'white',
  },
  font: {
    //fontWeight: 'bold',
    fontSize: 20,
    color: 'black',
    fontFamily: 'GothamRounded-Medium',
    margin: 6
  },
  buttonContainer: {
    position: 'absolute',
    marginLeft:50,
    marginRight:50,
    marginBottom: 20,
    right: 0,
    bottom:0,
    left:0,
    height: 70,
    borderRadius: 20,
    shadowRadius:5,

  },
  button: {
    height: 50,
    backgroundColor : colors.accent,
    alignItems: 'center',
    borderRadius: 20,
    shadowColor: 'rgba(0,0,0, .4)', // IOS
    shadowOffset: { height: 1, width: 1 }, // IOS
    shadowOpacity: 1, // IOS
    shadowRadius: 2, //IOS
    elevation: 3, // Android
  }
});
