import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import DashboardScreen from './DashboardScreen';
import ReportHazardScreen from './ReportHazardScreen';
import DonationScreen from './DonationScreen';
import DrawerMenu from './components/DrawerMenu';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FamilyScreen from './FamilyScreen';
import AddFamilyMemberScreen from './AddFamilyMemberScreen';
import ProfileScreen from './ProfileScreen';
import AddInfoPersonalScreen from './AddInfoPersonalScreen';
import AddInfoMedicalScreen from './AddInfoMedicalScreen';
import ProfileConfirmationScreen from './ProfileConfirmationScreen';

// Placeholder screens for other tabs
const FamilyScreen = () => <></>;
import SosScreen from './SosScreen';
const OfflineScreen = () => <></>;

const Tab = createBottomTabNavigator();
const DashboardStack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

// Define the type for the nested Dashboard Stack
export type DashboardStackParamList = {
  DashboardHome: { username: string };
  ReportHazard: undefined;
  Donate: undefined;
};

export type ProfileStackParamList = {
  ProfileHome: undefined;
  AddPersonal: undefined;
  AddMedical: undefined;
  ProfileConfirmation: undefined;
};

// Define the navigation stack for the Dashboard tab
const DashboardStackScreen = ({ route }: any) => {
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

const FamilyStack = createNativeStackNavigator();

const FamilyStackScreen = () => {
  return (
    <FamilyStack.Navigator screenOptions={{ headerShown: false }}>
      <FamilyStack.Screen name="FamilyHome" component={FamilyScreen} />
      <FamilyStack.Screen name="AddFamilyMember" component={AddFamilyMemberScreen} />
    </FamilyStack.Navigator>
  );
};

const ProfileStack = createNativeStackNavigator();

const ProfileStackScreen = () => {
  return (
    <ProfileStack.Navigator screenOptions={{ headerShown: false }}>
      <ProfileStack.Screen name="ProfileHome" component={ProfileScreen} />
      <ProfileStack.Screen name="AddPersonal" component={AddInfoPersonalScreen} />
      <ProfileStack.Screen name="AddMedical" component={AddInfoMedicalScreen} />
      <ProfileStack.Screen name="ProfileConfirmation" component={ProfileConfirmationScreen} />
    </ProfileStack.Navigator>
  );
};

// Main Tab Navigator
const MainTabs = ({ route }: any) => {
  const { username } = route.params;
  return (
    <Tab.Navigator
      initialRouteName="Dashboard"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          switch (route.name) {
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
          return <Icon name={iconName} size={size} color={color} />;
        },
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
      <Tab.Screen name="Family" component={FamilyStackScreen} />
      <Tab.Screen name="SOS" component={SosScreen} />
      <Tab.Screen name="Offline" component={OfflineScreen} />
      <Tab.Screen name="Profile" component={ProfileStackScreen} />
    </Tab.Navigator>
  );
};

// Main Drawer Navigator that wraps the Tab Navigator
const MainDrawerNavigator = ({ route }: any) => {
  const { username } = route.params;
  return (
    <Drawer.Navigator
      drawerContent={props => <DrawerMenu {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Drawer.Screen
        name="MainTabs"
        component={MainTabs}
        initialParams={{ username }}
      />
    </Drawer.Navigator>
  );
};

export default MainDrawerNavigator;