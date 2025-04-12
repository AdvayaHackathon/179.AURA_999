import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

type StoryCardProps = {
  title: string;
  description: string;
  image: string;
  onPress?: () => void;
};

export default function StoryCard({ title, description, image, onPress }: StoryCardProps) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image source={{ uri: image }} style={styles.image} />

      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    elevation: 2,
  },
  image: {
    width: '100%',
    height: 160,
    borderRadius: 10,
    marginBottom: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
  },
  description: {
    marginTop: 4,
    color: '#555',
  },
});
