import { useMemo, useState } from 'react';
import { Alert, ScrollView, StyleSheet, TextInput, View } from 'react-native';
import Card from '../../components/ui/card';
import ThemedButton from '../../components/ui/themed-button';
import { ThemedText } from '../../components/ui/themed-text';
import { ThemedView } from '../../components/ui/themed-view';
import { useAuth } from '../../hooks/use-auth';

export default function ChatScreen() {
  const { user } = useAuth();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  const canChat = useMemo(() => !!user, [user]);

  const send = () => {
    const m = message.trim();
    if (!m) {
      Alert.alert('Error', 'Type a message');
      return;
    }
    setMessages((prev) => [{ id: String(Date.now()), role: 'user', text: m }, ...prev]);
    setMessage('');
  };

  return (
    <ThemedView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <ThemedText type="title">Chat</ThemedText>
        <ThemedText type="default" style={{ marginBottom: 12 }}>
          {canChat ? 'Send messages here.' : 'Please sign in to use chat.'}
        </ThemedText>

        <Card style={styles.card}>
          <TextInput
            style={styles.input}
            placeholder={canChat ? 'Type your message...' : 'Login required'}
            value={message}
            onChangeText={setMessage}
            editable={canChat}
            multiline
          />

          <ThemedButton
            title="Send"
            onPress={send}
            disabled={!canChat || !message.trim()}
          />
        </Card>

        <View style={{ marginTop: 12 }}>
          {messages.map((m) => (
            <Card key={m.id} style={styles.msgCard}>
              <ThemedText type="subtitle">{m.role}</ThemedText>
              <ThemedText type="default">{m.text}</ThemedText>
            </Card>
          ))}
        </View>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContent: { padding: 20 },
  card: { marginTop: 10 },
  input: {
    height: 100,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingTop: 12,
    fontSize: 16,
    backgroundColor: '#fff',
    marginBottom: 12,
    textAlignVertical: 'top',
  },
  msgCard: { marginTop: 10 },
});
