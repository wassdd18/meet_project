import { Account, Client, ID } from 'react-native-appwrite';

const client = new Client()
  .setEndpoint('https://cloud.appwrite.io/v1')
  .setProject('6983bca7002a967bcc1a');

const account = new Account(client);

const safeDeleteCurrentSession = async () => {
  try {
    await account.deleteSession('current');
  } catch (e) {}
};

export const setCurrentUser = () => {};

export const getCurrentUser = async () => {
  try {
    return await account.get();
  } catch (error) {
    return null;
  }
};

export const registerUser = async (email, password, name) => {
  await safeDeleteCurrentSession();
  await account.create(ID.unique(), email, password, name);
  await account.createEmailPasswordSession(email, password);
  return await account.get();
};

export const loginUser = async (email, password) => {
  await safeDeleteCurrentSession();
  await account.createEmailPasswordSession(email, password);
  return await account.get();
};

export const logoutUser = async () => {
  await safeDeleteCurrentSession();
};

export const updateUserProfile = async (name, country, language) => {
  const current = await account.get();

  if (name && name.trim() && name.trim() !== current.name) {
    await account.updateName(name.trim());
  }

  const existingPrefs = current.prefs || {};
  const nextPrefs = {
    ...existingPrefs,
    ...(country !== undefined ? { country } : {}),
    ...(language !== undefined ? { language } : {}),
  };

  await account.updatePrefs(nextPrefs);
  return await account.get();
};
