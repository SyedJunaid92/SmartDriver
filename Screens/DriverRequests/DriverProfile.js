import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  TextInput,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Colors from '../../Assets/Colors/Colors';
import * as CONSTANT from '../../Constants/Constants';

const DriverProfile = () => {
  useEffect(() => {
    GetData();
  }, [data]);
  const [data, setData] = useState();
  const [edit, setEdit] = useState(false);
  const GetData = async () => {
    let DriverData = await AsyncStorage.getItem('DriverData');
    let parsedDriver = JSON.parse(DriverData);
    setData(parsedDriver);
    console.log(parsedDriver);
  };
  const UpdateData = async () => {
    CONSTANT.API.put('/driver/update', data).then(response => {
      if (response.data.code == 0) {
        alert('Details Updated Succesfully');
        const jsonValue = JSON.stringify(data);
        AsyncStorage.setItem('DriverData', jsonValue);
        console.log('saved user data');
      } else {
        alert('SomeThing Went Wrong');
      }
    });
  };

  return (
    <View style={{flex: 1}}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: Colors.primary,
        }}>
        <Image
          source={require('../../Assets/Images/userIMage.png')}
          style={styles.imageStyles}
          resizeMode="contain"
        />
        <Text style={{fontSize: 18, fontWeight: 'bold', color: '#fff'}}>
          {data != undefined && data.userName}
        </Text>
      </View>
      <View style={{flex: 2, padding: 10}}>
        {data != undefined && (
          <ScrollView>
            <Text style={styles.ProfileTitleText}>First Name</Text>
            <TextInput
              style={{
                borderWidth: 0.5,
                borderRadius: 10,
                paddingLeft: 10,
                marginBottom: 10,
              }}
              placeholder="First Name"
              value={data.firstName}
              editable={edit}
              onChangeText={text => setData({...data, firstName: text})}
            />
            <Text style={styles.ProfileTitleText}>Last Name</Text>
            <TextInput
              placeholder="Last Name"
              value={data.lastName}
              editable={edit}
              style={{
                borderWidth: 0.5,
                borderRadius: 10,
                paddingLeft: 10,
                marginBottom: 10,
              }}
              onChangeText={text => setData({...data, lastName: text})}
            />
            <Text style={styles.ProfileTitleText}>Password</Text>
            <TextInput
              placeholder="Password"
              value={data.password}
              editable={edit}
              secureTextEntry
              style={{
                borderWidth: 0.5,
                borderRadius: 10,
                paddingLeft: 10,
                marginBottom: 10,
              }}
              onChangeText={text => setData({...data, password: text})}
            />
            <Text style={styles.ProfileTitleText}>Contact Number</Text>
            <TextInput
              placeholder="Contact Number"
              value={data.contactNumber}
              editable={edit}
              style={{
                borderWidth: 0.5,
                borderRadius: 10,
                paddingLeft: 10,
                marginBottom: 10,
              }}
              onChangeText={text => setData({...data, contactNumber: text})}
            />
            <Text style={styles.ProfileTitleText}>Email</Text>
            <TextInput
              placeholder="Email"
              value={data.email}
              editable={edit}
              style={{
                borderWidth: 0.5,
                borderRadius: 10,
                paddingLeft: 10,
                marginBottom: 10,
              }}
              onChangeText={text => setData({...data, Emal: text})}
            />
            <Text style={styles.ProfileTitleText}>CNIC</Text>
            <TextInput
              style={{
                borderWidth: 0.5,
                borderRadius: 10,
                paddingLeft: 10,
                marginBottom: 10,
              }}
              placeholder="CNIC"
              value={data.cnic}
              editable={edit}
              onChangeText={text => setData({...data, cnic: text})}
            />

            <Text style={styles.ProfileTitleText}>Address</Text>
            <TextInput
              style={{
                borderWidth: 0.5,
                borderRadius: 10,
                paddingLeft: 10,
                marginBottom: 10,
              }}
              placeholder="Address"
              value={data.address}
              editable={edit}
              onChangeText={text => setData({...data, address: text})}
            />
            <Text style={styles.ProfileTitleText}>City</Text>
            <TextInput
              style={{
                borderWidth: 0.5,
                borderRadius: 10,
                paddingLeft: 10,
                marginBottom: 10,
              }}
              placeholder="First Name"
              value={data.city}
              editable={edit}
              onChangeText={text => setData({...data, city: text})}
            />
            <Text style={styles.ProfileTitleText}>License Number</Text>
            <TextInput
              style={{
                borderWidth: 0.5,
                borderRadius: 10,
                paddingLeft: 10,
                marginBottom: 10,
              }}
              placeholder="License Number"
              value={data.licenseNumber}
              editable={edit}
              onChangeText={text => setData({...data, licenseNumber: text})}
            />

            <TouchableOpacity
              onPress={() => {
                setEdit(!edit);
                if (edit == true) {
                  UpdateData();
                }
              }}>
              <View
                style={{
                  alignSelf: 'flex-end',
                  backgroundColor: Colors.primary,
                  width: '30%',
                  alignContent: 'center',
                  alignItems: 'center',
                  height: 40,
                  marginBottom: 20,
                  borderRadius: 10,
                }}>
                <Text
                  style={{
                    color: '#fff',
                    fontSize: 14,
                    fontWeight: '700',

                    marginTop: 10,
                  }}>
                  {edit ? 'Update' : 'Edit'}
                </Text>
              </View>
            </TouchableOpacity>
          </ScrollView>
        )}
      </View>
    </View>
  );
};

export default DriverProfile;
const styles = StyleSheet.create({
  imageStyles: {
    borderRadius: 100,
    height: '60%',
    width: '45%',

    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  ProfileTitleText: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5,
  },
});
