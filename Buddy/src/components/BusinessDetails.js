import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  ScrollView,
  TouchableHighlight
} from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;
import colors from '../styles/colors'
export default class BusinessDetails extends Component {
  constructor(props){
    super(props);
    this.state ={
      image: this.props.image_url,
      title: this.props.name,
      price: this.props.price,
      rating: this.props.rating,
      ratingNum: this.props.reviewCount,
      distance: (Math.round(this.props.distance*0.000621371*100)/100),
      category: this.props.categories[0].title,
      location: this.props.location.address1,
      yelpURL: this.props.url,
      phone: this.props.phone,
      pickUp: this.props.pickUp,
      delivery: this.props.delivery,
      reservation: this.props.reservation,
    };
  }
  render() {

    return (
      <View style={styles.container}>
        <View style={styles.businessCard}>
          <Image style={styles.cardImg} source={{uri: this.state.image}}/>
          <View style = {styles.textContainer}>
            <Text style={styles.title}> {this.state.title} </Text>
            <View style={{flexDirection: 'row',}}>

              <Text style={styles.category}> {this.state.category} </Text>
              <View style={{right: 0, position: "absolute"}}>
                <Text style={styles.category}> {this.state.price} </Text>
              </View>
            </View>
            <View style={{flexDirection: 'row',}}>

              <Text style={styles.category}> {this.state.distance} </Text>
              <View style={{right: 0, position: "absolute"}}>
                <Text style={styles.category}> {this.state.rating} </Text>
              </View>
            </View>
            <View style={{flexDirection: 'row',}}>
              <Icon name="map-marker" color= 'pink' size={25} style={{ paddingRight: 10 }} />
              <Text style={styles.category}> {this.state.location} </Text>
            </View>
            <View style={{flexDirection: 'row',}}>
              <Icon name="phone" color='green' size={25} style={{ paddingRight: 10 }} />
              <Text style={styles.category}> {this.state.phone} </Text>
            </View>


            <Text style={styles.review}>Photos</Text>
            <View style={{flexDirection: 'row',marginTop:5, marginBottom:5, }}>
              <Image style={styles.photos} source={{uri: this.state.image}}/>
            </View>
            <View style={{flexDirection: 'row', marginBottom: 5, }}>
              <Text style={styles.review}>Read reviews!</Text>
            </View>
            <View>
              <View style ={{flexDirection: 'row', marginTop: 3}}>
                <Icon name="calendar" color='black' size={20} style={{ paddingRight: 10 }} />
                <Text style={styles.others}> Reservation </Text>
              </View>
              <View style ={{flexDirection: 'row', marginTop: 3}}>
                <Icon name="shopping-bag" color='black' size={20} style={{ paddingRight: 10 }} />
                <Text style={styles.others}> Take Out </Text>
              </View>
              <View style ={{flexDirection: 'row', marginTop: 3}}>
                <Icon name="truck" size={20} color='black' style={{ paddingRight: 10 }} />
                <Text style={styles.others}> Delivery </Text>
              </View>
              <View style={{flexDirection: 'row',}}>
                <Icon name="yelp" size={20} color='red' style={{ paddingRight: 10 }} />
                <Text style={styles.category}>View on Yelp </Text>
              </View>
              <View style={{right: 0, bottom: 0, position: "absolute", flexDirection: 'row'}}>
                <TouchableHighlight style={styles.button}>
                  <View>
                   <Icon name="bookmark" color='white' size={35} style={{ paddingRight:1 }} />
                  </View>
                </TouchableHighlight>
                <TouchableHighlight style={styles.button}>
                  <View>
                   <Icon name="calendar" color='white' size={35} style={{ paddingRight:1 }} />
                  </View>
                </TouchableHighlight>
                <TouchableHighlight style={styles.buttonReview}>
                  <View>
                   <Icon name="star" color='white' size={35} style={{ paddingRight:1 }} />
                  </View>
                </TouchableHighlight>
              </View>
            </View>
          </View>
        </View>
      </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems:'center',
    justifyContent:'center',
    backgroundColor: 'white',
  },
  businessCard: {
    marginTop: 15,
    flex:1,
    marginBottom: 15,
    width: SCREEN_WIDTH-30,
    borderRadius: 15,
    shadowColor: 'rgba(0,0,0, .4)', // IOS
    shadowOffset: { height: 1, width: 1 }, // IOS
    shadowOpacity: 1, // IOS
    shadowRadius: 2, // IOS
    elevation: 5, // Android


  },
  cardImg: {
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    height: SCREEN_HEIGHT*.2,
    width: SCREEN_WIDTH-30,


  },
  textContainer:
  {
    paddingTop: 5,
    paddingLeft:15,
    paddingRight:15,
  },
  category: {
    fontSize: 18,
    color: colors.black,
    fontFamily: 'GothamRounded-Medium',
  },
  title: {
      fontWeight: 'bold',
      fontSize: 25,
      color: colors.black,
      fontFamily: 'GothamRounded-Medium',
  },
  others: {
    fontSize: 17,
    color: colors.black,
    fontFamily: 'GothamRounded-Medium',
  },
  review: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.black,
    fontFamily: 'GothamRounded-Medium',
  },
  photos: {
    borderRadius: 20,
    height: 100,
    width: 100,


  },
  button:
  {
    borderWidth:1,
    borderColor:'transparent',
    alignItems:'center',
    justifyContent:'center',
    width:55,
    height:55,
    marginLeft:5,
    backgroundColor:colors.accent,
    borderRadius:100,
    shadowColor: 'rgba(0,0,0, .4)', // IOS
    shadowOffset: { height: 1, width: 1 }, // IOS
    shadowOpacity: 1, // IOS
    shadowRadius: 2, // IOS
    elevation: 5, // Android

  },
  buttonReview:
  {
    borderWidth:1,
       borderColor:'transparent',
       alignItems:'center',
       justifyContent:'center',
       width:55,
       height:55,
       marginLeft:5,
       backgroundColor:'red',
       borderRadius:100,
       shadowColor: 'rgba(0,0,0, .4)', // IOS
       shadowOffset: { height: 1, width: 1 }, // IOS
       shadowOpacity: 1, // IOS
       shadowRadius: 2, // IOS
       elevation: 5, // Android

  }
});
