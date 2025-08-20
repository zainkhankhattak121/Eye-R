import React, { useState, useEffect } from 'react';
import { 
  View, Text, Image, TouchableOpacity, StyleSheet, 
  Alert, ActivityIndicator, Platform 
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import { LinearGradient } from 'expo-linear-gradient';

const ImageRecognitionScreen = () => {
  const [imageUri, setImageUri] = useState(null);
  const [colorInfo, setColorInfo] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getPermission = async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Denied', 'Camera roll permission is required.');
      }
    };
    getPermission();
  }, []);

  const pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.assets || result.assets.length === 0) {
        return;
      }

      setImageUri(result.assets[0].uri);
      setColorInfo(null);
    } catch (error) {
      console.error('Error picking image:', error);
      Alert.alert('Error', 'Failed to pick image.');
    }
  };

  const detectColor = async () => {
    if (!imageUri) {
      Alert.alert('No Image', 'Please select an image first.');
      return;
    }

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append('file', {
        uri: Platform.OS === 'android' ? imageUri : imageUri.replace('file://', ''),
        name: 'image.jpg',
        type: 'image/jpeg',
      });

      const backendUrl ='https://zainkhankhattak121-colordetection.hf.space/detect-color';
      console.log('🔄 Sending image to:', backendUrl);

      const backendResponse = await axios.post(backendUrl, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      console.log('✅ API Response:', backendResponse.data);
      
      if (backendResponse.data && backendResponse.data.color_name) {
        setColorInfo(backendResponse.data);
      } else {
        Alert.alert('Error', 'Invalid response from server.');
      }
    } catch (error) {
      console.error('❌ Error detecting color:', error);
      Alert.alert('Error', 'Failed to detect color. Check server logs.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#606c38', '#606c38']} style={styles.innerContainer}>
        <Text style={styles.title}>Image Color Recognition</Text>

        {/* Button Container */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={pickImage} style={styles.button}>
            <Text style={styles.buttonText}>Pick an Image</Text>
          </TouchableOpacity>
        </View>

        {imageUri && (
          <>
            <View style={styles.imageContainer}>
              <Image source={{ uri: imageUri }} style={styles.image} />
            </View>

            {/* Button Container */}
            <View style={styles.buttonContainer}>
              <TouchableOpacity onPress={detectColor} style={styles.analyzeButton}>
                <Text style={styles.buttonText}>Analyze Image</Text>
              </TouchableOpacity>
            </View>
          </>
        )}

        {loading && <ActivityIndicator size="large" color="#fff" style={{ marginTop: 20 }} />}

        {colorInfo && (
          <View style={styles.colorInfo}>
  <Text style={[styles.colorText, { color: 'black' }]}>
    Color: <Text style={{ fontWeight: 'bold', color: 'black' }}>{colorInfo.color_name}</Text>
  </Text>
  <Text style={[styles.colorText, { color: 'black' }]}>
    RGB: <Text style={{ fontWeight: 'bold', color: 'black' }}>
      {colorInfo.rgb ? colorInfo.rgb.join(', ') : 'N/A'}
    </Text>
  </Text>
</View>

        )}
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,  
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fefae0', // Outer container background color
  },
  innerContainer: {
    width: '90%',
    alignItems: 'center',
    padding: 20,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    elevation: 5,

  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
    textAlign: 'center',
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#fefae0', // Button background color
    padding: 12,
    borderRadius: 8,
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 5,
  },
  analyzeButton: {
    backgroundColor: '#fefae0', // Analyze button background color
    padding: 12,
    borderRadius: 8,
    marginTop: 15,
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 5,
  },
  buttonText: {
    color: '#283618', // Text color for buttons
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  imageContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  image: {
    width: 250,
    height: 250,
    resizeMode: 'contain',
    borderRadius: 10,
  },
  colorInfo: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#fefae0',
    borderRadius: 10,
    alignItems: 'center',
  },
  colorText: {
    fontSize: 18,
    color: '#fff',
  },
});

export default ImageRecognitionScreen;