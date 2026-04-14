import React from "react";
import { View, FlatList, TouchableOpacity, Text, ActivityIndicator } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useAnimes } from "../src/hooks/useAnimes";
import { AnimeCard } from "../src/components/AnimeItem";
import { AnimeFilters } from "../src/components/FilterBar";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function HomeScreen() {
  const router = useRouter();
  const { t } = useLocalSearchParams();

  const {
    animes,
    filter,
    loading,
    setFilter,
    updateProgress,
    removeAnime,
    reload,
  } = useAnimes();

  React.useEffect(() => {
    if (t) reload();
  }, [t]);

  return (
    <View className="flex-1 bg-gray-50">
      <AnimeFilters activeFilter={filter} onFilterChange={setFilter} />
      {loading ? (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#4f46e5" />
        </View>
      ) : (
        <FlatList
          data={animes}
          keyExtractor={(item, index) => `${item.id}-${index}`}
          contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 100 }}
          renderItem={({ item }) => (
            <AnimeCard anime={item} onDelete={removeAnime} onUpdateProgress={updateProgress} />
          )}
          ListEmptyComponent={() => (
            <View className="items-center justify-center mt-20">
              <MaterialCommunityIcons name="television-off" size={64} color="#9ca3af" />
              <Text className="text-gray-500 mt-4 text-center px-10">
                Sua lista está vazia. Comece adicionando um anime!
              </Text>
            </View>
          )}
        />
      )}
      <TouchableOpacity
        onPress={() => router.push("/search")}
        activeOpacity={0.8}
        className="absolute bottom-8 right-8 bg-indigo-600 w-16 h-16 rounded-full justify-center items-center"
        style={{ elevation: 5 }}
      >
        <MaterialCommunityIcons name="plus" size={32} color="white" />
      </TouchableOpacity>
    </View>
  );
}