import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import MapView, { Marker, Region } from 'react-native-maps';
import * as Location from 'expo-location';

export default function MapSelectScreen() {
  const [region, setRegion] = useState<Region | null>(null);
  const [pin, setPin] = useState<{latitude:number; longitude:number} | null>(null);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === 'granted') {
        const loc = await Location.getCurrentPositionAsync({});
        const r = {
          latitude: loc.coords.latitude,
          longitude: loc.coords.longitude,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        };
        setRegion(r);
        setPin({ latitude: r.latitude, longitude: r.longitude });
      }
    })();
  }, []);

  if (!region) return <View style={s.center}><Text>Loading map...</Text></View>;

  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={s.map}
        initialRegion={region}
        onPress={(e) => setPin(e.nativeEvent.coordinate)}
      >
        {pin && <Marker coordinate={pin} />}
      </MapView>
    </View>
  );
}
const s = StyleSheet.create({
  map: { width: Dimensions.get('window').width, height: Dimensions.get('window').height },
  center: { flex:1, alignItems:'center', justifyContent:'center' },
});