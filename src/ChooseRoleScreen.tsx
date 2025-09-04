import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

type Props = NativeStackScreenProps<RootStackParamList, 'ChooseRole'>;

const ChooseRoleScreen: React.FC<Props> = ({ navigation }) => {

  const handleRegisterPress = (role: 'citizen' | 'official' | 'analyst') => {
    navigation.navigate('Register', { role });
  };

  const roles = [
    {
      id: 'citizen',
      icon: 'account-group',
      title: 'Citizen',
      description: 'Report hazards, access emergency services',
      features: [
        'Report Hazards',
        'Submit SOS',
        'Track Family',
        'Make Donations',
        'Emergency Drills',
      ],
    },
    {
      id: 'official',
      icon: 'shield-check',
      title: 'Official',
      description: 'Validate reports, manage emergency responses',
      features: [
        'Validate Reports',
        'Manage Hotspots',
        'Emergency Response',
        'Resource Allocation',
      ],
    },
    {
      id: 'analyst',
      icon: 'chart-bar',
      title: 'Analyst',
      description: 'Monitor trends, analyze data insights',
      features: [
        'Social Media Monitoring',
        'Trend Analysis',
        'Data Insights',
        'Generate Reports',
      ],
    },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.mainTitle}>Choose Your Role</Text>
        <Text style={styles.subtitle}>
          Select your role to access the appropriate features for coastal hazard management.
        </Text>
      </View>

      <View style={styles.rolesContainer}>
        {roles.map((role) => (
          <View key={role.id} style={styles.roleCard}>
            <View style={styles.iconContainer}>
              <Icon name={role.icon} size={40} color="#138D35" />
            </View>
            <Text style={styles.roleTitle}>{role.title}</Text>
            <Text style={styles.roleDescription}>{role.description}</Text>
            <Text style={styles.keyFeaturesTitle}>Key Features:</Text>
            {role.features.map((feature, index) => (
              <View key={index} style={styles.featureItem}>
                <View style={styles.bullet} />
                <Text style={styles.featureText}>{feature}</Text>
              </View>
            ))}
            <TouchableOpacity
              style={styles.registerButton}
              onPress={() => handleRegisterPress(role.id as 'citizen' | 'official' | 'analyst')}
            >
              <Text style={styles.registerButtonText}>Register as {role.title}</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#f2f2f2',
    paddingVertical: 20,
    alignItems: 'center',
  },
  header: {
    width: '90%',
    alignItems: 'center',
    marginBottom: 20,
  },
  mainTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 22,
  },
  rolesContainer: {
    width: '90%',
    maxWidth: 400,
  },
  roleCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    borderColor: '#D4EDDA', // Light green border
    borderWidth: 1,
  },
  iconContainer: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#D4EDDA', // Light green background for icon
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  roleTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  roleDescription: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 15,
    lineHeight: 20,
  },
  keyFeaturesTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
    alignSelf: 'flex-start', // Align left within the card
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
    width: '100%',
  },
  bullet: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#138D35', // Green bullet
    marginRight: 10,
  },
  featureText: {
    fontSize: 14,
    color: '#555',
  },
  registerButton: {
    width: '100%',
    backgroundColor: '#138D35', // Green button
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  registerButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ChooseRoleScreen;