import React, {useState} from 'react';
import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import Styles from './Styles';
import logo from '../../Assets/Images/smartlogo.png';
import colors from '../../Assets/Colors/Colors';
import * as CONSTANT from '../../Constants/Constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

const keyboardVerticalOffset = Platform.OS === 'ios' ? 100 : 0;
const Index = ({navigation, route}) => {
  const init = {
    email: '',
    emailError: '',
    password: '',
    passwordError: '',
    emailValidated: true,
    passwordValidated: true,
  };
  const [data, setData] = useState(init);

  const Logo = () => {
    return (
      <View style={Styles.imageContainer}>
        <Image source={logo} style={Styles.logoImageStyles} />
      </View>
    );
  };

  const EmailContainer = () => {
    return (
      <View style={Styles.emailContainer}>
        <Text style={Styles.label}>Email</Text>
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

  const validateEmail = text => {
    const email = text;
    console.log(data);
    const regex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (text !== '') {
      if (regex.test(email) === true) {
        setData({...data, emailError: '', emailValidated: true});
      } else {
        // setData({...data, emailError: 'Please Enter Email'});
        setData({
          ...data,
          emailError: 'Email format is not valid',
          emailValidated: false,
        });
      }
    } else {
      setData({
        ...data,
        emailError: 'Please enter email',
        emailValidated: false,
      });
    }
  };

  const PasswordContainer = () => {
    return (
      <View style={Styles.emailContainer}>
        <Text style={Styles.label}>Password</Text>
        <TextInput
          placeholder="*******"
          secureTextEntry={true}
          error={data.passwordError}
          onChangeText={text => setData({...data, password: text})}
          value={data.password}
        />
      </View>
    );
  };

  const validatePassword = text => {
    setData({...data, password: '12345'});
    if (text !== '') {
      if (text.length > 2) {
        setData({...data, passwordError: '', passwordValidated: true});
      } else {
        setData({
          ...data,
          passwordError: 'Password  must be greater than 4 digits',
          passwordValidated: false,
        });
      }
    } else {
      setData({
        ...data,
        passwordError: 'Please enter password',
        passwordValidated: false,
      });
    }
  };

  const LoginButton = () => {
    const {passwordValidated, emailValidated} = data;
    const isDisabled = passwordValidated && emailValidated ? false : true;
    return (
      <TouchableOpacity
        disabled={isDisabled}
        onPress={() => onPressNow()}
        style={isDisabled ? Styles.buttonContainerAlt : Styles.buttonContainer}>
        <Text style={Styles.title}>LOGIN Now</Text>
      </TouchableOpacity>
    );
  };

  const onPressNow = () => {
    const userType = route.params.userType;
    console.log('usertype', userType);
    if (userType === 'O') {
      const userName = data.email;
      const password = data.password;

      const user = {
        userName,
        password,
      };

      CONSTANT.API.post('/carOwner/login', user)
        .then(res => res.data)
        .then(data => {
          if (data) {
            if (data.code == 0) {
              storeOwnerData(data.data);
              if (userType === 'O') {
                navigation.replace('DashBoard');
              }
              alert(data.message);
            } else if (data.code == -1) {
              alert('Car Owner  account not found');
            } else if (data.code == -2) {
              alert('Car Owner  account has been blocked');
            } else if (data.code == -3) {
              alert('Car Owner account yet needs an appproval of Admin');
            } else if (data.code == 1) {
              alert('Wrong Password');
            }
          }
        })
        .catch(err => {
          alert('incorrect details fro signin.Check your details again');
          console.log(err);
        });
    }
    if (userType === 'D') {
      const userName = data.email;
      const password = data.password;

      const user = {
        userName,
        password,
      };

      CONSTANT.API.post('/driver/login', user)
        .then(res => res.data)
        .then(data => {
          if (data) {
            if (data.code == 0) {
              storeDriverData(data.data);
              if (userType === 'D') {
                navigation.replace('DriverDashboard');
              }
              alert(data.message);
            } else if (data.code == -1) {
              alert('Car Driver  account not found');
            } else if (data.code == -2) {
              alert('Car Driver  account has been blocked');
            } else if (data.code == -3) {
              alert('Car Driver account yet needs an appproval of Admin');
            } else if (data.code == 1) {
              alert('Wrong Password');
            }
          }
        })
        .catch(err => {
          alert('incorrect details fro signin.Check your details again');
          console.log(err);
        });
    }
  };

  const renderText = () => {
    return (
      // eslint-disable-next-line react-native/no-inline-styles
      <View style={{marginTop: 20, justifyContent: 'center'}}>
        <Text
          onPress={() => onPressRegisterNow()}
          style={{textAlign: 'center', fontSize: 14}}>
          Don't Have Account ?{' '}
          <Text style={{color: colors.primary, fontSize: 16}}>
            Register Now{' '}
          </Text>
        </Text>
      </View>
    );
  };

  const onPressRegisterNow = () => {
    const userType = route.params.userType;
    if (userType === 'O') {
      navigation.navigate('OwnerSignUp');
    } else {
      navigation.navigate('DriverSignUp');
    }
  };
  const storeOwnerData = async value => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem('OwnerData', jsonValue);
      console.log('saved user data');
    } catch (e) {
      console.log('sorry cant save');
    }
  };
  const storeDriverData = async value => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem('DriverData', jsonValue);
      console.log('saved user data');
    } catch (e) {
      console.log('sorry cant save');
    }
  };

  return (
    <View>
      <KeyboardAvoidingView
        behavior="position"
        keyboardVerticalOffset={keyboardVerticalOffset}>
        <Logo />
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <Animatable.View
            animation="fadeInUpBig"
            style={Styles.loginContainer}>
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 18,

                marginTop: 10,
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
            {EmailContainer()}
            {PasswordContainer()}
            {LoginButton()}
            {renderText()}
          </Animatable.View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </View>
  );
};

export default Index;
