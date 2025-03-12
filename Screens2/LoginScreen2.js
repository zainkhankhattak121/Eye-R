import React, { useState, useEffect } from 'react';
import { Button, View, StyleSheet, TextInput, Text, Alert } from 'react-native';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithCredential, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

WebBrowser.maybeCompleteAuthSession();

const firebaseConfig = {
  apiKey: "AIzaSyDM9DFDYdv9wAgXCWz-E-1fgkAjrBa56Bs",
  authDomain: "with-camera.firebaseapp.com",
  projectId: "with-camera",
  storageBucket: "with-camera.firebasestorage.app",
  messagingSenderId: "727795324833",
  appId: "1:727795324833:android:517a4e4b0d7289d3ab9de0",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const LoginScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);

  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId: '727795324833-div4p53bvf7vamolor7mk99bvd2a41mr.apps.googleusercontent.com',
  });

  useEffect(() => {
    if (response?.type === 'success') {
      const { authentication } = response;

      const credential = GoogleAuthProvider.credential(null, authentication.accessToken);
      signInWithCredential(auth, credential)
        .then((userCredential) => {
          Alert.alert('Google Login successful!', `Welcome ${userCredential.user.displayName}`);
        })
        .catch((error) => {
          Alert.alert('Google Login failed:', error.message);
        });
    }
  }, [response]);

  const handleGoogleSignIn = async () => {
    await promptAsync();
  };

  const handleSignUp = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, `${username}@example.com`, password);
      const user = userCredential.user;
      Alert.alert('Signup successful!', `Welcome ${user.displayName || username}`);
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, `${username}@example.com`, password);
      Alert.alert('Login successful!');
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      {isSignUp ? (
        <Button title="Sign Up" onPress={handleSignUp} />
      ) : (
        <Button title="Login" onPress={handleLogin} />
      )}

      <Button
        title="Sign In with Google"
        disabled={!request}
        onPress={handleGoogleSignIn}
      />

      <Text
        style={styles.switchText}
        onPress={() => setIsSignUp(!isSignUp)}
      >
        {isSignUp ? 'Already have an account? Login' : "Don't have an account? Sign Up"}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: '80%',
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  switchText: {
    color: 'blue',
    marginTop: 10,
  },
});

export default LoginScreen;
