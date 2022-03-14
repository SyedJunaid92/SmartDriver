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
import RadioButtonRN from 'radio-buttons-react-native';
// import getAuthToken from '../../api/GetAuthTokenService';
// import { getUserInfo, getAuth0Token } from '../../api/GetUserInfoService';
import styles from './DriverStyles.js';
// import { saveData, getData } from '../../../../common/Helper';
import CheckBox from '@react-native-community/checkbox';
import colors from '../../Assets/Colors/Colors';
import * as CONSTANT from '../../Constants/Constants';
import * as Animatable from 'react-native-animatable';

// import Icon from 'react-native-vector-icons/FontAwesome';

const DriverSignUp = ({navigation}) => {
  const [data, setData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    phone: '',
    username: '',
    address: '',
    city: '',
    cnic: '',
    licenseNumber: '',
  });
  const renderLogoImage = () => {
    return (
      <View style={styles.imageContainer}>
        <Image
          source={require('../../Assets/Images/smartdriver.png')}
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
  const renderCNICContainer = () => {
    return (
      <View style={styles.emailContainer}>
        <Text style={styles.label}>CNIC</Text>
        <TextInput
          placeholder="JohnySmith"
          clearTextOnFocus={false}
          onChangeText={text => setData({...data, cnic: text})}
          value={data.cnic}
          //onBlur={e => this.validatePassword()}
        />
      </View>
    );
  };

  const renderLicenseContainer = () => {
    return (
      <View style={styles.emailContainer}>
        <Text style={styles.label}>License</Text>
        <TextInput
          placeholder="2014"
          clearTextOnFocus={false}
          onChangeText={text => setData({...data, licenseNumber: text})}
          value={data.licenseNumber}

          //onBlur={e => this.validatePassword()}
        />
      </View>
    );
  };

  const renderSignupButton = () => {
    return (
      <TouchableOpacity
        onPress={() => onPressSignup()}
        style={styles.loginButton}>
        <Text style={styles.title}>Signup Now</Text>
      </TouchableOpacity>
    );
  };
  const renderText = () => {
    return (
      // eslint-disable-next-line react-native/no-inline-styles
      <View style={{marginTop: 20, justifyContent: 'center'}}>
        <Text style={{textAlign: 'center', fontSize: 14}}>
          Already have an account ?{' '}
          <Text
            style={{color: colors.primary, fontSize: 16}}
            onPress={() => navigation.navigate('Login', {userType: 'D'})}>
            Login Now{' '}
          </Text>
        </Text>
      </View>
    );
  };
  const onPressSignup = () => {
    const firstName = data.firstName;
    const lastName = data.lastName;
    const userName = data.username;
    const contactNumber = data.phone;
    const city = data.city;
    const cnic = data.cnic;
    const licenseNumber = data.licenseNumber;
    const address = data.address;
    const email = data.email;
    const password = data.password;

    const user = {
      firstName,
      lastName,
      userName,
      contactNumber,
      city,
      cnic,
      licenseNumber,
      address,
      email,
      password,
    };

    CONSTANT.API.post('/driver/signup', user)
      .then(res => res.data)
      .then(data => {
        if (data.code == 0) {
          navigation.goBack();
          alert('Signed Up Successfully');
        } else if (data.code == 1) {
          alert('UserName is already Registered');
        }
      })
      .catch(err => {
        alert('incorrect details for signUp.Check your details again');
        console.log(err);
      });
  };
  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
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
                tyle={{
                  fontWeight: 'bold',
                  colors: 'rgba(0,0,0,0.1)',
                  marginTop: 10,
                }}>
                Sign in to continue
              </Text>
              {renderFirstNameContainer()}
              {renderLastNameContainer()}
              {renderUserNameContainer()}
              {EmailContainer()}
              {renderPasswordContainer()}
              {renderPhoneNumberContainer()}
              {renderAddressContainer()}
              {renderCityContainer()}
              {renderCNICContainer()}
              {renderLicenseContainer()}

              {renderSignupButton()}
              {renderText()}
            </ScrollView>
          </Animatable.View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </View>
  );
};

export default DriverSignUp;
