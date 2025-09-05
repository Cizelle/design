import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

const AddInfoMedicalScreen = ({ route }: any) => {
  const navigation = useNavigation<any>();
  const [allergies, setAllergies] = useState('');
  const [disabilities, setDisabilities] = useState('');
  const [bloodGroup, setBloodGroup] = useState('');
  const [hospitalNames, setHospitalNames] = useState('');
  const [pastMedicalRecord, setPastMedicalRecord] = useState('');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [medicalReportsFile, setMedicalReportsFile] = useState('');

  const { personalData } = route.params;

  const handleComplete = () => {
    // Basic validation
    if (!bloodGroup) {
      Alert.alert('Incomplete Form', 'Please select a blood group.');
      return;
    }
    const medicalData = { allergies, disabilities, bloodGroup, hospitalNames, pastMedicalRecord, medicalReportsFile };
    const fullProfileData = { ...personalData, ...medicalData };
    console.log('Full Profile Data:', fullProfileData);
    
    // Simulate API call to save data
    Alert.alert('Profile Updated!', 'Your medical and personal information has been saved.');
    navigation.navigate('ProfileConfirmation');
  };

  return (
    <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-left" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Medical Details</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.inputLabel}>Blood Group *</Text>
        <View style={styles.selectorContainer}>
          {bloodGroups.map((group) => (
            <TouchableOpacity
              key={group}
              style={[styles.selectorButton, bloodGroup === group && styles.selectorButtonActive]}
              onPress={() => setBloodGroup(group)}
            >
              <Text style={[styles.selectorButtonText, bloodGroup === group && styles.selectorButtonTextActive]}>{group}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.inputLabel}>Allergies</Text>
        <TextInput style={styles.descriptionInput} placeholder="e.g. Penicillin, bee stings" multiline value={allergies} onChangeText={setAllergies} />

        <Text style={styles.inputLabel}>Disabilities</Text>
        <TextInput style={styles.descriptionInput} placeholder="e.g. Mobility impairment" multiline value={disabilities} onChangeText={setDisabilities} />
        
        <Text style={styles.inputLabel}>Past Medical Records</Text>
        <TextInput style={styles.descriptionInput} placeholder="Summarize past medical history" multiline value={pastMedicalRecord} onChangeText={setPastMedicalRecord} />

        <Text style={styles.inputLabel}>Hospital Names</Text>
        <TextInput style={styles.descriptionInput} placeholder="e.g. Apollo Hospital, Fortis" multiline value={hospitalNames} onChangeText={setHospitalNames} />

        <Text style={styles.inputLabel}>Medical Reports</Text>
        <TouchableOpacity style={styles.uploadButton}>
          <Icon name="upload" size={20} color="#138D35" />
          <Text style={styles.uploadText}>Upload File (PDF/DOC)</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.mainButton} onPress={handleComplete}>
          <Text style={styles.mainButtonText}>Save Details</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: {
    flexDirection: 'row', alignItems: 'center', paddingVertical: 15, paddingHorizontal: 20, borderBottomWidth: 1, borderBottomColor: '#eee',
  },
  backButton: { marginRight: 15 },
  headerTitle: { fontSize: 20, fontWeight: 'bold', color: '#333' },
  content: { padding: 20 },
  inputLabel: { width: '100%', color: '#333', fontSize: 14, fontWeight: '500', marginBottom: 5, marginTop: 15 },
  descriptionInput: {
    height: 80, backgroundColor: '#f6f6f6', borderRadius: 8, borderWidth: 1, borderColor: '#e0e0e0', paddingHorizontal: 15, paddingTop: 15, fontSize: 16, marginBottom: 10,
  },
  selectorContainer: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  selectorButton: {
    backgroundColor: '#f6f6f6', borderRadius: 8, paddingVertical: 12, paddingHorizontal: 15, marginBottom: 10, borderWidth: 1, borderColor: '#e0e0e0', minWidth: '22%', alignItems: 'center'
  },
  selectorButtonActive: { backgroundColor: '#D4EDDA', borderColor: '#138D35' },
  selectorButtonText: { fontSize: 14, color: '#333', fontWeight: '600' },
  selectorButtonTextActive: { color: '#138D35' },
  uploadButton: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#F0F9F0', borderWidth: 1, borderColor: '#138D35', borderRadius: 8, padding: 15, marginTop: 10
  },
  uploadText: { marginLeft: 10, color: '#138D35', fontWeight: 'bold' },
  mainButton: {
    width: "100%", padding: 15, backgroundColor: "#138D35", borderRadius: 8, alignItems: "center", marginTop: 20, marginBottom: 15,
  },
  mainButtonText: { color: "#fff", fontWeight: "bold", fontSize: 18 },
});

export default AddInfoMedicalScreen;