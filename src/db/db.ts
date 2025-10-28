import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import path from 'path';

const dbPath = path.resolve(__dirname, '../../moto_planner.db');

export const initDb = async () => {
  const db = await open({
    filename: dbPath,
    driver: sqlite3.Database
  });

  await db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      pseudo TEXT NOT NULL,
      email TEXT
    );
  `);

  await db.exec(`
    CREATE TABLE IF NOT EXISTS motorcycles (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      brand TEXT NOT NULL,
      model TEXT NOT NULL,
      year INTEGER NOT NULL,
      userId INTEGER,
      FOREIGN KEY (userId) REFERENCES users(id)
    );
  `);

  await db.exec(`
    CREATE TABLE IF NOT EXISTS rides (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT,
      startPoint TEXT NOT NULL,
      endPoint TEXT NOT NULL,
      distanceKm REAL NOT NULL,
      difficulty TEXT CHECK (difficulty IN ('Facile', 'Moyenne', 'Difficile')) NOT NULL,
      createdAt TEXT NOT NULL,
      userId INTEGER,
      motorcycleId INTEGER,
      FOREIGN KEY (userId) REFERENCES users(id),
      FOREIGN KEY (motorcycleId) REFERENCES motorcycles(id)
    );
  `);

  return db;
};
