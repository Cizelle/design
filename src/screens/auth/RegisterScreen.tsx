// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ScrollView, Alert
} from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../App';
import AppHeader from '../../components/AppHeader';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import RoleSpecificFields from '../../components/RoleSpecificFields';
import { useTranslation } from 'react-i18next';

type Props = NativeStackScreenProps<RootStackParamList, 'Register'>;

const RegisterScreen: React.FC<Props> = ({ navigation, route }) => {
  const { t } = useTranslation();
  const { role } = route.params;

  const [photo, setPhoto] = useState<string | undefined>();
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');
  const [designation, setDesignation] = useState('');
  const [organizationName, setOrganizationName] = useState('');
  const [employeeId, setEmployeeId] = useState('');
  const [idProofUri, setIdProofUri] = useState<string | undefined>();
  const [authorizationLetterUri, setAuthorizationLetterUri] = useState<string | undefined>();
  const [step, setStep] = useState(1);

  const handlePhotoPick = async () => {
    const result = await launchImageLibrary({ mediaType: "photo" });
    if (result.assets && result.assets.length > 0) {
      setPhoto(result.assets[0].uri);
    }
  };

  const handleNextStep = () => {
    if (!fullname || !email || !phone || !password || !confirmPassword || !photo || !city || !state || !country) {
      Alert.alert(t('register.alert.missingInfoTitle'), t('register.alert.missingInfoMessage'));
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert(t('register.alert.passwordMismatchTitle'), t('register.alert.passwordMismatchMessage'));
      return;
    }
    if (role === 'citizen') {
      handleFinalRegister();
    } else {
      setStep(2);
    }
  };

  const handleFinalRegister = () => {
    const userData = {
      role, fullname, email, phone, password, photo, city, state, country,
      ...(role !== 'citizen' && {
        designation, organizationName, employeeId, idProofUri, authorizationLetterUri,
      }),
    };
    console.log('Registering user:', userData);
    Alert.alert(t('register.alert.successTitle'), t('register.alert.successMessage', { fullname: fullname, role: t(`roles.${role}.title`) }));
    navigation.navigate('Login');
  };

  const roleTitleKey = `roles.${role}.title`;
  const headerSubtitle = t('register.header.subtitle', { role: t(roleTitleKey) });

  return (
    <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
      <AppHeader title={t('register.header.title')} subtitle={headerSubtitle} />
      <View style={styles.content}>
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
            <Text style={styles.uploadPhotoText}>{t('register.photoUpload.label')}</Text>
            <Text style={styles.requiredText}>{t('register.photoUpload.required')}</Text>

            <Text style={styles.inputLabel}>{t('register.fullNameLabel')} *</Text>
            <TextInput
              style={styles.input}
              placeholder={t('register.fullNamePlaceholder')}
              value={fullname}
              onChangeText={setFullname}
            />

            <Text style={styles.inputLabel}>{t('register.emailLabel')} *</Text>
            <TextInput
              style={styles.input}
              placeholder={t('register.emailPlaceholder')}
              value={email}
              autoCapitalize='none'
              keyboardType='email-address'
              onChangeText={setEmail}
            />

            <Text style={styles.inputLabel}>{t('register.phoneLabel')} *</Text>
            <TextInput
              style={styles.input}
              placeholder={t('register.phonePlaceholder')}
              value={phone}
              keyboardType='phone-pad'
              onChangeText={setPhone}
            />
            
            <Text style={styles.inputLabel}>{t('register.cityLabel')} *</Text>
            <TextInput
              style={styles.input}
              placeholder={t('register.cityPlaceholder')}
              value={city}
              onChangeText={setCity}
            />

            <Text style={styles.inputLabel}>{t('register.stateLabel')} *</Text>
            <TextInput
              style={styles.input}
              placeholder={t('register.statePlaceholder')}
              value={state}
              onChangeText={setState}
            />
            
            <Text style={styles.inputLabel}>{t('register.countryLabel')} *</Text>
            <TextInput
              style={styles.input}
              placeholder={t('register.countryPlaceholder')}
              value={country}
              onChangeText={setCountry}
            />

            <Text style={styles.inputLabel}>{t('register.passwordLabel')} *</Text>
            <View style={styles.passwordInputContainer}>
              <TextInput
                style={styles.passwordInput}
                placeholder={t('register.passwordPlaceholder')}
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.passwordToggle}>
                <Icon name={showPassword ? "eye-off" : "eye"} size={24} color="#777" />
              </TouchableOpacity>
            </View>

            <Text style={styles.inputLabel}>{t('register.confirmPasswordLabel')} *</Text>
            <View style={styles.passwordInputContainer}>
              <TextInput
                style={styles.passwordInput}
                placeholder={t('register.confirmPasswordPlaceholder')}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry={!showConfirmPassword}
              />
              <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)} style={styles.passwordToggle}>
                <Icon name={showConfirmPassword ? "eye-off" : "eye"} size={24} color="#777" />
              </TouchableOpacity>
            </View>
            
            <TouchableOpacity style={styles.mainButton} onPress={handleNextStep}>
              <Text style={styles.mainButtonText}>{role === 'citizen' ? t('register.registerButton') : t('register.nextButton')}</Text>
            </TouchableOpacity>
          </>
        )}

        {step === 2 && (role !== 'citizen') && (
          <>
            <RoleSpecificFields
              role={role as 'official' | 'analyst'}
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
              <Text style={styles.mainButtonText}>{t('register.registerButton')}</Text>
            </TouchableOpacity>
          </>
        )}

        <TouchableOpacity style={styles.oauthButton}>
          <Icon name="google" size={20} color="#DA4831" style={styles.oauthIcon} />
          <Text style={styles.oauthText}>{t('register.googleButton')}</Text>
        </TouchableOpacity>

        <View style={styles.switchRow}>
          <Text style={styles.switchText}>{t('register.haveAccountText')} </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.switchLink}>{t('register.loginLink')}</Text>
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