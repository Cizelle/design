import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import MapLibreGL from '@maplibre/maplibre-react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// Initialize MapLibreGL with an empty style URL (will be set in the map view)
MapLibreGL.setAccessToken(null);

// Dummy data for initial family members and their locations
const DUMMY_FAMILY_MEMBERS = [
  { id: '1', name: 'Parent', phone: '+91 9999988888', email: 'parent@example.com', relation: 'Father', lastLocation: 'Current location', coords: { latitude: 28.4595, longitude: 77.0266 } },
  { id: '2', name: 'Sibling', phone: '+91 9876543210', email: 'sibling@example.com', relation: 'Brother', lastLocation: 'Unknown', coords: { latitude: 28.5355, longitude: 77.3910 } },
];

const FamilyScreen = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const [familyMembers, setFamilyMembers] = useState(DUMMY_FAMILY_MEMBERS);

  // Check for a new member passed from the AddFamilyMemberScreen
  useEffect(() => {
    if (route.params?.newMember) {
      const newMember = route.params.newMember;
      const newMemberWithCoords = {
        ...newMember,
        coords: {
          latitude: 28.4595 + (Math.random() - 0.5) * 0.1,
          longitude: 77.0266 + (Math.random() - 0.5) * 0.1,
        }
      };
      setFamilyMembers(prevMembers => [...prevMembers, newMemberWithCoords]);
      navigation.setParams({ newMember: undefined });
    }
  }, [navigation, route.params.newMember]);

  const handleDeclareMissing = (member: any) => {
    Alert.alert(
      'Confirm Missing Report',
      `Are you sure you want to declare ${member.name} as missing?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Declare Missing',
          style: 'destructive',
          onPress: () => {
            console.log(`Missing complaint filed for: ${member.name}`);
            Alert.alert('Report Filed', `A missing person complaint for ${member.name} has been filed.`);
          },
        },
      ]
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Family Tracker</Text>
      </View>

      <View style={styles.addMemberContainer}>
        <Text style={styles.sectionTitle}>Family Members</Text>
        <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('AddFamilyMember')}>
          <Icon name="plus" size={20} color="#fff" />
          <Text style={styles.addButtonText}>Add Member</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.memberList}>
        {familyMembers.map((member) => (
          <View key={member.id} style={styles.memberCard}>
            <View style={styles.memberDetails}>
              <Text style={styles.memberName}>{member.name}</Text>
              <Text style={styles.memberInfo}>Relation: {member.relation}</Text>
              <Text style={styles.memberInfo}>Phone: {member.phone}</Text>
              <Text style={styles.memberInfo}>Last Location: {member.lastLocation}</Text>
            </View>
            <TouchableOpacity
              style={styles.missingButton}
              onPress={() => handleDeclareMissing(member)}
            >
              <Text style={styles.missingButtonText}>Declare Missing</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>

      <View style={styles.mapContainer}>
        <MapLibreGL.MapView
          style={styles.map}
          // The style URL defines the map tiles to use. This is a free, open-source style.
          styleURL="https://demotiles.maplibre.org/style.json"
        >
          {/* MapLibre's camera component centers the map */}
          <MapLibreGL.Camera
            zoomLevel={10}
            centerCoordinate={[77.1025, 28.7041]}
            animationMode="flyTo"
            animationDuration={1000}
          />

          {/* MapLibre uses MarkerView instead of Marker */}
          {familyMembers.map((member) => (
            member.coords && (
              <MapLibreGL.MarkerView
                key={member.id}
                coordinate={[member.coords.longitude, member.coords.latitude]}
              >
                <View style={styles.markerContainer}>
                  <Icon name="map-marker" size={30} color="#D45348" />
                  <Text style={styles.markerLabel}>{member.name}</Text>
                </View>
              </MapLibreGL.MarkerView>
            )
          ))}
        </MapLibreGL.MapView>
        <Text style={styles.mapLabel}>Live Location Map</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F2F2F2' },
  header: {
    paddingVertical: 15, paddingHorizontal: 20, backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#eee', alignItems: 'center',
  },
  headerTitle: { fontSize: 20, fontWeight: 'bold', color: '#333' },
  addMemberContainer: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 15,
  },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#333' },
  addButton: {
    flexDirection: 'row', backgroundColor: '#138D35', borderRadius: 8, paddingHorizontal: 15, paddingVertical: 10, alignItems: 'center',
  },
  addButtonText: { color: '#fff', marginLeft: 5, fontWeight: 'bold' },
  memberList: { paddingHorizontal: 15 },
  memberCard: {
    flexDirection: 'row', backgroundColor: '#fff', borderRadius: 15, padding: 20, marginBottom: 15, alignItems: 'center',
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 5, elevation: 3,
  },
  memberDetails: { flex: 1 },
  memberName: { fontSize: 16, fontWeight: 'bold', color: '#333' },
  memberInfo: { fontSize: 14, color: '#666' },
  missingButton: {
    backgroundColor: '#D45348', borderRadius: 8, paddingHorizontal: 12, paddingVertical: 8,
  },
  missingButtonText: { color: '#fff', fontSize: 12, fontWeight: 'bold' },
  mapContainer: {
    height: 300, marginHorizontal: 15, marginBottom: 20, borderRadius: 15, overflow: 'hidden', borderWidth: 1, borderColor: '#ddd',
  },
  map: { flex: 1 },
  mapLabel: {
    position: 'absolute', bottom: 10, left: 10, backgroundColor: 'rgba(255,255,255,0.7)', padding: 5, borderRadius: 5, fontSize: 12, color: '#333',
  },
  markerContainer: {
    alignItems: 'center',
  },
  markerLabel: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 2,
  }
});

export default FamilyScreen;