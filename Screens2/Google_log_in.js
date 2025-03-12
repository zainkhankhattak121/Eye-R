import React, { useEffect, useState, useCallback } from 'react'; 
import { Text, View, Alert, Button } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import * as AuthSession from 'expo-auth-session';
import { useNavigation } from '@react-navigation/native';

// Firebase imports
import { auth, googleProvider } from './firebaseConfig';
import { signInWithCredential, GoogleAuthProvider } from "firebase/auth";

WebBrowser.maybeCompleteAuthSession();

// OAuth Client IDs
const CLIENT_ID = '727795324833-div4p53bvf7vamolor7mk99bvd2a41mr.apps.googleusercontent.com';
const ANDROID_CLIENT_ID = 'YOUR_ANDROID_CLIENT_ID_HERE';
const IOS_CLIENT_ID = 'YOUR_IOS_CLIENT_ID_HERE';

const Google_log_in = () => {
  const navigation = useNavigation();
  const redirectUri = AuthSession.makeRedirectUri({ useProxy: false });

  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId: CLIENT_ID,
    androidClientId: ANDROID_CLIENT_ID,
    iosClientId: IOS_CLIENT_ID,
    scopes: ['openid', 'profile', 'email'],
    redirectUri,
  });

  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    if (response?.type === 'success') {
      const { id_token } = response.params;
      const credential = GoogleAuthProvider.credential(id_token);
      
      signInWithCredential(auth, credential)
        .then((userCredential) => {
          setUserInfo(userCredential.user);
          navigation.replace('MainApp'); // Navigate after sign-in
        })
        .catch((error) => {
          console.error('Firebase Sign-In Error:', error);
          Alert.alert('Error', 'Failed to sign in. Please try again.');
        });
    }
  }, [response]);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      {userInfo ? (
        <>
          <Text>Welcome, {userInfo.displayName}</Text>
          <Text>Email: {userInfo.email}</Text>
        </>
      ) : (
        <>
          <Text>Sign in with Google</Text>
          <Button title="Sign In" disabled={!request} onPress={() => promptAsync()} />
        </>
      )}
    </View>
  );
};

export default Google_log_in;
