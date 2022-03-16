import {StyleSheet, Dimensions} from 'react-native';
import colors from '.././../Assets/Colors/Colors';

const {width, height} = Dimensions.get('screen');
const DriverDetailsPageStyle = StyleSheet.create({
  imageContainer: {
    // borderColor: colors.lightPurple,
    // borderWidth: 1,
    alignSelf: 'center',
    marginTop: 10,
  },
  row1: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    justifyContent: 'space-between',
  },
  imageStyles: {
    borderRadius: 40,
    height: 80,
    width: 80,
    marginLeft: 10,
  },
  textStyle: {
    marginLeft: 30,
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.black,
  },
  titleText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.lightPurple,
  },
  skillDesp: {
    fontSize: 16,
    color: colors.black,
    flex: 1,
  },
  aboutText: {
    marginLeft: 20,
    fontSize: 16,
    color: colors.black,
    flexWrap: 'wrap',
    // flex: 1
  },
  row2: {
    flexDirection: 'row',
    marginTop: 10,
    justifyContent: 'space-between',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 0,
    height: height * 0.1,
    width: '90%',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    left: 120,
  },
  button: {
    height: height * 0.07,
    width: width * 0.35,
    alignItems: 'center',
    backgroundColor: colors.primary,
    justifyContent: 'center',
    borderRadius: 4,
  },
  buttonText: {
    fontSize: 16,
    color: colors.white,
  },
  imageStyles: {
    borderRadius: 20,
    height: 250,
    width: 250,

    alignSelf: 'center',
    marginRight: 10,
  },
});

export default DriverDetailsPageStyle;
