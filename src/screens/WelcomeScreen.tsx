import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { AppButton } from '../components/AppUI';
import { colors } from '../theme/colors';

export default function WelcomeScreen({ navigation }: any) {
  return (
    <View style={styles.container}>
      <View style={styles.hero}>
        <Image source={require('../../assets/logo.png')} style={styles.logoImage} resizeMode="contain" />
        <Text style={styles.slogan}>Empowering Communities Through Help</Text>
        <Text style={styles.copy}>Find help nearby or support someone in your community.</Text>
      </View>

      <View style={styles.actions}>
        <AppButton label="Sign Up" onPress={() => navigation.navigate('Login', { mode: 'signup' })} />
        <AppButton label="Login" variant="secondary" onPress={() => navigation.navigate('Login')} />
        <View style={styles.socialRow}>
          <AppButton label="Continue with Google" variant="secondary" onPress={() => navigation.navigate('Tabs')} />
          <AppButton label="Continue with Apple" variant="secondary" onPress={() => navigation.navigate('Tabs')} />
        </View>
      </View>

      <Pressable onPress={() => navigation.navigate('Tabs')}>
        <Text style={styles.footer}>Continue as guest</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: colors.background,
    paddingHorizontal: 20,
    paddingBottom: 34,
    paddingTop: 68,
  },
  hero: {
    alignItems: 'center',
  },
  logoImage: {
    width: '100%',
    height: 250,
    marginBottom: 42,
  },
  slogan: {
    color: colors.textPrimary,
    fontSize: 28,
    fontWeight: '900',
    lineHeight: 34,
    textAlign: 'center',
  },
  copy: {
    color: colors.textMuted,
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
    marginTop: 12,
    maxWidth: 310,
  },
  actions: {
    gap: 12,
  },
  socialRow: {
    gap: 10,
    marginTop: 6,
  },
  footer: {
    color: colors.primaryDark,
    textAlign: 'center',
    fontSize: 15,
    fontWeight: '700',
  },
});
