import { Ride, NewRide } from '../models/ride.model';
import { initDb } from '../db/db';

export class RideService {
  static async create(ride: NewRide): Promise<number> {
    const db = await initDb();
    const result = await db.run(
      `INSERT INTO rides 
        (title, description, startPoint, endPoint, distanceKm, difficulty, createdAt, userId, motorcycleId) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      ride.title,
      ride.description,
      ride.startPoint,
      ride.endPoint,
      ride.distanceKm,
      ride.difficulty,
      new Date().toISOString(),
      ride.userId,
      ride.motorcycleId
    );
    if (result.lastID === undefined) {
  throw new Error('Erreur lors de l’insertion de la balade.');
}
return result.lastID;

  }

  static async getAll(): Promise<Ride[]> {
    const db = await initDb();
    return await db.all(`SELECT * FROM rides`);
  }

  static async getById(id: number): Promise<Ride | undefined> {
    const db = await initDb();
    return await db.get(`SELECT * FROM rides WHERE id = ?`, id);
  }

  static async update(id: number, data: NewRide): Promise<void> {
  const db = await initDb();
  await db.run(
    `UPDATE rides 
     SET title = ?, description = ?, startPoint = ?, endPoint = ?, distanceKm = ?, difficulty = ?, userId = ?, motorcycleId = ? 
     WHERE id = ?`,
    data.title,
    data.description,
    data.startPoint,
    data.endPoint,
    data.distanceKm,
    data.difficulty,
    data.userId,
    data.motorcycleId,
    id
  );
}

static async delete(id: number): Promise<void> {
  const db = await initDb();
  await db.run(`DELETE FROM rides WHERE id = ?`, id);
}


}

