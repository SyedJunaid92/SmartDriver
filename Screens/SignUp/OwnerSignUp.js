import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  Platform,
  Keyboard,
  TouchableOpacity,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  ActivityIndicator,
  ScrollView,
  Picker,
  TextInput,
} from 'react-native';

import styles from './OwnerStyles';
// import { saveData, getData } from '../../../../common/Helper';
import CheckBox from '@react-native-community/checkbox';
import colors from '../../Assets/Colors/Colors';
import * as CONSTANT from '../../Constants/Constants';
import * as Animatable from 'react-native-animatable';

const OwnerSignUp = ({navigation}) => {
  const [data, setData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    phone: '',
    username: '',
    address: '',
    city: '',
    carTitle: '',
    carModel: '',
    carRegCity: '',
  });
  const renderLogoImage = () => {
    return (
      <View style={styles.imageContainer}>
        <Image
          source={require('../../Assets/Images/smartlogo.png')}
          style={styles.logoImageStyles}
        />
      </View>
    );
  };
  const EmailContainer = () => {
    return (
      <View style={styles.emailContainer}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          placeholder="yourname@gmail.com"
          onChangeText={text => {
            setData({...data, email: text});
            // validateEmail(data.email);
          }}
          maxLength={500}
          value={data.email}
          keyboardType="email-address"
        />
      </View>
    );
  };
  const renderFirstNameContainer = () => {
    return (
      <View style={styles.emailContainer}>
        <Text style={styles.label}>First Name</Text>
        <TextInput
          placeholder="First Name"
          clearTextOnFocus={false}
          // error={emailError}
          onChangeText={text => setData({...data, firstName: text})}
          value={data.firstName}

          //onBlur={e => this.validateEmail()}
        />
      </View>
    );
  };
  const renderLastNameContainer = () => {
    return (
      <View style={styles.emailContainer}>
        <Text style={styles.label}>Last Name</Text>
        <TextInput
          placeholder="Last Name"
          clearTextOnFocus={false}
          // error={emailError}
          onChangeText={text => setData({...data, lastName: text})}
          value={data.lastName}
          keyboardType="default"
          //onBlur={e => this.validateEmail()}
        />
      </View>
    );
  };
  const renderPhoneNumberContainer = () => {
    return (
      <View style={styles.emailContainer}>
        <Text style={styles.label}>Phone Number</Text>
        <TextInput
          placeholder="Phone Number"
          clearTextOnFocus={false}
          // error={emailError}
          onChangeText={text => setData({...data, phone: text})}
          value={data.phone}
          keyboardType="numeric"
          //onBlur={e => this.validateEmail()}
        />
      </View>
    );
  };
  const renderPasswordContainer = () => {
    return (
      <View style={styles.emailContainer}>
        <Text style={styles.label}>Password</Text>
        <TextInput
          placeholder="*******"
          secureTextEntry={true}
          // icon={showPassword ? images.eyeSlashIcon : images.viewIcon}
          // onPressIcon={this.onPressEyeIcon}
          clearTextOnFocus={false}
          //error={passwordError}
          onChangeText={text => setData({...data, password: text})}
          value={data.password}
          //onBlur={e => this.validatePassword()}
        />
      </View>
    );
  };
  const renderUserNameContainer = () => {
    return (
      <View style={styles.emailContainer}>
        <Text style={styles.label}>UserName</Text>
        <TextInput
          placeholder="JohnySmith"
          clearTextOnFocus={false}
          onChangeText={text => setData({...data, username: text})}
          value={data.username}
          //onBlur={e => this.validatePassword()}
        />
      </View>
    );
  };
  const renderAddressContainer = () => {
    return (
      <View style={styles.emailContainer}>
        <Text style={styles.label}>Address</Text>
        <TextInput
          placeholder="Hostel City"
          clearTextOnFocus={false}
          onChangeText={text => setData({...data, address: text})}
          value={data.address}
          //onBlur={e => this.validatePassword()}
        />
      </View>
    );
  };
  const renderCityContainer = () => {
    return (
      <View style={styles.emailContainer}>
        <Text style={styles.label}>City</Text>
        <TextInput
          placeholder="Islamabad"
          clearTextOnFocus={false}
          onChangeText={text => setData({...data, city: text})}
          value={data.city}
          //onBlur={e => this.validatePassword()}
        />
      </View>
    );
  };
  const renderCarTitleContainer = () => {
    return (
      <View style={styles.emailContainer}>
        <Text style={styles.label}>Car Title</Text>
        <TextInput
          placeholder="Car Name"
          clearTextOnFocus={false}
          onChangeText={text => setData({...data, carTitle: text})}
          value={data.carTitle}
          //onBlur={e => this.validatePassword()}
        />
      </View>
    );
  };

  const renderCarModelContainer = () => {
    return (
      <View style={styles.emailContainer}>
        <Text style={styles.label}>Car Model</Text>
        <TextInput
          placeholder="2014"
          clearTextOnFocus={false}
          onChangeText={text => setData({...data, carModel: text})}
          value={data.carModel}
          keyboardType="numeric"
          //onBlur={e => this.validatePassword()}
        />
      </View>
    );
  };

  const renderCarRegCityContainer = () => {
    return (
      <View style={styles.emailContainer}>
        <Text style={styles.label}>Car Register City</Text>
        <TextInput
          placeholder="Islamabad"
          clearTextOnFocus={false}
          onChangeText={text => setData({...data, carRegCity: text})}
          value={data.carRegCity}
          //onBlur={e => this.validatePassword()}
        />
      </View>
    );
  };
  const renderSignupButton = () => {
    return (
      <TouchableOpacity onPress={() => onPressNow()} style={styles.loginButton}>
        <Text style={styles.title}>Signup Now</Text>
      </TouchableOpacity>
    );
  };

  const onPressNow = () => {
    const regex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    const firstName = data.firstName;
    const lastName = data.lastName;
    const userName = data.username;
    const email = data.email;
    const contactNumber = data.phone;
    const password = data.password;
    const address = data.address;
    const city = data.city;
    const carTitle = data.carTitle;
    const carModel = data.carModel;
    const carRegCity = data.carRegCity;

    const user = {
      firstName,
      lastName,
      email,
      contactNumber,
      password,
      userName,
      address,
      city,
      carModel,
      carRegCity,
      carTitle,
    };
    if (Object.values(firstName).length === 0 && user.constructor === Object) {
      alert('Please Enter First Name');
    } else if (
      Object.values(lastName).length === 0 &&
      user.constructor === Object
    ) {
      alert('Please Enter last Name');
    } else if (
      Object.values(userName).length === 0 &&
      user.constructor === Object
    ) {
      alert('Please Enter User Name');
    } else if (
      Object.values(contactNumber).length === 0 &&
      user.constructor === Object
    ) {
      alert('Please Enter Contact Number');
    } else if (
      Object.values(city).length === 0 &&
      user.constructor === Object
    ) {
      alert('Please Enter City');
    } else if (
      Object.values(carTitle).length === 0 &&
      user.constructor === Object
    ) {
      alert('Please Enter Car Name ');
    } else if (
      Object.values(carModel).length === 0 &&
      user.constructor === Object
    ) {
      alert('Please Enter Car Model');
    } else if (
      Object.values(address).length === 0 &&
      user.constructor === Object
    ) {
      alert('Please Enter Address');
    } else if (
      Object.values(email).length === 0 &&
      user.constructor === Object
    ) {
      alert('Please Enter Email');
    } else if (
      Object.values(password).length === 0 &&
      user.constructor === Object
    ) {
      alert('Please Enter Password');
    } else if (
      Object.values(carRegCity).length === 0 &&
      user.constructor === Object
    ) {
      alert('Please Enter Car Registration City');
    } else if (regex.test(email) == false) {
      alert('Please Enter Correct Email');
    } else {
      CONSTANT.API.post('/carOwner/signup', user)
        .then(res => res.data)
        .then(data => {
          if (data.code == 0) {
            navigation.goBack(null);
            alert('Signed Up Successfully');
          } else if (data.code == 1) {
            alert('UserName is already Registered');
          }
        })
        .catch(err => {
          alert('incorrect details fro signin.Check your details again');
          console.log(err);
        });
    }
  };

  const renderCheckbox = () => {
    return (
      <View
        style={{
          flexDirection: 'row',
          marginTop: 20,
          marginLeft: 20,
          alignItems: 'center',
        }}>
        <CheckBox
          style={{alignSelf: 'center'}}
          disabled={false}
          // value={this.state.checkbox}
          // onValueChange={(newValue) => setToggleCheckBox(newValue)}
        />
        <Text style={{fontSize: 14, marginLeft: 10}}>Count me freelancer</Text>
      </View>
    );
  };
  const renderText = () => {
    return (
      // eslint-disable-next-line react-native/no-inline-styles
      <View style={{marginTop: 20, justifyContent: 'center', marginBottom: 20}}>
        <Text style={{textAlign: 'center', fontSize: 14}}>
          Already have an account ?{' '}
          <Text
            style={{color: colors.primary, fontSize: 16}}
            onPress={() => navigation.navigate('Login', {userType: 'O'})}>
            Login Now{' '}
          </Text>
        </Text>
      </View>
    );
  };
  return (
    <View>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        {renderLogoImage()}
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <Animatable.View
            animation="fadeInUpBig"
            style={styles.loginContainer}>
            <ScrollView>
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: 18,

                  marginTop: 20,
                }}>
                Welcome
              </Text>
              <Text
                style={{
                  fontWeight: 'bold',
                  color: 'rgba(0,0,0,0.3)',
                  marginTop: 10,
                  fontSize: 14,
                }}>
                Sign Up to continue
              </Text>
              {renderFirstNameContainer()}
              {renderLastNameContainer()}
              {renderUserNameContainer()}
              {EmailContainer()}
              {renderPasswordContainer()}
              {renderPhoneNumberContainer()}
              {renderAddressContainer()}
              {renderCityContainer()}
              {renderCarTitleContainer()}
              {renderCarRegCityContainer()}
              {renderCarModelContainer()}
              {renderSignupButton()}
              {renderText()}
            </ScrollView>
          </Animatable.View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </View>
  );
};

export default OwnerSignUp;
