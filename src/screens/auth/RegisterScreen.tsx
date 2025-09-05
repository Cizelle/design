import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ScrollView, Alert
} from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../App';
import AppHeader from '../../components/AppHeader';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import RoleSpecificFields from '../../components/RoleSpecificFields'; // Import the new component

type Props = NativeStackScreenProps<RootStackParamList, 'Register'>;

const RegisterScreen: React.FC<Props> = ({ navigation, route }) => {
  const { role } = route.params; // Get the role from navigation parameters

  // Common fields for all roles
  const [photo, setPhoto] = useState<string | undefined>();
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Extra fields for Officials/Analysts
  const [designation, setDesignation] = useState('');
  const [organizationName, setOrganizationName] = useState('');
  const [employeeId, setEmployeeId] = useState('');
  const [idProofUri, setIdProofUri] = useState<string | undefined>();
  const [authorizationLetterUri, setAuthorizationLetterUri] = useState<string | undefined>();

  const [step, setStep] = useState(1); // For multi-step registration (Citizen always skips to step 2 visually)

  const handlePhotoPick = async () => {
    const result = await launchImageLibrary({ mediaType: "photo" });
    if (result.assets && result.assets.length > 0) {
      setPhoto(result.assets[0].uri);
    }
  };

  const handleNextStep = () => {
    // Basic validation for step 1
    if (!fullname || !email || !phone || !password || !confirmPassword || !photo) {
      Alert.alert('Missing Information', 'Please fill all required fields and upload a photo.');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('Password Mismatch', 'Passwords do not match.');
      return;
    }
    // For Citizen, "Next" acts as "Register"
    if (role === 'citizen') {
      handleFinalRegister();
    } else {
      setStep(2); // Move to step 2 for Official/Analyst
    }
  };

  const handleFinalRegister = () => {
    // Implement your registration logic here
    // This is where you would send data to your backend
    const userData = {
      role,
      fullname,
      email,
      phone,
      password,
      photo,
      // Include role-specific data if applicable
      ...(role !== 'citizen' && {
        designation,
        organizationName,
        employeeId,
        idProofUri,
        authorizationLetterUri,
      }),
    };
    console.log('Registering user:', userData);
    Alert.alert('Registration Successful', `User ${fullname} registered as ${role}.`);
    navigation.navigate('Login'); // Navigate back to login or to a success screen
  };

  return (
    <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
      <AppHeader title="Register" subtitle={`Join Disaster Manager today as a ${role}`} />
      <View style={styles.content}>
        {/* Step 1: Common Registration Fields */}
        {step === 1 && (
          <>
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
            
            {/* Show "Next" button for Official/Analyst, "Register" for Citizen */}
            <TouchableOpacity style={styles.mainButton} onPress={handleNextStep}>
              <Text style={styles.mainButtonText}>{role === 'citizen' ? 'Register' : 'Next'}</Text>
            </TouchableOpacity>
          </>
        )}

        {/* Step 2: Role-Specific Fields for Official/Analyst */}
        {step === 2 && (role !== 'citizen') && (
          <>
            <RoleSpecificFields
              role={role as 'official' | 'analyst'} // Cast to specific roles
              designation={designation}
              setDesignation={setDesignation}
              organizationName={organizationName}
              setOrganizationName={setOrganizationName}
              employeeId={employeeId}
              setEmployeeId={setEmployeeId}
              idProofUri={idProofUri}
              setIdProofUri={setIdProofUri}
              authorizationLetterUri={authorizationLetterUri}
              setAuthorizationLetterUri={setAuthorizationLetterUri}
            />
             <TouchableOpacity style={styles.mainButton} onPress={handleFinalRegister}>
              <Text style={styles.mainButtonText}>Register</Text>
            </TouchableOpacity>
          </>
        )}

        {/* Common links/buttons */}
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
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
    paddingBottom: 20,
  },
  content: {
    width: '90%',
    alignSelf: 'center',
    alignItems: 'center',
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
  passwordInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
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
    width: "100%",
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
    width: "100%",
    padding: 12,
    borderRadius: 8,
    borderColor: "#e0e0e0",
    borderWidth: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: 'center',
    marginBottom: 20, // Adjusted for spacing
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