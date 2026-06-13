import React, { useMemo, useRef, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import MapView, { Marker, Region } from 'react-native-maps';
import { AppButton, Pill, ui } from '../components/AppUI';
import { HelpItem, helpItems } from '../data/mockData';
import { colors } from '../theme/colors';

type FilterType = 'all' | 'request' | 'offer';

export default function MapScreen({ navigation }: any) {
  const [filter, setFilter] = useState<FilterType>('all');
  const [selected, setSelected] = useState<HelpItem>(helpItems[0]);
  const mapRef = useRef<MapView | null>(null);

  const region: Region = {
    latitude: -33.885,
    longitude: 151.185,
    latitudeDelta: 0.09,
    longitudeDelta: 0.09,
  };

  const filtered = useMemo(() => {
    if (filter === 'all') return helpItems;
    return helpItems.filter((item) => item.type === filter);
  }, [filter]);

  const selectItem = (item: HelpItem) => {
    setSelected(item);
    mapRef.current?.animateToRegion(
      {
        latitude: item.latitude,
        longitude: item.longitude,
        latitudeDelta: 0.035,
        longitudeDelta: 0.035,
      },
      450
    );
  };

  const Filter = ({ label, value }: { label: string; value: FilterType }) => {
    const active = filter === value;
    return (
      <Pressable style={[styles.filter, active && styles.filterActive]} onPress={() => setFilter(value)}>
        <Text style={[styles.filterText, active && styles.filterTextActive]}>{label}</Text>
      </Pressable>
    );
  };

  return (
    <View style={styles.container}>
      <MapView ref={mapRef} style={styles.map} initialRegion={region}>
        {filtered.map((item) => (
          <Marker
            key={item.id}
            coordinate={{ latitude: item.latitude, longitude: item.longitude }}
            pinColor={item.type === 'request' ? colors.secondary : colors.success}
            title={item.title}
            description={`${item.category} - ${item.location}`}
            onPress={() => selectItem(item)}
          />
        ))}
      </MapView>

      <View style={[styles.searchPill, ui.shadow]}>
        <Text style={styles.searchText}>Search this area</Text>
      </View>

      <View style={[styles.filters, ui.shadow]}>
        <Filter label="All" value="all" />
        <Filter label="Requests" value="request" />
        <Filter label="Offers" value="offer" />
      </View>

      {selected ? (
        <View style={[styles.detailCard, ui.shadow]}>
          <View style={styles.detailTop}>
            <Pill label={selected.type === 'request' ? 'Request' : 'Offer'} tone={selected.type === 'request' ? 'orange' : 'success'} />
            <Text style={styles.distance}>{selected.distance} away</Text>
          </View>
          <Text style={styles.title}>{selected.title}</Text>
          <Text style={styles.copy} numberOfLines={2}>{selected.description}</Text>
          <Text style={styles.location}>{selected.location}</Text>
          <View style={styles.actions}>
            <AppButton label="View Details" variant="secondary" onPress={() => navigation.navigate('FeedDetails', { item: selected })} />
            <AppButton
              label={selected.type === 'request' ? 'Offer Help' : 'Message'}
              variant={selected.type === 'request' ? 'orange' : 'primary'}
              onPress={() => navigation.navigate('Chat', { conversationId: selected.id })}
            />
          </View>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  map: {
    flex: 1,
  },
  searchPill: {
    position: 'absolute',
    top: 52,
    left: 20,
    right: 20,
    height: 52,
    borderRadius: 26,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.divider,
  },
  searchText: {
    color: colors.textPrimary,
    fontWeight: '900',
  },
  filters: {
    position: 'absolute',
    top: 116,
    alignSelf: 'center',
    flexDirection: 'row',
    gap: 6,
    borderRadius: 999,
    padding: 5,
    backgroundColor: colors.card,
  },
  filter: {
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  filterActive: {
    backgroundColor: colors.primary,
  },
  filterText: {
    color: colors.textSecondary,
    fontWeight: '800',
    fontSize: 13,
  },
  filterTextActive: {
    color: colors.white,
  },
  detailCard: {
    position: 'absolute',
    left: 20,
    right: 20,
    bottom: 24,
    borderRadius: 22,
    padding: 16,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.divider,
  },
  detailTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  distance: {
    color: colors.textMuted,
    fontWeight: '800',
    fontSize: 12,
  },
  title: {
    color: colors.textPrimary,
    fontSize: 19,
    fontWeight: '900',
  },
  copy: {
    color: colors.textSecondary,
    lineHeight: 21,
    marginTop: 6,
  },
  location: {
    color: colors.textMuted,
    fontWeight: '800',
    marginTop: 8,
  },
  actions: {
    gap: 10,
    marginTop: 14,
  },
});
