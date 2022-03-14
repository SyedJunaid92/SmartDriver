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
          <View style={styles.row2}>
            <Text style={styles.titleText}>Gender</Text>
            <View style={{marginLeft: 65}}>
              <Text style={styles.skillDesp}>Male</Text>
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
    };

    CONSTANT.API.post('/carOwner/createRequest', user)
      .then(res => res.data)
      .then(data => {
        if (data.code == 0) {
          navigation.goBack(null);
          alert(data.message);
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
        visible={showModal}
        onClose={() => setShowModal(false)}
        closeOnTouchOutside={false}>
        <TextInput
          placeholder="Enter Amount"
          value={amountOffered}
          style={{
            borderRadius: 10,
            borderColor: 'rgba(0,0,0,0.2)',
            borderWidth: 1,
            width: '90%',
            marginBottom: 20,
            marginTop: 20,
          }}
          onChangeText={val => setAmountOffered(val)}
        />
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
          <Button
            title="Cancel"
            onPress={() => {
              setShowModal(false);
              setAmountOffered('');
              setJobSpan('');
            }}
          />
          <Button
            title="Confirm"
            onPress={() => {
              setShowModal(false);
              setAmountOffered('');
              setJobSpan('');
              onPressHire();
            }}
          />
        </View>
      </Overlay>
    </View>
  );
};

export default DriverDetails;
