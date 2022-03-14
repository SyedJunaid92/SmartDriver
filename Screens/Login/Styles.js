import {StyleSheet, Dimensions} from 'react-native';
import colors from '../../Assets/Colors/Colors';

const {width, height} = Dimensions.get('screen');

const LoginPageStyle = StyleSheet.create({
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
    height: height * 0.4,
    width: '90%',
    resizeMode: 'cover',
    marginBottom: 10,
  },
  loginContainer: {
    backgroundColor: colors.lightWhite,
    height: height * 0.55,
    marginLeft: 10,
    marginRight: 10,
    width: width * 0.95,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingLeft: 20,
  },
  emailContainer: {
    paddingTop: 30,
  },
  label: {
    fontSize: 14,
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
  // buttonContainer: {
  //   marginTop: 60,
  //   marginLeft: 23,
  //   marginRight: 23,
  //   position: 'absolute',
  //   bottom: 10,
  // },
  loginButton: {
    backgroundColor: colors.primary,
    height: height * 0.065,
    width: width * 0.86,
    justifyContent: 'center',
    borderRadius: 4,
  },
  loginButtonWithOpacity: {
    backgroundColor: colors.primary,
    height: height * 0.065,
    width: width * 0.86,
    justifyContent: 'center',
    borderRadius: 4,
    opacity: 0.5,
  },
  buttonContainer: {
    backgroundColor: colors.primary,
    marginTop: height * 0.04,
    height: height * 0.065,
    width: width * 0.86,
    justifyContent: 'center',
    borderRadius: 40,
  },
  buttonContainerAlt: {
    backgroundColor: colors.primary,

    marginTop: height * 0.04,
    height: height * 0.065,
    width: width * 0.86,
    justifyContent: 'center',
    borderRadius: 40,
    opacity: 0.4,
  },
});

export default LoginPageStyle;
