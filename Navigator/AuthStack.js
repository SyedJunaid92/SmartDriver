import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Splash from '../Screens/Splash/Index';
import Login from '../Screens/Login/Index';
import OwnerSignUp from '../Screens/SignUp/OwnerSignUp';
import DriverSignUp from '../Screens/SignUp/DriverSignUp';
import DriverRequest from '../Screens/DriverRequests/Index';
import OwnerDriverAvailable from '../Screens/OwnerDriverAvailable/Index';
import DriverDetails from '../Screens/OwnerDriverAvailable/DriverDetails';
import Dashboard from '../Screens/OwnerDriverAvailable/Dashboard';
import MyDriver from '../Screens/OwnerDriverAvailable/MyDriver';
import DriverDashboard from '../Screens/DriverRequests/DashbordDriver';
import MyBooking from '../Screens/DriverRequests/MyBooking';
import OwnerProfile from '../Screens/OwnerDriverAvailable/Profile';
import DriverProfile from '../Screens/DriverRequests/DriverProfile';
import FirstScreen from '../Screens/FirstScreen/Index';

const Stack = createNativeStackNavigator();
const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="FirstScreen" component={FirstScreen} />
      <Stack.Screen name="Splash" component={Splash} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="OwnerSignUp" component={OwnerSignUp} />
      <Stack.Screen name="DriverSignUp" component={DriverSignUp} />
      <Stack.Screen name="DriverRequest" component={DriverRequest} />
      <Stack.Screen name="DriverAvailable" component={OwnerDriverAvailable} />
      <Stack.Screen name="DriverDetail" component={DriverDetails} />
      <Stack.Screen name="DashBoard" component={Dashboard} />
      <Stack.Screen name="MyDriver" component={MyDriver} />
      <Stack.Screen name="DriverDashboard" component={DriverDashboard} />
      <Stack.Screen name="MyBooking" component={MyBooking} />
      <Stack.Screen name="OwnerProfile" component={OwnerProfile} />
      <Stack.Screen name="DriverProfile" component={DriverProfile} />
    </Stack.Navigator>
  );
};

export default AuthStack;
