import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Image, ScrollView } from 'react-native';

const { width, height } = Dimensions.get('window');

const HomeScreen = ({ navigation }) => {
  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.background}>
        {/* Colorblind Test Box */}
        <View style={styles.box}>
          <Image source={require('../assets/images.jpeg')} style={styles.boxImage} />
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
          <Image source={require('../assets/images.jpeg')} style={styles.boxImage} />
          <Text style={styles.boxTitle}>Color Identification</Text>
          <Text style={styles.boxText}>Identify colors in different settings.</Text>
          <TouchableOpacity
            style={styles.signUpButton}
            onPress={() => navigation.navigate('CameraScreen')}
          >
            <Text style={styles.buttonText}>Start Identifying</Text>
          </TouchableOpacity>
        </View>

        {/* Image Recognition Box */}
        <View style={styles.box}>
          <Image source={require('../assets/images.jpeg')} style={styles.boxImage} />
          <Text style={styles.boxTitle}>Image Recognition</Text>
          <Text style={styles.boxText}>Test your ability to recognize objects.</Text>
          <TouchableOpacity
            style={styles.signUpButton}
            onPress={() => navigation.navigate('ImageRecognition')}
          >
            <Text style={styles.buttonText}>Start Recognition</Text>
          </TouchableOpacity>
        </View>

        {/* Reaction Time Test Box */}
        <View style={styles.box}>
          <Image source={require('../assets/images.jpeg')} style={styles.boxImage} />
          <Text style={styles.boxTitle}>Reaction Time Test</Text>
          <Text style={styles.boxText}>Measure your reaction speed to stimuli.</Text>
          <TouchableOpacity
            style={styles.signUpButton}
            onPress={() => navigation.navigate('ReactionTimeTest')}
          >
            <Text style={styles.buttonText}>Test My Speed</Text>
          </TouchableOpacity>
        </View>
        ////////

        ///////////
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    paddingBottom: 20,
  },
  background: {
    backgroundColor: '',
    alignItems: 'center',
    paddingVertical: '5%',
    paddingHorizontal: '4%',
  },
  box: {
    backgroundColor: '#606c38',
    width: '100%',
    maxWidth: width * 0.85, // Reduced box width
    padding: '4%', // Reduced padding
    marginVertical: '3%', // Reduced margin
    borderRadius: 15,
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  boxImage: {
    width: '100%',
    height: height * 0.22, // Reduced height of image
    resizeMode: 'cover',
    borderRadius: 10,
    marginBottom: '4%',
  },
  boxTitle: {
    fontSize: 22, // Slightly smaller font size
    fontWeight: 'bold',
    color: 'white',
    marginBottom: '3%',
    textAlign: 'center',
    letterSpacing: 1.2,
  },
  boxText: {
    fontSize: 15, // Smaller font size
    color: '#fefae0',
    marginBottom: '5%',
    textAlign: 'center',
    lineHeight: 20,
  },
  signUpButton: {
    backgroundColor: '#fefae0',
    paddingVertical: '3%', // Reduced padding
    borderRadius: 50,
    marginVertical: '3%',
    width: '75%', // Reduced width of button
    alignItems: 'center',
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  buttonText: {
    color: '#283618',
    fontSize: 16, // Slightly smaller button text
    fontWeight: 'bold',
  },
});

export default HomeScreen;

