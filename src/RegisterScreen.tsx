import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ScrollView
} from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';
import AppHeader from './components/AppHeader'; // Import the new Header
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; // For eye icon

type Props = NativeStackScreenProps<RootStackParamList, 'Register'>;

const RegisterScreen: React.FC<Props> = ({ navigation }) => {
  const [photo, setPhoto] = useState<string | undefined>();
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // State for password visibility
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // State for confirm password visibility

  const handlePhotoPick = async () => {
    const result = await launchImageLibrary({ mediaType: "photo" });
    if (result.assets && result.assets.length > 0) {
      setPhoto(result.assets[0].uri);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
      <View style={styles.card}>
        <AppHeader title="Register" subtitle="Join Disaster Manager today" />

        <TouchableOpacity style={styles.photoUploadContainer} onPress={handlePhotoPick}>
          <View style={styles.photoCircle}>
            {photo
              ? <Image source={{ uri: photo }} style={styles.photoImg} />
              : <Icon name="camera" size={40} color="#a0a0a0" />}
          </View>
          <View style={styles.uploadIconContainer}>
            <Icon name="upload" size={20} color="#138D35" />
          </View>
        </TouchableOpacity>
        <Text style={styles.uploadPhotoText}>Upload Photo *</Text>
        <Text style={styles.requiredText}>Required</Text>

        <Text style={styles.inputLabel}>Full Name *</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your full name"
          value={fullname}
          onChangeText={setFullname}
        />

        <Text style={styles.inputLabel}>Email *</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          value={email}
          autoCapitalize='none'
          keyboardType='email-address'
          onChangeText={setEmail}
        />

        <Text style={styles.inputLabel}>Phone Number *</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your phone number"
          value={phone}
          keyboardType='phone-pad'
          onChangeText={setPhone}
        />

        <Text style={styles.inputLabel}>Password *</Text>
        <View style={styles.passwordInputContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder="Create a password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.passwordToggle}>
            <Icon name={showPassword ? "eye-off" : "eye"} size={24} color="#777" />
          </TouchableOpacity>
        </View>

        <Text style={styles.inputLabel}>Confirm Password *</Text>
        <View style={styles.passwordInputContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder="Confirm your password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry={!showConfirmPassword}
          />
          <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)} style={styles.passwordToggle}>
            <Icon name={showConfirmPassword ? "eye-off" : "eye"} size={24} color="#777" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.mainButton}>
          <Text style={styles.mainButtonText}>Register</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.oauthButton}>
          <Icon name="google" size={20} color="#DA4831" style={styles.oauthIcon} />
          <Text style={styles.oauthText}>Register with Google</Text>
        </TouchableOpacity>

        <View style={styles.switchRow}>
          <Text style={styles.switchText}>Already have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.switchLink}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    paddingVertical: 20,
  },
  card: {
    width: '90%',
    maxWidth: 400,
    backgroundColor: '#fff',
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    alignItems: 'center',
    overflow: 'hidden',
  },
  photoUploadContainer: {
    position: 'relative',
    alignItems: 'center',
    marginBottom: 5,
    marginTop: 15,
  },
  photoCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  photoImg: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  uploadIconContainer: {
    position: 'absolute',
    bottom: 0,
    right: -5,
    backgroundColor: '#D4EDDA',
    borderRadius: 15,
    padding: 5,
  },
  uploadPhotoText: {
    fontSize: 14,
    color: '#138D35',
    fontWeight: '600',
    marginTop: 8,
  },
  requiredText: {
    fontSize: 12,
    color: '#999',
    marginBottom: 20,
  },
  inputLabel: {
    width: '90%',
    alignSelf: 'center',
    color: '#333',
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 5,
    marginTop: 10,
  },
  input: {
    width: '90%',
    backgroundColor: '#f6f6f6',
    borderRadius: 8,
    height: 50,
    marginBottom: 10,
    fontSize: 16,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  passwordInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
    backgroundColor: '#f6f6f6',
    borderRadius: 8,
    height: 50,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  passwordInput: {
    flex: 1,
    fontSize: 16,
    paddingHorizontal: 15,
    height: '100%',
  },
  passwordToggle: {
    padding: 10,
  },
  mainButton: {
    width: "90%",
    padding: 15,
    backgroundColor: "#138D35",
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
    marginBottom: 15,
  },
  mainButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
  },
  oauthButton: {
    flexDirection: 'row',
    width: "90%",
    padding: 12,
    borderRadius: 8,
    borderColor: "#e0e0e0",
    borderWidth: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: 'center',
    marginBottom: 20,
  },
  oauthIcon: {
    marginRight: 10,
  },
  oauthText: {
    color: "#DA4831",
    fontWeight: "700",
    fontSize: 16,
  },
  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  switchText: {
    fontSize: 14,
    color: '#555',
  },
  switchLink: {
    color: '#138D35',
    fontWeight: '600',
    fontSize: 14,
  },
});

export default RegisterScreen;