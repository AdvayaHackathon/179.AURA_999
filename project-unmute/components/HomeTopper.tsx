// components/HomeTopper.tsx
import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

export default function HomeTopper() {
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: 'https://img.freepik.com/free-vector/hand-drawn-mental-health-illustration_52683-87345.jpg' }}
        style={styles.image}
      />
      <Text style={styles.title}>Welcome to Project UNMUTE</Text>
      <Text style={styles.subtitle}>
        Explore stories, games, and memes to boost your health knowledge 💡
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 12,
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 12,
    elevation: 3,
  },
  image: {
    width: '100%',
    height: 150,
    borderRadius: 10,
    marginBottom: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#6200ee',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#555',
    textAlign: 'center',
  },
});
