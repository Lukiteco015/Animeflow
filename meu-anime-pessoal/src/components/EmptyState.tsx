import React from 'react';
import { View, Text } from 'react-native';
import { AnimeFilter } from '../types/anime';

interface EmptyStateProps {
  filter: AnimeFilter;
}

const MESSAGES: Record<
  AnimeFilter,
  { emoji: string; title: string; subtitle: string }
> = {
  all: {
    emoji: '📺',
    title: 'Sua lista está vazia!',
    subtitle: 'Busque seus animes favoritos e comece a organizar sua maratona.',
  },
  watching: {
    emoji: '🍿',
    title: 'Nada sendo assistido',
    subtitle: 'Que tal começar um novo episódio hoje?',
  },
  plan: {
    emoji: '📝',
    title: 'Lista de desejos vazia',
    subtitle: 'Encontrou algo legal? Adicione aqui para não esquecer de ver depois.',
  },
  completed: {
    emoji: '🏆',
    title: 'Nenhum anime finalizado',
    subtitle: 'Complete uma série para ver sua coleção de conquistas crescer!',
  },
  dropped: {
    emoji: '🗑️',
    title: 'Nenhum anime dropado',
    subtitle: 'Parece que você tem bom gosto e termina tudo o que começa!',
  },
};

export function EmptyState({ filter }: EmptyStateProps) {
  const { emoji, title, subtitle } = MESSAGES[filter];
  
  return (
    <View className="flex-1 items-center justify-center px-8 py-16">
      <Text className="text-6xl mb-4">{emoji}</Text>
      <Text className="text-xl font-bold text-gray-700 text-center mb-2">
        {title}
      </Text>
      <Text className="text-sm text-gray-400 text-center leading-5">
        {subtitle}
      </Text>
    </View>
  );
}