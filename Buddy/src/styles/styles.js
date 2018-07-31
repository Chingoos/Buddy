import { StyleSheet } from 'react-native';
import colors from '../styles/colors'
export default StyleSheet.create({
    container: {
      alignItems: 'center',
      flexDirection: 'row',
      paddingBottom: 10,
      paddingLeft: 15,
      paddingRight: 15,
      paddingTop: 5,
    },
    scroll: {
        backgroundColor: 'white',
    },
    font: {
      //fontWeight: 'bold',
      fontSize: 30,
      color: 'black',
      fontFamily: 'GothamRounded-Medium'
    },
    safeArea: {
        flex: 1,
        backgroundColor: colors.black
    },
    gradient: {
        ...StyleSheet.absoluteFillObject
    },
    scrollview: {
        flex: 1
    },
    exampleContainer: {
        paddingVertical: 0
    },
    exampleContainerDark: {
        backgroundColor: colors.black
    },
    exampleContainerLight: {
        backgroundColor: 'white'
    },
    title: {
        paddingHorizontal: 30,
        backgroundColor: 'transparent',
        color: 'rgba(255, 255, 255, 0.9)',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    titleDark: {
        color: colors.black
    },
    subtitle: {
        marginTop: 5,
        paddingHorizontal: 30,
        backgroundColor: 'transparent',
        color: 'rgba(255, 255, 255, 0.75)',
        fontSize: 13,
        fontStyle: 'italic',
        textAlign: 'center'
    },
    etc: {
        marginTop: 5,
        paddingHorizontal: 30,
        backgroundColor: 'transparent',
        color: 'rgba(255, 255, 255, 0.75)',
        fontSize: 13,
        textAlign: 'center'
    },
    slider: {
        marginTop: 0,
        overflow: 'visible' // for custom animations
    },
    sliderContentContainer: {
        paddingVertical: 0 // for custom animation
    },
    paginationContainer: {
        paddingVertical: 0
    },
    paginationDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        marginHorizontal: 8
    },
    marker:{
    position: 'absolute'
    }
});
