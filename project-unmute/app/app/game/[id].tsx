import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated, Vibration } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Audio } from 'expo-av';

// ✅ Static audio imports (ensure these files exist!)
import correctSound from '../../../assets/correct.mp3';
import wrongSound from '../../../assets/wrong.mp3';

type QuizQuestion = { question: string; answer: string };
type TriviaQuestion = { question: string; options: string[]; answer: string };
type MatchPair = { food: string; benefit: string };

type Game =
  | {
    type: 'quiz';
    title: string;
    description: string;
    instructions: string;
    questions: QuizQuestion[];
  }
  | {
    type: 'trivia';
    title: string;
    description: string;
    instructions: string;
    questions: TriviaQuestion[];
  }
  | {
    type: 'match';
    title: string;
    description: string;
    instructions: string;
    pairs: MatchPair[];
  };

const games: Record<string, Game> = {
  '1': {
    title: 'Substance Abuse Quiz',
    description: 'Test your knowledge about common myths and facts.',
    instructions: 'Answer true or false for each statement below.',
    type: 'quiz',
    questions: [
      { question: 'Alcohol is not addictive.', answer: 'False' },
      { question: 'Prescription drugs can be abused.', answer: 'True' },
    ],
  },
  '2': {
    title: 'Nutrition Puzzle',
    description: 'Find which foods match which benefits.',
    instructions: 'Tap the food item and then tap the matching benefit.',
    type: 'match',
    pairs: [
      { food: 'Carrot', benefit: 'Good for vision' },
      { food: 'Spinach', benefit: 'Rich in iron' },
      { food: 'Banana', benefit: 'Boosts energy' },
    ],
  },
  '3': {
    title: 'Sleep Trivia',
    description: 'Quick questions about sleep and mental health.',
    instructions: 'Choose the correct answer from the options.',
    type: 'trivia',
    questions: [
      {
        question: 'How many hours of sleep do teens typically need?',
        options: ['4-5', '6-7', '8-10'],
        answer: '8-10',
      },
      {
        question: 'Which hormone helps regulate sleep?',
        options: ['Insulin', 'Melatonin', 'Adrenaline'],
        answer: 'Melatonin',
      },
    ],
  },
};

const GameScreen = () => {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const game = typeof id === 'string' && id in games ? games[id] : null;

  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const progressAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (game && 'questions' in game) {
      Animated.timing(progressAnim, {
        toValue: (currentQ + 1) / game.questions.length,
        duration: 400,
        useNativeDriver: false,
      }).start();
    }
  }, [currentQ]);

  // ✅ Updated playSound logic using static imports
  const playSound = async (type: 'correct' | 'wrong') => {
    const sound = new Audio.Sound();
    try {
      const selectedSound = type === 'correct' ? correctSound : wrongSound;
      console.log('Playing sound:', selectedSound);
      await sound.loadAsync(selectedSound);
      await sound.playAsync();
    } catch (error) {
      console.warn('Audio error:', error);
    }
  };

  const handleNextQuestion = () => {
    if (game && 'questions' in game && currentQ + 1 < game.questions.length) {
      setCurrentQ(prev => prev + 1);
    } else {
      setGameOver(true);
    }
  };

  const ProgressBar = () => (
    <View style={styles.progressContainer}>
      <Animated.View
        style={[
          styles.progressBar,
          {
            width: progressAnim.interpolate({
              inputRange: [0, 1],
              outputRange: ['0%', '100%'],
            }),
          },
        ]}
      />
    </View>
  );

  const handleAnswer = (selectedOption: string, correctAnswer: string) => {
    setSelected(selectedOption);
    const isCorrect = selectedOption === correctAnswer;

    if (isCorrect) {
      setScore(s => s + 1);
      setStreak(s => s + 1);
      playSound('correct');
    } else {
      setStreak(0);
      playSound('wrong');
      Vibration.vibrate(300);
    }

    setTimeout(() => {
      setSelected(null);
      handleNextQuestion();
    }, 900);
  };

  const renderQuiz = () => {
    if (!game || !('questions' in game)) return null;
    const question = game.questions[currentQ];

    return (
      <>
        <ProgressBar />
        <Text style={styles.question}>Q{currentQ + 1}: {question.question}</Text>
        {['True', 'False'].map(option => (
          <TouchableOpacity
            key={option}
            onPress={() => handleAnswer(option, question.answer)}
            style={[
              styles.optionButton,
              selected && {
                backgroundColor:
                  option === question.answer ? '#4CAF50' : option === selected ? '#f44336' : '#eee',
              },
            ]}
          >
            <Text style={styles.optionText}>{option}</Text>
          </TouchableOpacity>
        ))}
      </>
    );
  };

  const renderTrivia = () => {
    if (!game || !('questions' in game)) return null;
    const question = game.questions[currentQ];

    return (
      <>
        <ProgressBar />
        <Text style={styles.question}>Q{currentQ + 1}: {question.question}</Text>
        {'options' in question &&
          question.options.map((option, idx: number) => (
            <TouchableOpacity
              key={idx}
              onPress={() => handleAnswer(option, question.answer)}
              style={[
                styles.optionButton,
                selected && {
                  backgroundColor:
                    option === question.answer ? '#4CAF50' : option === selected ? '#f44336' : '#eee',
                },
              ]}
            >
              <Text style={styles.optionText}>{option}</Text>
            </TouchableOpacity>
          ))}
      </>
    );
  };

  const renderMatch = () => {
    if (!game || game.type !== 'match') return null;

    return (
      <View style={{ marginTop: 20 }}>
        {game.pairs.map((pair, idx: number) => (
          <View key={idx} style={styles.matchRow}>
            <Text style={styles.matchItem}>🍽️ {pair.food}</Text>
            <Text style={styles.matchArrow}>➡️</Text>
            <Text style={styles.matchItem}>{pair.benefit}</Text>
          </View>
        ))}
        <Text style={styles.italicNote}>(Interactive version coming soon!)</Text>
      </View>
    );
  };

  if (!game) {
    return (
      <View style={styles.centered}>
        <Text>Game not found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
        <MaterialCommunityIcons name="arrow-left" size={24} color="#6200ee" />
        <Text style={styles.backText}>Back</Text>
      </TouchableOpacity>

      <Text style={styles.title}>{game.title}</Text>
      <Text style={styles.description}>{game.description}</Text>
      <Text style={styles.instructions}>{game.instructions}</Text>

      {game.type === 'quiz' && !gameOver && renderQuiz()}
      {game.type === 'trivia' && !gameOver && renderTrivia()}
      {game.type === 'match' && renderMatch()}

      {gameOver && (
        <View style={styles.centered}>
          <Text style={styles.title}>🎉 Game Over!</Text>
          <Text style={styles.result}>Your Score: {score}</Text>
          <Text style={styles.result}>Streak: {streak}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  backButton: { flexDirection: 'row', alignItems: 'center', marginBottom: 15 },
  backText: { marginLeft: 8, color: '#6200ee', fontWeight: 'bold' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  description: { fontSize: 16, marginBottom: 10 },
  instructions: { fontSize: 16, fontStyle: 'italic', marginBottom: 20 },
  question: { fontSize: 18, fontWeight: '600', marginBottom: 10 },
  optionButton: {
    padding: 12,
    backgroundColor: '#eee',
    borderRadius: 8,
    marginVertical: 6,
  },
  optionText: { fontSize: 16 },
  progressContainer: {
    height: 10,
    backgroundColor: '#eee',
    borderRadius: 5,
    overflow: 'hidden',
    marginBottom: 15,
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#6200ee',
  },
  matchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  matchItem: {
    fontSize: 16,
    padding: 8,
    backgroundColor: '#f2f2f2',
    borderRadius: 6,
  },
  matchArrow: {
    marginHorizontal: 10,
    fontSize: 20,
    color: '#888',
  },
  italicNote: { marginTop: 20, fontStyle: 'italic', color: 'green' },
  result: { fontSize: 18, marginTop: 10, fontWeight: '500' },
});

export default GameScreen;
