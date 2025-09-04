import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const paymentMethods = ['UPI', 'GPay', 'Crypto'];

const DonationScreen = () => {
  const navigation = useNavigation<any>();
  const [amount, setAmount] = useState('');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [currency, setCurrency] = useState('INR');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [purpose, setPurpose] = useState('');
  const [totalDonated, setTotalDonated] = useState(0);

  const handleDonate = () => {
    const donationAmount = parseFloat(amount);
    if (isNaN(donationAmount) || donationAmount <= 0 || !paymentMethod) {
      Alert.alert('Incomplete Form', 'Please enter a valid amount and select a payment method.');
      return;
    }
    // Simulate payment transaction
    Alert.alert('Donation Confirmed!', `Thank you for your donation of ₹${donationAmount.toFixed(2)}.`);
    setTotalDonated(prev => prev + donationAmount);
    // Clear form fields
    setAmount('');
    setPaymentMethod('');
    setPurpose('');
  };

  return (
    <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-left" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Donate</Text>
      </View>
      <View style={styles.content}>
        <View style={styles.totalDonationCard}>
          <Text style={styles.totalDonationLabel}>Total Amount Donated</Text>
          <Text style={styles.totalDonationAmount}>₹{totalDonated.toFixed(2)}</Text>
        </View>

        <Text style={styles.inputLabel}>Donation Amount *</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter amount"
          keyboardType="numeric"
          value={amount}
          onChangeText={setAmount}
        />

        <Text style={styles.inputLabel}>Payment Method *</Text>
        <View style={styles.selectorContainer}>
          {paymentMethods.map((method) => (
            <TouchableOpacity
              key={method}
              style={[
                styles.selectorButton,
                paymentMethod === method && styles.selectorButtonActive,
              ]}
              onPress={() => setPaymentMethod(method)}
            >
              <Text
                style={[
                  styles.selectorButtonText,
                  paymentMethod === method && styles.selectorButtonTextActive,
                ]}
              >
                {method}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.inputLabel}>Purpose (Optional)</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g. Cyclone relief"
          value={purpose}
          onChangeText={setPurpose}
        />

        <TouchableOpacity style={styles.mainButton} onPress={handleDonate}>
          <Text style={styles.mainButtonText}>Donate Now</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  backButton: {
    marginRight: 15,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  content: {
    padding: 20,
  },
  totalDonationCard: {
    backgroundColor: '#138D35',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
    marginBottom: 20,
  },
  totalDonationLabel: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 5,
  },
  totalDonationAmount: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#fff',
  },
  inputLabel: {
    width: '100%',
    color: '#333',
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 5,
    marginTop: 15,
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
  selectorContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  selectorButton: {
    backgroundColor: '#f6f6f6',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 15,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    minWidth: '30%',
    alignItems: 'center',
  },
  selectorButtonActive: {
    backgroundColor: '#D4EDDA',
    borderColor: '#138D35',
  },
  selectorButtonText: {
    fontSize: 14,
    color: '#333',
    fontWeight: '600',
  },
  selectorButtonTextActive: {
    color: '#138D35',
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
});

export default DonationScreen;