import React from 'react';
import { Platform, Pressable, StyleSheet, Text, View, Alert, Linking } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { AppButton, Pill } from '../components/AppUI';
import { colors } from '../theme/colors';

export default function MapFocusedScreen({ route, navigation }: any) {
  const { item } = route.params;

  const region = {
    latitude: item.latitude,
    longitude: item.longitude,
    latitudeDelta: 0.018,
    longitudeDelta: 0.018,
  };

  const openRoute = async () => {
    const url =
      Platform.OS === 'ios'
        ? `http://maps.apple.com/?daddr=${item.latitude},${item.longitude}`
        : `https://www.google.com/maps/dir/?api=1&destination=${item.latitude},${item.longitude}`;

    try {
      const supported = await Linking.canOpenURL(url);
      if (!supported) {
        Alert.alert('Map unavailable', 'Your device could not open a maps app.');
        return;
      }
      await Linking.openURL(url);
    } catch (error) {
      Alert.alert('Map unavailable', 'There was a problem opening directions.');
    }
  };

  return (
    <View style={styles.container}>
      <MapView style={styles.map} initialRegion={region}>
        <Marker
          coordinate={{ latitude: item.latitude, longitude: item.longitude }}
          pinColor={item.type === 'request' ? colors.secondary : colors.success}
          title={item.title}
        />
      </MapView>

      <Pressable style={styles.back} onPress={() => navigation.goBack()}>
        <Text style={styles.backText}>{'<'}</Text>
      </Pressable>

      <View style={styles.sheet}>
        <Pill label={item.type === 'request' ? 'Request' : 'Offer'} tone={item.type === 'request' ? 'orange' : 'success'} />
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.copy}>{item.location} - {item.distance || 'nearby'}</Text>
        <AppButton label="Open Directions" onPress={openRoute} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  back: {
    position: 'absolute',
    top: 52,
    left: 20,
    width: 46,
    height: 46,
    borderRadius: 23,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
  },
  backText: {
    color: colors.textPrimary,
    fontSize: 22,
    fontWeight: '900',
  },
  sheet: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    padding: 20,
    paddingBottom: 34,
    backgroundColor: colors.card,
  },
  title: {
    color: colors.textPrimary,
    fontSize: 22,
    fontWeight: '900',
    marginTop: 12,
  },
  copy: {
    color: colors.textMuted,
    marginTop: 6,
    marginBottom: 18,
  },
});
