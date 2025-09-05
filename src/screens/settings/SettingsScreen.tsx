import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Switch } from 'react-native-gesture-handler';

// A placeholder for your Settings screen
const SettingsScreen = () => {
  const [isEmergencyAlertsEnabled, setEmergencyAlertsEnabled] = React.useState(true);
  const [isHazardReportsEnabled, setHazardReportsEnabled] = React.useState(true);
  const [isFamilyUpdatesEnabled, setFamilyUpdatesEnabled] = React.useState(true);
  const [isSystemUpdatesEnabled, setSystemUpdatesEnabled] = React.useState(false);
  const [isCommunityNewsEnabled, setCommunityNewsEnabled] = React.useState(true);

  // You can add state hooks for App Permissions here as needed
  const [isLocationPermissionEnabled, setLocationPermissionEnabled] = React.useState(true);
  const [isCameraPermissionEnabled, setCameraPermissionEnabled] = React.useState(false);
  const [isNotificationsPermissionEnabled, setNotificationsPermissionEnabled] = React.useState(true);
  const [isMicrophonePermissionEnabled, setMicrophonePermissionEnabled] = React.useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/* Header Section */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Settings</Text>
          <Text style={styles.headerSubtitle}>Customize your experience</Text>
        </View>

        {/* Account Settings Section */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Account Settings</Text>
          <TouchableOpacity style={styles.listItem}>
            <View style={styles.listItemContent}>
              <Text style={styles.listItemText}>Edit Profile</Text>
              <Text style={styles.listItemSubText}>Update personal information</Text>
            </View>
            <Icon name="chevron-right" size={24} color="#ccc" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.listItem}>
            <View style={styles.listItemContent}>
              <Text style={styles.listItemText}>Emergency Contacts</Text>
              <Text style={styles.listItemSubText}>Manage your emergency contact list</Text>
            </View>
            <Icon name="chevron-right" size={24} color="#ccc" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.listItem}>
            <View style={styles.listItemContent}>
              <Text style={styles.listItemText}>Medical Information</Text>
              <Text style={styles.listItemSubText}>Update medical details and allergies</Text>
            </View>
            <Icon name="chevron-right" size={24} color="#ccc" />
          </TouchableOpacity>
        </View>

        {/* Notifications Section */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Notifications</Text>
          <View style={styles.listItem}>
            <View style={styles.listItemContent}>
              <Text style={styles.listItemText}>Emergency Alerts</Text>
              <Text style={styles.listItemSubText}>Critical emergency notifications</Text>
            </View>
            <Switch
              onValueChange={setEmergencyAlertsEnabled}
              value={isEmergencyAlertsEnabled}
              trackColor={{ false: '#767577', true: '#138D35' }}
              thumbColor={isEmergencyAlertsEnabled ? '#f4f3f4' : '#f4f3f4'}
            />
          </View>
          <View style={styles.listItem}>
            <View style={styles.listItemContent}>
              <Text style={styles.listItemText}>Hazard Reports</Text>
              <Text style={styles.listItemSubText}>New hazard reports in your area</Text>
            </View>
            <Switch
              onValueChange={setHazardReportsEnabled}
              value={isHazardReportsEnabled}
              trackColor={{ false: '#767577', true: '#138D35' }}
              thumbColor={isHazardReportsEnabled ? '#f4f3f4' : '#f4f3f4'}
            />
          </View>
          <View style={styles.listItem}>
            <View style={styles.listItemContent}>
              <Text style={styles.listItemText}>Family Updates</Text>
              <Text style={styles.listItemSubText}>Family member status updates</Text>
            </View>
            <Switch
              onValueChange={setFamilyUpdatesEnabled}
              value={isFamilyUpdatesEnabled}
              trackColor={{ false: '#767577', true: '#138D35' }}
              thumbColor={isFamilyUpdatesEnabled ? '#f4f3f4' : '#f4f3f4'}
            />
          </View>
          <View style={styles.listItem}>
            <View style={styles.listItemContent}>
              <Text style={styles.listItemText}>System Updates</Text>
              <Text style={styles.listItemSubText}>App updates and maintenance</Text>
            </View>
            <Switch
              onValueChange={setSystemUpdatesEnabled}
              value={isSystemUpdatesEnabled}
              trackColor={{ false: '#767577', true: '#138D35' }}
              thumbColor={isSystemUpdatesEnabled ? '#f4f3f4' : '#f4f3f4'}
            />
          </View>
          <View style={styles.listItem}>
            <View style={styles.listItemContent}>
              <Text style={styles.listItemText}>Community News</Text>
              <Text style={styles.listItemSubText}>Community bulletins and news</Text>
            </View>
            <Switch
              onValueChange={setCommunityNewsEnabled}
              value={isCommunityNewsEnabled}
              trackColor={{ false: '#767577', true: '#138D35' }}
              thumbColor={isCommunityNewsEnabled ? '#f4f3f4' : '#f4f3f4'}
            />
          </View>
        </View>
        
        {/* App Permissions Section */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>App Permissions</Text>
          <View style={styles.listItem}>
            <View style={styles.listItemContent}>
              <Text style={styles.listItemText}>Location</Text>
              <Text style={styles.listItemSubText}>Allow location services for emergency tracking</Text>
            </View>
            <Switch
              onValueChange={setLocationPermissionEnabled}
              value={isLocationPermissionEnabled}
              trackColor={{ false: '#767577', true: '#138D35' }}
              thumbColor={isLocationPermissionEnabled ? '#f4f3f4' : '#f4f3f4'}
            />
          </View>
          <View style={styles.listItem}>
            <View style={styles.listItemContent}>
              <Text style={styles.listItemText}>Camera</Text>
              <Text style={styles.listItemSubText}>Allow access to your camera for reports</Text>
            </View>
            <Switch
              onValueChange={setCameraPermissionEnabled}
              value={isCameraPermissionEnabled}
              trackColor={{ false: '#767577', true: '#138D35' }}
              thumbColor={isCameraPermissionEnabled ? '#f4f3f4' : '#f4f3f4'}
            />
          </View>
          <View style={styles.listItem}>
            <View style={styles.listItemContent}>
              <Text style={styles.listItemText}>Notifications</Text>
              <Text style={styles.listItemSubText}>Receive push notifications</Text>
            </View>
            <Switch
              onValueChange={setNotificationsPermissionEnabled}
              value={isNotificationsPermissionEnabled}
              trackColor={{ false: '#767577', true: '#138D35' }}
              thumbColor={isNotificationsPermissionEnabled ? '#f4f3f4' : '#f4f3f4'}
            />
          </View>
          <View style={styles.listItem}>
            <View style={styles.listItemContent}>
              <Text style={styles.listItemText}>Microphone</Text>
              <Text style={styles.listItemSubText}>Allow access to your microphone for voice reports</Text>
            </View>
            <Switch
              onValueChange={setMicrophonePermissionEnabled}
              value={isMicrophonePermissionEnabled}
              trackColor={{ false: '#767577', true: '#138D35' }}
              thumbColor={isMicrophonePermissionEnabled ? '#f4f3f4' : '#f4f3f4'}
            />
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  header: {
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#666',
    marginTop: 5,
  },
  sectionContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginHorizontal: 15,
    marginBottom: 20,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  listItemContent: {
    flex: 1,
    marginRight: 10,
  },
  listItemText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  listItemSubText: {
    fontSize: 12,
    color: '#999',
  },
});

export default SettingsScreen;