# 🌍 BiConnect  
### AI-Powered Multilingual Educational Platform (React Native + Expo)

> 🚀 Production-ready template for building multilingual educational apps with built-in AI translation and concept explanation.

---

## 📑 Table of Contents

- [About](#about)
- [Core Features](#core-features)
  - [Authentication & User Management](#authentication--user-management)
  - [Multilingual AI Assistant](#multilingual-ai-assistant)
  - [Reusable UI Components](#reusable-ui-components)
- [AI Integration](#ai-integration)
- [Authentication & Database](#authentication--database)
- [Project Architecture](#project-architecture)
- [Installation & Running](#installation--running)
- [Documentation](#documentation)
- [Roadmap](#roadmap)
- [Contributing](#contributing)
- [Contact](#contact)

---

## About

**BiConnect** is a professional **React Native (Expo)** educational template designed to accelerate development of multilingual mobile applications.

Developed as part of the **MEET – Middle East Entrepreneurs of Tomorrow** program, it helps bridge communication gaps between Arabic, and Hebrew speakers.

### 🎯 What This Template Demonstrates

- Clean modular architecture
- Reusable UI component system
- Custom React hooks
- AI-powered translation & explanation
- Secure local persistence
- Full RTL (Right-To-Left) language support

Ideal for:

- Language learning applications  
- AI tutoring platforms  
- Cross-cultural communication apps  
- Educational startups  

---

## Core Features

### Authentication & User Management

- Email/password registration
- Login with “Remember Me”
- Persistent sessions via `expo-secure-store`
- Profile editing (name, country, language)
- Centralized authentication logic (`useAuth`)
- Structured loading & error states

---

### Multilingual AI Assistant

Powered by **Hugging Face GPT-OSS-20B**

Capabilities:

- Text translation (Arabic ↔ Hebrew and english)
- Concept explanation (simple or detailed)
- Automatic language detection
- RTL-optimized prompts
- Built-in API error handling

---

### Reusable UI Components

Professional design system including:

- `ThemedButton`
- `ThemedText`
- `ThemedView`
- `Card`
- `InputField`
- `Collapsible`
- `IconSymbol`
- `ParallaxScrollView`

All components are modular and production-ready.

---

## AI Integration

BiConnect integrates with the **Hugging Face Inference API**.

### File Structure

```
/hooks/use-gptoss.js
/api/gptoss.js
```

### Exposed Methods

```js
translateText(text, fromLang, toLang)
explainConcept(concept, language, level)
detectLanguage(text)
testConnection()
```

### Design Principles

- Educationally optimized prompts
- Language detection before translation
- Graceful API failure handling
- Easily replaceable AI provider

---

## Authentication & Database

Current implementation includes:

- Local secure persistence via `expo-secure-store`
- Mock database layer (`hooks/lib/auth.js`)
- Centralized logic via `useAuth`

### Authentication Flow

1. App launches → Load user from SecureStore
2. Registration → Save to mock DB + SecureStore
3. Login → Validate credentials
4. Profile update → Sync changes
5. Logout → Clear local session

This structure allows seamless migration to:

- Firebase
- Appwrite
- Supabase
- Custom backend

---

## Project Architecture

```
BiConnect/
│
├── app/                 # Expo Router screens
├── components/ui/       # Reusable UI components
├── hooks/               # Custom hooks (auth, AI, theme)
├── constants/           # Theme configuration
├── api/                 # AI API client
└── ...
```

Architecture principles:

- Separation of concerns
- Hook-based state management
- UI decoupled from logic
- Backend-ready scalability

---

## Installation & Running

### Prerequisites

- Node.js (v18+)
- Git
- Expo CLI
- Expo Go

---

### Setup

```bash
# Clone repository
git clone https://github.com/wassdd18/meet_project

# Navigate into project
cd lab_1_2

# Install dependencies
npm install
# or
yarn install

# Start development server
npx expo start
```

---

### Running the App

- Press `i` → iOS Simulator  
- Press `a` → Android Emulator  
- Scan QR code with Expo Go  

> ⚠️ For production use, replace the Hugging Face API token inside `api/gptoss.js`.

---

## Documentation

Planned documentation includes:

- Getting Started Guide
- Hooks API Reference
- UI Component Catalog
- AI Prompt Customization Guide

(Insert documentation site link here when available)

---

## Roadmap

### Version 2.0

- [x] Offline caching  
- [ ] User history  
- [ ] Text-to-speech  
- [x] Real backend adapter  

### Version 3.0

- [ ] Multi-model AI provider switch
- [ ] AI-generated quizzes
- [ ] Collaborative features

---

## Contributing

We welcome:

- Bug reports
- Feature suggestions
- Pull requests
- RTL improvements
- AI enhancements
- Backend adapters

### Contribution Steps

1. Fork the repository  
2. Create a feature branch  
3. Commit your changes  
4. Open a Pull Request  

---

## Contact

📧 Email: feliksy810@gmail.com  
🐙 GitHub: https://github.com/wassdd18  

---

Made with ❤️ for the MEET community
