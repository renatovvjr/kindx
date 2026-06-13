import React, { useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { AppButton, Avatar, Header, Pill } from '../components/AppUI';
import { conversations } from '../data/mockData';
import { colors } from '../theme/colors';

const thread = [
  { id: 'm1', from: 'other', text: 'Hi, I saw your KindX request and can help this afternoon.' },
  { id: 'm2', from: 'me', text: 'Thank you. Around 3pm would be great.' },
  { id: 'm3', from: 'other', text: 'Perfect. I can pick up the pharmacy order and message when I arrive nearby.' },
];

export default function ChatScreen({ navigation }: any) {
  const [active, setActive] = useState(conversations[0]);

  return (
    <View style={styles.screen}>
      <Header title="Messages" subtitle="Coordinate help safely and clearly." onBack={() => navigation.goBack()} />

      <View style={styles.layout}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={conversations}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.conversationList}
          renderItem={({ item }) => (
            <Pressable style={[styles.conversationChip, active.id === item.id && styles.conversationChipActive]} onPress={() => setActive(item)}>
              <Avatar name={item.userName} size={36} />
              <Text style={[styles.conversationName, active.id === item.id && styles.conversationNameActive]}>{item.userName.split(' ')[0]}</Text>
            </Pressable>
          )}
        />

        <View style={styles.threadHeader}>
          <Avatar name={active.userName} />
          <View style={styles.threadInfo}>
            <Text style={styles.threadName}>{active.userName}</Text>
            <Text style={styles.threadContext}>{active.context}</Text>
          </View>
          <Pill label="Pending" tone="orange" />
        </View>

        <View style={styles.safety}>
          <Text style={styles.safetyText}>Share exact details only when you feel comfortable.</Text>
        </View>

        <View style={styles.messages}>
          {thread.map((message) => {
            const mine = message.from === 'me';
            return (
              <View key={message.id} style={[styles.bubble, mine ? styles.bubbleMine : styles.bubbleOther]}>
                <Text style={[styles.bubbleText, mine && styles.bubbleTextMine]}>{message.text}</Text>
              </View>
            );
          })}
        </View>

        <AppButton label="Confirm Help" onPress={() => {}} />

        <View style={styles.inputRow}>
          <TextInput placeholder="Write a message" placeholderTextColor={colors.disabled} style={styles.input} />
          <Pressable style={styles.send}>
            <Text style={styles.sendText}>Send</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  layout: {
    flex: 1,
    paddingHorizontal: 20,
  },
  conversationList: {
    gap: 8,
    paddingBottom: 14,
  },
  conversationChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    borderRadius: 999,
    paddingVertical: 6,
    paddingHorizontal: 8,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  conversationChipActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  conversationName: {
    color: colors.textSecondary,
    fontWeight: '800',
  },
  conversationNameActive: {
    color: colors.white,
  },
  threadHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    borderRadius: 18,
    padding: 14,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.divider,
  },
  threadInfo: {
    flex: 1,
  },
  threadName: {
    color: colors.textPrimary,
    fontWeight: '900',
  },
  threadContext: {
    color: colors.textMuted,
    fontSize: 13,
    marginTop: 2,
  },
  safety: {
    borderRadius: 14,
    padding: 12,
    backgroundColor: colors.primarySoft,
    marginTop: 12,
  },
  safetyText: {
    color: colors.primaryDark,
    fontWeight: '700',
    lineHeight: 20,
  },
  messages: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingVertical: 16,
    gap: 10,
  },
  bubble: {
    maxWidth: '82%',
    borderRadius: 18,
    padding: 13,
  },
  bubbleOther: {
    alignSelf: 'flex-start',
    backgroundColor: colors.surface,
  },
  bubbleMine: {
    alignSelf: 'flex-end',
    backgroundColor: colors.primary,
  },
  bubbleText: {
    color: colors.textPrimary,
    lineHeight: 21,
  },
  bubbleTextMine: {
    color: colors.white,
  },
  inputRow: {
    flexDirection: 'row',
    gap: 10,
    paddingVertical: 14,
  },
  input: {
    flex: 1,
    minHeight: 48,
    borderRadius: 24,
    paddingHorizontal: 16,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    color: colors.textPrimary,
  },
  send: {
    minWidth: 66,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
  },
  sendText: {
    color: colors.white,
    fontWeight: '900',
  },
});
