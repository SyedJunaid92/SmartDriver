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
const keyboardVerticalOffset = Platform.OS === 'ios' ? 100 : 0;

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
    age: '',
    expectedSalary: '',
  });
  const [ProgressShow, setProgressShow] = useState(false);

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
          onChangeText={text => {
            text = text.replace(/[^A-Za-z]/gi, '');
            setData({...data, firstName: text});
          }}
          keyboardType="ascii-capable"
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
          onChangeText={text => {
            text = text.replace(/[^A-Za-z]/gi, '');
            setData({...data, lastName: text});
          }}
          value={data.lastName}
          keyboardType="ascii-capable"
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
          onChangeText={text => {
            let onlyNumbers = text.replace(/\D/g, '');

            setData({...data, phone: onlyNumbers});
          }}
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
          keyboardType="ascii-capable"
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
          placeholder="CNIC"
          clearTextOnFocus={false}
          onChangeText={text => {
            let onlyNumbers = text.replace(/\D/g, '');
            setData({...data, cnic: onlyNumbers});
          }}
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
          placeholder="6139395013013"
          clearTextOnFocus={false}
          onChangeText={text => {
            let onlyNumbers = text.replace(/\D/g, '');
            setData({...data, licenseNumber: onlyNumbers});
          }}
          value={data.licenseNumber}

          //onBlur={e => this.validatePassword()}
        />
      </View>
    );
  };
  const renderAgeContainer = () => {
    return (
      <View style={styles.emailContainer}>
        <Text style={styles.label}>Age</Text>
        <TextInput
          placeholder="22"
          clearTextOnFocus={false}
          keyboardType="number-pad"
          onChangeText={text => {
            let onlyNumbers = text.replace(/\D/g, '');

            setData({...data, age: onlyNumbers});
          }}
          value={data.age}

          //onBlur={e => this.validatePassword()}
        />
      </View>
    );
  };
  const renderExpectedSalaryContainer = () => {
    return (
      <View style={styles.emailContainer}>
        <Text style={styles.label}>Expected Salary Per Day</Text>
        <TextInput
          placeholder="2000"
          clearTextOnFocus={false}
          onChangeText={text => {
            let onlyNumbers = text.replace(/\D/g, '');
            setData({...data, expectedSalary: onlyNumbers});
          }}
          value={data.expectedSalary}

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
    const regex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

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
    const age = data.age;
    const expectedSalary = data.expectedSalary;

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
      age,
      expectedSalary,
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
      Object.values(contactNumber).length < 11 ||
      Object.values(contactNumber).length > 11
    ) {
      alert('Please Enter 11 digit Contact Number');
    } else if (
      Object.values(city).length === 0 &&
      user.constructor === Object
    ) {
      alert('Please Enter City');
    } else if (
      Object.values(cnic).length === 0 &&
      user.constructor === Object
    ) {
      alert('Please Enter CNIC ');
    } else if (Object.values(cnic).length < 12 || Object.values(cnic) > 12) {
      alert('Please Enter 12 digit CNIC Number');
    } else if (
      Object.values(licenseNumber).length === 0 &&
      user.constructor === Object
    ) {
      alert('Please Enter License Number');
    } else if (
      Object.values(licenseNumber).length < 12 ||
      Object.values(licenseNumber).length > 12
    ) {
      alert('Please Enter 12 digit License Number');
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
    } else if (Object.values(password).length < 5) {
      alert('Please Enter Minimum 6 digit character Password');
    } else if (Object.values(age).length === 0 && user.constructor === Object) {
      alert('Please Enter Age');
    } else if (age < 18 || age > 55) {
      alert('Age limit between 18-55');
    } else if (
      Object.values(expectedSalary).length === 0 &&
      user.constructor === Object
    ) {
      alert('Please Enter Expected Salary');
    } else if (expectedSalary < 1000) {
      alert('Minimum Salary Will be 1000');
    } else if (regex.test(email) == false) {
      alert('Please Enter Correct Email');
    } else {
      setProgressShow(true);

      CONSTANT.API.post('/driver/signup', user)
        .then(res => res.data)
        .then(data => {
          setProgressShow(false);

          if (data.code == 0) {
            navigation.goBack();
            alert('Signed Up Successfully');
          } else if (data.code == 1) {
            alert('UserName is already Registered');
          }
        })
        .catch(err => {
          setProgressShow(false);

          alert('incorrect details for signUp.Check your details again');
          console.log(err);
        });
    }
  };
  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <KeyboardAvoidingView
        behavior="position"
        keyboardVerticalOffset={keyboardVerticalOffset}>
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
              {renderAgeContainer()}
              {EmailContainer()}
              {renderPasswordContainer()}
              {renderPhoneNumberContainer()}
              {renderAddressContainer()}
              {renderExpectedSalaryContainer()}
              {renderCityContainer()}
              {renderCNICContainer()}
              {renderLicenseContainer()}
              {!ProgressShow && renderSignupButton()}
              {ProgressShow && (
                <ActivityIndicator
                  animating={ProgressShow}
                  size="large"
                  color={colors.primary}
                />
              )}
              {!ProgressShow && renderText()}
            </ScrollView>
          </Animatable.View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </View>
  );
};

export default DriverSignUp;
