import axios from 'axios';

const HF_TOKEN = "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";
const BASE_URL = "https://router.huggingface.co/v1";
const hfClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Authorization': `Bearer ${HF_TOKEN}`,
    'Content-Type': 'application/json',
  },
});

// Поддерживаемые языки
const SUPPORTED_LANGUAGES = {
  'English': 'English',
  'Spanish': 'Spanish',
  'French': 'French', 
  'German': 'German',
  'Russian': 'Russian',
  'Chinese': 'Chinese',
  'Arabic': 'Arabic',
  'Hebrew': 'Hebrew',
  'עברית': 'Hebrew',
  'العربية': 'Arabic'
};

// translator
export async function translateText(text, fromLang = "English", toLang = "Spanish") {
  try {
    console.log(`Translating: ${text} (${fromLang} → ${toLang})`);
    
    const response = await hfClient.post('/chat/completions', {
      model: "openai/gpt-oss-20b",
      messages: [
        {
          role: "user",
          content: `Translate this from ${fromLang} to ${toLang}: "${text}"`
        }
      ],
      max_tokens: 300,
      temperature: 0.3,
    });
    
    const result = response.data.choices[0]?.message?.content || text;
    console.log(`Translation result: ${result}`);
    return result;
  } catch (error) {
    console.error("Translation Error:", error.message);
    return text; 
  }
}

// explanation
export async function explainConcept(concept, language = "English", level = "simple") {
  try {
    console.log(`Explaining concept: ${concept} in ${language}`);
    
    const prompt = level === "simple" 
      ? `Explain ${concept} in simple terms for students in ${language}.`
      : `Provide a detailed explanation of ${concept} in ${language}.`;
    
    const response = await hfClient.post('/chat/completions', {
      model: "openai/gpt-oss-20b",
      messages: [
        {
          role: "user",
          content: prompt
        }
      ],
      max_tokens: 500,
      temperature: 0.7,
    });
    
    const result = response.data.choices[0]?.message?.content || `Cannot explain ${concept}`;
    console.log(`Explanation result (length): ${result.length} characters`);
    return result;
  } catch (error) {
    console.error("Explanation Error:", error.message);
    return `Error explaining ${concept}. Please try again.`;
  }
}

export async function testConnection() {
  try {
    const response = await hfClient.post('/chat/completions', {
      model: "openai/gpt-oss-20b",
      messages: [{ role: "user", content: "Say 'hello' if you're working." }],
      max_tokens: 10,
    });
    
    const result = response.data.choices[0]?.message?.content || "";
    return result.toLowerCase().includes("hello");
  } catch (error) {
    console.error("Connection test failed:", error);
    return false;
  }
}

// Вспомогательные функции для работы с языками
export function getSupportedLanguages() {
  return Object.keys(SUPPORTED_LANGUAGES);
}

export function isLanguageSupported(language) {
  return SUPPORTED_LANGUAGES.hasOwnProperty(language);
}