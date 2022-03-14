import React, {useState, useEffect, useCallback} from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  StatusBar,
  Image,
  FlatList,
  Switch,
  SafeAreaView,
  Modal,
  Pressable,
  View,
  Text,
  Dimensions,
  Button,
} from 'react-native';
import * as CONSTANT from '../../Constants/Constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Colors from '../../Assets/Colors/Colors';
import styles from './Styles';
const {width, height} = Dimensions.get('screen');

const Index = () => {
  useEffect(() => {
    getData();
  }, [data]);
  const getData = async () => {
    let DriverData = await AsyncStorage.getItem('DriverData');
    let parsedDriver = JSON.parse(DriverData);
    setDriverUserName(parsedDriver.userName);

    CONSTANT.API.get(
      `/driver/allRequests?driverUserName=${parsedDriver.userName}`,
    ).then(response => setData(response.data.data));
  };
  const [data, setData] = useState();
  const [driverUserName, setDriverUserName] = useState();
  const [refreshing, setRefreshing] = useState(false);
  const requestAction = (status, id) => {
    const user = {driverUserName, status, id};
    console.log(user);
    CONSTANT.API.post('/driver/requestAction', user).then(response => {
      if (response.data.code == 0) {
        alert(response.data.message);
        console.log(response.data);
      }
    });
  };
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getData();
    setRefreshing(false);
  }, []);
  return (
    <View style={{marginBottom: height * 0.05, flex: 1}}>
      <View style={{marginTop: height * 0.03}}>
        <Text
          style={{
            color: Colors.secondary,
            fontSize: 18,
            alignSelf: 'center',
            fontWeight: '700',
          }}>
          REQUESTS
        </Text>
      </View>
      {data != undefined ? null : (
        <View>
          <Text
            style={{
              color: Colors.secondary,
              fontSize: 15,
              alignSelf: 'center',
              fontWeight: '700',
            }}>
            NO REQUEST YET
          </Text>
        </View>
      )}
      <FlatList
        data={data}
        onRefresh={() => onRefresh()}
        refreshing={refreshing}
        keyExtractor={item => item._id}
        renderItem={({item}) => {
          return (
            <View
              style={{
                width: width * 0.8,
                alignSelf: 'center',
                paddingLeft: 20,
                backgroundColor: '#fff',
                borderRadius: 20,
                elevation: 10,
                marginTop: 20,
              }}>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  backgroundColor: Colors.smallcard,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignContent: 'center',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: '70%',
                    marginTop: 20,
                  }}>
                  <Image
                    source={require('../../Assets/Images/people4x.png')}
                    resizeMode="cover"
                    style={{
                      marginVertical: height * 0.01,
                      height: height * 0.07,
                      width: height * 0.07,
                      marginLeft: width * 0.05,
                      borderColor: 'lightgrey',
                      borderWidth: 1,
                      borderRadius: 30,
                    }}
                  />
                  <Text
                    style={{
                      color: 'black',
                      fontSize: 18,
                      fontWeight: '700',
                    }}>
                    {item.carOwnerUserName}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignContent: 'center',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: '70%',
                    marginBottom: 5,
                  }}>
                  <Image
                    source={require('../../Assets/Images/smartlogo.png')}
                    style={{
                      marginVertical: height * 0.01,
                      height: height * 0.07,
                      width: height * 0.07,
                      marginLeft: width * 0.05,
                      borderColor: 'lightgrey',
                      borderWidth: 1,
                      borderRadius: 30,
                    }}
                  />
                  <View>
                    <Text
                      style={{
                        color: 'black',
                        fontSize: 18,
                        fontWeight: '700',
                      }}>
                      {item.driverUserName}
                    </Text>
                    <Text
                      style={{
                        color: 'black',
                        fontSize: 16,
                      }}>
                      {item.carTitle} - {item.carModel}
                    </Text>
                  </View>
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    width: width * 0.6,

                    marginHorizontal: width * 0.07,
                    marginBottom: 10,
                    alignItems: 'center',
                    alignContent: 'center',
                    justifyContent: 'space-between',
                  }}>
                  <TouchableOpacity
                    onPress={() => requestAction('accepted', item._id)}>
                    <View
                      style={{
                        width: width * 0.2,
                        height: height * 0.04,
                        alignItems: 'center',
                        marginVertical: height * 0.01,
                        borderRadius: 30,
                        backgroundColor: '#58a758',
                        justifyContent: 'center',
                        marginLeft: 0,
                      }}>
                      <Text
                        style={{
                          fontSize: 15,
                          color: 'white',
                          alignSelf: 'center',
                        }}>
                        Accept
                      </Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => requestAction('rejected', item._id)}>
                    <View
                      style={{
                        width: width * 0.2,
                        height: height * 0.04,
                        alignItems: 'center',
                        marginVertical: height * 0.01,
                        borderRadius: 30,
                        backgroundColor: 'red',
                        justifyContent: 'center',
                        marginLeft: 0,
                      }}>
                      <Text
                        style={{
                          fontSize: 15,

                          color: 'white',
                          alignSelf: 'center',
                        }}>
                        Reject
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          );
        }}
      />
    </View>
  );
};

export default Index;
