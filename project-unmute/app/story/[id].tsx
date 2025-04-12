import React from 'react';
import { View, ScrollView, Text, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

const stories = {
  '1': {
    title: 'Understanding Your Period',
    description: 'Periods are a natural part of growing up. Learn what’s normal, what’s not, and how to track your cycle confidently.',
    image: 'https://images.unsplash.com/photo-1614691962544-f5dc02af128d?auto=format&fit=crop&w=800&q=80',

    funFact: 'Did you know? The average cycle is about 28 days, but it can vary for everyone!',
  },
  '2': {
    title: 'Nutrition 101',
    description: 'What you eat really affects your mood. Choosing whole foods and drinking water can improve your overall well-being.',
    image: 'https://images.unsplash.com/photo-1506806732259-39c2d0268443',
    funFact: 'Carrots were originally purple, not orange!',
  },
  '3': {
    title: 'Sleep and Mental Health',
    description: 'Your brain processes emotions during sleep. Without enough rest, stress can hit harder.',
    image: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4',
    funFact: 'Teens need 8-10 hours of sleep each night for optimal brain health.',
  },
  'sexualhealth': {
    title: 'Understanding Consent',
    description: 'Consent is about mutual agreement. It must be freely given, reversible, informed, enthusiastic, and specific.',
    image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=800&q=80',
    funFact: '“No” can be said at any time, and that must be respected — always.',
  },
  'mentalhealth': {
    title: 'Dealing with Stress',
    description: 'Everyone experiences stress, but learning healthy coping skills can make a big difference.',
    image: 'https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb',
    funFact: 'Laughter can reduce stress hormones like cortisol.',
  },
};

export default function StoryDetail() {
  const { id } = useLocalSearchParams();
  const story = stories[id as keyof typeof stories];

  if (!story) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>Story not found.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: story.image }} style={styles.image} />
      <Text style={styles.title}>{story.title}</Text>
      <Text style={styles.description}>{story.description}</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => Alert.alert('Fun Fact', story.funFact)}
      >
        <Text style={styles.buttonText}>Show Fun Fact</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: '#ff9800' }]}
        onPress={() =>
          Alert.alert('Reflection', 'How does this topic relate to your daily life?')
        }
      >
        <Text style={styles.buttonText}>Reflect</Text>
      </TouchableOpacity>
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
    height: 200,
    borderRadius: 12,
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    marginBottom: 16,
    color: '#555',
  },
  button: {
    backgroundColor: '#6200ee',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 18,
    color: 'red',
  },
});
