import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as CONSTANT from '../../Constants/Constants';
import Entypo from 'react-native-vector-icons/Entypo';
import Colors from '../../Assets/Colors/Colors';
const {width, height} = Dimensions.get('screen');

const MyBooking = () => {
  useEffect(() => {
    getData();
  }, [data]);

  const [data, setData] = useState();
  const [DriverUserName, setDriverUserName] = useState();
  const [HistoryShow, setHistoryShow] = useState();
  const [HistoryData, setHistoryData] = useState();
  const getData = async () => {
    let DriverData = await AsyncStorage.getItem('DriverData');
    let parsedDriver = JSON.parse(DriverData);
    setDriverUserName(parsedDriver.userName);

    CONSTANT.API.get(
      `/driver/hireBy?driverUserName=${parsedDriver.userName}`,
    ).then(response => {
      console.log(response.data);
      if (response.data.code == 0) {
        setData(response.data);
      } else {
        alert('Something went Wrong');
      }
    });
  };
  const GetHistoryData = () => {
    CONSTANT.API.get(
      `/driver/driverAttendanceHistory?reqId=${data.data.reqId}`,
    ).then(response => {
      if (response.data.code == 0) {
        setHistoryData(response.data.data);
      } else {
        alert('Somethinh Went Wrong');
      }
    });
  };
  const MarkAttendace = () => {
    const attendace = {
      reqId: data.data.reqId,
      carOwnerUserName: data.carOwnerDetails.userName,
      driverUserName: DriverUserName,
    };
    CONSTANT.API.post('/driver/attendanceRequest', attendace).then(response => {
      console.log(response.data);
      if (response.data.code == 0) {
        alert('Request Sent to Car Owner for mark the attendace');
      } else if (response.data.code == 1) {
        alert('Attendace request already sent to Car Owner');
      }
    });
  };
  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <View
        style={{
          marginTop: 30,
          borderWidth: 1,
          width: width * 0.9,
          alignSelf: 'center',
          borderRadius: 10,
          padding: 10,
        }}>
        <Image
          source={require('../../Assets/Images/userIMage.png')}
          style={styles.imageStyles}
          resizeMode="cover"
        />

        <View style={styles.ProfileView}>
          <Text style={styles.ProfileTitleText}>Hire Date</Text>
          <Text style={styles.ProfileText}>
            {data != undefined && new Date(data.data.hireDate).toDateString()}
          </Text>
        </View>
        <View style={styles.ProfileView}>
          <Text style={styles.ProfileTitleText}>Hire Price</Text>

          <Text style={styles.ProfileText}>
            {data != undefined && data.data.hirePrice}
          </Text>
        </View>
        <View style={styles.ProfileView}>
          <Text style={styles.ProfileTitleText}>Car Owner User Name</Text>
          <Text style={styles.ProfileText}>
            {data != undefined && data.carOwnerDetails.userName}
          </Text>
        </View>
        <View style={styles.ProfileView}>
          <Text style={styles.ProfileTitleText}>Email</Text>
          <Text style={styles.ProfileText}>
            {data != undefined && data.carOwnerDetails.email}
          </Text>
        </View>
        <View style={styles.ProfileView}>
          <Text style={styles.ProfileTitleText}>Contact Number</Text>
          <Text style={styles.ProfileText}>
            {data != undefined && data.carOwnerDetails.contactNumber}
          </Text>
        </View>
        <View style={styles.ProfileView}>
          <Text style={styles.ProfileTitleText}>Car Name</Text>
          <Text style={styles.ProfileText}>
            {data != undefined && data.carOwnerDetails.carTitle}
          </Text>
        </View>
        <View style={styles.ProfileView}>
          <Text style={styles.ProfileTitleText}>Car Model</Text>
          <Text style={styles.ProfileText}>
            {data != undefined && data.carOwnerDetails.carModel}
          </Text>
        </View>

        <TouchableOpacity
          disabled={data == undefined ? true : false}
          style={{
            alignSelf: 'flex-end',
            backgroundColor: Colors.primary,
            borderRadius: 10,
            marginTop: 10,
            marginBottom: 10,
            flexDirection: 'row',
            alignItems: 'center',
          }}
          onPress={() => MarkAttendace()}>
          <Entypo name="check" size={20} style={{padding: 5}} color="#fff" />
          <Text
            style={{fontSize: 16, padding: 10, paddingLeft: 2, color: '#fff'}}>
            Mark Attendance
          </Text>
        </TouchableOpacity>
      </View>

      <View
        style={{
          marginTop: 30,
          borderWidth: 1,
          width: width * 0.9,
          alignSelf: 'center',
          borderRadius: 10,
          padding: 10,
        }}>
        <TouchableOpacity
          onPress={() => {
            setHistoryShow(!HistoryShow);
            if (HistoryShow == false) {
              GetHistoryData();
            }
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: width * 0.8,
            }}>
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 16,
                textAlign: 'center',
              }}>
              Attendace History
            </Text>
            <Entypo
              name={HistoryShow ? 'chevron-thin-up' : 'chevron-thin-down'}
              size={20}
            />
          </View>
        </TouchableOpacity>
        {HistoryData != undefined && HistoryShow
          ? HistoryData.map((item, index) => (
              <View
                key={index}
                style={{
                  borderBottomColor: 'rgba(0,0,0,0.1)',
                  borderBottomWidth: 1,
                  marginTop: 20,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginBottom: 10,
                  }}>
                  <Text>Date</Text>
                  <Text>{new Date(item.createdDate).toDateString()}</Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginBottom: 10,
                  }}>
                  <Text>Fuel Expense</Text>
                  <Text>{item.fuelExpense}</Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginBottom: 10,
                  }}>
                  <Text>maintenance Expense</Text>
                  <Text>{item.maintenanceExpense}</Text>
                </View>
              </View>
            ))
          : null}
      </View>
    </View>
  );
};

export default MyBooking;
const styles = StyleSheet.create({
  ProfileView: {
    flexDirection: 'row',
    width: width * 0.8,
    justifyContent: 'space-between',
    alignSelf: 'center',
    borderBottomWidth: 1,
    marginBottom: 5,
    borderColor: 'rgba(0,0,0,0.1)',
  },
  ProfileTitleText: {
    fontWeight: 'bold',
    fontSize: 14,
    marginBottom: 10,
    alignSelf: 'center',
    textAlign: 'center',
  },
  ProfileText: {
    textAlign: 'center',
    alignSelf: 'center',
    fontSize: 16,
    marginBottom: 10,
  },
  imageStyles: {
    borderRadius: 50,
    height: 80,
    width: 80,
    alignSelf: 'center',
    marginBottom: 30,
    marginTop: 20,
  },
});