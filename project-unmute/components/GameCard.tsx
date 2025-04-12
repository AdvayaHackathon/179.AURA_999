import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export type GameCardProps = {
  title: string;
  description: string;
  icon: string;
  onPress?: () => void; // ✅ Add this line
};

const GameCard = ({ title, description, icon, onPress }: GameCardProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        backgroundColor: '#ffffff',
        padding: 16,
        marginBottom: 12,
        borderRadius: 12,
        elevation: 3,
        flexDirection: 'row',
        alignItems: 'center',
      }}
    >
      <MaterialCommunityIcons name={icon} size={32} color="#6200ee" style={{ marginRight: 16 }} />
      <View style={{ flex: 1 }}>
        <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 4 }}>{title}</Text>
        <Text style={{ fontSize: 14, color: '#555' }}>{description}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default GameCard;
