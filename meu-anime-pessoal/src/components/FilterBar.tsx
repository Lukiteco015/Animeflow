import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { AnimeFilter } from '../types/anime';

interface Props {
  activeFilter: AnimeFilter;
  onFilterChange: (filter: AnimeFilter) => void;
}

export function AnimeFilters({ activeFilter, onFilterChange }: Props) {
  const filters: { label: string; value: AnimeFilter }[] = [
    { label: 'Todos', value: 'all' },
    { label: 'Assistindo', value: 'watching' },
    { label: 'Planejando', value: 'plan' },
    { label: 'Finalizados', value: 'completed' },
    { label: 'Dropados', value: 'dropped' },
  ];

  return (
    <View style={styles.container}>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {filters.map((filter) => {
          const isActive = activeFilter === filter.value;

          return (
            <TouchableOpacity
              key={filter.value}
              onPress={() => onFilterChange(filter.value)}
              style={[
                styles.button,
                isActive && styles.buttonActive
              ]}
            >
              <Text style={[
                styles.buttonText,
                isActive && styles.buttonTextActive
              ]}>
                {filter.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 15,
    height: 40,
  },
  scrollContent: {
    paddingHorizontal: 20,
    gap: 10,
  },
  button: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonActive: {
    backgroundColor: '#4F46E5',
    borderColor: '#4F46E5',
  },
  buttonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#4B5563',
  },
  buttonTextActive: {
    color: '#FFFFFF',
  },
});