import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  Button,
} from 'react-native';
import styles from './DriverDetailsStyles';
import Colors from '../../Assets/Colors/Colors';
import * as CONSTANT from '../../Constants/Constants';
import Overlay from 'react-native-modal-overlay';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DriverDetails = ({navigation, route}) => {
  const driverData = route.params.user;
  const [amountOffered, setAmountOffered] = useState();
  const [jobSpan, setJobSpan] = useState();
  const [showModal, setShowModal] = useState(false);

  const renderDriverDetails = () => {
    const userObj = driverData;
    return (
      <View style={{marginTop: 20}}>
        <View style={styles.imageContainer}>
          <Image source={require('../../Assets/Images/driverImageAlt.jpeg')} />
        </View>
        <View
          style={{
            marginTop: 20,
            borderWidth: 0.5,
            borderColor: Colors.lightPurple,
            width: '95%',
            alignSelf: 'center',
            borderRadius: 10,
            padding: 15,
            justifyContent: 'space-between',
          }}>
          <View style={styles.row2}>
            <Text style={styles.titleText}>Name</Text>
            <View style={{marginLeft: 70}}>
              <Text style={styles.skillDesp}>{userObj.userName}</Text>
            </View>
          </View>
          <View style={styles.row1}>
            <Text style={styles.titleText}>Driver Address</Text>
            <View style={{marginLeft: 10}}>
              <Text style={styles.skillDesp}>{userObj.city}</Text>
            </View>
          </View>
          <View style={styles.row2}>
            <Text style={styles.titleText}>License Number</Text>
            <View style={{marginLeft: 10}}>
              <Text style={styles.skillDesp}>{userObj.licenseNumber}</Text>
            </View>
          </View>
          <View style={styles.row2}>
            <Text style={styles.titleText}>Contact Number</Text>
            <View style={{marginLeft: 10}}>
              <Text style={styles.skillDesp}>{userObj.contactNumber}</Text>
            </View>
          </View>
          <View style={styles.row2}>
            <Text style={styles.titleText}>Email</Text>
            <View style={{marginLeft: 90}}>
              <Text style={styles.skillDesp}>{userObj.email}</Text>
            </View>
          </View>
        </View>
      </View>
    );
  };
  const renderBottomButtons = () => {
    return (
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => setShowModal(true)}>
          <Text style={styles.buttonText}>Hire</Text>
        </TouchableOpacity>
      </View>
    );
  };
  const onPressHire = async () => {
    let OwnerData = await AsyncStorage.getItem('OwnerData');
    let parsedOwner = JSON.parse(OwnerData);
    const carOwnerUserName = parsedOwner.userName;
    const carOwnerName = parsedOwner.firstName + parsedOwner.lastName;
    const city = parsedOwner.city;
    const carTitle = parsedOwner.carTitle;
    const carModel = parsedOwner.carModel;
    const carRegCity = parsedOwner.carRegCity;
    const driverUserName = driverData.userName;

    const user = {
      carModel,
      carOwnerName,
      carOwnerUserName,
      city,
      carTitle,
      carRegCity,
      jobSpan,
      amountOffered,
      driverUserName,
      age: 20,
    };

    CONSTANT.API.post('/carOwner/createRequest', user)
      .then(res => res.data)
      .then(data => {
        console.log(data);
        if (data.code == 0) {
          navigation.goBack(null);
          alert(data.message);
        } else if (data.code == 1) {
          alert(data.error);
        }
      })
      .catch(err => {
        alert('incorrect details fro signin.Check your details again');
        console.log(err);
      });
  };
  return (
    <View style={{flex: 1}}>
      {renderDriverDetails()}
      {renderBottomButtons()}
      <Overlay
        containerStyle={{backgroundColor: 'rgba(0,0,0,0.7)'}}
        childrenWrapperStyle={{
          borderRadius: 15,
        }}
        visible={showModal}
        onClose={() => setShowModal(false)}
        closeOnTouchOutside={false}>
        <Text>Salary Per Day</Text>
        <TextInput
          placeholder="Enter Amount"
          value={amountOffered}
          style={{
            borderRadius: 10,
            borderColor: 'rgba(0,0,0,0.2)',
            borderWidth: 1,
            width: '90%',
            marginBottom: 20,
          }}
          onChangeText={val => setAmountOffered(val)}
        />
        <Text style={{marginTop: 10}}>No of Days</Text>
        <TextInput
          placeholder="Enter Day"
          value={jobSpan}
          style={{
            borderRadius: 10,
            borderColor: 'rgba(0,0,0,0.2)',
            borderWidth: 1,
            width: '90%',
            marginBottom: 20,
          }}
          onChangeText={val => setJobSpan(val)}
        />

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '90%',
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '100%',
            }}>
            <TouchableOpacity
              style={{backgroundColor: 'red', borderRadius: 10, width: '30%'}}
              onPress={() => {
                setShowModal(false);
                setAmountOffered('');
                setJobSpan('');
              }}>
              <Text
                style={{
                  padding: 10,
                  textAlign: 'center',
                  alignSelf: 'center',
                  color: '#fff',
                }}>
                Cancel
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{backgroundColor: 'green', borderRadius: 10, width: '30%'}}
              onPress={() => {
                if (
                  amountOffered == undefined ||
                  amountOffered.length == 0 ||
                  jobSpan == undefined ||
                  jobSpan.length == 0
                ) {
                  alert('Please Fill Complete Details');
                } else {
                  setShowModal(false);
                  setAmountOffered('');
                  setJobSpan('');
                  onPressHire();
                }
              }}>
              <Text
                style={{
                  padding: 10,
                  textAlign: 'center',
                  alignSelf: 'center',
                  color: '#fff',
                }}>
                Confirm
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Overlay>
    </View>
  );
};

export default DriverDetails;
