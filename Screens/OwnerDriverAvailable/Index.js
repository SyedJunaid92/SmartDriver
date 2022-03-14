import React, {useState, useEffect} from 'react';
import {View, Text, Image, TouchableOpacity, ScrollView} from 'react-native';
import * as CONSTANT from '../../Constants/Constants';
import styles from './Style';
import Colors from '../../Assets/Colors/Colors';
import Highlighter from 'react-native-highlight-words';
import {TextInput} from 'react-native-gesture-handler';
const Index = ({navigation}) => {
  useEffect(() => {
    CONSTANT.API.get('/carOwner/availableDrivers').then(response => {
      if (response.data.code == 0) {
        setData(response.data.data);
      } else {
        alert('Something Went Wrong');
      }
    });
  }, [data]);

  const [data, setData] = useState();
  const [keyword, setKeyword] = useState('');
  const renderSearchBar = () => {
    return (
      <View style={styles.searchView}>
        <TextInput
          value={keyword}
          onChangeText={val => setKeyword(val)}
          placeholder="Search By Name"
          style={styles.searchFiled}
        />
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
                  source={require('../../Assets/Images/userIMage.png')}
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
      </ScrollView>
    </View>
  );
};

export default Index;
