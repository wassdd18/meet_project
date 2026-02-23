import * as SecureStore from 'expo-secure-store';
import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import {
  getCurrentUser,
  loginUser,
  logoutUser,
  registerUser,
  updateUserProfile
} from '../lib/auth';

const USER_STORAGE_KEY = 'current_user';
const USER_METADATA_KEY = 'user_metadata';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadUser = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const appwriteUser = await getCurrentUser();

      if (appwriteUser) {
        const metadata = await SecureStore.getItemAsync(USER_METADATA_KEY);
        const metadataObj = metadata ? JSON.parse(metadata) : {};

        const fullUser = {
          ...appwriteUser,
          ...metadataObj,
          country: metadataObj.country ?? appwriteUser.prefs?.country ?? '',
          language: metadataObj.language ?? appwriteUser.prefs?.language ?? 'English',
        };

        setUser(fullUser);
        await SecureStore.setItemAsync(USER_STORAGE_KEY, JSON.stringify(fullUser));
        return;
      }

      const storedUser = await SecureStore.getItemAsync(USER_STORAGE_KEY);
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      } else {
        setUser(null);
      }
    } catch (err) {
      setError(err?.message || 'Failed to load user');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  const register = useCallback(async (email, password, name, country, language) => {
    setLoading(true);
    setError(null);

    try {
      const created = await registerUser(email, password, name);
      await updateUserProfile(name, country ?? '', language ?? 'English');

      await SecureStore.setItemAsync(
        USER_METADATA_KEY,
        JSON.stringify({ country: country ?? '', language: language ?? 'English' })
      );

      await SecureStore.deleteItemAsync(USER_STORAGE_KEY);
      setUser(null);

      return created;
    } catch (err) {
      const errorMsg = err?.message || 'Registration failed';
      setError(errorMsg);
      throw new Error(errorMsg);
    } finally {
      setLoading(false);
    }
  }, []);

  const login = useCallback(async (email, password) => {
    setLoading(true);
    setError(null);

    try {
      const loggedInUser = await loginUser(email, password);

      const metadata = await SecureStore.getItemAsync(USER_METADATA_KEY);
      const metadataObj = metadata ? JSON.parse(metadata) : {};

      const fullUser = {
        ...loggedInUser,
        ...metadataObj,
        country: loggedInUser.prefs?.country ?? metadataObj.country ?? '',
        language: loggedInUser.prefs?.language ?? metadataObj.language ?? 'English',
      };

      await SecureStore.setItemAsync(USER_STORAGE_KEY, JSON.stringify(fullUser));
      await SecureStore.setItemAsync(
        USER_METADATA_KEY,
        JSON.stringify({
          country: fullUser.country ?? '',
          language: fullUser.language ?? 'English',
        })
      );

      setUser(fullUser);
      return fullUser;
    } catch (err) {
      const errorMsg = err?.message || 'Login failed';
      setError(errorMsg);
      throw new Error(errorMsg);
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      await logoutUser();
      await SecureStore.deleteItemAsync(USER_STORAGE_KEY);
      setUser(null);
    } catch (err) {
      const errorMsg = err?.message || 'Logout failed';
      setError(errorMsg);
      throw new Error(errorMsg);
    } finally {
      setLoading(false);
    }
  }, []);

  const updateProfile = useCallback(async (name, country, language) => {
    setLoading(true);
    setError(null);

    try {
      const updatedUser = await updateUserProfile(name, country, language);

      const userWithMetadata = {
        ...updatedUser,
        country: updatedUser.prefs?.country ?? country ?? '',
        language: updatedUser.prefs?.language ?? language ?? 'English',
      };

      await SecureStore.setItemAsync(USER_STORAGE_KEY, JSON.stringify(userWithMetadata));
      await SecureStore.setItemAsync(
        USER_METADATA_KEY,
        JSON.stringify({
          country: userWithMetadata.country,
          language: userWithMetadata.language,
        })
      );

      setUser(userWithMetadata);
      return userWithMetadata;
    } catch (err) {
      const errorMsg = err?.message || 'Profile update failed';
      setError(errorMsg);
      throw new Error(errorMsg);
    } finally {
      setLoading(false);
    }
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const value = useMemo(() => ({
    user,
    loading,
    error,
    isAuthenticated: !!user,
    register,
    login,
    logout,
    updateProfile,
    loadUser,
    clearError,
  }), [user, loading, error, register, login, logout, updateProfile, loadUser, clearError]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
