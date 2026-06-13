import React, { useMemo, useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { AppButton, Avatar, Header, Pill, ui } from '../components/AppUI';
import { HelpItem, helpItems } from '../data/mockData';
import { colors } from '../theme/colors';

type FilterType = 'all' | 'request' | 'offer' | 'nearby';

export default function FeedScreen({ navigation }: any) {
  const [filter, setFilter] = useState<FilterType>('all');
  const [search, setSearch] = useState('');

  const items = useMemo(() => {
    return helpItems.filter((item) => {
      const matchesFilter = filter === 'all' || filter === 'nearby' || item.type === filter;
      const term = search.toLowerCase().trim();
      const matchesSearch =
        !term ||
        item.title.toLowerCase().includes(term) ||
        item.description.toLowerCase().includes(term) ||
        item.category.toLowerCase().includes(term) ||
        item.location.toLowerCase().includes(term);
      return matchesFilter && matchesSearch;
    });
  }, [filter, search]);

  const renderItem = ({ item }: { item: HelpItem }) => {
    const isRequest = item.type === 'request';

    return (
      <Pressable style={[styles.card, ui.shadow]} onPress={() => navigation.navigate('FeedDetails', { item })}>
        <View style={styles.cardHeader}>
          <Avatar name={item.userName} />
          <View style={styles.cardHeaderText}>
            <Text style={styles.name}>{item.userName}</Text>
            <Text style={styles.meta}>{item.time} - {item.distance} away</Text>
          </View>
          <Pill label={isRequest ? 'Request' : 'Offer'} tone={isRequest ? 'orange' : 'success'} />
        </View>

        <Text style={styles.cardTitle}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>

        <View style={styles.cardFooter}>
          <View>
            <Text style={styles.category}>{item.category}</Text>
            <Text style={styles.location}>{item.location}</Text>
          </View>
          <Pressable
            style={[styles.smallButton, isRequest ? styles.helpButton : styles.messageButton]}
            onPress={() => navigation.navigate('Chat', { conversationId: item.id })}
          >
            <Text style={styles.smallButtonText}>{isRequest ? 'Offer Help' : 'Message'}</Text>
          </Pressable>
        </View>
      </Pressable>
    );
  };

  const Filter = ({ label, value }: { label: string; value: FilterType }) => {
    const active = filter === value;
    return (
      <Pressable onPress={() => setFilter(value)} style={[styles.filter, active && styles.filterActive]}>
        <Text style={[styles.filterText, active && styles.filterTextActive]}>{label}</Text>
      </Pressable>
    );
  };

  return (
    <View style={styles.screen}>
      <Header title="Community Feed" subtitle="Requests and offers from people near you." />

      <View style={styles.searchWrap}>
        <TextInput
          placeholder="Search help nearby"
          placeholderTextColor={colors.disabled}
          value={search}
          onChangeText={setSearch}
          style={styles.search}
        />
      </View>

      <View style={styles.filters}>
        <Filter label="All" value="all" />
        <Filter label="Requests" value="request" />
        <Filter label="Offers" value="offer" />
        <Filter label="Nearby" value="nearby" />
      </View>

      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyTitle}>No help opportunities found.</Text>
            <Text style={styles.emptyCopy}>Try a different search or post the first request nearby.</Text>
            <AppButton label="Ask for Help" variant="orange" onPress={() => navigation.navigate('AskHelp')} />
          </View>
        }
      />

      <View style={styles.fabWrap}>
        <Pressable style={styles.fabSecondary} onPress={() => navigation.navigate('OfferHelp')}>
          <Text style={styles.fabSecondaryText}>Offer</Text>
        </Pressable>
        <Pressable style={styles.fab} onPress={() => navigation.navigate('AskHelp')}>
          <Text style={styles.fabText}>Ask</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  searchWrap: {
    paddingHorizontal: 20,
  },
  search: {
    minHeight: 52,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    paddingHorizontal: 16,
    color: colors.textPrimary,
    fontSize: 16,
  },
  filters: {
    flexDirection: 'row',
    gap: 8,
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  filter: {
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 9,
    backgroundColor: colors.surface,
  },
  filterActive: {
    backgroundColor: colors.primary,
  },
  filterText: {
    color: colors.textSecondary,
    fontWeight: '800',
  },
  filterTextActive: {
    color: colors.white,
  },
  list: {
    paddingHorizontal: 20,
    paddingBottom: 110,
  },
  card: {
    borderRadius: 18,
    padding: 16,
    marginBottom: 14,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.divider,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  cardHeaderText: {
    flex: 1,
  },
  name: {
    color: colors.textPrimary,
    fontWeight: '900',
    fontSize: 15,
  },
  meta: {
    color: colors.textMuted,
    fontSize: 12,
    marginTop: 2,
  },
  cardTitle: {
    color: colors.textPrimary,
    fontSize: 18,
    fontWeight: '900',
    marginTop: 14,
  },
  description: {
    color: colors.textSecondary,
    fontSize: 15,
    lineHeight: 22,
    marginTop: 6,
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 16,
    gap: 12,
  },
  category: {
    color: colors.textPrimary,
    fontWeight: '800',
  },
  location: {
    color: colors.textMuted,
    fontSize: 13,
    marginTop: 3,
  },
  smallButton: {
    borderRadius: 999,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  helpButton: {
    backgroundColor: colors.secondary,
  },
  messageButton: {
    backgroundColor: colors.primary,
  },
  smallButtonText: {
    color: colors.white,
    fontWeight: '900',
  },
  fabWrap: {
    position: 'absolute',
    right: 20,
    bottom: 24,
    flexDirection: 'row',
    gap: 10,
  },
  fab: {
    minWidth: 68,
    height: 54,
    borderRadius: 27,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.secondary,
  },
  fabText: {
    color: colors.white,
    fontWeight: '900',
  },
  fabSecondary: {
    minWidth: 78,
    height: 54,
    borderRadius: 27,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
  },
  fabSecondaryText: {
    color: colors.white,
    fontWeight: '900',
  },
  empty: {
    gap: 12,
    paddingTop: 40,
  },
  emptyTitle: {
    color: colors.textPrimary,
    textAlign: 'center',
    fontWeight: '900',
    fontSize: 18,
  },
  emptyCopy: {
    color: colors.textMuted,
    textAlign: 'center',
    lineHeight: 22,
  },
});
