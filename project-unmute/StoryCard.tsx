import React from 'react';
import { Card, Text } from 'react-native-paper';

type StoryCardProps = {
  title: string;
  description: string;
};

export default function StoryCard({ title, description }: StoryCardProps) {
  return (
    <Card style={{ marginBottom: 16 }}>
      <Card.Title title={title} />
      <Card.Content>
        <Text>{description}</Text>
      </Card.Content>
    </Card>
  );
}
