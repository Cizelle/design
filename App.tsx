import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './src/screens/auth/LoginScreen';
import RegisterScreen from './src/screens/auth/RegisterScreen';
import ChooseRoleScreen from './src/screens/auth/ChooseRoleScreen';
import MainDrawerNavigator from './src/navigation/MainTabNavigator'; // Import the new tab navigator

// This defines the screens in your main stack.
// 'MainTabs' is now a screen that contains the entire tab bar.
export type RootStackParamList = {
  Login: undefined;
  ChooseRole: undefined;
  Register: { role: 'citizen' | 'official' | 'analyst' };
  MainTabs: { username: string }; // Pass username to the main app
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ChooseRole"
          component={ChooseRoleScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="MainTabs"
          component={MainDrawerNavigator}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;