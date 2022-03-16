import {StyleSheet, Dimensions} from 'react-native';
import colors from '../../Assets/Colors/Colors';

const {width, height} = Dimensions.get('screen');
const dashboardScreenStyles = StyleSheet.create({
  listMainContainer: {
    width: width * 0.9,
    alignSelf: 'center',
    borderColor: colors.lightPurple,
    borderWidth: 0.5,
    marginTop: 10,
    borderRadius: 10,
  },
  searchFiled: {
    width: width * 0.8,
    alignSelf: 'center',
    height: height * 0.06,
    borderWidth: 1,
    borderColor: colors.lightPurple,
    borderRadius: 15,
    paddingLeft: 20,
    marginRight: 10,
  },
  row1: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  imageStyles: {
    borderRadius: 40,
    height: 60,
    width: 60,
    marginLeft: 10,
  },
  textStyle: {
    marginLeft: 30,
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.black,
  },
  titleText: {
    marginLeft: 30,
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.lightPurple,
  },
  skillDesp: {
    marginLeft: 20,
    fontSize: 16,
    color: colors.black,
    flex: 1,
  },
  row2: {
    flexDirection: 'row',
    marginTop: 10,
  },
  button: {
    height: height * 0.06,
    width: width * 0.8,
    alignSelf: 'center',
    marginTop: 10,
    borderRadius: 20,
    backgroundColor: colors.primary,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: colors.white,
    fontSize: 16,
  },
  searchView: {
    marginTop: 10,
    flexDirection: 'row',
    width: width * 0.9,
    alignSelf: 'center',
    alignItems: 'center',
  },
});

export default dashboardScreenStyles;
