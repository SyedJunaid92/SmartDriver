import React, {useState, useEffect} from 'react';
import {View, Text, Image, TouchableOpacity, ScrollView} from 'react-native';
import * as CONSTANT from '../../Constants/Constants';
import styles from './Style';
import Colors from '../../Assets/Colors/Colors';
import Highlighter from 'react-native-highlight-words';
import {TextInput} from 'react-native-gesture-handler';
import FontAwosme5 from 'react-native-vector-icons/FontAwesome5';
import Overlay from 'react-native-modal-overlay';

const Index = ({navigation}) => {
  useEffect(() => {
    GetData();
  }, [data]);
  const GetData = () => {
    if (city != '' && age != '' && expectedSalary != '') {
      const user = {age, expectedSalary, city};
      CONSTANT.API.post('/carOwner/searchFilter', user).then(response => {
        if (response.data.code == 0) {
          setData(response.data.data);
        } else {
          alert('SOmething Went Wrong');
        }
      });
    } else if (city != '') {
      const user = {city};
      console.log('CIty');
      CONSTANT.API.post('/carOwner/searchFilter', user).then(response => {
        console.log(response.data);
        if (response.data.code == 0) {
          setData(response.data.data);
        } else {
          alert('SOmething Went Wrong');
        }
      });
    } else if (age != '') {
      const user = {age};
      CONSTANT.API.post('/carOwner/searchFilter', user).then(response => {
        if (response.data.code == 0) {
          setData(response.data.data);
        } else {
          alert('SOmething Went Wrong');
        }
      });
    } else if (expectedSalary != '') {
      const user = {expectedSalary};
      CONSTANT.API.post('/carOwner/searchFilter', user).then(response => {
        if (response.data.code == 0) {
          setData(response.data.data);
        } else {
          alert('SOmething Went Wrong');
        }
      });
    } else if (city != '' && age != '') {
      const user = {age, city};
      CONSTANT.API.post('/carOwner/searchFilter', user).then(response => {
        if (response.data.code == 0) {
          setData(response.data.data);
        } else {
          alert('SOmething Went Wrong');
        }
      });
    } else if (city != '' && expectedSalary != '') {
      const user = {expectedSalary, city};
      CONSTANT.API.post('/carOwner/searchFilter', user).then(response => {
        if (response.data.code == 0) {
          setData(response.data.data);
        } else {
          alert('SOmething Went Wrong');
        }
      });
    } else if (age != '' && expectedSalary != '') {
      const user = {age, expectedSalary};
      CONSTANT.API.post('/carOwner/searchFilter', user).then(response => {
        if (response.data.code == 0) {
          setData(response.data.data);
        } else {
          alert('SOmething Went Wrong');
        }
      });
    } else {
      CONSTANT.API.get('/carOwner/availableDrivers').then(response => {
        if (response.data.code == 0) {
          setData(response.data.data);
        } else {
          alert('Something Went Wrong');
        }
      });
    }
  };

  const [data, setData] = useState();
  const [city, setCity] = useState('');
  const [age, setAge] = useState('');
  const [expectedSalary, setExpectedSalary] = useState('');
  const [keyword, setKeyword] = useState('');
  const [showModal, setShowModal] = useState(false);

  const renderSearchBar = () => {
    return (
      <View style={styles.searchView}>
        <TextInput
          value={keyword}
          onChangeText={val => setKeyword(val)}
          placeholder="Search By Name"
          style={styles.searchFiled}
        />
        <TouchableOpacity onPress={() => setShowModal(!showModal)}>
          <FontAwosme5 name="filter" size={40} color="#000" />
        </TouchableOpacity>
      </View>
    );
  };
  const onPressContact = item => {
    navigation.navigate('DriverDetail', {user: item});
  };
  return (
    <View style={{flex: 1, marginBottom: 10}}>
      <ScrollView>
        {renderSearchBar()}
        {data == null || data == undefined ? (
          <Text
            style={{
              fontSize: 20,
              fontWeight: 'bold',
              alignSelf: 'center',
              marginTop: 40,
            }}>
            No Drivers Available
          </Text>
        ) : data.length == 0 ? (
          alert(
            'You have already Booked a  driver, Please Cancel the previos Booking',
          )
        ) : (
          data.map((item, index) => (
            <View style={styles.listMainContainer} key={index}>
              <View style={styles.row1}>
                <Image
                  source={require('../../Assets/Images/Profile.jpg')}
                  style={styles.imageStyles}
                  resizeMode="cover"
                />
                <Highlighter
                  highlightStyle={{color: Colors.primary}}
                  searchWords={[keyword]}
                  textToHighlight={item.userName}
                  style={styles.titleText}
                />
              </View>
              <View style={styles.row1}>
                <Text style={styles.titleText}>Address</Text>
                <Text style={styles.skillDesp}>{item.city}</Text>
              </View>
              <View style={styles.row2}>
                <Text style={styles.titleText}>License Number</Text>
                <Text style={styles.skillDesp}>{item.licenseNumber}</Text>
              </View>
              <View style={styles.row2}>
                <Text style={styles.titleText}>Contact Number</Text>
                <Text style={styles.skillDesp}>{item.contactNumber}</Text>
              </View>
              <TouchableOpacity
                style={styles.button}
                onPress={() => onPressContact(item)}>
                <Text style={styles.buttonText}>Contact Me</Text>
              </TouchableOpacity>
            </View>
          ))
        )}
        <Overlay
          containerStyle={{backgroundColor: 'rgba(0,0,0,0.7)'}}
          childrenWrapperStyle={{
            borderRadius: 15,
          }}
          visible={showModal}
          onClose={() => setShowModal(false)}
          closeOnTouchOutside={false}>
          <Text>Expected Salary</Text>
          <TextInput
            placeholder="Enter Amount"
            value={expectedSalary}
            keyboardType="number-pad"
            style={{
              borderRadius: 10,
              borderColor: 'rgba(0,0,0,0.2)',
              borderWidth: 1,
              width: '90%',
              marginBottom: 20,
            }}
            onChangeText={val => setExpectedSalary(val)}
          />
          <Text style={{marginTop: 10}}>Age</Text>
          <TextInput
            placeholder="Enter Day"
            value={age}
            keyboardType="number-pad"
            style={{
              borderRadius: 10,
              borderColor: 'rgba(0,0,0,0.2)',
              borderWidth: 1,
              width: '90%',
              marginBottom: 20,
            }}
            onChangeText={val => setAge(val)}
          />
          <Text style={{marginTop: 10}}>City</Text>
          <TextInput
            placeholder="Enter City"
            value={city}
            style={{
              borderRadius: 10,
              borderColor: 'rgba(0,0,0,0.2)',
              borderWidth: 1,
              width: '90%',
              marginBottom: 20,
            }}
            onChangeText={val => setCity(val)}
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
                style={{
                  backgroundColor: 'green',
                  borderRadius: 10,
                  width: '30%',
                }}
                onPress={() => {
                  setShowModal(false);
                  GetData();
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
      </ScrollView>
    </View>
  );
};

export default Index;
