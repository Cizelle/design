import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './src/screens/auth/LoginScreen';
import RegisterScreen from './src/screens/auth/RegisterScreen';
import ChooseRoleScreen from './src/screens/auth/ChooseRoleScreen';
import MainDrawerNavigator from './src/navigation/MainTabNavigator';
import './src/i18n';
// NEW: Import AsyncStorage for session persistence
import AsyncStorage from '@react-native-async-storage/async-storage';

// NEW: Define a type for your user object based on your API response
interface User {
  id: string;
  email: string;
  name: string;
  // Add any other user properties your API returns
}

export type RootStackParamList = {
  Login: undefined;
  ChooseRole: undefined;
  Register: { role: 'citizen' | 'official' | 'analyst' };
  MainTabs: { user: User }; // FIX: Use the new User type
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => {
  // FIX: State is now for the user object, not a Supabase session
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // This function checks for a stored user on app launch
  const checkStoredUser = async () => {
    try {
      // Assuming your backend sends back a 'user_id' or 'token' on login
      const storedUser = await AsyncStorage.getItem('user');
      if (storedUser) {
        // Here you would typically re-authenticate the user with a token
        // to get fresh data, but for now we'll just parse the stored data.
        setUser(JSON.parse(storedUser));
      }
    } catch (e) {
      console.error('Failed to load user from storage:', e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkStoredUser();
  }, []);

  // Show a loading indicator while checking for a user
  if (isLoading) {
    return null; // Or a splash screen component
  }

  // The login and register screens need a way to set the user in App.tsx.
  // We can pass down a function to achieve this.
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const authProps = {
    onLogin: (userData: User) => {
      setUser(userData);
      AsyncStorage.setItem('user', JSON.stringify(userData));
    },
    onLogout: () => {
      setUser(null);
      AsyncStorage.removeItem('user');
    }
  };

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {user ? (
          <Stack.Screen
            name="MainTabs"
            component={MainDrawerNavigator}
            initialParams={{ user: user }} // Pass the user data to MainTabs
          />
        ) : (
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="ChooseRole" component={ChooseRoleScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;