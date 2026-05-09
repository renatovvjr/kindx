import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Platform,
  Alert,
  Linking,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';

export default function MapFocusedScreen({ route, navigation }: any) {
  const { item } = route.params;

  const region = {
    latitude: item.latitude,
    longitude: item.longitude,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  };

  const handleOpenRoute = async () => {
    try {
      const lat = item.latitude;
      const lng = item.longitude;

      let url = '';

      if (Platform.OS === 'ios') {
        // Abre no Apple Maps
        url = `http://maps.apple.com/?daddr=${lat},${lng}`;
      } else {
        // Abre no Google Maps (Android)
        url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
      }

      const supported = await Linking.canOpenURL(url);

      if (!supported) {
        Alert.alert(
          'Não foi possível abrir o mapa',
          'Seu dispositivo não conseguiu abrir um app de mapas para traçar a rota.'
        );
        return;
      }

      await Linking.openURL(url);
    } catch (error) {
      console.log('Erro ao abrir rota:', error);
      Alert.alert('Erro', 'Ocorreu um erro ao tentar abrir a rota.');
    }
  };

  return (
    <View style={styles.container}>
      <MapView style={styles.map} initialRegion={region}>
        <Marker
          coordinate={{ latitude: item.latitude, longitude: item.longitude }}
          pinColor={item.type === 'request' ? '#F97316' : '#059669'}
        />
      </MapView>

      <View style={styles.footer}>
        <Pressable style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Text style={styles.backText}>← Voltar</Text>
        </Pressable>

        <Text style={styles.title}>
          {item.type === 'request' ? 'Pedido de Ajuda' : 'Oferta de Ajuda'}
        </Text>

        <Text style={styles.subtitle}>{item.title}</Text>

        <Pressable style={styles.routeBtn} onPress={handleOpenRoute}>
          <Text style={styles.routeText}>Traçar rota no mapa</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },
  footer: {
    padding: 20,
    backgroundColor: '#FFF',
    borderTopWidth: 1,
    borderColor: '#EEE',
  },
  backBtn: {
    marginBottom: 10,
  },
  backText: {
    color: '#00B8D9',
    fontSize: 16,
    fontWeight: '700',
  },
  title: {
    fontSize: 18,
    fontWeight: '800',
    color: '#111',
  },
  subtitle: {
    fontSize: 15,
    color: '#444',
    marginBottom: 20,
  },
  routeBtn: {
    backgroundColor: '#00B8D9',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 28, 
  },
  routeText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '700',
  },
});


