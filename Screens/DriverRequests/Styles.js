import {Dimensions, StyleSheet} from 'react-native';
import Colors from '../../Assets/Colors/Colors';

const {width, height} = Dimensions.get('screen');

const styles = StyleSheet.create({
  notificationTab: {
    minHeight: height * 0.22,
    maxHeight: height * 0.24,

    width: width * 0.98,
    alignSelf: 'center',
    marginBottom: height * 0.01,
    borderColor: 'white',
    borderBottomColor: 'lightgrey',
    borderWidth: 1,
  },
  card: {
    height: height * 0.1,
    backgroundColor: '#fff3',

    width: width * 0.95,
    alignSelf: 'center',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: height * 0.1,
    borderBottomColor: 'lightgrey',
    borderWidth: 1,
    borderColor: 'white',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  btn: {
    width: width * 0.75,
    height: height * 0.065,
    backgroundColor: '#02C2EA',
    borderRadius: 30,
    padding: 9,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textareaContainer: {
    height: 120,
    padding: 5,
    backgroundColor: Colors.smallcard,
    borderWidth: 1,
    borderColor: Colors.secondary,
    borderRadius: 30,
    margin: 15,
    width: '90%',
  },
  textarea: {
    textAlignVertical: 'top', // hack android
    height: 170,
    fontSize: 14,
    color: '#333',
    margin: 10,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
export default styles;
