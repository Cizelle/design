import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ProfileStackParamList } from '../../navigation/MainTabNavigator';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

type Props = NativeStackScreenProps<ProfileStackParamList, 'ProfileHome'>;

const ProfileScreen: React.FC<Props> = () => {
  const navigation = useNavigation<any>();

  // Placeholder data for demonstration
  const user = {
    name: 'Ipshita Das',
    email: 'ipshita.das@example.com',
    phone: '+91 98765 43210',
    profilePic: require('../assets/profile-placeholder.png'), // Add a placeholder image in your assets folder
    // You'd fetch these details from your backend
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profile</Text>
      </View>

      <View style={styles.profileCard}>
        <Image
          source={user.profilePic}
          style={styles.profileImage}
        />
        <View style={styles.detailsContainer}>
          <Text style={styles.nameText}>{user.name}</Text>
          <Text style={styles.detailText}>{user.email}</Text>
          <Text style={styles.detailText}>{user.phone}</Text>
        </View>
      </View>

      <TouchableOpacity
        style={styles.mainButton}
        onPress={() => navigation.navigate('AddPersonal')}
      >
        <Text style={styles.mainButtonText}>Add More Info</Text>
      </TouchableOpacity>

      {/* Placeholder for other details that will be filled in */}
      <View style={styles.infoSection}>
        <Text style={styles.infoTitle}>Personal Details</Text>
        <View style={styles.infoRow}>
          <Icon name="calendar" size={20} color="#666" style={styles.infoIcon} />
          <Text style={styles.infoRowText}>Date of Birth: Not provided</Text>
        </View>
        <View style={styles.infoRow}>
          <Icon name="gender-male-female" size={20} color="#666" style={styles.infoIcon} />
          <Text style={styles.infoRowText}>Gender: Not provided</Text>
        </View>
        <View style={styles.infoRow}>
          <Icon name="map-marker-outline" size={20} color="#666" style={styles.infoIcon} />
          <Text style={styles.infoRowText}>Address: Not provided</Text>
        </View>
      </View>

      <View style={styles.infoSection}>
        <Text style={styles.infoTitle}>Medical Details</Text>
        <View style={styles.infoRow}>
          <Icon name="hospital-box-outline" size={20} color="#666" style={styles.infoIcon} />
          <Text style={styles.infoRowText}>Blood Group: Not provided</Text>
        </View>
        <View style={styles.infoRow}>
          <Icon name="needle" size={20} color="#666" style={styles.infoIcon} />
          <Text style={styles.infoRowText}>Allergies: Not provided</Text>
        </View>
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
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
    margin: 15,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 20,
  },
  detailsContainer: {
    flex: 1,
  },
  nameText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  detailText: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  mainButton: {
    width: "90%",
    padding: 15,
    backgroundColor: "#138D35",
    borderRadius: 8,
    alignItems: "center",
    alignSelf: 'center',
    marginVertical: 15,
  },
  mainButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
  },
  infoSection: {
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
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  infoIcon: {
    marginRight: 10,
  },
  infoRowText: {
    fontSize: 14,
    color: '#666',
  },
});

export default ProfileScreen;