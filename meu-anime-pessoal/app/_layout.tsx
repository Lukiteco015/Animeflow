import '../global.css'; 
import { Stack } from 'expo-router';
import { SQLiteProvider } from 'expo-sqlite';
import { initializeDatabase } from '../src/database/database';

export default function RootLayout() {
  return (
    <SQLiteProvider databaseName="anime.db" onInit={initializeDatabase}>
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: '#4f46e5' },
          headerTintColor: '#ffffff',
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      >
        <Stack.Screen name="index" options={{ title: 'Meu Animeflow' }} />
        <Stack.Screen name="search" options={{ title: '🔍 Buscar Anime' }} />
        <Stack.Screen
          name="edit"
          options={{
            title: '📝 Editar',
            presentation: 'card',
          }}
        />
      </Stack>
    </SQLiteProvider>
  );
}