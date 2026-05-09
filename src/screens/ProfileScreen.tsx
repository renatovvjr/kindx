import React from 'react';
import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import { colors } from '@theme/colors';

export default function ProfileScreen() {
  return (
    <View style={s.container}>
      <Image source={require('../../assets/logo.png')} style={{ width: 90, height: 90, borderRadius: 45, marginBottom: 12 }} />
      <Text style={s.name}>Renato Valle</Text>
      <View style={s.stats}>
        <View style={s.stat}><Text style={s.statNum}>12</Text><Text style={s.statLabel}>Helped</Text></View>
        <View style={s.stat}><Text style={s.statNum}>5</Text><Text style={s.statLabel}>Received</Text></View>
      </View>
      <Pressable style={s.btnPrimary}><Text style={s.btnText}>Edit Profile</Text></Pressable>
      <Pressable style={s.btnSecondary}><Text style={[s.btnText,{color:colors.gray}]}>Settings</Text></Pressable>
    </View>
  );
}
const s = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 20, backgroundColor: colors.white },
  name: { fontSize: 22, fontWeight: '700', color: colors.text, marginBottom: 8 },
  stats: { flexDirection: 'row', gap: 32, marginVertical: 12 },
  stat: { alignItems: 'center' },
  statNum: { fontSize: 20, fontWeight: '800', color: colors.turquoise },
  statLabel: { color: colors.gray },
  btnPrimary: { backgroundColor: colors.turquoise, paddingVertical: 12, paddingHorizontal: 18, borderRadius: 12, marginTop: 10, width: 200, alignItems: 'center' },
  btnSecondary: { borderWidth: 1, borderColor: colors.turquoise, paddingVertical: 12, paddingHorizontal: 18, borderRadius: 12, marginTop: 10, width: 200, alignItems: 'center', backgroundColor: colors.white },
  btnText: { color: 'white', fontWeight: '700' },
});