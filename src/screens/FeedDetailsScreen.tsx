import React from 'react';
import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native';
import { AppButton, Avatar, Header, Pill, ui } from '../components/AppUI';
import { colors } from '../theme/colors';

export default function FeedDetailsScreen({ route, navigation }: any) {
  const { item } = route.params;
  const isRequest = item.type === 'request';

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Header title={isRequest ? 'Help Request' : 'Help Offer'} subtitle="Review details before you connect." onBack={() => navigation.goBack()} />

      <View style={[styles.card, ui.shadow]}>
        <View style={styles.personRow}>
          <Avatar name={item.userName || 'KindX User'} size={54} />
          <View style={styles.personText}>
            <Text style={styles.name}>{item.userName || 'KindX User'}</Text>
            <Text style={styles.trust}>Verified community member</Text>
          </View>
          <Pill label={isRequest ? 'Request' : 'Offer'} tone={isRequest ? 'orange' : 'success'} />
        </View>

        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description || 'No detailed description yet.'}</Text>

        <View style={styles.infoGrid}>
          <View style={styles.infoBox}>
            <Text style={styles.infoLabel}>Category</Text>
            <Text style={styles.infoValue}>{item.category || 'General'}</Text>
          </View>
          <View style={styles.infoBox}>
            <Text style={styles.infoLabel}>Location</Text>
            <Text style={styles.infoValue}>{item.location || 'Nearby'}</Text>
          </View>
          <View style={styles.infoBox}>
            <Text style={styles.infoLabel}>Distance</Text>
            <Text style={styles.infoValue}>{item.distance || 'Nearby'}</Text>
          </View>
          <View style={styles.infoBox}>
            <Text style={styles.infoLabel}>Posted</Text>
            <Text style={styles.infoValue}>{item.time || 'Recently'}</Text>
          </View>
        </View>

        <View style={styles.safety}>
          <Text style={styles.safetyTitle}>Safety reminder</Text>
          <Text style={styles.safetyCopy}>Keep exact addresses private until both people confirm the help details.</Text>
        </View>

        <AppButton
          label={isRequest ? 'Offer Help' : 'Message'}
          variant={isRequest ? 'orange' : 'primary'}
          onPress={() => navigation.navigate('Chat', { conversationId: item.id })}
        />
        <View style={styles.spacer} />
        <AppButton
          label="View on Map"
          variant="secondary"
          onPress={() => {
            if (!item.latitude || !item.longitude) {
              Alert.alert('Location unavailable', 'This item does not have map coordinates yet.');
              return;
            }
            navigation.navigate('MapFocused', { item });
          }}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.surface,
  },
  content: {
    paddingBottom: 32,
  },
  card: {
    marginHorizontal: 20,
    borderRadius: 22,
    padding: 18,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.divider,
  },
  personRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  personText: {
    flex: 1,
  },
  name: {
    color: colors.textPrimary,
    fontSize: 17,
    fontWeight: '900',
  },
  trust: {
    color: colors.success,
    fontSize: 13,
    fontWeight: '700',
    marginTop: 2,
  },
  title: {
    color: colors.textPrimary,
    fontSize: 25,
    lineHeight: 31,
    fontWeight: '900',
    marginTop: 22,
  },
  description: {
    color: colors.textSecondary,
    fontSize: 16,
    lineHeight: 24,
    marginTop: 10,
  },
  infoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginTop: 20,
  },
  infoBox: {
    width: '48%',
    borderRadius: 16,
    padding: 12,
    backgroundColor: colors.surface,
  },
  infoLabel: {
    color: colors.textMuted,
    fontSize: 12,
    fontWeight: '800',
    marginBottom: 4,
  },
  infoValue: {
    color: colors.textPrimary,
    fontWeight: '900',
  },
  safety: {
    borderRadius: 16,
    padding: 14,
    marginVertical: 20,
    backgroundColor: colors.primarySoft,
  },
  safetyTitle: {
    color: colors.primaryDark,
    fontWeight: '900',
  },
  safetyCopy: {
    color: colors.textSecondary,
    marginTop: 4,
    lineHeight: 20,
  },
  spacer: {
    height: 10,
  },
});
