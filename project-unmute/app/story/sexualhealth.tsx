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

export default function SexualHealthStory() {
  const [responses, setResponses] = useState<{ [key: number]: string }>({});

  const handleResponse = (questionId: number, answer: string) => {
    setResponses((prev) => ({ ...prev, [questionId]: answer }));
    const messages = [
      'Awesome! Respecting consent is key in all relationships.',
      'That’s okay! Talking about it can be a powerful way to learn.',
      'Correct! Consent can be withdrawn at any time.',
      'Yes! Everyone has the right to change their mind.',
      'Great job! Communication is essential in healthy relationships.',
    ];
    Alert.alert('Thanks for your answer!', messages[questionId]);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image
        source={{ uri: 'https://images.unsplash.com/photo-1590080876099-1f9ed4f6f234' }}
        style={styles.image}
      />
      <Text style={styles.title}>Understanding Consent</Text>

      <Text style={styles.text}>
        Consent isn’t just a one-time “yes” or “no.” It should be clear, enthusiastic,
        and ongoing. Everyone deserves to feel safe and respected in any kind of
        relationship — physical or emotional.
      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          Alert.alert('Fun Fact', '“No” can be said at any time — and it must always be respected.')
        }
      >
        <Text style={styles.buttonText}>Show Fun Fact</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: '#ff9800' }]}
        onPress={() =>
          Alert.alert('Reflection', 'Why do you think consent is important in relationships?')
        }
      >
        <Text style={styles.buttonText}>Reflect</Text>
      </TouchableOpacity>

      {/* Questions */}
      <View style={{ marginTop: 30 }}>
        <Text style={styles.question}>1. Have you ever talked about consent with a friend?</Text>
        <View style={styles.optionRow}>
          <TouchableOpacity onPress={() => handleResponse(0, 'yes')} style={styles.optionButton}>
            <Text style={styles.optionText}>Yes</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleResponse(0, 'no')} style={styles.optionButton}>
            <Text style={styles.optionText}>Not yet</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.question}>2. Can someone take back their consent after saying “yes”?</Text>
        <View style={styles.optionRow}>
          <TouchableOpacity onPress={() => handleResponse(1, 'yes')} style={styles.optionButton}>
            <Text style={styles.optionText}>Yes</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleResponse(1, 'no')} style={styles.optionButton}>
            <Text style={styles.optionText}>No</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.question}>3. Do you think “silence” means consent?</Text>
        <View style={styles.optionRow}>
          <TouchableOpacity onPress={() => handleResponse(2, 'no')} style={styles.optionButton}>
            <Text style={styles.optionText}>No</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleResponse(2, 'yes')} style={styles.optionButton}>
            <Text style={styles.optionText}>Yes</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.question}>4. Is it okay to change your mind during intimacy?</Text>
        <View style={styles.optionRow}>
          <TouchableOpacity onPress={() => handleResponse(3, 'yes')} style={styles.optionButton}>
            <Text style={styles.optionText}>Yes</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleResponse(3, 'no')} style={styles.optionButton}>
            <Text style={styles.optionText}>No</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.question}>5. What’s the best way to know if someone’s into it?</Text>
        <View style={styles.optionRow}>
          <TouchableOpacity onPress={() => handleResponse(4, 'ask')} style={styles.optionButton}>
            <Text style={styles.optionText}>Ask Them</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleResponse(4, 'guess')} style={styles.optionButton}>
            <Text style={styles.optionText}>Guess Based on Behavior</Text>
          </TouchableOpacity>
        </View>
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
