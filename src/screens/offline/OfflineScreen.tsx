import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, Switch, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// Define a new TypeScript interface for the received data
interface ReceivedDataItem {
  id: string;
  name: string;
  role: string;
  time: string;
}

// Placeholder for user details and received data
const userDetails = {
  name: 'Ipshita', // Replace with dynamic data from state or context
  role: 'Citizen',
  phone: '9876543210',
  geolocation: '13.0827° N, 80.2707° E', // Replace with live geolocation data
  deviceId: 'ajk3098fjao23jfa', // Replace with a real device ID
};

const receivedData: ReceivedDataItem[] = [
  { id: '1', name: 'Alex Johnson', role: 'Citizen', time: '5 mins ago' },
  { id: '2', name: 'Jane Doe', role: 'Official', time: '10 mins ago' },
  { id: '3', name: 'Community Member', role: 'Citizen', time: '15 mins ago' },
];

const OfflineScreen = () => {
  const [isOfflineModeEnabled, setOfflineModeEnabled] = useState(false);

  // Add a type annotation to the renderItem function
  const renderReceivedItem = ({ item }: { item: ReceivedDataItem }) => (
    <View style={styles.receivedItemCard}>
      <Icon name="account-circle-outline" size={24} color="#138D35" />
      <View style={styles.receivedItemContent}>
        <Text style={styles.receivedItemName}>{item.name}</Text>
        <Text style={styles.receivedItemRole}>{item.role}</Text>
      </View>
      <Text style={styles.receivedItemTime}>{item.time}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/* Connection Status Section */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Connection Status</Text>
          <View style={styles.connectionStatus}>
            <View style={[styles.statusDot, { backgroundColor: isOfflineModeEnabled ? '#f39c12' : '#2ecc71' }]} />
            <Text style={styles.statusText}>
              {isOfflineModeEnabled ? 'Offline Mode' : 'Online'} • {isOfflineModeEnabled ? 'Using local data' : 'All services active'}
            </Text>
          </View>
          <View style={styles.listItem}>
            <Text style={styles.listItemText}>Offline Mode</Text>
            <Switch
              onValueChange={setOfflineModeEnabled}
              value={isOfflineModeEnabled}
              trackColor={{ false: '#767577', true: '#f39c12' }}
              thumbColor={isOfflineModeEnabled ? '#f4f3f4' : '#f4f3f4'}
            />
          </View>
        </View>

        {/* Section 1: Your Shared Details */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Your Shared Details</Text>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Name:</Text>
            <Text style={styles.detailValue}>{userDetails.name}</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Role:</Text>
            <Text style={styles.detailValue}>{userDetails.role}</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Phone No.:</Text>
            <Text style={styles.detailValue}>{userDetails.phone}</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Geolocation:</Text>
            <Text style={styles.detailValue}>{userDetails.geolocation}</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Device ID:</Text>
            <Text style={styles.detailValue}>{userDetails.deviceId}</Text>
          </View>
        </View>

        {/* Section 2: Received Data */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Received Data (from nearby devices)</Text>
          <FlatList
            data={receivedData}
            renderItem={renderReceivedItem}
            keyExtractor={item => item.id}
            ListEmptyComponent={() => (
              <Text style={styles.emptyText}>No data received yet.</Text>
            )}
            scrollEnabled={false}
          />
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
  sectionContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginHorizontal: 15,
    marginTop: 20,
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
  connectionStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  statusDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  statusText: {
    fontSize: 16,
    color: '#666',
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  listItemText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  detailItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 5,
  },
  detailLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
  },
  detailValue: {
    fontSize: 14,
    color: '#333',
  },
  receivedItemCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    padding: 15,
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  receivedItemContent: {
    flex: 1,
    marginLeft: 15,
  },
  receivedItemName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  receivedItemRole: {
    fontSize: 12,
    color: '#666',
  },
  receivedItemTime: {
    fontSize: 12,
    color: '#999',
  },
  emptyText: {
    textAlign: 'center',
    color: '#999',
    marginTop: 20,
  },
});

export default OfflineScreen;