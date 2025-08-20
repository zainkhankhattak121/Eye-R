import React, { useState, useEffect } from 'react';
import { View, TextInput, Text, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { createUserWithEmailAndPassword, sendEmailVerification, signOut, deleteUser } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { auth } from './firebaseConfig';

const ScreenSignUp2 = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigation = useNavigation();
  const [user, setUser] = useState(null);
  const [timer, setTimer] = useState(null);

  useEffect(() => {
    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [timer]);

  // ✅ Strong Password Check
  const isStrongPassword = (pwd) => {
    const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;
    return pattern.test(pwd);
  };

  const handleSignUp = async () => {
    if (!email || !password || !confirmPassword) {
      setErrorMessage("Email, password, and confirm password cannot be empty.");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    if (!isStrongPassword(password)) {
      setErrorMessage("Password must be at least 8 characters long and include uppercase, lowercase, number, and special character.");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const createdUser = userCredential.user;
      await sendEmailVerification(createdUser);
      setErrorMessage("");

      Alert.alert(
        "Sign Up Successful!",
        "A verification email has been sent. Please verify your email before logging in.",
        [
          {
            text: "OK",
            onPress: () => navigation.goBack(), // ✅ Go back after signup
          },
        ]
      );

      setUser(createdUser);

      const deleteTimer = setTimeout(() => {
        handleDeleteUser(createdUser);
      }, 60000); // 60 sec

      await signOut(auth);
      setTimer(deleteTimer);

    } catch (error) {
      handleError(error);
    }
  };

  const handleDeleteUser = async (user) => {
    try {
      await deleteUser(user); 
      Alert.alert("Account Deleted", "Your account has been deleted because the email was not verified in time.");
    } catch (error) {
      console.error("Error deleting user: ", error);
      Alert.alert("Error", "There was an issue deleting your account. Please try again.");
    }
  };

  const handleError = (error) => {
    let errorMessage = "An unexpected error occurred.";
    switch (error.code) {
      case 'auth/email-already-in-use':
        errorMessage = "The email is already in use. Please log in.";
        break;
      case 'auth/invalid-email':
        errorMessage = "The email address is not valid.";
        break;
      case 'auth/weak-password':
        errorMessage = "Password too weak. Try a stronger one.";
        break;
      default:
        errorMessage = error.message; 
    }
    setErrorMessage(errorMessage);
  };

  return (
    <LinearGradient colors={['#283618', '#606c38']} style={styles.container}>
      <Text style={styles.title}>Create Account</Text>
      <Text style={styles.subtitle}>Join us and start your journey today 🚀</Text>

      <TextInput
        placeholder="Email"
        placeholderTextColor="#555"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        style={styles.input}
      />

      <TextInput
        placeholder="Password"
        placeholderTextColor="#555"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />

      <TextInput
        placeholder="Confirm Password"
        placeholderTextColor="#555"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
        style={styles.input}
      />

      {/* Sign Up Button */}
      <TouchableOpacity onPress={handleSignUp} style={styles.button}>
        <LinearGradient colors={['#fefae0', '#dda15e']} style={styles.gradientButton}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </LinearGradient>
      </TouchableOpacity>

      {/* Already have account Button */}
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.linkButton}>
        <Text style={styles.linkText}>Already have an account? Sign In</Text>
      </TouchableOpacity>

      {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}
    </LinearGradient>
  );
};

export default ScreenSignUp2;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
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
  linkButton: {
    marginTop: 20,
  },
  linkText: {
    color: '#fefae0',
    fontSize: 16,
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
  errorText: {
    color: '#fefae0',
    marginTop: 12,
    textAlign: 'center',
    backgroundColor: '#bc6c25',
    padding: 8,
    borderRadius: 8,
    width: '90%',
  },
});
