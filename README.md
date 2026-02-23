# BiConnect – Educational Platform with AI Translation & Concept Explanation
🔥 ** Why BiConnect is the perfect template for multilingual educational apps — explore our features! ** 📑


---
## Table of Contents

- [About](#about)
- [Features](#features)
- [How to Install & Run](#how-to-install--run)
- [AI Integration](#ai-integration)
- [Database & Authentication](#database--authentication)
- [Documentation](#documentation)
- [Future Roadmap](#future-roadmap)
- [Feedback and Contributions](#feedback-and-contributions)
- [Contacts](#contacts)


---
## 🚀 About

BiConnect is a comprehensive **React Native (Expo)** template designed to jump‑start educational mobile applications with built‑in **AI‑powered translation** and **concept explanation**. It was developed as part of the **MEET program** (Middle East Entrepreneurs of Tomorrow) to serve as a reusable foundation for students and developers building apps that bridge language barriers — especially between English, Arabic, and Hebrew.

The project demonstrates:

- **Clean, modular architecture** with reusable UI components
- **Custom React hooks** for authentication and AI services
- **Integration with Hugging Face’s GPT‑OSS** for translation and explanation
- **Local secure storage** via `expo-secure-store` (acting as a lightweight database)
- **Complete authentication flow** (register, login, logout, profile update)
- **Full support for right‑to‑left (RTL) languages** (Arabic, Hebrew) and multi‑language UI

This template is ideal for anyone who wants to build an educational app with language learning, cross‑cultural communication, or AI‑enhanced tutoring features.


---
## ✨ Features

### 🔐 Authentication & User Management
- Register with email, password, name, country, and preferred language
- Login with “remember me” option
- Session persistence using `expo-secure-store`
- Profile update (name, country, language)
- Graceful error handling and loading states

### 🌐 Multilingual AI Assistant (Powered by Hugging Face)
- Translate text between Arabic and Hebrew
- Explain any concept in simple or detailed language
- Automatic language detection for input text
- Specially crafted prompts for accurate RTL language handling

### 🧩 Reusable UI Components
- **ThemedButton** – customizable button (primary/secondary/outline, sizes)
- **ThemedText** – text styles (title, subtitle, default, link)
- **ThemedView** – themed container with background
- **Card** – consistent card layout with shadow
- **InputField** – styled text input
- And more: `Collapsible`, `IconSymbol`, `ParallaxScrollView`…

### 🗂️ Clean Project Structure

├── app/                 # Expo Router screens
├── components/ui/       # Reusable UI elements
├── hooks/               # Custom hooks (auth, GPT‑OSS, theme, etc.)
├── constants/           # Theme colors, fonts
├── api/                 # GPT‑OSS API client
└── ...
### 🛡️ Security & Data Persistence
- User credentials and metadata stored securely in device keychain via `expo-secure-store`
- Mocked database layer (`hooks/lib/auth.js`) for easy replacement with real backend (Appwrite, Firebase, etc.)


---
## 📝 How to Install & Run

### Prerequisites
- **Node.js** (v18 or newer)
- **Git**
- **Expo CLI**
- iOS Simulator (macOS only) or Android Emulator, or physical device with Expo Go app

### Installation Steps

# 1. Clone the repository
git clone https://github.com/your-username/BiConnect.git

# 2. Navigate into the project folder
cd BiConnect

# 3. Install dependencies
npm install
# or
yarn install

# 4. Start the Expo development server
npx expo start

Running on device/emulator
Press i to open iOS simulator (macOS)

Press a to open Android emulator

Scan QR code with Expo Go app on your physical device

> Note: The app uses a Hugging Face API token (included for demo purposes). For production, replace it with your own token in api/gptoss.js.


------------------------------------------------------------------------------------------------------
🧠 AI Integration
BiConnect leverages the Hugging Face Inference API (GPT‑OSS‑20B model) to provide:

Translation – accurate, context‑aware translation between 8+ languages.

Concept Explanation – generates simple or detailed explanations suitable for students.

The AI service is encapsulated in the custom hook useGPToss (located in hooks/use-gptoss.js), which exposes:

translateText(text, fromLang, toLang)

explainConcept(concept, language, level)

detectLanguage(text)

testConnection()

Error handling is built‑in, with user‑friendly alerts when the API fails.


------------------------------------------------------------------------------------------------------
🗄️ Database & Authentication
While the project uses expo-secure-store for local storage, it is designed to be easily upgraded to a real backend like Appwrite or Firebase.

Current Data Layer
Mock database (hooks/lib/auth.js) simulates user records and CRUD operations.

SecureStore persists the logged‑in user and metadata across app restarts.

All authentication logic is centralized in the useAuth hook.

How it works
On app start, useAuth attempts to load a user from SecureStore and the mock session.

Registration creates a new user object, stores it in the mock DB and SecureStore.

Login verifies credentials against the mock DB and saves the user.

Profile updates modify both the mock DB and SecureStore.

Logout clears the stored user.

This pattern makes it trivial to replace the mock with a real backend: just update the functions in hooks/lib/auth.js to call your actual API.


------------------------------------------------------------------------------------------------------
📚 Documentation
For detailed guidance on using the components, hooks, and customizing the AI prompts, please visit our Documentation Site (placeholder).

Key resources:

Getting Started Guide – step‑by‑step tutorial to build your own app from this template.

Hooks API Reference – detailed description of useAuth, useGPToss, useTheme, etc.

UI Component Catalog – interactive showcase of all reusable components.


------------------------------------------------------------------------------------------------------
🛣️ Future Roadmap
Version 2.0 (Planned)
📱[x] Offline mode – cache translations and explanations for offline use

📊 [] User history – save translation and explanation history in SecureStore

🗣️ [] Text‑to‑speech – hear pronunciation of translated text (Arabic/Hebrew support)

🌍 [x] Real backend integration – official Appwrite or Firebase adapter

Version 3.0 (Vision)
🤖 [] Customizable AI models – switch between Hugging Face, OpenAI, or local models

📚 [] Interactive quizzes – generate quizzes from explained concepts

👥 [] Collaborative features – share translations and explanations with friends

We welcome community input! Feel free to open issues or pull requests with your ideas.


------------------------------------------------------------------------------------------------------
🤝 Feedback and Contributions
We’ve built BiConnect to be a solid foundation for educational apps, but the journey doesn’t end here. Your feedback is crucial for continuous improvement.

Ways to contribute:

🐛 Report bugs or suggest features via GitHub Issues

💡 Start a discussion to share ideas

🔀 Submit pull requests with enhancements or fixes

We especially appreciate contributions that improve RTL language support, add new AI capabilities, or simplify the authentication flow.

------------------------------------------------------------------------------------------------------
🗨️ Contacts
For questions, support, or just to say hello:

Email: feliksy810@gmail.com

GitHub: wassdd18

Project Repository: meet_project on GitHub

Made with ❤️ for the MEET community
