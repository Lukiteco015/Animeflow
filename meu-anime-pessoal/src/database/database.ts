import * as SQLite from 'expo-sqlite';

const DATABASE_NAME = 'anime.db';
let database: SQLite.SQLiteDatabase | null = null;

export async function getDatabase(): Promise<SQLite.SQLiteDatabase> {
  if (database !== null) {
    return database;
  }
  database = await SQLite.openDatabaseAsync(DATABASE_NAME);
  await runMigrations(database);
  return database;
}

export async function initializeDatabase(db: SQLite.SQLiteDatabase) {
  await runMigrations(db);
}

async function runMigrations(db: SQLite.SQLiteDatabase): Promise<void> {
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS animes (
    id INTEGER PRIMARY KEY NOT NULL,
    title TEXT NOT NULL,
    imageUrl TEXT NOT NULL,
    totalEpisodes INTEGER NOT NULL,
    releaseYear INTEGER,
    currentEpisode INTEGER DEFAULT 0,
    status TEXT CHECK(status IN ('Watching', 'Plan to Watch', 'Completed', 'Dropped')) NOT NULL,
    rating INTEGER DEFAULT 0,
    comment TEXT,
    updatedAt TEXT NOT NULL
);
  `);
}