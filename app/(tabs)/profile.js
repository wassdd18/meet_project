import { router } from 'expo-router';
import { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import Card from '../../components/ui/card';
import ThemedButton from '../../components/ui/themed-button';
import { ThemedText } from '../../components/ui/themed-text';
import { ThemedView } from '../../components/ui/themed-view';
import { useAuth } from '../../hooks/use-auth';

export default function ProfileScreen() {
  const { user, logout } = useAuth();

  const profile = useMemo(() => {
    const country = user?.country ?? user?.prefs?.country ?? '';
    const language = user?.language ?? user?.prefs?.language ?? '';
    return { country, language };
  }, [user]);

  if (!user) {
    return (
      <ThemedView style={styles.container}>
        <View style={styles.content}>
          <ThemedText type="title">Profile</ThemedText>
          <ThemedText type="default" style={{ marginTop: 10 }}>
            You are not signed in.
          </ThemedText>

          <View style={{ marginTop: 20, width: '100%' }}>
            <ThemedButton title="Login" onPress={() => router.replace('/login')} style={styles.button} />
            <ThemedButton title="Register" onPress={() => router.replace('/register')} variant="outline" style={styles.button} />
          </View>
        </View>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <View style={styles.content}>
        <ThemedText type="title">Profile</ThemedText>

        <Card style={styles.card}>
          <ThemedText type="subtitle">User</ThemedText>
          <ThemedText type="default">Name: {user.name || '-'}</ThemedText>
          <ThemedText type="default">Email: {user.email || '-'}</ThemedText>
          <ThemedText type="default">Language: {profile.language || '-'}</ThemedText>
          <ThemedText type="default">Country: {profile.country || '-'}</ThemedText>
        </Card>

        <ThemedButton
          title="Logout"
          onPress={() => logout()}
          variant="secondary"
          style={styles.button}
        />
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  content: { width: '100%', maxWidth: 420 },
  card: { marginTop: 20, marginBottom: 16 },
  button: { marginTop: 12, width: '100%' },
});
