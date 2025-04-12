// components/MemeCard.tsx
import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';

const MemeCard = ({ image, caption }: { image: string; caption: string }) => {
  return (
    <View style={styles.card}>
      <Image source={{ uri: image }} style={styles.image} resizeMode="cover" />
      <Text style={styles.caption}>{caption}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: 20,
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 3, // Android shadow
    shadowColor: '#000', // iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  image: {
    width: '100%',
    height: 200,
  },
  caption: {
    padding: 12,
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
});

export default MemeCard;
