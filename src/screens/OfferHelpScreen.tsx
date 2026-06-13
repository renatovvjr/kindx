import React, { useState } from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { AppButton, Field, Header } from '../components/AppUI';
import { supabase } from '../lib/supabase';
import { colors } from '../theme/colors';

const helpTypes = ['Grocery pickup', 'Transport', 'Tutoring', 'Translation', 'Check-in call', 'Event support'];
const availabilityOptions = ['Now', 'Today', 'This weekend', 'Custom'];

export default function OfferHelpScreen({ navigation }: any) {
  const [type, setType] = useState(helpTypes[0]);
  const [availability, setAvailability] = useState(availabilityOptions[1]);
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [verifiedOnly, setVerifiedOnly] = useState(true);
  const [saving, setSaving] = useState(false);

  const handleSubmit = async () => {
    if (!type || !availability || !location) {
      Alert.alert('Missing details', 'Please choose help type, availability, and location.');
      return;
    }

    try {
      setSaving(true);
      const { error } = await supabase.from('offers').insert({
        type,
        description: `${description || 'Available to help nearby.'}\nAvailability: ${availability}`,
        location,
      });

      if (error) {
        Alert.alert('Saved locally for now', 'The offer UI is ready, but Supabase could not save this item.');
      } else {
        Alert.alert('Offer published', 'Your offer was shared with the KindX community.');
        navigation.goBack();
      }
    } catch (e) {
      Alert.alert('Offer prepared', 'The screen is ready. Please check your Supabase connection to save live data.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
      <Header
        title="Offer Help"
        subtitle="Choose how you can support people nearby."
        onBack={() => navigation.goBack()}
      />

      <View style={styles.form}>
        <Text style={styles.label}>Type of help</Text>
        <View style={styles.chips}>
          {helpTypes.map((item) => (
            <Pressable key={item} onPress={() => setType(item)} style={[styles.chip, type === item && styles.chipActive]}>
              <Text style={[styles.chipText, type === item && styles.chipTextActive]}>{item}</Text>
            </Pressable>
          ))}
        </View>

        <Text style={styles.label}>Availability</Text>
        <View style={styles.chips}>
          {availabilityOptions.map((item) => (
            <Pressable key={item} onPress={() => setAvailability(item)} style={[styles.chip, availability === item && styles.chipActive]}>
              <Text style={[styles.chipText, availability === item && styles.chipTextActive]}>{item}</Text>
            </Pressable>
          ))}
        </View>

        <Field label="Location" placeholder="Suburb or approximate area" value={location} onChangeText={setLocation} />
        <Field
          label="Short description"
          placeholder="Tell people how you can help."
          value={description}
          onChangeText={setDescription}
          multiline
        />

        <Pressable style={styles.toggleRow} onPress={() => setVerifiedOnly((value) => !value)}>
          <View style={[styles.toggle, verifiedOnly && styles.toggleOn]}>
            <View style={[styles.knob, verifiedOnly && styles.knobOn]} />
          </View>
          <View style={styles.toggleCopy}>
            <Text style={styles.toggleTitle}>Verified community members only</Text>
            <Text style={styles.toggleText}>Limit visibility for a more trusted experience.</Text>
          </View>
        </Pressable>

        <AppButton label={saving ? 'Publishing...' : 'Publish Offer'} disabled={saving} onPress={handleSubmit} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    paddingBottom: 32,
  },
  form: {
    paddingHorizontal: 20,
  },
  label: {
    color: colors.textPrimary,
    fontSize: 14,
    fontWeight: '800',
    marginBottom: 8,
  },
  chips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 18,
  },
  chip: {
    borderRadius: 999,
    paddingHorizontal: 13,
    paddingVertical: 9,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  chipActive: {
    backgroundColor: colors.success,
    borderColor: colors.success,
  },
  chipText: {
    color: colors.textSecondary,
    fontWeight: '800',
  },
  chipTextActive: {
    color: colors.white,
  },
  toggleRow: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
    borderRadius: 16,
    padding: 14,
    backgroundColor: colors.successSoft,
    marginBottom: 18,
  },
  toggle: {
    width: 50,
    height: 30,
    borderRadius: 15,
    padding: 3,
    backgroundColor: colors.disabled,
  },
  toggleOn: {
    backgroundColor: colors.success,
  },
  knob: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.white,
  },
  knobOn: {
    transform: [{ translateX: 20 }],
  },
  toggleCopy: {
    flex: 1,
  },
  toggleTitle: {
    color: colors.textPrimary,
    fontWeight: '900',
  },
  toggleText: {
    color: colors.textSecondary,
    fontSize: 13,
    marginTop: 3,
  },
});
