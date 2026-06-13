import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Avatar, Header, Pill, ui } from '../components/AppUI';
import { helpItems } from '../data/mockData';
import { colors } from '../theme/colors';

export default function HomeScreen({ navigation }: any) {
  const recent = helpItems.slice(0, 2);

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Header
        title="How can KindX help today?"
        subtitle="Ask for support, offer your time, or discover what your community needs."
        right={
          <Pressable accessibilityRole="button" onPress={() => navigation.navigate('Notifications')} style={styles.bell}>
            <Text style={styles.bellText}>!</Text>
          </Pressable>
        }
      />

      <View style={styles.actions}>
        <Pressable style={[styles.actionCard, styles.askCard, ui.shadow]} onPress={() => navigation.navigate('AskHelp')}>
          <Text style={styles.actionKicker}>NEED SUPPORT</Text>
          <Text style={styles.actionTitle}>Ask for Help</Text>
          <Text style={styles.actionCopy}>Post a nearby request in under a minute.</Text>
        </Pressable>

        <Pressable style={[styles.actionCard, styles.offerCard, ui.shadow]} onPress={() => navigation.navigate('OfferHelp')}>
          <Text style={styles.actionKicker}>VOLUNTEER</Text>
          <Text style={styles.actionTitle}>Offer Help</Text>
          <Text style={styles.actionCopy}>Share your availability with people nearby.</Text>
        </Pressable>

        <Pressable style={[styles.feedCard, ui.shadow]} onPress={() => navigation.navigate('Feed')}>
          <View>
            <Text style={styles.feedTitle}>Community Feed</Text>
            <Text style={styles.feedCopy}>See requests and offers around you.</Text>
          </View>
          <Text style={styles.feedArrow}>{'>'}</Text>
        </Pressable>
      </View>

      <Pressable style={styles.nearbyStrip} onPress={() => navigation.navigate('Map')}>
        <Text style={styles.nearbyTitle}>12 opportunities nearby</Text>
        <Text style={styles.nearbyCopy}>Open the map to explore local help.</Text>
      </Pressable>

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Recent activity</Text>
        <Pressable onPress={() => navigation.navigate('Feed')}>
          <Text style={styles.sectionLink}>View all</Text>
        </Pressable>
      </View>

      {recent.map((item) => (
        <Pressable
          key={item.id}
          style={[styles.activityCard, ui.shadow]}
          onPress={() => navigation.navigate('FeedDetails', { item })}
        >
          <Avatar name={item.userName} />
          <View style={styles.activityBody}>
            <View style={styles.activityTop}>
              <Text style={styles.activityName}>{item.userName}</Text>
              <Pill label={item.type === 'request' ? 'Request' : 'Offer'} tone={item.type === 'request' ? 'orange' : 'success'} />
            </View>
            <Text style={styles.activityText}>{item.title}</Text>
            <Text style={styles.activityMeta}>{item.location} - {item.distance}</Text>
          </View>
        </Pressable>
      ))}
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
  bell: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  bellText: {
    color: colors.secondary,
    fontSize: 20,
    fontWeight: '900',
  },
  actions: {
    paddingHorizontal: 20,
    gap: 14,
  },
  actionCard: {
    minHeight: 148,
    borderRadius: 22,
    padding: 20,
    justifyContent: 'flex-end',
  },
  askCard: {
    backgroundColor: colors.secondary,
  },
  offerCard: {
    backgroundColor: colors.primary,
  },
  actionKicker: {
    color: colors.white,
    fontSize: 12,
    fontWeight: '900',
    opacity: 0.88,
    marginBottom: 8,
  },
  actionTitle: {
    color: colors.white,
    fontSize: 25,
    fontWeight: '900',
  },
  actionCopy: {
    color: colors.white,
    fontSize: 15,
    lineHeight: 21,
    marginTop: 4,
    opacity: 0.92,
  },
  feedCard: {
    minHeight: 92,
    borderRadius: 20,
    padding: 18,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.divider,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  feedTitle: {
    color: colors.textPrimary,
    fontSize: 19,
    fontWeight: '900',
  },
  feedCopy: {
    color: colors.textMuted,
    marginTop: 4,
  },
  feedArrow: {
    color: colors.primary,
    fontSize: 28,
    fontWeight: '900',
  },
  nearbyStrip: {
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 18,
    padding: 16,
    backgroundColor: colors.primarySoft,
  },
  nearbyTitle: {
    color: colors.primaryDark,
    fontSize: 17,
    fontWeight: '900',
  },
  nearbyCopy: {
    color: colors.textSecondary,
    marginTop: 4,
  },
  sectionHeader: {
    paddingHorizontal: 20,
    marginTop: 24,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionTitle: {
    color: colors.textPrimary,
    fontSize: 20,
    fontWeight: '900',
  },
  sectionLink: {
    color: colors.primaryDark,
    fontWeight: '800',
  },
  activityCard: {
    marginHorizontal: 20,
    marginBottom: 12,
    borderRadius: 18,
    padding: 14,
    flexDirection: 'row',
    gap: 12,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.divider,
  },
  activityBody: {
    flex: 1,
  },
  activityTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 8,
  },
  activityName: {
    color: colors.textPrimary,
    fontWeight: '900',
  },
  activityText: {
    color: colors.textSecondary,
    fontSize: 15,
    marginTop: 6,
  },
  activityMeta: {
    color: colors.textMuted,
    fontSize: 13,
    marginTop: 6,
  },
});
