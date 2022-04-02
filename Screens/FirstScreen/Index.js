import React from 'react';
import {View, Text, Image, Dimensions, TouchableOpacity} from 'react-native';
const {width, height} = Dimensions.get('screen');
const Index = ({navigation}) => {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Image
        source={require('../../Assets/Images/smartlogo.png')}
        style={{width, height: height * 0.3}}
      />
      <Text style={{color: '#000', fontWeight: 'bold', fontSize: 26}}>
        Welcome to Smart Driver
      </Text>
      <Text style={{color: 'grey', marginBottom: 20}}>
        Find your driver based on your need
      </Text>
      <TouchableOpacity
        onPress={() => navigation.navigate('Splash')}
        style={{
          backgroundColor: '#FFA500',
          padding: 10,
          borderRadius: 10,
          width: width * 0.5,
          alignItems: 'center',
        }}>
        <Text style={{color: '#fff'}}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Index;
