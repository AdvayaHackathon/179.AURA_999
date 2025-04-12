import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, ScrollView, Modal, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const FloatingChat = () => {
  const [visible, setVisible] = useState(false);
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState('');

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = input.trim();
    setMessages((prev) => [...prev, `🧑: ${userMessage}`]);
    setInput('');

    try {
      const res = await fetch('http://192.168.142.14:5000/api/chat', {


        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage }),
      });

      const data = await res.json();
      const botReply = data.reply || 'Sorry, something went wrong.';
      setMessages((prev) => [...prev, `🤖: ${botReply}`]);
    } catch (err) {
      setMessages((prev) => [...prev, `🤖: Failed to fetch response.`]);
    }
  };

  return (
    <>
      <TouchableOpacity style={styles.fab} onPress={() => setVisible(true)}>
        <MaterialCommunityIcons name="robot" size={24} color="#fff" />
      </TouchableOpacity>

      <Modal visible={visible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.chatBox}>
            <ScrollView style={{ flex: 1 }}>
              {messages.map((msg, i) => (
                <Text key={i} style={{ marginVertical: 4 }}>{msg}</Text>
              ))}
            </ScrollView>
            <View style={styles.inputRow}>
              <TextInput
                value={input}
                onChangeText={setInput}
                placeholder="Ask something..."
                style={styles.input}
              />
              <TouchableOpacity onPress={sendMessage}>
                <MaterialCommunityIcons name="send" size={24} color="#6200ee" />
              </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={() => setVisible(false)} style={styles.closeBtn}>
              <Text style={{ color: '#6200ee', fontWeight: 'bold' }}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default FloatingChat;

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#6200ee',
    borderRadius: 30,
    padding: 14,
    elevation: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  chatBox: {
    height: '50%',
    backgroundColor: '#fff',
    padding: 12,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  input: {
    flex: 1,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    marginRight: 8,
    paddingVertical: 6,
  },
  closeBtn: {
    alignSelf: 'center',
    marginTop: 10,
  },
});
