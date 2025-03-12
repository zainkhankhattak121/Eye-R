import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ScrollView,
  Alert,
} from 'react-native';

const { width, height } = Dimensions.get('window');

const ColorBlindTestGame = () => {
  const [images] = useState([
    require('../assets/10.jpg'),
    require('../assets/8.jpg'),
    require('../assets/15.jpg'),
    require('../assets/6.webp'),
    require('../assets/7.webp'),
    require('../assets/45.webp'),
    require('../assets/26.webp'),
    require('../assets/74.png'),
  ]);
  const correctAnswers = [10, 8, 15, 6, 7, 45, 26, 74];

  const [currentImage, setCurrentImage] = useState(0);
  const [score, setScore] = useState(0);
  const [countdown, setCountdown] = useState(10);
  const [gameInProgress, setGameInProgress] = useState(false);
  const [result, setResult] = useState('');
  const [choices, setChoices] = useState([]);

  useEffect(() => {
    let timer;
    if (gameInProgress && countdown > 0) {
      timer = setInterval(() => setCountdown((prev) => prev - 1), 1000);
    } else if (gameInProgress && countdown === 0) {
      handleChoice(null);
    }
    return () => clearInterval(timer);
  }, [countdown, gameInProgress]);

  useEffect(() => {
    if (gameInProgress) generateChoices();
  }, [currentImage, gameInProgress]);

  const startGame = () => {
    setGameInProgress(true);
    setCurrentImage(0);
    setScore(0);
    setCountdown(10);
    setResult('');
  };

  const generateChoices = () => {
    const correctAnswer = correctAnswers[currentImage];
    const allAnswers = [...correctAnswers];
    const randomChoices = [correctAnswer];

    while (randomChoices.length < 4) {
      const randomIndex = Math.floor(Math.random() * allAnswers.length);
      const randomAnswer = allAnswers[randomIndex];
      if (!randomChoices.includes(randomAnswer)) {
        randomChoices.push(randomAnswer);
      }
    }

    setChoices(shuffleArray(randomChoices));
  };

  const shuffleArray = (array) => array.sort(() => Math.random() - 0.5);

  const handleChoice = (choice) => {
    if (!gameInProgress) return;

    const correctAnswer = correctAnswers[currentImage];
    if (choice === correctAnswer) {
      setResult('Correct!');
      setScore(score + 1);
    } else {
      setResult('Wrong!');
    }

    if (currentImage + 1 < images.length) {
      setTimeout(() => nextImage(), 1000);
    } else {
      endGame();
    }
  };

  const nextImage = () => {
    setCurrentImage((prev) => prev + 1);
    setCountdown(10);
    setResult('');
  };

  const endGame = () => {
    setGameInProgress(false);
    Alert.alert('Game Over', `Your Score: ${score} out of ${images.length}`, [
      { text: 'Retry', onPress: startGame },
      { text: 'Close', style: 'cancel' },
    ]);
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.background}>
        {!gameInProgress ? (
          <View style={styles.box}>
            <Text style={styles.boxTitle}>Color Blindness Test Game</Text>
            <Text style={styles.boxText}>
              Select the number in the images within the time limit. Good luck!
            </Text>
            <TouchableOpacity onPress={startGame} style={styles.signUpButton}>
              <Text style={styles.buttonText}>Start Game</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.box}>
            <View style={styles.imageContainer}>
              <Image source={images[currentImage]} style={styles.image} />
            </View>
            <Text style={styles.timer}>Time Left: {countdown}s</Text>
            <View style={styles.choicesContainer}>
              {choices.map((choice, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.choiceButton}
                  onPress={() => handleChoice(choice)}
                >
                  <Text style={styles.choiceText}>{choice}</Text>
                </TouchableOpacity>
              ))}
            </View>
            <Text style={styles.result}>{result}</Text>
            <Text style={styles.score}>Score: {score}</Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingBottom: 20,
  },
  background: {
    backgroundColor: '#fefae0',
    alignItems: 'center',
    paddingVertical: 20,
  },
  box: {
    backgroundColor: '#606c38',
    width: '90%',
    maxWidth: width * 0.95,
    padding: 20,
    marginVertical: 15,
    borderRadius: 15,
    alignItems: 'center',
    elevation: 10,
  },
  boxTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
    textAlign: 'center',
  },
  boxText: {
    fontSize: 16,
    color: '#fefae0',
    marginBottom: 20,
    textAlign: 'center',
  },
  signUpButton: {
    backgroundColor: '#fefae0',
    paddingVertical: 12,
    borderRadius: 50,
    marginVertical: 10,
    width: '85%',
    alignItems: 'center',
    elevation: 6,
  },
  buttonText: {
    color: '#283618',
    fontSize: 16,
    fontWeight: 'bold',
  },
  imageContainer: {
    width: '100%',
    aspectRatio: 1, // Ensures square images
    backgroundColor: '#fefae0',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    marginBottom: 15,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  timer: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fefae0',
    marginBottom: 10,
  },
  choicesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 20,
  },
  choiceButton: {
    backgroundColor: '#fefae0',
    paddingVertical: 12,
    borderRadius: 50,
    margin: 8,
    width: '40%',
    alignItems: 'center',
    elevation: 4,
  },
  choiceText: {
    color: '#283618',
    fontSize: 16,
    fontWeight: 'bold',
  },
  result: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fefae0',
    marginBottom: 20,
  },
  score: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fefae0',
  },
});

export default ColorBlindTestGame;
