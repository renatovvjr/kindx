import React from 'react';
import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native';
import { AppButton, Header } from '../components/AppUI';
import { colors } from '../theme/colors';

const sections = [
  { title: 'Account', rows: ['Edit profile', 'Verification', 'Notifications'] },
  { title: 'Preferences', rows: ['Language: English', 'Accessibility', 'Location radius'] },
  { title: 'Privacy', rows: ['Approximate location', 'Blocked users', 'Community guidelines'] },
  { title: 'Support', rows: ['Help center', 'Report a concern'] },
];

export default function SettingsScreen({ navigation }: any) {
  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Header title="Settings" subtitle="Manage language, privacy, and account preferences." onBack={() => navigation.goBack()} />

      {sections.map((section) => (
        <View key={section.title} style={styles.section}>
          <Text style={styles.sectionTitle}>{section.title}</Text>
          {section.rows.map((row) => (
            <View key={row} style={styles.row}>
              <Text style={styles.rowText}>{row}</Text>
              <Text style={styles.chevron}>{'>'}</Text>
            </View>
          ))}
        </View>
      ))}

      <View style={styles.logout}>
        <AppButton
          label="Logout"
          variant="danger"
          onPress={() => Alert.alert('Logout', 'This will end your KindX session.')}
        />
      </View>
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
  section: {
    marginHorizontal: 20,
    marginBottom: 18,
  },
  sectionTitle: {
    color: colors.textMuted,
    fontSize: 13,
    fontWeight: '900',
    marginBottom: 8,
    textTransform: 'uppercase',
  },
  row: {
    minHeight: 56,
    borderRadius: 14,
    paddingHorizontal: 14,
    marginBottom: 8,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rowText: {
    color: colors.textPrimary,
    fontSize: 15,
    fontWeight: '800',
  },
  chevron: {
    color: colors.textMuted,
    fontSize: 18,
    fontWeight: '900',
  },
  logout: {
    marginHorizontal: 20,
    marginTop: 4,
  },
});
