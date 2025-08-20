import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Image, ScrollView } from 'react-native';

const { width, height } = Dimensions.get('window');

const HomeScreen = ({ navigation }) => {
  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.background}>
        {/* Colorblind Test Box */}
        <View style={styles.box}>
         <Image
  source={require('../assets/colorblindtest.jpg')}
  style={styles.boxImage}
/>

          <Text style={styles.boxTitle}>Colorblind Test</Text>
          <Text style={styles.boxText}>Test your ability to differentiate colors.</Text>
          <TouchableOpacity
            style={styles.signUpButton}
            onPress={() => navigation.navigate('ColorblindTest')}
          >
            <Text style={styles.buttonText}>Take the Test</Text>
          </TouchableOpacity>
        </View>

        {/* Color Identification Box */}
        <View style={styles.box}>
          <Image source={require('../assets/1.jpg')} style={styles.boxImage} />
          <Text style={styles.boxTitle}>Color Identification</Text>
          <Text style={styles.boxText}>Identify colors in different settings.</Text>
          <TouchableOpacity
            style={styles.signUpButton}
            onPress={() => navigation.navigate('ColorIdentification')}
          >
            <Text style={styles.buttonText}>Start Identifying</Text>
          </TouchableOpacity>
        </View>

        {/* Image Recognition Box */}
        <View style={styles.box}>
          <Image source={require('../assets/new image reco.jpg')} style={styles.boxImage} />
          <Text style={styles.boxTitle}>Image Recognition</Text>
          <Text style={styles.boxText}>Test your ability to recognize objects.</Text>
          <TouchableOpacity
            style={styles.signUpButton}
            onPress={() => navigation.navigate('ImageRecognition')}
          >
            <Text style={styles.buttonText}>Start Recognition</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    paddingBottom: 10, // Reduced bottom padding
  },
  background: {
    backgroundColor: '#fefae0',
    alignItems: 'center',
    paddingVertical: '3%', // Reduced vertical padding
    paddingHorizontal: '3%', // Reduced horizontal padding
  },
  box: {
    backgroundColor: '#606c38',
    width: '100%',
    maxWidth: width * 0.8, // Further reduced width
    padding: '3%', // Reduced padding further
    marginVertical: '2%', // Reduced margin
    borderRadius: 15,
    alignItems: 'center',
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },
  boxImage: {
  width: '100%',       // fill the box width
  height: 150,         // fixed height for image area
  resizeMode: 'contain', // make sure full image is visible
  marginBottom: 10,    // spacing from text below
}
,
  boxTitle: {
    fontSize: 20, // Smaller title font size
    fontWeight: 'bold',
    color: 'white',
    marginBottom: '3%', // Reduced spacing between title and text
    textAlign: 'center',
    letterSpacing: 1.2,
  },
  boxText: {
    fontSize: 14, // Reduced text size
    color: '#fefae0',
    marginBottom: '4%', // Reduced space between description and button
    textAlign: 'center',
    lineHeight: 18,
  },
  signUpButton: {
    backgroundColor: '#fefae0',
    paddingVertical: '3%', // Reduced padding inside button
    borderRadius: 50,
    marginVertical: '2%', // Reduced margin for button
    width: '70%', // Slightly smaller button width
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
  },
  buttonText: {
    color: '#283618',
    fontSize: 14, // Smaller font size for button text
    fontWeight: 'bold',
  },
});

export default HomeScreen;
