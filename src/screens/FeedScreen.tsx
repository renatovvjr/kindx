import React, { useEffect, useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Pressable,
  RefreshControl,
  Image,
} from 'react-native';
import { supabase } from '../lib/supabase';

type FeedItem = {
  id: string;
  type: 'request' | 'offer';
  title?: string;
  description?: string;
  location?: string;
  category?: string;
  created_at: string;
  latitude?: number;
  longitude?: number;
};

type FilterType = 'all' | 'request' | 'offer';

type FeedScreenProps = {
  navigation: any;
};

export default function FeedScreen({ navigation }: FeedScreenProps) {
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [items, setItems] = useState<FeedItem[]>([]);
  const [filter, setFilter] = useState<FilterType>('all');
  const [fabOpen, setFabOpen] = useState(false);

  async function loadData(showLoading = true) {
    if (showLoading) setLoading(true);

    const [{ data: requests, error: reqError }, { data: offers, error: offError }] =
      await Promise.all([
        supabase.from('requests').select('*'),
        supabase.from('offers').select('*'),
      ]);

    if (reqError) console.log('Erro ao carregar requests:', reqError);
    if (offError) console.log('Erro ao carregar offers:', offError);

    const formattedRequests: FeedItem[] =
      requests?.map((r: any) => ({
        id: r.id,
        type: 'request' as const,
        title: r.title,
        description: r.description,
        category: r.category,
        location: r.location,
        created_at: r.created_at,
        latitude: r.latitude,
        longitude: r.longitude,
      })) || [];

    const formattedOffers: FeedItem[] =
      offers?.map((o: any) => ({
        id: o.id,
        type: 'offer' as const,
        title: o.type,
        description: o.description,
        location: o.location,
        created_at: o.created_at,
        latitude: o.latitude,
        longitude: o.longitude,
      })) || [];

    const combined = [...formattedRequests, ...formattedOffers].sort(
      (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );

    setItems(combined);
    setLoading(false);
  }

  useEffect(() => {
    loadData();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await loadData(false);
    setRefreshing(false);
  };

  const filteredItems = useMemo(() => {
    if (filter === 'all') return items;
    return items.filter((item) => item.type === filter);
  }, [items, filter]);

  const renderItem = ({ item }: { item: FeedItem }) => (
    <Pressable
      onPress={() => navigation.navigate('FeedDetails', { item })}
      style={styles.card}
    >
      <Text style={[styles.tag, item.type === 'request' ? styles.tagRequest : styles.tagOffer]}>
        {item.type === 'request' ? 'Pedido' : 'Oferta'}
      </Text>

      <Text style={styles.title}>{item.title}</Text>

      {item.description ? (
        <Text style={styles.desc} numberOfLines={2}>
          {item.description}
        </Text>
      ) : null}

      {item.location ? (
        <Text style={styles.location}>📍 {item.location}</Text>
      ) : null}
    </Pressable>
  );

  const FilterButton = ({ label, value }: { label: string; value: FilterType }) => {
    const active = filter === value;
    return (
      <Pressable
        onPress={() => setFilter(value)}
        style={[styles.filterButton, active && styles.filterButtonActive]}
      >
        <Text style={[styles.filterText, active && styles.filterTextActive]}>
          {label}
        </Text>
      </Pressable>
    );
  };

  const handleOpenAskHelp = () => {
    setFabOpen(false);
    navigation.navigate('AskHelp');
  };

  const handleOpenOfferHelp = () => {
    setFabOpen(false);
    navigation.navigate('OfferHelp');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Comunidade KindX</Text>
      <Text style={styles.subtitle}>
        Veja os pedidos e ofertas de ajuda perto de você.
      </Text>

      <View style={styles.filterBar}>
        <FilterButton label="Todos" value="all" />
        <FilterButton label="Pedidos" value="request" />
        <FilterButton label="Ofertas" value="offer" />
      </View>

      {loading ? (
        <View style={styles.loadingContainer}>
          <Image
            source={require('../../assets/logo.png')}
            style={styles.loadingLogo}
            resizeMode="contain"
          />
          <ActivityIndicator size="large" color="#00B8D9" />
          <Text style={styles.loadingText}>Carregando comunidade...</Text>
        </View>
      ) : filteredItems.length === 0 ? (
        <Text style={styles.empty}>
          Nenhum item encontrado para este filtro.
        </Text>
      ) : (
        <FlatList
          data={filteredItems}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 80 }}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      )}

      <View style={styles.fabContainer}>
        {fabOpen && (
          <View style={styles.fabMenu}>
            <Pressable
              style={[styles.fabOption, styles.fabOptionAsk]}
              onPress={handleOpenAskHelp}
            >
              <Text style={styles.fabOptionEmoji}>🧡</Text>
              <Text style={styles.fabOptionText}>Pedir ajuda</Text>
            </Pressable>

            <Pressable
              style={[styles.fabOption, styles.fabOptionOffer]}
              onPress={handleOpenOfferHelp}
            >
              <Text style={styles.fabOptionEmoji}>💚</Text>
              <Text style={styles.fabOptionText}>Oferecer ajuda</Text>
            </Pressable>
          </View>
        )}

        <Pressable
          style={styles.fabMain}
          onPress={() => setFabOpen((prev) => !prev)}
        >
          <Text style={styles.fabMainText}>{fabOpen ? '×' : '+'}</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    paddingHorizontal: 16,
    paddingTop: 32,
  },

  header: {
    fontSize: 24,
    fontWeight: '800',
    color: '#00B8D9',
    textAlign: 'center',
    marginTop: 8,
  },

  subtitle: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 18,
  },

  filterBar: {
    flexDirection: 'row',
    backgroundColor: '#F3F4F6',
    padding: 4,
    borderRadius: 999,
    marginBottom: 16,
    justifyContent: 'space-between',
  },

  filterButton: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 999,
    alignItems: 'center',
  },

  filterButtonActive: {
    backgroundColor: '#00B8D9',
  },

  filterText: {
    fontSize: 14,
    color: '#4B5563',
    fontWeight: '500',
  },

  filterTextActive: {
    color: '#FFFFFF',
    fontWeight: '700',
  },

  empty: {
    textAlign: 'center',
    marginTop: 24,
    color: '#6B7280',
  },

  card: {
    backgroundColor: '#FFFFFF',
    padding: 14,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    elevation: 2,
  },

  tag: {
    fontSize: 11,
    fontWeight: '700',
    marginBottom: 6,
    opacity: 0.8,
  },

  tagRequest: { color: '#D97706' },
  tagOffer: { color: '#059669' },

  title: {
    fontSize: 15,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 4,
  },

  desc: {
    fontSize: 13,
    color: '#4B5563',
    marginBottom: 6,
  },

  location: {
    fontSize: 12,
    color: '#374151',
    marginTop: 4,
  },

  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 40,
  },

  loadingLogo: {
    width: 140,
    height: 140,
    marginBottom: 20,
  },

  loadingText: {
    marginTop: 12,
    fontSize: 14,
    color: '#6B7280',
  },

  fabContainer: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    alignItems: 'flex-end',
  },

  fabMain: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#00B8D9',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 6,
  },

  fabMainText: {
    color: '#FFFFFF',
    fontSize: 32,
    fontWeight: '700',
  },

  fabMenu: {
    marginBottom: 10,
  },

  fabOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: '#FFFFFF',
    marginBottom: 8,
    elevation: 4,
  },

  fabOptionAsk: {
    borderLeftWidth: 4,
    borderLeftColor: '#F97316',
  },

  fabOptionOffer: {
    borderLeftWidth: 4,
    borderLeftColor: '#059669',
  },

  fabOptionEmoji: {
    fontSize: 16,
    marginRight: 6,
  },

  fabOptionText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
  },
});