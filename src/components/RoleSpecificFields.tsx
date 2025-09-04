// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface RoleSpecificFieldsProps {
  role: 'official' | 'analyst';
  designation: string;
  setDesignation: (text: string) => void;
  organizationName: string;
  setOrganizationName: (text: string) => void;
  employeeId: string;
  setEmployeeId: (text: string) => void;
  idProofUri: string | undefined;
  setIdProofUri: (uri: string | undefined) => void;
  authorizationLetterUri: string | undefined;
  setAuthorizationLetterUri: (uri: string | undefined) => void;
}

const RoleSpecificFields: React.FC<RoleSpecificFieldsProps> = ({
  role,
  designation,
  setDesignation,
  organizationName,
  setOrganizationName,
  employeeId,
  setEmployeeId,
  idProofUri,
  setIdProofUri,
  authorizationLetterUri,
  setAuthorizationLetterUri,
}) => {

  const handleDocumentPick = async (setter: (uri: string | undefined) => void) => {
    const result = await launchImageLibrary({ mediaType: "photo", selectionLimit: 1 });
    if (result.assets && result.assets.length > 0) {
      setter(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Additional Information for {role === 'official' ? 'Official' : 'Analyst'}</Text>

      <Text style={styles.inputLabel}>Designation *</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your designation"
        value={designation}
        onChangeText={setDesignation}
      />

      <Text style={styles.inputLabel}>Organization Name *</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your organization's name"
        value={organizationName}
        onChangeText={setOrganizationName}
      />

      <Text style={styles.inputLabel}>Employee ID *</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your employee ID"
        value={employeeId}
        onChangeText={setEmployeeId}
      />

      <Text style={styles.inputLabel}>ID Proof Document *</Text>
      <TouchableOpacity
        style={styles.documentUploadButton}
        onPress={() => handleDocumentPick(setIdProofUri)}
      >
        <Icon name="file-upload" size={20} color="#138D35" />
        <Text style={styles.documentUploadButtonText}>
          {idProofUri ? 'Change Document' : 'Upload ID Proof'}
        </Text>
      </TouchableOpacity>
      {idProofUri && <Text style={styles.documentName}>{idProofUri.split('/').pop()}</Text>}
      <Text style={styles.requiredText}>Required</Text>


      <Text style={styles.inputLabel}>Authorization Letter *</Text>
      <TouchableOpacity
        style={styles.documentUploadButton}
        onPress={() => handleDocumentPick(setAuthorizationLetterUri)}
      >
        <Icon name="file-upload" size={20} color="#138D35" />
        <Text style={styles.documentUploadButtonText}>
          {authorizationLetterUri ? 'Change Document' : 'Upload Authorization Letter'}
        </Text>
      </TouchableOpacity>
      {authorizationLetterUri && <Text style={styles.documentName}>{authorizationLetterUri.split('/').pop()}</Text>}
      <Text style={styles.requiredText}>Required</Text>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    marginTop: 20,
    paddingHorizontal: '5%', // Match parent padding
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#138D35',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputLabel: {
    width: '100%',
    color: '#333',
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 5,
    marginTop: 10,
  },
  input: {
    width: '100%',
    backgroundColor: '#f6f6f6',
    borderRadius: 8,
    height: 50,
    marginBottom: 10,
    fontSize: 16,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  documentUploadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#D4EDDA', // Light green background
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 8,
    width: '100%',
    justifyContent: 'center',
    marginBottom: 5,
    borderColor: '#138D35',
    borderWidth: 1,
  },
  documentUploadButtonText: {
    marginLeft: 10,
    color: '#138D35',
    fontSize: 16,
    fontWeight: '600',
  },
  documentName: {
    fontSize: 12,
    color: '#555',
    marginTop: 5,
    marginBottom: 5,
    textAlign: 'center',
  },
  requiredText: {
    fontSize: 12,
    color: '#999',
    marginBottom: 10,
    alignSelf: 'flex-start',
  },
});

export default RoleSpecificFields;