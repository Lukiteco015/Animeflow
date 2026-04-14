import React, { useState } from 'react';
import { View, TextInput, FlatList, Text, Image, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useSQLiteContext } from 'expo-sqlite';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as AnimeService from '../src/services/animeService';
import { JikanAnime } from '../src/types/anime';

export default function SearchScreen() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<JikanAnime[]>([]);
  const [loading, setLoading] = useState(false);
  const db = useSQLiteContext();
  const router = useRouter();

  const handleSearch = async (text: string) => {
    setQuery(text);
    if (text.length < 3) return;

    setLoading(true);
    const data = await AnimeService.searchAnimeFromJikan(text);
    setResults(data);
    setLoading(false);
  };

  const handleAddAnime = async (item: JikanAnime) => {
    try {
      await AnimeService.createAnime(db, {
        id: item.mal_id,
        title: item.title,
        imageUrl: item.images.jpg.image_url,
        totalEpisodes: item.episodes || 0,
        releaseYear: item.year,
        status: 'Watching',
      });
      
      Alert.alert("Sucesso!", `${item.title} foi adicionado à sua lista.`);
      router.replace('/');
    } catch (error) {
      Alert.alert("Aviso", "Este anime já está na sua lista!");
    }
  };

  return (
    <View className="flex-1 bg-white p-4">
      {/* Barra de Busca */}
      <View className="flex-row items-center bg-gray-100 rounded-xl px-4 mb-4">
        <MaterialCommunityIcons name="magnify" size={24} color="#6b7280" />
        <TextInput
          className="flex-1 p-4 text-gray-800"
          placeholder="Digite o nome do anime..."
          value={query}
          onChangeText={handleSearch}
        />
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#4f46e5" className="mt-10" />
      ) : (
        <FlatList
          data={results}
          keyExtractor={(item) => item.mal_id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity 
              onPress={() => handleAddAnime(item)}
              className="flex-row items-center mb-4 bg-gray-50 p-2 rounded-lg"
            >
              <Image 
                source={{ uri: item.images.jpg.image_url }} 
                className="w-16 h-24 rounded-md" 
              />
              <View className="ml-4 flex-1">
                <Text className="text-lg font-bold text-gray-800" numberOfLines={2}>
                  {item.title}
                </Text>
                <Text className="text-gray-500">
                  {item.year || 'Ano desconhecido'} • {item.episodes || '?'} eps
                </Text>
              </View>
              <MaterialCommunityIcons name="plus-circle" size={32} color="#4f46e5" />
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
}