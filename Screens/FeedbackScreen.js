import React from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet } from 'react-native';

const FeedbackScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Send Email</Text>
      </View>
      <TextInput
        style={styles.textInput}
        placeholder="Your Name"
      />
      <TextInput
        style={styles.textInput}
        placeholder="Your Email"
      />
      <TextInput
        style={[styles.textInput, { height: 100 }]}
        placeholder="Your Message"
        multiline
      />
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Send</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fefae0',
    padding: 20,
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    color: '#333',
    fontWeight: 'bold',
  },
  textInput: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    borderColor: '#283618',
    borderWidth: 1,
    marginBottom: 20,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#606c38',
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default FeedbackScreen;
