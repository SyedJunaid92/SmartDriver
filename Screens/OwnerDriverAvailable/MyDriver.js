import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import * as CONSTANT from '../../Constants/Constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
const {width, height} = Dimensions.get('screen');

const MyDriver = ({navigation}) => {
  useEffect(() => {
    getData();
  }, [data]);
  const [data, setData] = useState();
  const [OwnerUserName, setOwnerUserName] = useState();
  const [AttendaceShow, setAttendanceShow] = useState(false);
  const [AttendanceData, setAttendanceData] = useState();
  const [AttendanceHistoryShow, setAttendanceHistoryShow] = useState(false);
  const [AttendanceHistoryData, setAttendanceHistoryData] = useState();
  const getData = async () => {
    let OwnerData = await AsyncStorage.getItem('OwnerData');
    let parsedOwner = JSON.parse(OwnerData);
    setOwnerUserName(parsedOwner.userName);
    CONSTANT.API.get(
      `/carOwner/hiredDriver?carOwnerUserName=${parsedOwner.userName}`,
    ).then(response => {
      if (response.data.code == 0) {
        setData(response.data);
      } else {
        alert('SomeThing Went Wrong');
      }
    });
  };
  const AttendaceReq = () => {
    CONSTANT.API.get(
      `/carOwner/driverAttendanceReqView?reqId=${data.data.reqId}`,
    ).then(response => {
      console.log(response.data);
      if (response.data.code == 0) {
        setAttendanceData(response.data.data);
      } else if (response.data.code == 1) {
        setAttendanceData(response.data.data);
        setAttendanceShow(false);
        alert(response.data.message);
      } else {
        alert('Something went Wrong');
      }
    });
  };
  const AttendanceAction = (status, id) => {
    const action = {
      status,
      id,
    };

    CONSTANT.API.post('/carOwner/driverAttendanceAction', action).then(
      response => {
        alert(response.data.message);

        AttendaceReq();
      },
    );
  };

  const AttendanceHistory = () => {
    CONSTANT.API.get(
      `/carOwner/driverAttendanceHistory?reqId=${data.data.reqId}`,
    ).then(response => {
      if (response.data.code == 0) {
        console.log(response.data);
        setAttendanceHistoryData(response.data.data);
      } else {
        alert('Somethinh Went Wrong');
      }
    });
  };
  const CancelBooking = () => {
    CONSTANT.API.get(`/carOwner/bookingcancel?reqId=${data.data.reqId}`).then(
      response => {
        if (response.data.code == 0) {
          alert('Successfully Cancelled');
          navigation.goBack();
        } else {
          console.log(response.data);
          alert('Something went wrong. Please Try Again later.....');
        }
      },
    );
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
          source={require('../../Assets/Images/Profile.jpg')}
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
          <Text style={styles.ProfileTitleText}>Driver User Name</Text>
          <Text style={styles.ProfileText}>
            {data != undefined && data.driverDetails.userName}
          </Text>
        </View>
        <View style={styles.ProfileView}>
          <Text style={styles.ProfileTitleText}>Email</Text>
          <Text style={styles.ProfileText}>
            {data != undefined && data.driverDetails.email}
          </Text>
        </View>
        <View style={styles.ProfileView}>
          <Text style={styles.ProfileTitleText}>Contact Number</Text>
          <Text style={styles.ProfileText}>
            {data != undefined && data.driverDetails.contactNumber}
          </Text>
        </View>
        <View style={styles.ProfileView}>
          <Text style={styles.ProfileTitleText}>License Number</Text>
          <Text style={styles.ProfileText}>
            {data != undefined && data.driverDetails.licenseNumber}
          </Text>
        </View>
        <TouchableOpacity
          disabled={data == undefined ? true : false}
          style={{
            alignSelf: 'flex-end',
            backgroundColor: '#FFA500',
            borderRadius: 10,
            marginTop: 10,
            marginBottom: 10,
            flexDirection: 'row',
            alignItems: 'center',
          }}
          onPress={() =>
            Alert.alert('Cancel Booking', 'Do you want cancel the booking?', [
              {text: 'Cancel', style: 'cancel'},
              {
                text: 'Yes',
                onPress: () => {
                  CancelBooking();
                },
              },
            ])
          }>
          <MaterialCommunityIcons
            name="cancel"
            size={20}
            style={{padding: 5}}
            color="#fff"
          />
          <Text
            style={{
              fontSize: 16,
              padding: 10,
              paddingLeft: 2,
              color: '#fff',
            }}>
            Cancel Booking
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
            setAttendanceShow(!AttendaceShow);
            if (AttendaceShow == false) {
              AttendaceReq();
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
                fontSize: 16,
                textAlign: 'center',
                fontFamily: 'SpaceGrotesk-Bold',
              }}>
              Attendace Request
            </Text>
            <Entypo
              name={AttendaceShow ? 'chevron-thin-up' : 'chevron-thin-down'}
              size={20}
            />
          </View>
        </TouchableOpacity>
        {AttendaceShow && AttendanceData != undefined
          ? AttendanceData.map((item, index) => (
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
                  }}>
                  <Text>Driver Name</Text>
                  <Text>{AttendanceData[index].driverUserName}</Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text>Date</Text>
                  <Text>
                    {new Date(AttendanceData[index].createdDate).toDateString()}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginTop: 15,
                    marginBottom: 15,
                  }}>
                  <TouchableOpacity
                    onPress={() =>
                      AttendanceAction('rejected', AttendanceData[index]._id)
                    }
                    style={{
                      backgroundColor: 'red',
                      borderRadius: 10,
                      width: '30%',
                      alignContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text style={{padding: 8}}>Reject</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() =>
                      AttendanceAction('accepted', AttendanceData[index]._id)
                    }
                    style={{
                      backgroundColor: 'green',
                      borderRadius: 10,
                      width: '30%',
                      alignContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text style={{padding: 8}}>Accept</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))
          : null}
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
            setAttendanceHistoryShow(!AttendanceHistoryShow);
            if (AttendaceShow == false) {
              AttendanceHistory();
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
                fontFamily: 'SpaceGrotesk-Bold',
              }}>
              Attendace History
            </Text>
            <Entypo
              name={
                AttendanceHistoryShow ? 'chevron-thin-up' : 'chevron-thin-down'
              }
              size={20}
            />
          </View>
        </TouchableOpacity>
        {AttendanceHistoryData != undefined && AttendanceHistoryShow
          ? AttendanceHistoryData.map((item, index) => (
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
                  <Text style={{fontFamily: 'SpaceGrotesk-Bold'}}>Date</Text>
                  <Text style={{fontFamily: 'SpaceGrotesk-Regular'}}>
                    {new Date(item.createdDate).toDateString()}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginBottom: 10,
                  }}>
                  <Text style={{fontFamily: 'SpaceGrotesk-Bold'}}>
                    Fuel Expense
                  </Text>
                  <Text style={{fontFamily: 'SpaceGrotesk-Regular'}}>
                    {item.fuelExpense}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginBottom: 10,
                  }}>
                  <Text style={{fontFamily: 'SpaceGrotesk-Bold'}}>
                    maintenance Expense
                  </Text>
                  <Text style={{fontFamily: 'SpaceGrotesk-Regular'}}>
                    {item.maintenanceExpense}
                  </Text>
                </View>
              </View>
            ))
          : null}
      </View>
    </View>
  );
};

export default MyDriver;
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
    fontFamily: 'SpaceGrotesk-Bold',
    fontSize: 16,
    marginBottom: 10,
    alignSelf: 'center',
    textAlign: 'center',
  },
  ProfileText: {
    textAlign: 'center',
    alignSelf: 'center',
    fontSize: 16,
    marginBottom: 10,
    fontFamily: 'SpaceGrotesk-Regular',
  },
  imageStyles: {
    borderRadius: 10,
    height: 80,
    width: 80,
    alignSelf: 'center',
    marginBottom: 30,
    marginTop: 20,
  },
});
