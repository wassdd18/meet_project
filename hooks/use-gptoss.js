import axios from 'axios';

const HF_TOKEN = "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";
const BASE_URL = "https://router.huggingface.co/v1";

const hfClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${HF_TOKEN}`,
    'Content-Type': 'application/json',
  },
});

const SUPPORTED_LANGUAGES = {
  English: 'English',
  Arabic: 'Arabic',
  Hebrew: 'Hebrew',
  Russian: 'Russian',
  'العربية': 'Arabic',
  'עברית': 'Hebrew',
  EN: 'English',
  AR: 'Arabic',
  HE: 'Hebrew',
  RU: 'Russian',
};

export function getAvailableLanguages() {
  return [
    { code: 'EN', name: 'English', nativeName: 'English' },
    { code: 'AR', name: 'Arabic', nativeName: 'العربية' },
    { code: 'HE', name: 'Hebrew', nativeName: 'עברית' },
    { code: 'RU', name: 'Russian', nativeName: 'Русский' },
  ];
}

export function getSupportedLanguages() {
  return getAvailableLanguages().map(l => l.name);
}

export async function translateText(text, fromLang = "English", toLang = "Arabic") {
  try {
    const fromFullLang = SUPPORTED_LANGUAGES[fromLang] || fromLang;
    const toFullLang = SUPPORTED_LANGUAGES[toLang] || toLang;

    const response = await hfClient.post('/chat/completions', {
      model: "openai/gpt-oss-20b",
      messages: [
        {
          role: "user",
          content: `Translate this text from ${fromFullLang} to ${toFullLang}. For Arabic and Hebrew, use proper right-to-left formatting when needed. Text: "${text}"`,
        },
      ],
      max_tokens: 500,
      temperature: 0.3,
    });

    return response.data?.choices?.[0]?.message?.content || text;
  } catch (error) {
    return text;
  }
}

export async function explainConcept(concept, language = "English", level = "simple") {
  try {
    const instructions = {
      English: 'in clear and simple English.',
      Arabic: 'باللغة العربية. اشرح بوضوح وسهولة.',
      Hebrew: 'בעברית. הסבר בצורה ברורה ופשוטה.',
      Russian: 'на русском языке, просто и понятно.',
      AR: 'باللغة العربية. اشرح بوضوح وسهولة.',
      HE: 'בעברית. הסבר בצורה ברורה ופשוטה.',
      RU: 'на русском языке, просто и понятно.',
      EN: 'in clear and simple English.',
    };

    const instruction = instructions[language] || `in ${language}.`;

    const prompt =
      level === "simple"
        ? `Explain ${concept} in simple terms ${instruction}`
        : `Provide a detailed explanation of ${concept} ${instruction}`;

    const response = await hfClient.post('/chat/completions', {
      model: "openai/gpt-oss-20b",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 800,
      temperature: 0.7,
    });

    return response.data?.choices?.[0]?.message?.content || `Cannot explain ${concept}`;
  } catch {
    return `Error explaining ${concept}`;
  }
}

export async function detectLanguage(text) {
  try {
    const response = await hfClient.post('/chat/completions', {
      model: "openai/gpt-oss-20b",
      messages: [
        {
          role: "user",
          content: `What language is this text? Respond only with the language name: "${text}"`,
        },
      ],
      max_tokens: 50,
      temperature: 0.1,
    });

    return response.data?.choices?.[0]?.message?.content?.trim() || "Unknown";
  } catch {
    return "Unknown";
  }
}

export function getLanguageByCode(code) {
  const map = {
    EN: 'English',
    AR: 'Arabic',
    HE: 'Hebrew',
    RU: 'Russian',
  };
  return map[code] || 'English';
}

export async function testConnection() {
  try {
    const response = await hfClient.post('/chat/completions', {
      model: "openai/gpt-oss-20b",
      messages: [{ role: "user", content: "Say hello in English, Arabic, Hebrew and Russian" }],
      max_tokens: 50,
    });

    return !!response.data?.choices?.[0]?.message?.content;
  } catch {
    return false;
  }
}
