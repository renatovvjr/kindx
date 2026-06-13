import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { Header } from '../components/AppUI';
import { notifications } from '../data/mockData';
import { colors } from '../theme/colors';

export default function NotificationsScreen({ navigation }: any) {
  return (
    <View style={styles.screen}>
      <Header title="Notifications" subtitle="Community activity and nearby requests." onBack={() => navigation.goBack()} />
      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <View style={[styles.card, item.unread && styles.cardUnread]}>
            <View style={[styles.dot, item.unread && styles.dotUnread]} />
            <View style={styles.body}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.copy}>{item.body}</Text>
              <Text style={styles.time}>{item.time}</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  list: {
    paddingHorizontal: 20,
    paddingBottom: 32,
  },
  card: {
    flexDirection: 'row',
    gap: 12,
    borderRadius: 18,
    padding: 16,
    marginBottom: 12,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.divider,
  },
  cardUnread: {
    backgroundColor: colors.primarySoft,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.border,
    marginTop: 5,
  },
  dotUnread: {
    backgroundColor: colors.primary,
  },
  body: {
    flex: 1,
  },
  title: {
    color: colors.textPrimary,
    fontWeight: '900',
    fontSize: 16,
  },
  copy: {
    color: colors.textSecondary,
    lineHeight: 21,
    marginTop: 4,
  },
  time: {
    color: colors.textMuted,
    fontSize: 12,
    fontWeight: '700',
    marginTop: 8,
  },
});
