import React, { Component } from 'react';
import {
  Animated,
  Easing,
  StyleSheet,
  Text,
  Image,
  View,
  Dimensions,
  Platform,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import SortableList from 'react-native-sortable-list';
import { ENTRIES1 } from '../components/tempData';
const window = Dimensions.get('window');



export default class SearchList extends Component {
  constructor(props){
    super(props);
    this.state = {
      data : ENTRIES1.sort(function(a, b){
      if(a.title < b.title) return -1;
      if(a.title > b.title) return 1;
      return 0;
    }),
      sortAsc: true,

    };
  }
  sort = () =>
  {
    if(this.state.sortAsc)
    {
      this.setState({data: this.state.data.sort(function(a, b){
      if(a.title > b.title) return -1;
      if(a.title < b.title) return 1;
      return 0;
      }) })
      this.setState({sortAsc: false})
    }
    else {
      this.setState({data: this.state.data.sort(function(a, b){
      if(a.title < b.title) return -1;
      if(a.title > b.title) return 1;
      return 0;
      }) })
      this.setState({sortAsc: true})
    }
  }
  render() {

    return (

      <ScrollView style={styles.scroll}>
        <TouchableOpacity
          shadowOpacity={0.5}
          shadowRadius={10}
          style={styles.row}
          onPress={this.sort}
        >
          <Text style={[styles.font, { color: 'black' }]}>Sort!</Text>
        </TouchableOpacity>
        <SortableList
          style={styles.list}
          contentContainerStyle={styles.contentContainer}
          data={this.state.data}
          renderRow={this._renderRow} />
      </ScrollView>
    );
  }

  _renderRow = ({data, active}) => {
    return <Row data={data} active={active} />
  }
}

class Row extends Component {

  constructor(props) {
    super(props);

    this._active = new Animated.Value(0);

    this._style = {
      ...Platform.select({
        ios: {
          transform: [{
            scale: this._active.interpolate({
              inputRange: [0, 1],
              outputRange: [1, 1.1],
            }),
          }],
          shadowRadius: this._active.interpolate({
            inputRange: [0, 1],
            outputRange: [2, 10],
          }),
        },

        android: {
          transform: [{
            scale: this._active.interpolate({
              inputRange: [0, 1],
              outputRange: [1, 1.07],
            }),
          }],
          elevation: this._active.interpolate({
            inputRange: [0, 1],
            outputRange: [2, 6],
          }),
        },
      })
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.active !== nextProps.active) {
      Animated.timing(this._active, {
        duration: 300,
        easing: Easing.bounce,
        toValue: Number(nextProps.active),
      }).start();
    }
  }

  render() {
   const {data, active} = this.props;

    return (

      <Animated.View style={[
        styles.row,
        this._style,
      ]}>
        <Image source={{uri: data.illustration}} style={styles.image} />
        <Text style={styles.text}>{data.title}</Text>
      </Animated.View>

    );
  }
}

const styles = StyleSheet.create({
  scroll: {
    backgroundColor: 'white',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eee',

    ...Platform.select({
      ios: {
        paddingTop: 20,
      },
    }),
  },

  title: {
    fontSize: 20,
    paddingVertical: 20,
    color: '#999999',
  },

  list: {
    flex: 1,
  },

  contentContainer: {
    width: window.width,

    ...Platform.select({
      ios: {
        paddingHorizontal: 30,
      },

      android: {
        paddingHorizontal: 0,
      }
    })
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    height: 60,
    flex: 1,
    marginTop: 2,
    marginBottom: 2,
    borderRadius: 4,


    ...Platform.select({
      ios: {
        width: window.width - 5 * 2,
        shadowColor: 'rgba(0,0,0,0.2)',
        shadowOpacity: 1,
        shadowOffset: {height: 2, width: 2},
        shadowRadius: 2,
      },

      android: {
        width: window.width - 5 * 2,
        elevation: 0,
        marginHorizontal: 5,
      },
    })
  },

  image: {
    width: 50,
    height: 50,
    marginRight: 30,
    borderRadius: 25,
  },

  text: {
    fontSize: 24,
    color: '#222222',
  },
});
