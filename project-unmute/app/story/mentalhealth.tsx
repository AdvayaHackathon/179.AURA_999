import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';

export default function MentalHealthStory() {
  const [mood, setMood] = useState<string | null>(null);
  const [responses, setResponses] = useState<{ [key: number]: string }>({});

  const handleMoodPress = (selectedMood: string) => {
    setMood(selectedMood);

    let message = '';
    switch (selectedMood) {
      case '😊':
        message = 'Glad to hear that! Keep doing what works for you.';
        break;
      case '😐':
        message = 'It’s okay to feel “meh.” Maybe try a deep breath or a quick walk!';
        break;
      case '😔':
        message = 'It’s totally valid to feel down. Talk to someone you trust, okay?';
        break;
    }

    Alert.alert('Mood Check', message);
  };

  const handleResponse = (questionId: number, answer: string) => {
    setResponses((prev) => ({ ...prev, [questionId]: answer }));
    const messages = [
      'Deep breaths are powerful! Easy to do, anytime.',
      'Music is such a great mood booster.',
      'Awesome! Writing helps process emotions.',
      'Talking to someone can lighten the load. Keep it up!',
      'Nice! Breaks help you reset and come back stronger.',
    ];
    Alert.alert('Thanks for sharing!', messages[questionId]);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image
        source={{ uri: 'https://images.unsplash.com/photo-1588776814546-ec7e937f6b0e' }}
        style={styles.image}
      />
      <Text style={styles.title}>Dealing with Stress</Text>

      <Text style={styles.text}>
        Everyone feels stressed sometimes — exams, family stuff, friendships — it can build up fast.
        But there are healthy ways to manage it. Simple things like deep breathing, listening to music,
        talking to a friend, or even just taking a break can really help.
      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          Alert.alert('Fun Fact', 'Laughter can reduce stress hormones like cortisol!')
        }
      >
        <Text style={styles.buttonText}>Show Fun Fact</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: '#ff9800' }]}
        onPress={() =>
          Alert.alert('Reflection', 'What’s something that helps *you* feel calmer during tough times?')
        }
      >
        <Text style={styles.buttonText}>Reflect</Text>
      </TouchableOpacity>

      <Text style={styles.moodPrompt}>How are you feeling right now?</Text>
      <View style={styles.emojiRow}>
        <TouchableOpacity onPress={() => handleMoodPress('😊')}>
          <Text style={styles.emoji}>😊</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleMoodPress('😐')}>
          <Text style={styles.emoji}>😐</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleMoodPress('😔')}>
          <Text style={styles.emoji}>😔</Text>
        </TouchableOpacity>
      </View>

      {/* Interactive Questions */}
      <Text style={styles.question}>1. Have you ever tried deep breathing during stress?</Text>
      <View style={styles.optionRow}>
        <TouchableOpacity onPress={() => handleResponse(0, 'yes')} style={styles.optionButton}>
          <Text style={styles.optionText}>Yes</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleResponse(0, 'no')} style={styles.optionButton}>
          <Text style={styles.optionText}>Not yet</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.question}>2. Do you listen to music to feel better?</Text>
      <View style={styles.optionRow}>
        <TouchableOpacity onPress={() => handleResponse(1, 'yes')} style={styles.optionButton}>
          <Text style={styles.optionText}>Yes</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleResponse(1, 'no')} style={styles.optionButton}>
          <Text style={styles.optionText}>Not really</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.question}>3. Have you ever written down your thoughts when feeling low?</Text>
      <View style={styles.optionRow}>
        <TouchableOpacity onPress={() => handleResponse(2, 'yes')} style={styles.optionButton}>
          <Text style={styles.optionText}>Yes</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleResponse(2, 'no')} style={styles.optionButton}>
          <Text style={styles.optionText}>Not really</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.question}>4. Do you talk to someone when you’re feeling overwhelmed?</Text>
      <View style={styles.optionRow}>
        <TouchableOpacity onPress={() => handleResponse(3, 'yes')} style={styles.optionButton}>
          <Text style={styles.optionText}>Yes</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleResponse(3, 'no')} style={styles.optionButton}>
          <Text style={styles.optionText}>Not yet</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.question}>5. Have you tried taking a break when things get too much?</Text>
      <View style={styles.optionRow}>
        <TouchableOpacity onPress={() => handleResponse(4, 'yes')} style={styles.optionButton}>
          <Text style={styles.optionText}>Yes</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleResponse(4, 'no')} style={styles.optionButton}>
          <Text style={styles.optionText}>Not really</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: 220,
    borderRadius: 12,
    marginBottom: 16,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    marginBottom: 10,
    color: '#333',
  },
  text: {
    fontSize: 16,
    color: '#555',
    marginBottom: 20,
    lineHeight: 22,
  },
  button: {
    backgroundColor: '#6200ee',
    padding: 12,
    borderRadius: 8,
    marginBottom: 14,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  moodPrompt: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 20,
    marginBottom: 10,
    color: '#333',
  },
  emojiRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
  },
  emoji: {
    fontSize: 34,
  },
  question: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 20,
    marginBottom: 10,
    color: '#333',
  },
  optionRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
  },
  optionButton: {
    backgroundColor: '#e0e0e0',
    padding: 10,
    borderRadius: 6,
    width: '45%',
    alignItems: 'center',
  },
  optionText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
});
