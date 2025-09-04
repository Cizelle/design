import React from 'react';
import {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  View, Text, StyleSheet, ScrollView, TouchableOpacity, Image,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { DashboardStackParamList } from './MainTabNavigator'; // Import the new type
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// Correctly define the props for this screen within the nested stack
type Props = NativeStackScreenProps<DashboardStackParamList, 'DashboardHome'>;

const DashboardScreen: React.FC<Props> = ({ route }) => {
  const { username } = route.params;
  const navigation = useNavigation<any>(); // We use `any` for simplicity in navigation actions

  return (
    <ScrollView style={styles.container}>
      {/* Top Header */}
      <View style={styles.header}>
        <View style={styles.appInfo}>
          <Icon name="waves" size={30} color="#138D35" />
          <View style={styles.appNameContainer}>
            <Text style={styles.appName}>Sahayak</Text>
            <Text style={styles.appTagline}>Disaster Management</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.profileIconContainer}>
          <Icon name="account-circle" size={40} color="#138D35" />
        </TouchableOpacity>
      </View>

      {/* Welcome Banner */}
      <View style={styles.welcomeBanner}>
        <Text style={styles.welcomeText}>Namaste, {username}</Text>
        <Text style={styles.staySafeText}>
          Stay safe and help your community by reporting hazards
        </Text>
        <View style={styles.statusContainer}>
          <View style={styles.statusBox}>
            <Text style={styles.statusLabel}>Status: Active</Text>
          </View>
          <Text style={styles.reportsCount}>12 Reports this month</Text>
        </View>
      </View>

      {/* Main Action Cards */}
      <View style={styles.cardsContainer}>
        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate('ReportHazard')}
        >
          <View style={styles.cardIcon}>
            <Icon name="alert-circle-outline" size={40} color="#D45348" />
          </View>
          <Text style={styles.cardTitle}>Report Hazard</Text>
          <Text style={styles.cardSubtitle}>Submit new report</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate('Donate')}
        >
          <View style={styles.cardIcon}>
            <Icon name="heart-outline" size={40} color="#138D35" />
          </View>
          <Text style={styles.cardTitle}>Donate</Text>
          <Text style={styles.cardSubtitle}>Help victims</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.card}>
          <View style={styles.cardIcon}>
            <Icon name="account-group-outline" size={40} color="#1565C0" />
          </View>
          <Text style={styles.cardTitle}>Track Family</Text>
          <Text style={styles.cardSubtitle}>Find loved ones</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.card}>
          <View style={styles.cardIcon}>
            <Icon name="power-plug-off" size={40} color="#FF9800" />
          </View>
          <Text style={styles.cardTitle}>Offline Mode</Text>
          <Text style={styles.cardSubtitle}>Emergency backup</Text>
        </TouchableOpacity>
      </View>

      {/* Nearby Activity Section */}
      <View style={styles.nearbyContainer}>
        <View style={styles.nearbyHeader}>
          <Icon name="map-marker-outline" size={24} color="#138D35" />
          <Text style={styles.nearbyTitle}>Nearby Activity</Text>
        </View>
        <View style={styles.mapPlaceholder}>
          <Icon name="map" size={50} color="#ccc" />
          <Text style={styles.mapText}>Interactive Map</Text>
        </View>
        <View style={styles.activityList}>
          <View style={styles.activityItem}>
            <View style={[styles.dot, { backgroundColor: '#FF0000' }]} />
            <Text style={styles.activityText}>High Wave Warning</Text>
            <Text style={styles.distanceText}>1.2 km</Text>
          </View>
          <View style={styles.activityItem}>
            <View style={[styles.dot, { backgroundColor: '#138D35' }]} />
            <Text style={styles.activityText}>Shelter Available</Text>
            <Text style={styles.distanceText}>0.8 km</Text>
          </View>
        </View>
      </View>

      {/* My Recent Reports Section */}
      <View style={styles.reportsContainer}>
        <View style={styles.reportsHeader}>
          <View style={styles.reportsHeaderTitle}>
            <Icon name="history" size={24} color="#138D35" />
            <Text style={styles.reportsTitle}>My Recent Reports</Text>
          </View>
          <TouchableOpacity style={styles.newReportButton}>
            <Icon name="plus" size={16} color="#138D35" />
            <Text style={styles.newReportText}>New</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.reportItem}>
          <Icon name="alert-triangle" size={24} color="#1565C0" />
          <View style={styles.reportItemTextContainer}>
            <Text style={styles.reportItemTitle}>High Waves</Text>
            <Text style={styles.reportItemSubtitle}>Marina Beach</Text>
          </View>
          <View style={[styles.reportStatus, { backgroundColor: '#D4EDDA' }]}>
            <Text style={[styles.reportStatusText, { color: '#138D35' }]}>Verified</Text>
          </View>
        </View>
        <View style={styles.reportItem}>
          <Icon name="alert-triangle" size={24} color="#1565C0" />
          <View style={styles.reportItemTextContainer}>
            <Text style={styles.reportItemTitle}>Flooding</Text>
            <Text style={styles.reportItemSubtitle}>ECR Road</Text>
          </View>
          <View style={[styles.reportStatus, { backgroundColor: '#FFF3CD' }]}>
            <Text style={[styles.reportStatusText, { color: '#FFC107' }]}>Pending</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.viewAllReports}>
          <Text style={styles.viewAllReportsText}>View All Reports</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F2',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  appInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  appNameContainer: {
    marginLeft: 10,
  },
  appName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  appTagline: {
    fontSize: 12,
    color: '#666',
  },
  profileIconContainer: {
    padding: 5,
  },
  welcomeBanner: {
    backgroundColor: '#138D35',
    padding: 20,
    borderRadius: 15,
    margin: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  staySafeText: {
    fontSize: 14,
    color: '#D4EDDA',
    marginBottom: 15,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  statusBox: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
  },
  statusLabel: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  reportsCount: {
    color: '#D4EDDA',
    fontSize: 12,
  },
  cardsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },
  card: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  cardIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#F7F7F7',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  cardSubtitle: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  nearbyContainer: {
    backgroundColor: '#fff',
    borderRadius: 15,
    marginHorizontal: 15,
    padding: 20,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  nearbyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  nearbyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 10,
  },
  mapPlaceholder: {
    width: '100%',
    height: 150,
    backgroundColor: '#F7F7F7',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  mapText: {
    fontSize: 16,
    color: '#999',
    marginTop: 5,
  },
  activityList: {
    paddingHorizontal: 5,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  activityText: {
    fontSize: 14,
    color: '#333',
    flex: 1,
  },
  distanceText: {
    fontSize: 12,
    color: '#999',
  },
  reportsContainer: {
    backgroundColor: '#fff',
    borderRadius: 15,
    marginHorizontal: 15,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  reportsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  reportsHeaderTitle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  reportsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 10,
  },
  newReportButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#D4EDDA',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
  },
  newReportText: {
    color: '#138D35',
    fontWeight: 'bold',
    marginLeft: 5,
  },
  reportItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  reportItemTextContainer: {
    marginLeft: 10,
    flex: 1,
  },
  reportItemTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  reportItemSubtitle: {
    fontSize: 12,
    color: '#666',
  },
  reportStatus: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  reportStatusText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  viewAllReports: {
    marginTop: 15,
    alignSelf: 'center',
  },
  viewAllReportsText: {
    color: '#138D35',
    fontSize: 14,
    fontWeight: '600',
  },
});

export default DashboardScreen;