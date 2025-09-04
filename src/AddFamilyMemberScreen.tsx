import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const AddFamilyMemberScreen = () => {
  const navigation = useNavigation<any>();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [relation, setRelation] = useState('');

  const handleSave = () => {
    if (!name || !phone || !relation) {
      Alert.alert('Incomplete Form', 'Please fill in all required fields.');
      return;
    }

    const newMember = {
      id: Math.random().toString(), // Dummy ID
      name,
      phone,
      email,
      relation,
      lastLocation: 'Unknown',
    };
    
    // In a real app, you would send this to the backend.
    // For this demo, we'll navigate back and let the FamilyScreen handle the new member.
    navigation.navigate('FamilyHome', { newMember });
  };

  return (
    <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-left" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Add Family Member</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.inputLabel}>Full Name *</Text>
        <TextInput style={styles.input} placeholder="e.g. Jane Doe" value={name} onChangeText={setName} />

        <Text style={styles.inputLabel}>Phone Number *</Text>
        <TextInput style={styles.input} placeholder="e.g. +91 9876543210" keyboardType="phone-pad" value={phone} onChangeText={setPhone} />

        <Text style={styles.inputLabel}>Email</Text>
        <TextInput style={styles.input} placeholder="e.g. janedoe@example.com" keyboardType="email-address" value={email} onChangeText={setEmail} />

        <Text style={styles.inputLabel}>Relation *</Text>
        <TextInput style={styles.input} placeholder="e.g. Parent, Sibling" value={relation} onChangeText={setRelation} />

        <TouchableOpacity style={styles.mainButton} onPress={handleSave}>
          <Text style={styles.mainButtonText}>Save Member</Text>
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
  input: {
    width: '100%', backgroundColor: '#f6f6f6', borderRadius: 8, height: 50, marginBottom: 10, fontSize: 16, paddingHorizontal: 15, borderWidth: 1, borderColor: '#e0e0e0',
  },
  mainButton: {
    width: "100%", padding: 15, backgroundColor: "#138D35", borderRadius: 8, alignItems: "center", marginTop: 20, marginBottom: 15,
  },
  mainButtonText: { color: "#fff", fontWeight: "bold", fontSize: 18 },
});

export default AddFamilyMemberScreen;