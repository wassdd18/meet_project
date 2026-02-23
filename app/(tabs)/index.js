import { router } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import ThemedButton from '../../components/ui/themed-button';
import { ThemedText } from '../../components/ui/themed-text';
import { ThemedView } from '../../components/ui/themed-view';
import { useAuth } from '../../hooks/use-auth';

export default function HomeScreen() {
  const { user } = useAuth();

  return (
    <ThemedView style={styles.container}>
      <View style={styles.content}>
        <ThemedText type="title">Educational App</ThemedText>

        {user ? (
          <ThemedText type="default" style={styles.subtitle}>
            You are signed in as {user.email}
          </ThemedText>
        ) : (
          <ThemedText type="default" style={styles.subtitle}>
            You are not signed in
          </ThemedText>
        )}

        <View style={styles.buttons}>
          <ThemedButton
            title="Explore (Translate / Explain)"
            onPress={() => router.push('/(tabs)/explore')}
            style={styles.button}
          />

          <ThemedButton
            title="Chat (Communication)"
            onPress={() => router.push('/(tabs)/chat')}
            variant="outline"
            style={styles.button}
          />

          <ThemedButton
            title="Profile"
            onPress={() => router.push('/(tabs)/profile')}
            variant="secondary"
            style={styles.button}
          />
        </View>

        {!user ? (
          <View style={styles.authRow}>
            <ThemedButton
              title="Login"
              onPress={() => router.replace('/login')}
              style={styles.smallButton}
            />
            <ThemedButton
              title="Register"
              onPress={() => router.replace('/register')}
              variant="outline"
              style={styles.smallButton}
            />
          </View>
        ) : null}
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  content: { width: '100%', maxWidth: 420, alignItems: 'center' },
  subtitle: { marginTop: 10, textAlign: 'center' },
  buttons: { width: '100%', marginTop: 24 },
  button: { marginTop: 12, width: '100%' },
  authRow: { flexDirection: 'row', gap: 12, marginTop: 20, width: '100%' },
  smallButton: { flex: 1 },
});
