import { router } from 'expo-router';
import { useMemo, useState } from 'react';
import { Alert, ScrollView, StyleSheet, TextInput, View } from 'react-native';
import Card from '../components/ui/card';
import ThemedButton from '../components/ui/themed-button';
import { ThemedText } from '../components/ui/themed-text';
import { ThemedView } from '../components/ui/themed-view';
import { useAuth } from '../hooks/use-auth';
import { getSupportedLanguages } from '../hooks/use-gptoss';

const isValidEmail = (email) => {
  const v = String(email || '').trim();
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i.test(v);
};

const passwordHasMinLetters = (password, minLetters = 3) => {
  const letters = (String(password || '').match(/[A-Za-z]/g) || []).length;
  return letters >= minLetters;
};

export default function RegisterScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [country, setCountry] = useState('');
  const [language, setLanguage] = useState('English');

  const { loading, error, register, clearError } = useAuth();

  const languages = useMemo(() => {
    try {
      const list = getSupportedLanguages();
      return Array.isArray(list) && list.length ? list : ['English', 'Arabic', 'Hebrew', 'Russian'];
    } catch {
      return ['English', 'Arabic', 'Hebrew', 'Russian'];
    }
  }, []);

  const handleRegister = async () => {
    const n = name.trim();
    const e = email.trim();

    if (!n || !e || !password) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    if (!isValidEmail(e)) {
      Alert.alert('Error', 'Please enter a valid email address');
      return;
    }

    if (password.length < 8) {
      Alert.alert('Error', 'Password must be at least 8 characters');
      return;
    }

    if (!passwordHasMinLetters(password, 3)) {
      Alert.alert('Error', 'Password must contain at least 3 letters (A-Z)');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    clearError();

    try {
      await register(e, password, n, country, language);
      Alert.alert('Success', 'Account created! Please sign in.', [
        { text: 'OK', onPress: () => router.replace('login') },
      ]);
    } catch (err) {
      Alert.alert('Registration Failed', err.message);
    }
  };

  return (
    <ThemedView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <ThemedText type="title">Create Account</ThemedText>
          <ThemedText type="default">
            Join our educational platform
          </ThemedText>
        </View>

        <Card style={styles.card}>
          <ThemedText type="subtitle">Personal Information</ThemedText>

          <TextInput
            style={styles.input}
            placeholder="Full Name *"
            value={name}
            onChangeText={setName}
            autoCapitalize="words"
          />

          <TextInput
            style={styles.input}
            placeholder="Email Address *"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
          />

          <TextInput
            style={styles.input}
            placeholder="Country (Optional)"
            value={country}
            onChangeText={setCountry}
          />

          <View style={styles.languageSection}>
            <ThemedText type="default" style={styles.label}>
              Preferred Language:
            </ThemedText>

            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={styles.languageContainer}>
                {languages.map(lang => (
                  <ThemedButton
                    key={lang}
                    title={lang}
                    onPress={() => setLanguage(lang)}
                    variant={language === lang ? 'primary' : 'outline'}
                    size="small"
                    style={styles.languageButton}
                  />
                ))}
              </View>
            </ScrollView>
          </View>
        </Card>

        <Card style={styles.card}>
          <ThemedText type="subtitle">Security</ThemedText>

          <TextInput
            style={styles.input}
            placeholder="Password *"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          <TextInput
            style={styles.input}
            placeholder="Confirm Password *"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
          />

          <ThemedText type="default" style={styles.passwordHint}>
            Password must be at least 8 characters and contain at least 3 letters (A-Z)
          </ThemedText>
        </Card>

        {error ? (
          <Card style={styles.errorCard}>
            <ThemedText type="default" style={styles.errorText}>
              ⚠️ {error}
            </ThemedText>
          </Card>
        ) : null}

        <View style={styles.buttonContainer}>
          <ThemedButton
            title="Create Account"
            onPress={handleRegister}
            loading={loading}
            disabled={!name || !email || !password || !confirmPassword}
            style={styles.registerButton}
          />

          <ThemedButton
            title="Already have an account? Sign In"
            onPress={() => router.replace('login')}
            variant="outline"
            style={styles.loginButton}
          />
        </View>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContent: { padding: 20 },
  header: { alignItems: 'center', marginBottom: 30, paddingVertical: 20 },
  card: { marginBottom: 20 },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 16,
    backgroundColor: '#fff',
    marginBottom: 12,
  },
  languageSection: { marginTop: 8 },
  label: { marginBottom: 8, fontSize: 16 },
  languageContainer: { flexDirection: 'row', marginBottom: 12 },
  languageButton: { marginRight: 8 },
  passwordHint: { fontSize: 12, color: '#666', marginTop: 8, fontStyle: 'italic' },
  errorCard: {
    backgroundColor: '#ffebee',
    borderColor: '#f44336',
    borderWidth: 1,
    marginBottom: 20,
  },
  errorText: { color: '#d32f2f' },
  buttonContainer: { marginBottom: 20 },
  registerButton: { marginBottom: 12 },
  loginButton: { marginBottom: 12 },
});
