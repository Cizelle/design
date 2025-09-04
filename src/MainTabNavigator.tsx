import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { createNativeStackNavigator, NativeStackScreenProps } from '@react-navigation/native-stack';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { ParamListBase } from '@react-navigation/native';
import DashboardScreen from './DashboardScreen';
import ReportHazardScreen from './ReportHazardScreen';
import DonationScreen from './DonationScreen';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// Placeholder screens for other tabs
const FamilyScreen = () => <></>;
const SosScreen = () => <></>;
const OfflineScreen = () => <></>;
const ProfileScreen = () => <></>;

const Tab = createBottomTabNavigator();
const DashboardStack = createNativeStackNavigator();

// Define the type for the nested Dashboard Stack
export type DashboardStackParamList = {
  DashboardHome: { username: string };
  ReportHazard: undefined;
  Donate: undefined;
};

// Define the type for the Tab Navigator's props
type MainTabProps = {
  route: {
    params: {
      username: string;
    };
  };
};

// Define the navigation stack for the Dashboard tab
const DashboardStackScreen = ({ route }: MainTabProps) => {
  const { username } = route.params;
  return (
    <DashboardStack.Navigator screenOptions={{ headerShown: false }}>
      <DashboardStack.Screen
        name="DashboardHome"
        component={DashboardScreen}
        initialParams={{ username }}
      />
      <DashboardStack.Screen name="ReportHazard" component={ReportHazardScreen} />
      <DashboardStack.Screen name="Donate" component={DonationScreen} />
    </DashboardStack.Navigator>
  );
};

// Define a function to get the icon name based on the route
const getIconName = (routeName: string, focused: boolean) => {
  let iconName;
  switch (routeName) {
    case 'Dashboard':
      iconName = focused ? 'home-variant' : 'home-variant-outline';
      break;
    case 'Family':
      iconName = focused ? 'account-group' : 'account-group-outline';
      break;
    case 'SOS':
      iconName = 'alert-octagon';
      break;
    case 'Offline':
      iconName = focused ? 'signal-off' : 'signal-off';
      break;
    case 'Profile':
      iconName = focused ? 'account-circle' : 'account-circle-outline';
      break;
    default:
      iconName = 'help-circle';
  }
  return iconName;
};

const MainTabNavigator = ({ route }: MainTabProps) => {
  const { username } = route.params;

  return (
    <Tab.Navigator
      initialRouteName="Dashboard"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => (
          <Icon name={getIconName(route.name, focused)} size={size} color={color} />
        ),
        tabBarActiveTintColor: '#138D35',
        tabBarInactiveTintColor: '#999',
        tabBarStyle: {
          backgroundColor: '#fff',
          height: 60,
          paddingBottom: 5,
        },
        tabBarLabelStyle: {
          fontSize: 12,
        },
        headerShown: false,
      })}
    >
      <Tab.Screen
        name="Dashboard"
        component={DashboardStackScreen}
        initialParams={{ username }}
      />
      <Tab.Screen name="Family" component={FamilyScreen} />
      <Tab.Screen name="SOS" component={SosScreen} />
      <Tab.Screen name="Offline" component={OfflineScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default MainTabNavigator;