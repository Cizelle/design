import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ScrollView
} from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';
import AppHeader from './components/AppHeader'; // Import the new Header
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; // For eye icon

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const [photo, setPhoto] = useState<string | undefined>();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // State for password visibility

  const handlePhotoPick = async () => {
    const result = await launchImageLibrary({ mediaType: "photo" });
    if (result.assets && result.assets.length > 0) {
      setPhoto(result.assets[0].uri);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
      <View style={styles.card}>
        <AppHeader title="Login" subtitle="Welcome back to Disaster Manager" />

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

        <Text style={styles.inputLabel}>Username *</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your username"
          value={username}
          onChangeText={setUsername}
        />

        <Text style={styles.inputLabel}>Password *</Text>
        <View style={styles.passwordInputContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder="Enter your password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.passwordToggle}>
            <Icon name={showPassword ? "eye-off" : "eye"} size={24} color="#777" />
          </TouchableOpacity>
        </View>
        
        <TouchableOpacity style={styles.forgotPasswordButton}>
          <Text style={styles.forgotPasswordText}>Forgot password?</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.mainButton}>
          <Text style={styles.mainButtonText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.oauthButton}>
          <Icon name="google" size={20} color="#DA4831" style={styles.oauthIcon} />
          <Text style={styles.oauthText}>Login with Google</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.otpButton}>
          <Icon name="message-text" size={20} color="#FFBF00" style={styles.oauthIcon} />
          <Text style={styles.otpText}>Login with OTP</Text>
        </TouchableOpacity>

        <View style={styles.switchRow}>
          <Text style={styles.switchText}>Don’t have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text style={styles.switchLink}>Register</Text>
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
    backgroundColor: '#f2f2f2', // Light grey background for the whole page
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
    overflow: 'hidden', // Ensures header radius is respected
  },
  photoUploadContainer: {
    position: 'relative',
    alignItems: 'center',
    marginBottom: 5,
    marginTop: 15, // Space from header
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
    backgroundColor: '#D4EDDA', // Light green background for upload icon
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
    marginBottom: 10, // Reduced from 16 to fit labels
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
  forgotPasswordButton: {
    alignSelf: 'flex-end',
    marginRight: '5%',
    marginBottom: 20,
  },
  forgotPasswordText: {
    color: '#138D35',
    fontSize: 14,
  },
  mainButton: {
    width: "90%",
    padding: 15,
    backgroundColor: "#138D35",
    borderRadius: 8,
    alignItems: "center",
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
    marginBottom: 10,
  },
  oauthIcon: {
    marginRight: 10,
  },
  oauthText: {
    color: "#DA4831",
    fontWeight: "700",
    fontSize: 16,
  },
  otpButton: {
    flexDirection: 'row',
    width: "90%",
    padding: 12,
    borderRadius: 8,
    borderColor: "#FFBF00",
    borderWidth: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: 'center',
    marginBottom: 20,
  },
  otpText: {
    color: "#FFBF00",
    fontWeight: "700",
    fontSize: 16,
  },
  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30, // Space from bottom of card
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

export default LoginScreen;