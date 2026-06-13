import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { AppButton, Avatar, Header, Pill, ui } from '../components/AppUI';
import { colors } from '../theme/colors';

export default function ProfileScreen({ navigation }: any) {
  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Header
        title="Profile"
        subtitle="Your contribution and trust profile."
        right={
          <Pressable style={styles.settingsButton} onPress={() => navigation.navigate('Settings')}>
            <Text style={styles.settingsText}>SET</Text>
          </Pressable>
        }
      />

      <View style={[styles.profileCard, ui.shadow]}>
        <Avatar name="Renato Valle" size={96} />
        <Text style={styles.name}>Renato Valle</Text>
        <Text style={styles.location}>Sydney, Australia</Text>
        <Pill label="Verified helper" tone="success" />
        <Text style={styles.bio}>
          Product and business analyst who enjoys helping communities use technology with confidence.
        </Text>
        <AppButton label="Edit Profile" variant="secondary" />
      </View>

      <View style={styles.stats}>
        <View style={[styles.statCard, ui.shadow]}>
          <Text style={styles.statNumber}>18</Text>
          <Text style={styles.statLabel}>Help offered</Text>
        </View>
        <View style={[styles.statCard, ui.shadow]}>
          <Text style={styles.statNumber}>4</Text>
          <Text style={styles.statLabel}>Help received</Text>
        </View>
        <View style={[styles.statCard, ui.shadow]}>
          <Text style={styles.statNumber}>4.9</Text>
          <Text style={styles.statLabel}>Rating</Text>
        </View>
      </View>

      <View style={[styles.section, ui.shadow]}>
        <Text style={styles.sectionTitle}>Recent impact</Text>
        <Text style={styles.activity}>Completed grocery pickup for Maya.</Text>
        <Text style={styles.activity}>Published weekend tech help offer.</Text>
        <Text style={styles.activity}>Joined local transport support group.</Text>
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
  settingsButton: {
    minWidth: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  settingsText: {
    color: colors.textSecondary,
    fontSize: 11,
    fontWeight: '900',
  },
  profileCard: {
    marginHorizontal: 20,
    borderRadius: 22,
    padding: 20,
    alignItems: 'center',
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.divider,
  },
  name: {
    color: colors.textPrimary,
    fontSize: 24,
    fontWeight: '900',
    marginTop: 14,
  },
  location: {
    color: colors.textMuted,
    marginTop: 4,
    marginBottom: 12,
  },
  bio: {
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
    marginVertical: 18,
  },
  stats: {
    flexDirection: 'row',
    gap: 10,
    paddingHorizontal: 20,
    marginTop: 16,
  },
  statCard: {
    flex: 1,
    borderRadius: 18,
    padding: 14,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.divider,
  },
  statNumber: {
    color: colors.primary,
    fontSize: 24,
    fontWeight: '900',
  },
  statLabel: {
    color: colors.textMuted,
    fontSize: 12,
    fontWeight: '800',
    marginTop: 4,
  },
  section: {
    marginHorizontal: 20,
    marginTop: 16,
    borderRadius: 18,
    padding: 16,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.divider,
  },
  sectionTitle: {
    color: colors.textPrimary,
    fontSize: 18,
    fontWeight: '900',
    marginBottom: 10,
  },
  activity: {
    color: colors.textSecondary,
    paddingVertical: 9,
    borderTopWidth: 1,
    borderTopColor: colors.divider,
  },
});
