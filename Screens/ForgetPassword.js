import React from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';

const ForgetPassword = () => {
  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Enter your email"
        style={styles.input}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      
      {/* Replace Button with TouchableOpacity for custom styling */}
      <TouchableOpacity style={styles.resetButton}>
        <Text style={styles.buttonText}>Send Reset Email</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E3F2FD',
    padding: 20,
  },
  input: {
    width: '80%',
    padding: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#1E88E5',
    borderRadius: 5,
  },
  resetButton: {
    backgroundColor: '#1E88E5',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ForgetPassword;
