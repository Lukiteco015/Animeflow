import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useSQLiteContext } from 'expo-sqlite';
import * as AnimeService from '../src/services/animeService';

type Status = 'Watching' | 'Plan to Watch' | 'Completed' | 'Dropped';

const STATUS_OPTIONS: Status[] = ['Watching', 'Plan to Watch', 'Completed', 'Dropped'];

export default function EditScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const db = useSQLiteContext();
  const router = useRouter();

  const [status, setStatus] = useState<Status>('Watching');
  const [currentEpisode, setCurrentEpisode] = useState('0');
  const [totalEpisodes, setTotalEpisodes] = useState(0);
  const [rating, setRating] = useState('0');
  const [comment, setComment] = useState('');

  useEffect(() => {
    if (id) {
      AnimeService.getAnimeById(db, Number(id)).then((anime) => {
        if (anime) {
          setStatus(anime.status);
          setCurrentEpisode(String(anime.currentEpisode));
          setTotalEpisodes(anime.totalEpisodes);
          setRating(String(anime.rating));
          setComment(anime.comment ?? '');
        }
      });
    }
  }, [id]);

  const handleEpisodeChange = (text: string) => {
    const onlyNumbers = text.replace(/[^0-9]/g, '');
    if (onlyNumbers === '') {
      setCurrentEpisode('');
      return;
    }
    const value = Number(onlyNumbers);
    if (totalEpisodes > 0 && value > totalEpisodes) {
      setCurrentEpisode(String(totalEpisodes));
    } else {
      setCurrentEpisode(String(value));
    }
  };

  const handleRatingChange = (text: string) => {
    const onlyNumbers = text.replace(/[^0-9]/g, '');
    if (onlyNumbers === '') {
      setRating('');
      return;
    }
    const value = Number(onlyNumbers);
    if (value > 10) {
      setRating('10');
    } else {
      setRating(String(value));
    }
  };

  const handleSave = async () => {
    const episode = Number(currentEpisode) || 0;
    const ratingValue = Number(rating) || 0;

    if (episode < 0) {
      Alert.alert('Valor inválido', 'O episódio não pode ser negativo.');
      return;
    }

    if (totalEpisodes > 0 && episode > totalEpisodes) {
      Alert.alert('Valor inválido', `Este anime tem apenas ${totalEpisodes} episódios.`);
      return;
    }

    if (ratingValue < 0 || ratingValue > 10) {
      Alert.alert('Valor inválido', 'A nota deve ser entre 0 e 10.');
      return;
    }

    try {
      await AnimeService.updateAnime(db, {
        id: Number(id),
        status,
        currentEpisode: episode,
        rating: ratingValue,
        comment: comment || null,
      });

      router.back();
    } catch (error) {
      console.log('ERRO:', error);
      Alert.alert('Erro', 'Não foi possível salvar as alterações.');
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={{ padding: 24 }}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={{ color: '#4B5563', marginBottom: 4 }}>
          Episódio atual {totalEpisodes > 0 ? `(máx: ${totalEpisodes})` : ''}
        </Text>
        <TextInput
          style={{ borderWidth: 1, borderColor: '#E5E7EB', borderRadius: 8, padding: 12, marginBottom: 16, color: '#1F2937' }}
          keyboardType="numeric"
          value={currentEpisode}
          onChangeText={handleEpisodeChange}
        />

        <Text style={{ color: '#4B5563', marginBottom: 4 }}>Nota (0-10)</Text>
        <TextInput
          style={{ borderWidth: 1, borderColor: '#E5E7EB', borderRadius: 8, padding: 12, marginBottom: 16, color: '#1F2937' }}
          keyboardType="numeric"
          value={rating}
          onChangeText={handleRatingChange}
          placeholder="0 a 10"
          maxLength={2}
        />

        <Text style={{ color: '#4B5563', marginBottom: 4 }}>Comentário</Text>
        <TextInput
          style={{ borderWidth: 1, borderColor: '#E5E7EB', borderRadius: 8, padding: 12, marginBottom: 16, color: '#1F2937' }}
          multiline
          numberOfLines={3}
          value={comment}
          onChangeText={setComment}
          placeholder="Opcional..."
        />

        <Text style={{ color: '#4B5563', marginBottom: 8 }}>Status</Text>
        {STATUS_OPTIONS.map((s) => (
          <TouchableOpacity
            key={s}
            onPress={() => setStatus(s)}
            style={{
              padding: 12,
              borderRadius: 8,
              marginBottom: 8,
              borderWidth: 1,
              backgroundColor: status === s ? '#4F46E5' : '#F9FAFB',
              borderColor: status === s ? '#4F46E5' : '#E5E7EB',
            }}
          >
            <Text style={{ color: status === s ? '#FFFFFF' : '#374151', fontWeight: status === s ? '700' : '400' }}>
              {s}
            </Text>
          </TouchableOpacity>
        ))}

        <TouchableOpacity
          onPress={handleSave}
          style={{ backgroundColor: '#4F46E5', padding: 16, borderRadius: 12, marginTop: 16, marginBottom: 32 }}
          activeOpacity={0.8}
        >
          <Text style={{ color: '#FFFFFF', textAlign: 'center', fontWeight: '700', fontSize: 16 }}>
            Salvar
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}