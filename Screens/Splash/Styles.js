import {StyleSheet, Dimensions} from 'react-native';
import colors from '../../Assets/Colors/Colors';

const {width, height} = Dimensions.get('screen');

const MainPageStyles = StyleSheet.create({
  imageContainer: {
    marginTop: height * 0.03,
    alignItems: 'center',
  },
  logoImageStyles: {
    height: height * 0.4,
    width: '90%',
    resizeMode: 'cover',
    marginBottom: 10,
  },
  buttonStyles: {
    marginTop: 20,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    height: height * 0.06,
    backgroundColor: colors.primary,
    width: width * 0.9,
    alignSelf: 'center',
    borderRadius: 10,
  },
  textStyle: {
    color: colors.white,
    fontSize: 18,
    letterSpacing: 0.5,
  },
});

export default MainPageStyles;
