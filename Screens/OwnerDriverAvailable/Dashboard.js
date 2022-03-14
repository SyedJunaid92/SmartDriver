import React, {useState} from 'react';
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import * as CONSTANT from '../../Constants/Constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {LineChart} from 'react-native-chart-kit';

const {width, height} = Dimensions.get('screen');
//My Driver, Attendance Request
//AvailAble Driver
const Dashboard = ({navigation}) => {
  const [data, setData] = useState();
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

  const HireDriverCheck = async () => {
    let OwnerData = await AsyncStorage.getItem('OwnerData');
    let parsedOwner = JSON.parse(OwnerData);
    const carOwnerUserName = parsedOwner.userName;

    CONSTANT.API.get(
      `/carOwner/hiredDriver?carOwnerUserName=${carOwnerUserName}`,
    ).then(response => {
      console.log(response.data);
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
      <TouchableOpacity onPress={() => navigation.navigate('OwnerProfile')}>
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
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            alignContent: 'center',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            onPress={() => DriverCheck()}
            style={{
              flexDirection: 'column',
              alignItems: 'center',
            }}>
            <Image
              source={require('../../Assets/Images/findDriver.jpeg')}
              style={{width: 70, height: 70}}
            />
            <Text>Available Driver</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => HireDriverCheck()}
            style={{
              flexDirection: 'column',

              alignItems: 'center',
            }}>
            <Image
              source={require('../../Assets/Images/DriverIcon.png')}
              style={{width: 70, height: 70}}
            />
            <Text>My Driver</Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            marginTop: 20,
          }}>
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
  );
};

export default Dashboard;
const styles = StyleSheet.create({
  imageStyles: {
    borderRadius: 60,
    height: 100,
    width: 100,
    marginLeft: 10,
    alignSelf: 'center',
    marginTop: 20,
  },
});
