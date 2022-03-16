import {StyleSheet, Dimensions} from 'react-native';

import colors from '../../Assets/Colors/Colors';
const {width, height} = Dimensions.get('screen');
const SignupPageStyle = StyleSheet.create({
  imageContainer: {
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
    height: height * 0.4,
    width: '90%',
    resizeMode: 'contain',
    marginBottom: 10,
  },
  loginContainer: {
    backgroundColor: colors.lightWhite,
    marginLeft: 10,
    marginRight: 10,
    width: width * 0.95,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingLeft: 20,
    height: height * 0.54,
  },
  emailContainer: {
    paddingTop: 30,
  },
  emailContainerAlt: {
    paddingTop: 30,
    height: height * 0.05,
    width: width * 0.95,
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
    marginTop: 30,
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
    marginTop: 30,
  },
  loginButtonWithOpacity: {
    backgroundColor: colors.primary,
    height: height * 0.065,
    width: width * 0.86,
    justifyContent: 'center',
    borderRadius: 10,
    opacity: 0.5,
  },
  radioConatainer: {
    width: '90%',
    alignSelf: 'center',
    marginTop: 20,
  },
});

export default SignupPageStyle;
