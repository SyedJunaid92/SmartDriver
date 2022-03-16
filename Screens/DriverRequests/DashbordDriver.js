import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Dimensions,
  Image,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from 'react-native';
import * as CONSTANT from '../../Constants/Constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicicons from 'react-native-vector-icons/Ionicons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
const {width, height} = Dimensions.get('screen');
//My Driver, Attendance Request
//AvailAble Driver
const DashboardDriver = ({navigation}) => {
  const [userName, setUserName] = useState();
  useEffect(() => {
    getUserName();
  }, []);
  const getUserName = async () => {
    let OwnerData = await AsyncStorage.getItem('OwnerData');
    let parsedOwner = JSON.parse(OwnerData);
    setUserName(parsedOwner.firstName);
  };
  const HireDriverCheck = async () => {
    let DriverData = await AsyncStorage.getItem('DriverData');
    let parsedDriver = JSON.parse(DriverData);
    const driverUserName = parsedDriver.userName;

    CONSTANT.API.get(
      `/driver/allRequests?driverUserName=${parsedDriver.userName}`,
    ).then(response => {
      console.log(response.data);
      if (response.data.code == 0) {
        navigation.navigate('DriverRequest');
      } else if (response.data.code == 1) {
        alert(response.data.message);
      } else {
        alert('SomeThing Went Wrong');
      }
    });
  };
  const mybooking = async () => {
    let DriverData = await AsyncStorage.getItem('DriverData');
    let parsedDriver = JSON.parse(DriverData);
    const driverUserName = parsedDriver.userName;

    CONSTANT.API.get(
      `/driver/hireBy?driverUserName=${parsedDriver.userName}`,
    ).then(response => {
      if (response.data.code == 0) {
        navigation.navigate('MyBooking');
      } else if (response.data.code == 1) {
        alert(response.data.message);
      } else {
        alert('Something went Wrong');
      }
    });
  };

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <StatusBar backgroundColor="#2e2e2e" />
      <View
        style={{
          height: 60,
          backgroundColor: '#2e2e2e',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <Text
          style={{
            color: '#fff',
            marginLeft: 20,
            fontSize: 18,
            fontFamily: 'SpaceGrotesk-Medium',
          }}>
          Welcome {userName}
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate('DriverProfile')}>
          <Image
            source={require('../../Assets/Images/Profile.jpg')}
            style={styles.imageStyles}
            resizeMode="cover"
          />
        </TouchableOpacity>
      </View>
      <Image
        source={require('../../Assets/Images/smartlogo.png')}
        style={{alignSelf: 'center', height: 120, marginTop: 20, width: 250}}
        resizeMode="cover"
      />
      <View
        style={{
          width: width * 0.9,
          alignSelf: 'center',
          borderWidth: 1,
          borderRadius: 10,
          marginTop: 30,
          backgroundColor: '#808080',
          paddingBottom: 20,
          paddingTop: 20,
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            alignContent: 'center',
            alignItems: 'center',

            borderRadius: 10,
            marginTop: 10,
            marginBottom: 10,
          }}>
          <View
            onStartShouldSetResponder={() => mybooking()}
            style={{
              flex: 1,
              alignItems: 'center',
              backgroundColor: '#f5d21f',
              borderRadius: 10,
              elevation: 20,
              marginRight: 10,
              marginLeft: 10,
            }}>
            <Ionicicons
              name="ios-car-sport-sharp"
              size={85}
              color="#000"
              style={{marginTop: 10}}
            />
            <Text
              style={{
                fontWeight: '500',
                color: '#fff',
                fontSize: 18,
                marginBottom: 5,
                fontFamily: 'SpaceGrotesk-Bold',
              }}>
              My Booking
            </Text>
          </View>

          <View
            onStartShouldSetResponder={() => HireDriverCheck()}
            style={{
              flex: 1,
              alignItems: 'center',
              backgroundColor: '#f5d21f',
              borderRadius: 10,
              elevation: 20,
              marginLeft: 10,
              marginRight: 10,
            }}>
            <FontAwesome5
              name="user-friends"
              size={85}
              color={'#000'}
              style={{marginTop: 10}}
            />
            <Text
              style={{
                fontWeight: '500',
                color: '#fff',
                fontSize: 18,
                marginBottom: 5,
                fontFamily: 'SpaceGrotesk-Bold',
              }}>
              Requests
            </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            alignContent: 'center',
            alignItems: 'center',

            borderRadius: 10,
            marginTop: 20,
            marginBottom: 10,
          }}>
          <View
            onStartShouldSetResponder={() => alert('Coming Soon')}
            style={{
              flex: 1,
              alignItems: 'center',
              backgroundColor: '#f5d21f',
              borderRadius: 10,
              elevation: 20,
              marginRight: 10,
              marginLeft: 10,
            }}>
            <MaterialCommunityIcons
              name="google-maps"
              size={90}
              color="#000"
              style={{marginTop: 10}}
            />
            <Text
              style={{
                fontWeight: '500',
                color: '#fff',
                fontSize: 18,
                marginBottom: 5,
                fontFamily: 'SpaceGrotesk-Bold',
              }}>
              Map
            </Text>
          </View>

          <View
            onStartShouldSetResponder={() => alert('Coming Soon')}
            style={{
              flex: 1,
              alignItems: 'center',
              backgroundColor: '#f5d21f',
              borderRadius: 10,
              elevation: 20,
              marginLeft: 10,
              marginRight: 10,
            }}>
            <Fontisto
              name="credit-card"
              color={'#000'}
              size={90}
              style={{marginTop: 10}}
            />
            <Text
              style={{
                fontWeight: '500',
                color: '#fff',
                fontSize: 18,
                marginBottom: 5,
                fontFamily: 'SpaceGrotesk-Bold',
              }}>
              Online Payment
            </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            alignContent: 'center',
            alignItems: 'center',

            borderRadius: 10,
            marginTop: 20,
            marginBottom: 10,
          }}>
          <View
            onStartShouldSetResponder={() => alert('Coming Soon')}
            style={{
              flex: 1,
              alignItems: 'center',
              backgroundColor: '#f5d21f',
              borderRadius: 10,
              elevation: 20,
              marginRight: 10,
              marginLeft: 10,
            }}>
            <FontAwesome5
              name="money-check-alt"
              color={'#000'}
              size={90}
              style={{marginTop: 10}}
            />
            <Text
              style={{
                fontWeight: '500',
                color: '#fff',
                fontSize: 18,
                marginBottom: 5,
                fontFamily: 'SpaceGrotesk-Bold',
              }}>
              Car Expenses
            </Text>
          </View>

          <View
            onStartShouldSetResponder={() => alert('Coming Soon')}
            style={{
              flex: 1,
              alignItems: 'center',
              backgroundColor: '#f5d21f',
              borderRadius: 10,
              elevation: 20,
              marginLeft: 10,
              marginRight: 10,
            }}>
            <MaterialIcons
              name="live-help"
              color={'#000'}
              size={90}
              style={{marginTop: 10}}
            />
            <Text
              style={{
                fontWeight: '500',
                color: '#fff',
                fontSize: 18,
                marginBottom: 5,
                fontFamily: 'SpaceGrotesk-Bold',
              }}>
              Help
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default DashboardDriver;
const styles = StyleSheet.create({
  imageStyles: {
    borderRadius: 10,
    height: 50,
    width: 50,

    alignSelf: 'center',
    marginRight: 10,
  },
});
