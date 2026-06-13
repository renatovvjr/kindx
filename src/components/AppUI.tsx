import React from 'react';
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../theme/colors';

export function HeaderLogo({ height = 40 }: { height?: number }) {
  return (
    <Image
      source={require('../../assets/logo.png')}
      resizeMode="contain"
      style={[styles.headerLogo, { width: height * 2.7, height }]}
    />
  );
}

export function LogoMark({ size = 48 }: { size?: number }) {
  return <HeaderLogo height={size} />;
}

export function Header({
  title,
  subtitle,
  onBack,
  right,
}: {
  title: string;
  subtitle?: string;
  onBack?: () => void;
  right?: React.ReactNode;
}) {
  return (
    <SafeAreaView edges={['top']} style={styles.headerSafe}>
      <View style={styles.header}>
        <View style={styles.headerTop}>
          {onBack ? (
            <Pressable accessibilityRole="button" onPress={onBack} style={styles.backButton}>
              <Text style={styles.backButtonText}>← Back</Text>
            </Pressable>
          ) : (
            <HeaderLogo height={40} />
          )}
          {right}
        </View>
        <Text style={styles.headerTitle}>{title}</Text>
        {subtitle ? <Text style={styles.headerSubtitle}>{subtitle}</Text> : null}
      </View>
    </SafeAreaView>
  );
}

export function AppButton({
  label,
  onPress,
  variant = 'primary',
  disabled,
  icon,
}: {
  label: string;
  onPress?: () => void;
  variant?: 'primary' | 'secondary' | 'orange' | 'ghost' | 'danger';
  disabled?: boolean;
  icon?: React.ReactNode;
}) {
  return (
    <Pressable
      accessibilityRole="button"
      disabled={disabled}
      onPress={onPress}
      style={[
        styles.button,
        variant === 'secondary' && styles.buttonSecondary,
        variant === 'orange' && styles.buttonOrange,
        variant === 'ghost' && styles.buttonGhost,
        variant === 'danger' && styles.buttonDanger,
        disabled && styles.buttonDisabled,
      ]}
    >
      <View style={styles.buttonContent}>
        {icon ? <View style={styles.buttonIcon}>{icon}</View> : null}
        <Text
          style={[
            styles.buttonText,
            (variant === 'secondary' || variant === 'ghost') && styles.buttonTextDark,
            variant === 'danger' && styles.buttonTextDanger,
          ]}
        >
          {label}
        </Text>
      </View>
    </Pressable>
  );
}

export function Field({
  label,
  multiline,
  style,
  ...props
}: TextInputProps & { label: string }) {
  return (
    <View style={styles.fieldWrap}>
      <Text style={styles.fieldLabel}>{label}</Text>
      <TextInput
        placeholderTextColor={colors.disabled}
        multiline={multiline}
        style={[styles.input, multiline && styles.textArea, style]}
        {...props}
      />
    </View>
  );
}

export function Pill({
  label,
  tone = 'primary',
}: {
  label: string;
  tone?: 'primary' | 'orange' | 'success' | 'neutral';
}) {
  return (
    <View
      style={[
        styles.pill,
        tone === 'orange' && styles.pillOrange,
        tone === 'success' && styles.pillSuccess,
        tone === 'neutral' && styles.pillNeutral,
      ]}
    >
      <Text
        style={[
          styles.pillText,
          tone === 'orange' && styles.pillTextOrange,
          tone === 'success' && styles.pillTextSuccess,
          tone === 'neutral' && styles.pillTextNeutral,
        ]}
      >
        {label}
      </Text>
    </View>
  );
}

export function Avatar({ name, size = 44 }: { name: string; size?: number }) {
  const initials = name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <View style={[styles.avatar, { width: size, height: size, borderRadius: size / 2 }]}>
      <Text style={styles.avatarText}>{initials}</Text>
    </View>
  );
}

export const ui = {
  shadow: {
    shadowColor: '#111827',
    shadowOpacity: 0.08,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 6 },
    elevation: 3,
  },
};

const styles = StyleSheet.create({
  headerLogo: {
    alignSelf: 'flex-start',
  },
  headerSafe: {
    backgroundColor: colors.background,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 14,
    paddingBottom: 14,
  },
  headerTop: {
    minHeight: 44,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  backButton: {
    minHeight: 44,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    backgroundColor: colors.primarySoft,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  backButtonText: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: '900',
  },
  headerTitle: {
    color: colors.textPrimary,
    fontSize: 28,
    fontWeight: '900',
    lineHeight: 34,
  },
  headerSubtitle: {
    color: colors.textMuted,
    fontSize: 15,
    lineHeight: 22,
    marginTop: 6,
  },
  button: {
    minHeight: 54,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    backgroundColor: colors.primary,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonIcon: {
    width: 22,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  buttonSecondary: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
  },
  buttonOrange: {
    backgroundColor: colors.secondary,
  },
  buttonGhost: {
    backgroundColor: 'transparent',
  },
  buttonDanger: {
    backgroundColor: '#FEF2F2',
  },
  buttonDisabled: {
    opacity: 0.65,
  },
  buttonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '800',
  },
  buttonTextDark: {
    color: colors.textPrimary,
  },
  buttonTextDanger: {
    color: colors.error,
  },
  fieldWrap: {
    marginBottom: 16,
  },
  fieldLabel: {
    color: colors.textPrimary,
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 8,
  },
  input: {
    minHeight: 56,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    paddingHorizontal: 14,
    color: colors.textPrimary,
    fontSize: 16,
  },
  textArea: {
    minHeight: 126,
    paddingTop: 14,
    textAlignVertical: 'top',
  },
  pill: {
    alignSelf: 'flex-start',
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 6,
    backgroundColor: colors.primarySoft,
  },
  pillOrange: {
    backgroundColor: colors.secondarySoft,
  },
  pillSuccess: {
    backgroundColor: colors.successSoft,
  },
  pillNeutral: {
    backgroundColor: colors.surface,
  },
  pillText: {
    color: colors.primaryDark,
    fontSize: 12,
    fontWeight: '800',
  },
  pillTextOrange: {
    color: colors.secondary,
  },
  pillTextSuccess: {
    color: colors.success,
  },
  pillTextNeutral: {
    color: colors.textSecondary,
  },
  avatar: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primarySoft,
  },
  avatarText: {
    color: colors.primaryDark,
    fontWeight: '900',
  },
});
