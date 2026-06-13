import React, { useState } from 'react';
import { FontAwesome } from '@expo/vector-icons';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { AppButton, Field, Header } from '../components/AppUI';
import { colors } from '../theme/colors';

export default function LoginScreen({ navigation, route }: any) {
  const initialMode = route?.params?.mode === 'signup' ? 'signup' : 'login';
  const [mode, setMode] = useState<'login' | 'signup'>(initialMode);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const isSignup = mode === 'signup';
  const canContinue = email.length > 4 && password.length >= 4 && (!isSignup || name.length > 1);

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
      <Header
        title={isSignup ? 'Create your KindX account' : 'Welcome back'}
        subtitle={isSignup ? 'Join people helping each other nearby.' : 'Log in to continue helping your community.'}
        onBack={() => navigation.goBack()}
      />

      <View style={styles.card}>
        {isSignup ? (
          <Field label="Full name" placeholder="Your name" value={name} onChangeText={setName} />
        ) : null}
        <Field
          label="Email"
          placeholder="you@example.com"
          autoCapitalize="none"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />
        <Field
          label="Password"
          placeholder="Enter your password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        {!isSignup ? (
          <Pressable style={styles.forgot}>
            <Text style={styles.forgotText}>Forgot Password?</Text>
          </Pressable>
        ) : (
          <Text style={styles.helper}>By creating an account, you agree to follow KindX community guidelines.</Text>
        )}

        <AppButton
          label={isSignup ? 'Create Account' : 'Login'}
          disabled={!canContinue}
          onPress={() => navigation.replace('Tabs')}
        />

        <View style={styles.dividerRow}>
          <View style={styles.divider} />
          <Text style={styles.dividerText}>or continue with</Text>
          <View style={styles.divider} />
        </View>

        <AppButton
          label="Continue with Google"
          variant="secondary"
          icon={<FontAwesome name="google" size={18} color="#4285F4" />}
          onPress={() => navigation.replace('Tabs')}
        />
        <AppButton
          label="Continue with Apple"
          variant="secondary"
          icon={<FontAwesome name="apple" size={21} color="#111827" />}
          onPress={() => navigation.replace('Tabs')}
        />
      </View>

      <Pressable onPress={() => setMode(isSignup ? 'login' : 'signup')} style={styles.switcher}>
        <Text style={styles.switcherText}>
          {isSignup ? 'Already have an account? Login' : 'New to KindX? Create account'}
        </Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    paddingBottom: 32,
  },
  card: {
    marginHorizontal: 20,
    marginTop: 8,
    gap: 10,
  },
  forgot: {
    alignSelf: 'flex-end',
    marginBottom: 6,
  },
  forgotText: {
    color: colors.primaryDark,
    fontWeight: '800',
  },
  helper: {
    color: colors.textMuted,
    fontSize: 13,
    lineHeight: 19,
    marginBottom: 6,
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginVertical: 8,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: colors.divider,
  },
  dividerText: {
    color: colors.textMuted,
    fontSize: 13,
    fontWeight: '700',
  },
  switcher: {
    alignItems: 'center',
    marginTop: 22,
  },
  switcherText: {
    color: colors.primaryDark,
    fontSize: 15,
    fontWeight: '800',
  },
});
