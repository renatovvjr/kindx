import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Dimensions,
  Alert,
} from 'react-native';

export default function FeedDetailsScreen({ route, navigation }: any) {
  const { item } = route.params;
  const screenWidth = Dimensions.get('window').width;

  const isRequest = item.type === 'request';
  const isOffer = item.type === 'offer';

  const handleAction = () => {
    if (isRequest) {
      Alert.alert(
        'Você quer ajudar',
        'Obrigado por querer ajudar! Em breve será possível entrar em contato diretamente com quem fez o pedido.'
      );
    }

    if (isOffer) {
      Alert.alert(
        'Você precisa dessa ajuda',
        'Ótimo! Em breve será possível combinar diretamente com quem ofereceu a ajuda.'
      );
    }
  };

  const handleOpenMap = () => {
    if (!item.latitude || !item.longitude) {
      Alert.alert(
        'Sem localização',
        'Este pedido/oferta ainda não tem localização no mapa.'
      );
      return;
    }

    // Agora vamos para uma TELA específica de mapa focado, e não para a aba Mapa
    navigation.navigate('MapFocused', { item });
  };

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={[styles.content, { alignItems: 'center' }]}
    >
      <Pressable onPress={() => navigation.goBack()} style={styles.backWrapper}>
        <Text style={styles.back}>← Voltar</Text>
      </Pressable>

      <View style={[styles.card, { width: screenWidth * 0.92 }]}>
        <View style={styles.headerRow}>
          <Text
            style={[
              styles.typePill,
              isRequest ? styles.typePillRequest : styles.typePillOffer,
            ]}
          >
            {isRequest ? 'Pedido de Ajuda' : 'Oferta de Ajuda'}
          </Text>
        </View>

        <Text style={styles.title}>{item.title}</Text>

        {isRequest && item.category ? (
          <Text style={styles.category}>Categoria: {item.category}</Text>
        ) : null}

        {item.location ? (
          <Text style={styles.location}>📍 {item.location}</Text>
        ) : null}

        <View style={styles.separator} />

        <Text style={styles.sectionLabel}>Detalhes</Text>

        <Text style={styles.description}>
          {item.description || 'Sem descrição detalhada.'}
        </Text>

        <Pressable style={styles.actionButton} onPress={handleAction}>
          <Text style={styles.actionButtonText}>
            {isRequest ? 'Quero ajudar' : 'Preciso dessa ajuda'}
          </Text>
        </Pressable>

        <Pressable style={styles.mapButton} onPress={handleOpenMap}>
          <Text style={styles.mapButtonText}>Ver no mapa</Text>
        </Pressable>

        <View style={styles.footer}>
          <Text style={styles.date}>
            Publicado em:{' '}
            {item.created_at
              ? new Date(item.created_at).toLocaleString('pt-BR')
              : '-'}
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  content: {
    paddingTop: 40,
    paddingBottom: 40,
  },
  backWrapper: {
    alignSelf: 'flex-start',
    marginLeft: 16,
    marginBottom: 20,
  },
  back: {
    color: '#00B8D9',
    fontWeight: '600',
    fontSize: 18,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
  headerRow: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  typePill: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 999,
    fontSize: 12,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  typePillRequest: { backgroundColor: '#F97316' },
  typePillOffer: { backgroundColor: '#059669' },
  title: {
    fontSize: 22,
    fontWeight: '800',
    marginBottom: 6,
    color: '#111827',
  },
  category: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 6,
  },
  location: {
    fontSize: 14,
    color: '#374151',
    marginBottom: 12,
  },
  separator: {
    height: 1,
    backgroundColor: '#E5E7EB',
    marginVertical: 14,
  },
  sectionLabel: {
    fontSize: 15,
    fontWeight: '700',
    color: '#4B5563',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: '#4B5563',
    lineHeight: 24,
    marginBottom: 20,
  },
  actionButton: {
    backgroundColor: '#00B8D9',
    paddingVertical: 12,
    borderRadius: 999,
    alignItems: 'center',
    marginBottom: 10,
  },
  actionButtonText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 16,
  },
  mapButton: {
    borderWidth: 1,
    borderColor: '#00B8D9',
    paddingVertical: 10,
    borderRadius: 999,
    alignItems: 'center',
    marginBottom: 16,
  },
  mapButtonText: {
    color: '#00B8D9',
    fontWeight: '700',
    fontSize: 15,
  },
  footer: {
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
    paddingTop: 10,
  },
  date: {
    fontSize: 12,
    color: '#9CA3AF',
  },
});







