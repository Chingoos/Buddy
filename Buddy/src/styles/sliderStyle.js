import { StyleSheet, Dimensions, Platform } from 'react-native';
import  colors  from '../styles/colors';

const IS_IOS = Platform.OS === 'ios';
const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

function wp (percentage) {
    const value = (percentage * viewportWidth) / 100;
    return Math.round(value);
}

const slideHeight = viewportHeight * 0.3;
const slideWidth = wp(75);
const itemHorizontalMargin = wp(2);

export const sliderWidth = viewportWidth;
export const itemWidth = slideWidth + itemHorizontalMargin * 2;

const entryBorderRadius = 8;

export default StyleSheet.create({
    slideInnerContainer: {
        width: itemWidth,
        height: slideHeight,
        paddingHorizontal: itemHorizontalMargin,
        //paddingBottom: 18 // needed for shadow
    },
    shadow: {
        position: 'absolute',
        top: 0,
        left: itemHorizontalMargin,
        right: itemHorizontalMargin,
        bottom: 18,
        shadowColor: colors.black,
        elevation: 4,
        shadowOpacity: 0.25,
        shadowOffset: { width: 0, height: 10 },
        shadowRadius: 10,
        borderRadius: entryBorderRadius
    },
    imageContainer: {
        flex: 1,
        marginBottom: IS_IOS ? 0 : -1, // Prevent a random Android rendering issue
        backgroundColor: 'white',
        borderTopLeftRadius: entryBorderRadius,
        borderTopRightRadius: entryBorderRadius
    },
    imageContainerEven: {
        backgroundColor: colors.black
    },
    image: {
        ...StyleSheet.absoluteFillObject,
        resizeMode: 'cover',
        borderRadius: IS_IOS ? entryBorderRadius : 0,
        borderTopLeftRadius: entryBorderRadius,
        borderTopRightRadius: entryBorderRadius
    },
    // image's border radius is buggy on iOS; let's hack it!
    radiusMask: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: entryBorderRadius,
        backgroundColor: 'white'
    },
    radiusMaskEven: {
        backgroundColor: colors.black
    },
    textContainer: {
        justifyContent: 'center',
        paddingTop: 10 - entryBorderRadius,
        paddingBottom: 25,
        paddingHorizontal: 16,
        backgroundColor: 'white',
        borderBottomLeftRadius: entryBorderRadius,
        borderBottomRightRadius: entryBorderRadius
    },
    textContainerEven: {
        backgroundColor: colors.black
    },
    title: {
        fontSize: 13,
        color: colors.black,
        fontFamily: 'GothamRounded-Medium',
    },
    titleEven: {
        color: 'white'
    },
    subtitle: {
        fontSize: 12,
        color: colors.gray,
        fontFamily: 'GothamRounded-Medium',
    },
    etc: {
      fontSize: 12,
      color: colors.gray,
      fontFamily: 'GothamRounded-Medium',
    },
    subtitleEven: {
        color: 'rgba(255, 255, 255, 0.7)'
    },
    button:
    {
      borderWidth:1,
         borderColor:'transparent',
         alignItems:'center',
         justifyContent:'center',
         width:40,
         height:40,
         marginLeft:3,
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
         width:40,
         height:40,
         marginLeft:3,
         backgroundColor:'red',
         borderRadius:100,
         shadowColor: 'rgba(0,0,0, .4)', // IOS
         shadowOffset: { height: 1, width: 1 }, // IOS
         shadowOpacity: 1, // IOS
         shadowRadius: 2, // IOS
         elevation: 5, // Android

    }
});
