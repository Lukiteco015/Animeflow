import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Anime } from '../types/anime';

interface Props {
  anime: Anime;
  onDelete: (id: number) => void;
  onUpdateProgress: (id: number, newEpisode: number) => void;
}

export function AnimeCard({ anime, onDelete, onUpdateProgress }: Props) {
  const router = useRouter();

  const handleDelete = () => {
    Alert.alert(
      "Remover Anime",
      `Tem certeza que deseja remover "${anime.title}" da sua lista?`,
      [
        { text: "Cancelar", style: "cancel" },
        { text: "Remover", style: "destructive", onPress: () => onDelete(anime.id) }
      ]
    );
  };

  return (
    <View style={styles.card}>
      {/* Pôster do Anime */}
      <Image source={{ uri: anime.imageUrl }} style={styles.image} />

      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title} numberOfLines={1}>{anime.title}</Text>
          <Text style={styles.year}>{anime.releaseYear || 'N/A'}</Text>
        </View>

        <Text style={styles.status}>{anime.status}</Text>

        {/* Controle de Progresso */}
        <View style={styles.progressContainer}>
          <Text style={styles.progressText}>
            Ep: {anime.currentEpisode} / {anime.totalEpisodes || '??'}
          </Text>
          
          <View style={styles.controls}>
            <TouchableOpacity 
              onPress={() => onUpdateProgress(anime.id, anime.currentEpisode - 1)}
              disabled={anime.currentEpisode <= 0}
              style={styles.controlButton}
            >
              <Ionicons name="remove-circle-outline" size={24} color="#4F46E5" />
            </TouchableOpacity>

            <TouchableOpacity 
              onPress={() => onUpdateProgress(anime.id, anime.currentEpisode + 1)}
              disabled={anime.currentEpisode >= (anime.totalEpisodes || 999)}
              style={styles.controlButton}
            >
              <Ionicons name="add-circle-outline" size={24} color="#4F46E5" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Ações: Editar e Excluir */}
        <View style={styles.actions}>
          <TouchableOpacity 
            onPress={() => router.push({ pathname: '/edit', params: { id: anime.id } })}
            style={styles.actionButton}
          >
            <Ionicons name="create-outline" size={20} color="#4B5563" />
            <Text style={styles.actionText}>Editar</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleDelete} style={styles.actionButton}>
            <Ionicons name="trash-outline" size={20} color="#EF4444" />
            <Text style={[styles.actionText, { color: '#EF4444' }]}>Excluir</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    flexDirection: 'row',
    padding: 12,
    marginBottom: 16,
    // Sombra para iOS e Android
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  image: {
    width: 80,
    height: 120,
    borderRadius: 8,
    backgroundColor: '#E5E7EB',
  },
  content: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'space-between',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
    flex: 1,
    marginRight: 4,
  },
  year: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  status: {
    fontSize: 12,
    color: '#4F46E5',
    fontWeight: '600',
    marginTop: 2,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F9FAFB',
    padding: 6,
    borderRadius: 8,
    marginVertical: 8,
  },
  progressText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#374151',
  },
  controls: {
    flexDirection: 'row',
  },
  controlButton: {
    paddingHorizontal: 4,
  },
  actions: {
    flexDirection: 'row',
    gap: 16,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  actionText: {
    fontSize: 13,
    color: '#4B5563',
  },
});