import React, { useEffect, useState } from 'react';
import { Alert, ScrollView, StyleSheet, TextInput, View } from 'react-native';
import Card from '../../components/ui/card';
import ThemedButton from '../../components/ui/themed-button';
import { ThemedText } from '../../components/ui/themed-text';
import { ThemedView } from '../../components/ui/themed-view';
import {
  detectLanguage,
  explainConcept,
  getAvailableLanguages,
  translateText
} from '../../hooks/use-gptoss';

export default function ExploreScreen() {
  const [textToTranslate, setTextToTranslate] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [concept, setConcept] = useState('');
  const [explanation, setExplanation] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState({ code: 'AR', name: 'Arabic', nativeName: 'العربية' });
  const [detectedLanguage, setDetectedLanguage] = useState('');
  const [loading, setLoading] = useState(false);

  const languages = getAvailableLanguages();

  useEffect(() => {
    if (textToTranslate.trim() && textToTranslate.length > 3) {
      detectTextLanguage();
    }
  }, [textToTranslate]);

  const detectTextLanguage = async () => {
    try {
      const lang = await detectLanguage(textToTranslate);
      setDetectedLanguage(lang);
    } catch (error) {
      console.error('Language detection failed:', error);
    }
  };

  const handleTranslate = async () => {
    if (!textToTranslate.trim()) {
      Alert.alert('Error', 'Please enter text to translate');
      return;
    }

    setLoading(true);
    try {
      const result = await translateText(textToTranslate, 'English', selectedLanguage.code);
      setTranslatedText(result);
    } catch (error) {
      Alert.alert('Translation Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleExplain = async () => {
    if (!concept.trim()) {
      Alert.alert('Error', 'Please enter a concept to explain');
      return;
    }

    setLoading(true);
    try {
      const result = await explainConcept(concept, selectedLanguage.code, 'simple');
      setExplanation(result);
    } catch (error) {
      Alert.alert('Explanation Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ThemedView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <ThemedText type="title">Explore & Learn</ThemedText>
        <ThemedText type="default">
          Translate text and learn concepts in multiple languages including English, Arabic and Hebrew
        </ThemedText>
        <Card style={styles.card}>
          <ThemedText type="subtitle">Select Language</ThemedText>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.languageContainer}>
              {languages.map(lang => (
                <ThemedButton
                  key={lang.code}
                  title={lang.nativeName}
                  onPress={() => setSelectedLanguage(lang)}
                  variant={selectedLanguage.code === lang.code ? 'primary' : 'outline'}
                  size="small"
                  style={styles.languageButton}
                />
              ))}
            </View>
          </ScrollView>
          <ThemedText type="default" style={styles.selectedLanguage}>
            Selected: {selectedLanguage.name} ({selectedLanguage.nativeName})
          </ThemedText>
        </Card>
        <Card style={styles.card}>
          <ThemedText type="subtitle">Translation</ThemedText>
          {detectedLanguage && (
            <ThemedText type="default" style={styles.detectedLanguage}>
              Detected language: {detectedLanguage}
            </ThemedText>
          )}
          <TextInput
            style={styles.input}
            placeholder="Enter text in any language"
            value={textToTranslate}
            onChangeText={setTextToTranslate}
            multiline
          />
          
          <ThemedButton
            title={`Translate to ${selectedLanguage.name}`}
            onPress={handleTranslate}
            loading={loading}
            disabled={!textToTranslate}
            style={styles.button}
          />
          
          {translatedText ? (
            <View style={[
              styles.resultContainer,
              selectedLanguage.code === 'AR' || selectedLanguage.code === 'HE' ? styles.rtlText : {}
            ]}>
              <ThemedText type="default" style={styles.resultLabel}>
                Translation ({selectedLanguage.name}):
              </ThemedText>
              <ThemedText type="default" style={[
                styles.resultText,
                selectedLanguage.code === 'AR' || selectedLanguage.code === 'HE' ? styles.rtlText : {}
              ]}>
                {translatedText}
              </ThemedText>
            </View>
          ) : null}
        </Card>
        <Card style={styles.card}>
          <ThemedText type="subtitle">Concept Explanation</ThemedText>
          <TextInput
            style={styles.input}
            placeholder="Enter a concept (e.g., 'Quantum Physics', 'Photosynthesis')"
            value={concept}
            onChangeText={setConcept}
          />
          
          <ThemedButton
            title={`Explain in ${selectedLanguage.name}`}
            onPress={handleExplain}
            loading={loading}
            disabled={!concept}
            style={styles.button}
          />
          
          {explanation ? (
            <View style={[
              styles.resultContainer,
              selectedLanguage.code === 'AR' || selectedLanguage.code === 'HE' ? styles.rtlText : {}
            ]}>
              <ThemedText type="default" style={styles.resultLabel}>
                Explanation in {selectedLanguage.name}:
              </ThemedText>
              <ThemedText type="default" style={[
                styles.resultText,
                selectedLanguage.code === 'AR' || selectedLanguage.code === 'HE' ? styles.rtlText : {}
              ]}>
                {explanation}
              </ThemedText>
            </View>
          ) : null}
        </Card>
        <Card style={styles.card}>
          <ThemedText type="subtitle">Language Support</ThemedText>
          <ThemedText type="default">
            This app supports multiple languages with special focus on:
          </ThemedText>
          <ThemedText type="default" style={styles.featureText}>
            • English: International language of education and technology
          </ThemedText>
          <ThemedText type="default" style={styles.featureText}>
            • Arabic (العربية): Right-to-left language with rich cultural heritage
          </ThemedText>
          <ThemedText type="default" style={styles.featureText}>
            • Hebrew (עברית): Ancient language revived as modern spoken language
          </ThemedText>
          <ThemedText type="default" style={styles.noteText}>
            Note: For Arabic and Hebrew, text will be displayed in right-to-left format
          </ThemedText>
        </Card>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
  },
  card: {
    marginBottom: 20,
  },
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
  languageContainer: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  languageButton: {
    marginRight: 8,
  },
  selectedLanguage: {
    marginTop: 8,
    fontWeight: '600',
    fontSize: 16,
  },
  detectedLanguage: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
    fontStyle: 'italic',
  },
  button: {
    marginTop: 12,
  },
  resultContainer: {
    marginTop: 20,
    padding: 12,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#dee2e6',
  },
  resultLabel: {
    fontWeight: '600',
    marginBottom: 8,
    fontSize: 16,
  },
  resultText: {
    lineHeight: 24,
    fontSize: 16,
  },
  rtlText: {
    textAlign: 'right',
    writingDirection: 'rtl',
  },
  featureText: {
    marginTop: 8,
    fontSize: 14,
  },
  noteText: {
    marginTop: 12,
    fontSize: 12,
    color: '#666',
    fontStyle: 'italic',
  },
});