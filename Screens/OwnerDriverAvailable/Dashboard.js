import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  Image,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import * as CONSTANT from '../../Constants/Constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
const {width, height} = Dimensions.get('screen');
const Dashboard = ({navigation}) => {
  const [data, setData] = useState();
  const [userName, setUserName] = useState();
  useEffect(() => {
    getUserName();
  }, []);
  const getUserName = async () => {
    let OwnerData = await AsyncStorage.getItem('OwnerData');
    let parsedOwner = JSON.parse(OwnerData);
    setUserName(parsedOwner.firstName);
  };
  console.log(userName);

  const HireDriverCheck = async () => {
    let OwnerData = await AsyncStorage.getItem('OwnerData');
    let parsedOwner = JSON.parse(OwnerData);
    const carOwnerUserName = parsedOwner.userName;

    CONSTANT.API.get(
      `/carOwner/hiredDriver?carOwnerUserName=${carOwnerUserName}`,
    ).then(response => {
      console.log('Hire API' + response.data);
      if (response.data.code == 0) {
        navigation.navigate('MyDriver');
      } else if (response.data.code == 1) {
        alert(response.data.message);
      } else {
        alert('SomeThing Went Wrong');
      }
    });
  };
  const DriverCheck = () => {
    CONSTANT.API.get('/carOwner/availableDrivers').then(response => {
      console.log(response.data);
      if (response.data.code == 0) {
        navigation.navigate('DriverAvailable');
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
        <TouchableOpacity onPress={() => navigation.navigate('OwnerProfile')}>
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
            onStartShouldSetResponder={() => DriverCheck()}
            style={{
              flex: 1,
              alignItems: 'center',
              backgroundColor: '#f5d21f',
              borderRadius: 10,
              elevation: 20,
              marginRight: 10,
              marginLeft: 10,
            }}>
            <FontAwesome
              name="drivers-license"
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
              Available Drivers
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
            <Image
              source={require('../../Assets/Images/DriverIcon.png')}
              style={{
                height: 90,
                marginTop: 10,
              }}
              resizeMode="contain"
            />
            <Text
              style={{
                fontWeight: '500',
                color: '#fff',
                fontSize: 18,
                marginBottom: 5,
                fontFamily: 'SpaceGrotesk-Bold',
              }}>
              My Driver
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
            <FontAwesome
              name="video-camera"
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
              Live Surveillanice
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
            <FontAwesome5
              name="map-marker-alt"
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
              Track Car
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

export default Dashboard;
const styles = StyleSheet.create({
  imageStyles: {
    borderRadius: 10,
    height: 50,
    width: 50,
    marginLeft: 10,
    alignSelf: 'center',
    marginRight: 20,
  },
});
