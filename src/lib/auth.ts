import * as AppleAuthentication from 'expo-apple-authentication';
import * as AuthSession from 'expo-auth-session';
import { Platform } from 'react-native';
import { supabase } from '@lib/supabase';
import { config } from '@config/index';

export async function signInWithGoogle() {
  // Simplified Google OAuth (demo). For production, use supabase.auth.signInWithOAuth.
  const redirectUri = AuthSession.makeRedirectUri({ useProxy: true });
  const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${encodeURIComponent(config.googleClientId)}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=token&scope=profile%20email`;
  const res = await AuthSession.startAsync({ authUrl });
  return res;
}

export async function signInWithApple() {
  if (Platform.OS !== 'ios') throw new Error('Apple Sign-In is iOS only');
  return await AppleAuthentication.signInAsync({
    requestedScopes: [AppleAuthentication.AppleAuthenticationScope.FULL_NAME, AppleAuthentication.AppleAuthenticationScope.EMAIL],
  });
}
