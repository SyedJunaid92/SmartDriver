import React, {useState} from 'react';
import {
  View,
  Text,
  Dimensions,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import * as CONSTANT from '../../Constants/Constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {LineChart} from 'react-native-chart-kit';

const {width, height} = Dimensions.get('screen');
//My Driver, Attendance Request
//AvailAble Driver
const DashboardDriver = ({navigation}) => {
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
  const Graphdata = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43],
        color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
        strokeWidth: 2, // optional
      },
    ],
  };
  const chartConfig = {
    backgroundGradientFrom: '#1E2923',
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: '#08130D',
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false, // optional
  };
  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <TouchableOpacity onPress={() => navigation.navigate('DriverProfile')}>
        <Image
          source={require('../../Assets/Images/userIMage.png')}
          style={styles.imageStyles}
          resizeMode="cover"
        />
      </TouchableOpacity>
      <Text
        style={{
          fontSize: 22,
          fontWeight: 'bold',
          textAlign: 'center',
          color: '#000',
        }}>
        DashBoard
      </Text>
      <View
        style={{
          width: width * 0.9,
          alignSelf: 'center',
          borderWidth: 1,
          borderRadius: 10,
          marginTop: 10,
          height: height * 0.5,
          paddingTop: 20,
          shadowColor: '#000',
          shadowOffset: {width: 0, height: 2},
          shadowOpacity: 0.2,
          marginBottom: 10,
        }}>
        <LineChart
          style={{alignSelf: 'center', marginTop: 20, marginBottom: 10}}
          data={Graphdata}
          width={width * 0.9}
          height={170}
          chartConfig={chartConfig}
          withVerticalLabels={false}
          withHorizontalLabels={false}
          bezier
        />
        <View
          style={{
            flexDirection: 'column',
            justifyContent: 'space-evenly',
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-evenly',
              marginBottom: 10,
            }}>
            <TouchableOpacity
              onPress={() => mybooking()}
              style={{
                flexDirection: 'column',

                alignItems: 'center',
              }}>
              <Image
                source={require('../../Assets/Images/findDriver.jpeg')}
                style={{width: 50, height: 70}}
              />
              <Text>My Booking</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => HireDriverCheck()}
              style={{
                flexDirection: 'column',

                alignItems: 'center',
              }}>
              <Image
                source={require('../../Assets/Images/peopleIcon.png')}
                style={{width: 70, height: 70}}
              />
              <Text>Owners Requests</Text>
            </TouchableOpacity>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
            <TouchableOpacity
              style={{
                flexDirection: 'column',

                alignItems: 'center',
              }}>
              <Image
                source={require('../../Assets/Images/car_Repair.png')}
                style={{width: 70, height: 70}}
              />
              <Text>Reapir</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                flexDirection: 'column',

                alignItems: 'center',
              }}>
              <Image
                source={require('../../Assets/Images/help.png')}
                style={{width: 70, height: 70}}
              />
              <Text>Need Help</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default DashboardDriver;
const styles = StyleSheet.create({
  imageStyles: {
    borderRadius: 40,
    height: 100,
    width: 100,
    marginLeft: 10,
    alignSelf: 'center',
    marginTop: 20,
  },
});
