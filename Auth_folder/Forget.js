// ForgetPassword.js
import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from './firebaseConfig';

const ForgetPassword = () => {
  const [email, setEmail] = useState('');

  const handleResetPassword = async () => {
    try {
      if (!email) {
        Alert.alert("Error", "Please enter your email.");
        return;
      }
      await sendPasswordResetEmail(auth, email);
      Alert.alert("Success", "Password reset email sent.");
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  return (
    <LinearGradient
      colors={['#283618', '#606c38', '#fefae0']}
      style={styles.container}
    >
      {/* Icon */}
      <Ionicons name="lock-closed-outline" size={100} color="#fefae0" style={styles.icon} />

      {/* Title */}
      <Text style={styles.title}>Forgot Password?</Text>
      <Text style={styles.subtitle}>
        Enter your registered email to receive a password reset link
      </Text>

      {/* Input */}
      <TextInput
        placeholder="Enter your email"
        placeholderTextColor="#ccc"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      {/* Button */}
      <TouchableOpacity style={styles.button} onPress={handleResetPassword} activeOpacity={0.8}>
        <LinearGradient
          colors={['#fefae0', '#d4a373']}
          style={styles.gradientButton}
        >
          <Text style={styles.buttonText}>Send Reset Email</Text>
        </LinearGradient>
      </TouchableOpacity>
    </LinearGradient>
  );
};

export default ForgetPassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  icon: {
    marginBottom: 20,
    shadowColor: '#fefae0',
    shadowOpacity: 0.8,
    shadowRadius: 15,
    elevation: 10,
  },
  title: {
    fontSize: 32,
    fontWeight: '900',
    color: '#fefae0',
    marginBottom: 10,
    textAlign: 'center',
    letterSpacing: 2,
  },
  subtitle: {
    fontSize: 16,
    color: '#fefae0',
    textAlign: 'center',
    marginBottom: 30,
    paddingHorizontal: 20,
    lineHeight: 22,
    opacity: 0.9,
  },
  input: {
    width: '90%',
    backgroundColor: '#ffffffcc',
    padding: 15,
    marginBottom: 20,
    borderRadius: 12,
    fontSize: 16,
    color: '#283618',
  },
  button: {
    borderRadius: 40,
    overflow: 'hidden',
    width: '90%',
    elevation: 6,
  },
  gradientButton: {
    paddingVertical: 16,
    borderRadius: 40,
    alignItems: 'center',
  },
  buttonText: {
    color: '#283618',
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
});
