import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert, ActivityIndicator
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../App';
import AppHeader from '../../components/AppHeader';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTranslation } from 'react-i18next';
import { Picker } from '@react-native-picker/picker';
// FIX: Use your custom API client instead of Supabase
import apiClient from '../../api/client';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const { t, i18n } = useTranslation();
  const [selectedLanguage, setSelectedLanguage] = useState(i18n.language);
  const [email, setEmail] = useState(''); // FIX: Changed username state to email for API
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const changeLanguage = (language: string) => {
    i18n.changeLanguage(language);
    setSelectedLanguage(language);
  };

  const handleLogin = async () => {
    // FIX: Replaced 'identifier' with 'email'
    if (email.trim() === '' || password.trim() === '') {
      Alert.alert(t('login.alert.failedTitle'), t('login.alert.emptyFields'));
      return;
    }

    setIsLoading(true);

    try {
      const response = await apiClient.post('/auth/login', {
        // FIX: Replaced 'identifier' with 'email' here as well
        identifier: email,
        password,
      });
      console.log('login response.data:', response.data);

      const { user, tokens } = response.data;

      // Persist user object
      if (user) {
        await AsyncStorage.setItem('userData', JSON.stringify(user));
      }

      // Persist JWT securely
      if (tokens?.access?.token) {
        await AsyncStorage.setItem('authToken', tokens.access.token);
      }

      // Navigate to main app
      navigation.replace('MainTabs', { user });
    } catch (err: any) {
      console.warn('Login error', err?.response ?? err);
      const errorMessage =
        err.response?.data?.message ?? 'An unexpected error occurred.';
      Alert.alert(t('login.alert.failedTitle'), errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
      <AppHeader title={t('login.header.title')} subtitle={t('login.header.subtitle')} />
      <Text style={styles.welcomeText}>{t('login.welcome')}</Text>
      <View style={styles.content}>
        <Text style={styles.inputLabel}>{t('login.usernameLabel')} *</Text>
        <TextInput
          style={styles.input}
          placeholder={t('login.usernamePlaceholder')}
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />
        <Text style={styles.inputLabel}>{t('login.passwordLabel')} *</Text>
        <View style={styles.passwordInputContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder={t('login.passwordPlaceholder')}
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.passwordToggle}>
            <Icon name={showPassword ? "eye-off" : "eye"} size={24} color="#777" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.forgotPasswordButton}>
          <Text style={styles.forgotPasswordText}>{t('login.forgotPassword')}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.mainButton} onPress={handleLogin} disabled={isLoading}>
          {isLoading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.mainButtonText}>{t('login.mainButton')}</Text>
          )}
        </TouchableOpacity>
        <TouchableOpacity style={styles.oauthButton}>
          <Icon name="google" size={20} color="#DA4831" style={styles.oauthIcon} />
          <Text style={styles.oauthText}>{t('login.googleButton')}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.otpButton}>
          <Icon name="message-text" size={20} color="#FFBF00" style={styles.oauthIcon} />
          <Text style={styles.otpText}>{t('login.otpButton')}</Text>
        </TouchableOpacity>
        <View style={styles.switchRow}>
          <Text style={styles.switchText}>{t('login.noAccountText')} </Text>
          <TouchableOpacity onPress={() => navigation.navigate('ChooseRole')}>
            <Text style={styles.switchLink}>{t('login.registerLink')}</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={[styles.languagePickerContainer, styles.languagePickerBottom]}>
        <Text style={styles.languageLabel}>{t('settings.language.changeLanguage')}:</Text>
        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={selectedLanguage}
            onValueChange={(itemValue) => changeLanguage(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label={t('languages.english')} value="en" />
            <Picker.Item label={t('languages.hindi')} value="hi" />
          </Picker>
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
  languagePickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%',
    alignSelf: 'center',
    marginTop: 20,
  },
  languagePickerBottom: {
    marginTop: 'auto',
    marginBottom: 20,
  },
  languageLabel: {
    fontSize: 16,
    color: '#666',
    marginRight: 10,
  },
  pickerWrapper: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    overflow: 'hidden',
  },
  picker: {
    width: '100%',
    height: 40,
    color: '#333',
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginVertical: 20,
    width: '100%',
  },
  content: {
    width: '90%',
    alignSelf: 'center',
    alignItems: 'center',
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
  forgotPasswordButton: {
    alignSelf: 'flex-end',
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 20,
  },
  forgotPasswordText: {
    color: '#138D35',
    fontSize: 14,
  },
  mainButton: {
    width: "100%",
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
    width: "100%",
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
    width: "100%",
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

export default LoginScreen;