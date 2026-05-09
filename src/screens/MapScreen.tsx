import React, { useEffect, useState, useRef, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Pressable,
} from 'react-native';
import MapView, { Marker, Region } from 'react-native-maps';
import * as Location from 'expo-location';
import { supabase } from '../lib/supabase';

type MapItem = {
  id: string;
  type: 'request' | 'offer';
  title?: string;
  description?: string;
  location?: string;
  category?: string;
  created_at?: string;
  latitude: number;
  longitude: number;
};

type FilterType = 'all' | 'request' | 'offer';

type LatLng = {
  latitude: number;
  longitude: number;
};

export default function MapScreen({ navigation }: any) {
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState<MapItem[]>([]);
  const [filter, setFilter] = useState<FilterType>('all');
  const [selectedItem, setSelectedItem] = useState<MapItem | null>(null);

  const [userLocation, setUserLocation] = useState<LatLng | null>(null);
  const [locationPermissionChecked, setLocationPermissionChecked] =
    useState(false);

  const mapRef = useRef<MapView | null>(null);

  const defaultRegion: Region = {
    latitude: -33.8688,
    longitude: 151.2093,
    latitudeDelta: 0.2,
    longitudeDelta: 0.2,
  };

  async function loadData() {
    setLoading(true);

    const [{ data: requests }, { data: offers }] = await Promise.all([
      supabase.from('requests').select('*'),
      supabase.from('offers').select('*'),
    ]);

    const reqItems: MapItem[] =
      requests
        ?.filter((r: any) => r.latitude && r.longitude)
        .map((r: any) => ({
          id: r.id,
          type: 'request' as const,
          title: r.title,
          description: r.description,
          location: r.location,
          category: r.category,
          created_at: r.created_at,
          latitude: r.latitude,
          longitude: r.longitude,
        })) || [];

    const offItems: MapItem[] =
      offers
        ?.filter((o: any) => o.latitude && o.longitude)
        .map((o: any) => ({
          id: o.id,
          type: 'offer' as const,
          title: o.type,
          description: o.description,
          location: o.location,
          created_at: o.created_at,
          latitude: o.latitude,
          longitude: o.longitude,
        })) || [];

    setItems([...reqItems, ...offItems]);
    setLoading(false);
  }

  // Pede permissão de localização e pega a posição inicial do usuário
  async function loadUserLocationOnce() {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== 'granted') {
        console.log('Permissão de localização negada.');
        setLocationPermissionChecked(true);
        return;
      }

      const current = await Location.getCurrentPositionAsync({});
      setUserLocation({
        latitude: current.coords.latitude,
        longitude: current.coords.longitude,
      });
    } catch (err) {
      console.log('Erro ao obter localização do usuário:', err);
    } finally {
      setLocationPermissionChecked(true);
    }
  }

  useEffect(() => {
    loadData();
    loadUserLocationOnce();
  }, []);

  const filteredItems = useMemo(() => {
    if (filter === 'all') return items;
    return items.filter((item) => item.type === filter);
  }, [items, filter]);

  if (loading) {
    return (
      <View className="loadingContainer" style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#00B8D9" />
        <Text style={styles.loadingText}>Carregando mapa...</Text>
      </View>
    );
  }

  if (items.length === 0) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.emptyText}>
          Ainda não há pedidos ou ofertas com localização no mapa.
        </Text>
        <Text style={styles.emptySubText}>
          Adicione latitude e longitude no Supabase para testar.
        </Text>
      </View>
    );
  }

  const FilterButton = ({
    label,
    value,
  }: {
    label: string;
    value: FilterType;
  }) => {
    const active = filter === value;
    return (
      <Pressable
        onPress={() => {
          setFilter(value);
          setSelectedItem(null); // limpa seleção ao trocar filtro
        }}
        style={[styles.filterButton, active && styles.filterButtonActive]}
      >
        <Text style={[styles.filterText, active && styles.filterTextActive]}>
          {label}
        </Text>
      </Pressable>
    );
  };

  const handlePinPress = (item: MapItem) => {
    setSelectedItem(item);

    if (mapRef.current) {
      mapRef.current.animateToRegion(
        {
          latitude: item.latitude,
          longitude: item.longitude,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        },
        500
      );
    }
  };

  const handleOpenDetails = () => {
    if (!selectedItem) return;
    const item = selectedItem;
    setSelectedItem(null);
    navigation.navigate('FeedDetails', { item });
  };

  // Calcula a distância entre usuário e item (Haversine)
  function getDistanceMeters(from: LatLng, to: LatLng): number {
    const R = 6371000; // raio da Terra em metros
    const toRad = (value: number) => (value * Math.PI) / 180;

    const dLat = toRad(to.latitude - from.latitude);
    const dLon = toRad(to.longitude - from.longitude);

    const lat1 = toRad(from.latitude);
    const lat2 = toRad(to.latitude);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1) *
        Math.cos(lat2) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c; // metros
  }

  function formatDistance(from: LatLng, item: MapItem): string {
    if (!item.latitude || !item.longitude) return '';

    const meters = getDistanceMeters(from, {
      latitude: item.latitude,
      longitude: item.longitude,
    });

    if (meters < 1000) {
      const m = Math.round(meters);
      return `${m} m de você`;
    }

    const km = meters / 1000;
    return `${km.toFixed(1)} km de você`;
  }

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={defaultRegion}
      >
        {filteredItems.map((item) => (
          <Marker
            key={item.id}
            coordinate={{
              latitude: item.latitude,
              longitude: item.longitude,
            }}
            pinColor={item.type === 'request' ? '#F97316' : '#059669'}
            onPress={() => handlePinPress(item)}
          />
        ))}
      </MapView>

      {/* Filtro flutuante sobre o mapa */}
      <View style={styles.filterBar}>
        <FilterButton label="Todos" value="all" />
        <FilterButton label="Pedidos" value="request" />
        <FilterButton label="Ofertas" value="offer" />
      </View>

      {/* Card de preview no estilo Booking/Airbnb */}
      {selectedItem && (
        <View style={styles.previewCardContainer}>
          <View style={styles.previewCard}>
            <View style={styles.previewHeaderRow}>
              <Text
                style={[
                  styles.previewTypePill,
                  selectedItem.type === 'request'
                    ? styles.previewTypePillRequest
                    : styles.previewTypePillOffer,
                ]}
              >
                {selectedItem.type === 'request'
                  ? 'Pedido de Ajuda'
                  : 'Oferta de Ajuda'}
              </Text>

              <Pressable onPress={() => setSelectedItem(null)}>
                <Text style={styles.previewClose}>✕</Text>
              </Pressable>
            </View>

            <Text style={styles.previewTitle} numberOfLines={1}>
              {selectedItem.title || '(Sem título)'}
            </Text>

            {selectedItem.location ? (
              <Text style={styles.previewLocation} numberOfLines={1}>
                📍 {selectedItem.location}
              </Text>
            ) : null}

            {userLocation && (
              <Text style={styles.previewDistance}>
                {formatDistance(userLocation, selectedItem)}
              </Text>
            )}

            <Pressable style={styles.previewButton} onPress={handleOpenDetails}>
              <Text style={styles.previewButtonText}>Ver detalhes</Text>
            </Pressable>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },

  loadingContainer: {
    flex: 1,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  loadingText: {
    marginTop: 12,
    color: '#4B5563',
    fontSize: 14,
  },

  emptyText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    textAlign: 'center',
    marginBottom: 8,
  },
  emptySubText: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
  },

  filterBar: {
    position: 'absolute',
    top: 40,
    alignSelf: 'center',
    flexDirection: 'row',
    backgroundColor: '#FFFFFFEE',
    borderRadius: 999,
    padding: 4,
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 6,
  },
  filterButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 2,
  },
  filterButtonActive: {
    backgroundColor: '#00B8D9',
  },
  filterText: {
    fontSize: 13,
    color: '#4B5563',
    fontWeight: '500',
  },
  filterTextActive: {
    color: '#FFFFFF',
    fontWeight: '700',
  },

  // Card de preview (Booking-style)
  previewCardContainer: {
    position: 'absolute',
    bottom: 30,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  previewCard: {
    width: '90%',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 14,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  previewHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  previewTypePill: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    fontSize: 11,
    fontWeight: '700',
    color: '#FFF',
  },
  previewTypePillRequest: {
    backgroundColor: '#F97316',
  },
  previewTypePillOffer: {
    backgroundColor: '#059669',
  },
  previewClose: {
    fontSize: 16,
    color: '#9CA3AF',
  },
  previewTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 4,
  },
  previewLocation: {
    fontSize: 13,
    color: '#4B5563',
    marginBottom: 6,
  },
  previewDistance: {
    fontSize: 13,
    color: '#00B8D9',
    marginBottom: 10,
    fontWeight: '600',
  },
  previewButton: {
    backgroundColor: '#00B8D9',
    paddingVertical: 10,
    borderRadius: 999,
    alignItems: 'center',
    marginTop: 4,
  },
  previewButtonText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '700',
  },
});





