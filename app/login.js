import { router } from 'expo-router';
import { useState } from 'react';
import {
  Alert,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Card from '../components/ui/card';
import ThemedButton from '../components/ui/themed-button';
import { ThemedText } from '../components/ui/themed-text';
import { ThemedView } from '../components/ui/themed-view';
import { useAuth } from '../hooks/use-auth';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const { loading, error, login, clearError } = useAuth();

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert('Error', 'Please enter email and password');
      return;
    }

    clearError();

    try {
      await login(email.trim(), password);
      router.replace('(tabs)');
    } catch (err) {
      Alert.alert('Login Failed', err.message);
    }
  };

  return (
    <ThemedView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <ThemedText type="title">Welcome Back</ThemedText>
          <ThemedText type="default">
            Sign in to continue learning
          </ThemedText>
        </View>

        <Card style={styles.card}>
          <TextInput
            style={styles.input}
            placeholder="Email Address"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
          />

          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          <View style={styles.optionsRow}>
            <TouchableOpacity
              style={styles.rememberMe}
              onPress={() => setRememberMe(!rememberMe)}
            >
              <View style={[
                styles.checkbox,
                rememberMe && styles.checkboxChecked
              ]} />
              <ThemedText type="default" style={styles.rememberMeText}>
                Remember me
              </ThemedText>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => Alert.alert('Info', 'Reset password functionality would go here')}>
              <ThemedText type="default" style={styles.forgotPassword}>
                Forgot password?
              </ThemedText>
            </TouchableOpacity>
          </View>
        </Card>

        {error && (
          <Card style={styles.errorCard}>
            <ThemedText type="default" style={styles.errorText}>
              ⚠️ {error}
            </ThemedText>
          </Card>
        )}

        <View style={styles.buttonContainer}>
          <ThemedButton
            title="Sign In"
            onPress={handleLogin}
            loading={loading}
            disabled={!email || !password}
            style={styles.loginButton}
          />

          <ThemedButton
            title="Create New Account"
            onPress={() => router.push('register')}
            variant="outline"
            style={styles.registerButton}
          />
        </View>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  content: {
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  card: {
    marginBottom: 20,
  },
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
  optionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  rememberMe: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    marginRight: 8,
  },
  checkboxChecked: {
    backgroundColor: '#007AFF',
  },
  rememberMeText: {
    fontSize: 14,
  },
  forgotPassword: {
    fontSize: 14,
    color: '#007AFF',
  },
  errorCard: {
    backgroundColor: '#ffebee',
    borderColor: '#f44336',
    borderWidth: 1,
    marginBottom: 20,
  },
  errorText: {
    color: '#d32f2f',
  },
  buttonContainer: {
    marginBottom: 30,
  },
  loginButton: {
    marginBottom: 12,
  },
  registerButton: {
    marginBottom: 12,
  },
});
