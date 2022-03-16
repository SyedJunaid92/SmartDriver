import {StyleSheet, Dimensions} from 'react-native';

import colors from '../../Assets/Colors/Colors';

const {width, height} = Dimensions.get('screen');

const SignupPageStyle = StyleSheet.create({
  imageContainer: {
    marginTop: height * 0.03,
    alignItems: 'center',
  },
  loginBackgroundContainer: {
    flex: 1,
  },
  loginBackgroundImage: {
    resizeMode: 'contain',
    width,
  },
  logoImageStyles: {
    height: height * 0.3,
    width: width * 0.95,
    resizeMode: 'cover',
    marginBottom: 20,
  },
  loginContainer: {
    backgroundColor: colors.lightWhite,
    height: height * 0.6,
    marginLeft: 10,
    marginRight: 10,
    width: width * 0.95,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingLeft: 20,
  },
  emailContainer: {marginTop: 10},
  emailContainerAlt: {
    paddingTop: 30,
    height: height * 0.05,
    width: width * 0.9,
    marginLeft: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: 'normal',
    color: colors.black,
    fontWeight: '400',
  },
  image: {
    width,
    height,
    resizeMode: 'contain',
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: colors.white,
  },
  buttonContainer: {
    justifyContent: 'center',
    marginTop: 50,
    marginBottom: 30,
    alignItems: 'center',
    alignSelf: 'center',
  },
  loginButton: {
    backgroundColor: colors.primary,
    height: height * 0.065,
    width: width * 0.86,
    justifyContent: 'center',
    borderRadius: 10,
    alignSelf: 'center',
    marginTop: 30,
    marginBottom: 20,
  },
  loginButtonWithOpacity: {
    backgroundColor: colors.primary,
    height: height * 0.065,
    width: width * 0.86,
    justifyContent: 'center',
    borderRadius: 10,
    opacity: 0.5,
  },
});

export default SignupPageStyle;
