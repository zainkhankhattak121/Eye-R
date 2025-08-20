// FrontPage.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { MotiView } from 'moti'; // for animations

const { width, height } = Dimensions.get('window');

const FrontPage = ({ navigation }) => {
  return (
    <LinearGradient
      colors={['#283618', '#606c38', '#fefae0']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      {/* Animated Icon */}
      <MotiView
        from={{ opacity: 0, translateY: -40, scale: 0.8 }}
        animate={{ opacity: 1, translateY: 0, scale: 1 }}
        transition={{ type: 'spring', duration: 1000 }}
      >
        <Ionicons name="eye" size={120} color="#fefae0" style={styles.icon} />
      </MotiView>

      {/* Title */}
      <MotiView
        from={{ opacity: 0, translateY: 20 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ delay: 500, duration: 800 }}
      >
        <Text style={styles.title}>EYE-R</Text>
      </MotiView>

      {/* Tagline */}
      <MotiView
        from={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1000, duration: 1000 }}
      >
        <Text style={styles.subtitle}>
          Test your vision with fun and interactive tools
        </Text>
      </MotiView>

      {/* Start Button */}
      <MotiView
        from={{ opacity: 0, translateY: 40 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ delay: 1500, duration: 800 }}
      >
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.startButton}
          onPress={() => navigation.replace('HomeScreen')}
        >
          <LinearGradient
            colors={['#fefae0cc', '#fefae099']}
            style={styles.gradientButton}
          >
            <Text style={styles.startText}>Get Started</Text>
          </LinearGradient>
        </TouchableOpacity>
      </MotiView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  icon: {
    marginBottom: 30,
    shadowColor: '#fefae0',
    shadowOpacity: 0.8,
    shadowRadius: 20,
    elevation: 15,
  },
  title: {
    fontSize: 42,
    fontWeight: '900',
    color: '#fefae0',
    marginBottom: 10,
    textAlign: 'center',
    letterSpacing: 4,
  },
  subtitle: {
    fontSize: 18,
    color: '#fefae0',
    textAlign: 'center',
    marginBottom: 60,
    paddingHorizontal: 30,
    lineHeight: 26,
    opacity: 0.9,
  },
  startButton: {
    borderRadius: 40,
    overflow: 'hidden',
    elevation: 10,
  },
  gradientButton: {
    paddingVertical: 16,
    paddingHorizontal: 60,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backdropFilter: 'blur(10px)', // glassmorphism effect
  },
  startText: {
    color: '#283618',
    fontSize: 20,
    fontWeight: 'bold',
    letterSpacing: 1.5,
  },
});

export default FrontPage;
