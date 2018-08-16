import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity,TouchableHighlight } from 'react-native';
import PropTypes from 'prop-types';
import { ParallaxImage } from 'react-native-snap-carousel';
import styles from '../styles/sliderStyle';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
export default class SliderEntry extends Component {
    constructor(props){
      super(props);
      this.state={
        category: props.data.categories[0].title,
      };
    }
    static propTypes = {
        data: PropTypes.object.isRequired,
        even: PropTypes.bool,
        parallax: PropTypes.bool,
        parallaxProps: PropTypes.object
    };

    get image () {
        const { data: { image_url }, parallax, parallaxProps, even } = this.props;

        return parallax ? (
            <ParallaxImage
              source={{ uri: image_url }}
              containerStyle={[styles.imageContainer, even ? styles.imageContainerEven : {}]}
              style={styles.image}
              parallaxFactor={0.35}
              showSpinner={true}
              spinnerColor={even ? 'rgba(255, 255, 255, 0.4)' : 'rgba(0, 0, 0, 0.25)'}
              {...parallaxProps}
            />
        ) : (
            <Image
              source={{ uri: image_url }}
              style={styles.image}
            />
        );
    }

    render () {
        const { data: { name, categories, rating, price, distance }, even } = this.props;
        console.log(this.state.category);
        const uppercaseTitle = name ? (
            <Text
              style={styles.title}
              numberOfLines={2}
            >
                { name.toUpperCase() }
            </Text>
        ) : false;

        return (
            <TouchableOpacity
              activeOpacity={1}
              style={styles.slideInnerContainer}
              onPress={() => { alert(`You've clicked '${name}'`); }}
              >
                <View style={styles.shadow} />
                <View style={styles.imageContainer}>
                    { this.image }
                    <View style={styles.radiusMask} />
                    <View style={{right: 0, bottom: 0, position: "absolute", flexDirection: 'row'}}>
                      <TouchableHighlight style={styles.button}>
                        <View>
                         <Icon name="bookmark" color='white' size={30} style={{ paddingRight:1 }} />
                        </View>
                      </TouchableHighlight>
                      <TouchableHighlight style={styles.button}>
                        <View>
                         <Icon name="calendar" color='white' size={28} style={{ paddingRight:1 }} />
                        </View>
                      </TouchableHighlight>
                      <TouchableHighlight style={styles.buttonReview}>
                        <View>
                         <Icon name="star" color='white' size={30} style={{ paddingRight:1 }} />
                        </View>
                      </TouchableHighlight>
                    </View>
                </View>
                <View style={styles.textContainer}>
                    { uppercaseTitle }
                    <View style={{flexDirection:'row'}}>
                      <Text style={styles.etc} >
                          { this.state.category }
                      </Text>
                      <View style={{right: 0, position: "absolute"}}>
                        <Text style={styles.others}> { price} </Text>
                      </View>
                    </View>
                    <View style ={{flexDirection: 'row', marginTop: 3}}>
                      <Text style={styles.others}> { distance } </Text>
                      <View style={{right: 0, position: "absolute"}}>
                        <Text style={styles.review}> { rating } </Text>
                      </View>

                    </View>
                </View>
            </TouchableOpacity>
        );
    }
}
