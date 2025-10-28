import { Motorcycle, NewMotorcycle } from '../models/motorcycle.model';
import { initDb } from '../db/db';

export class MotorcycleService {
  static async create(moto: NewMotorcycle): Promise<number> {
    const db = await initDb();
    const result = await db.run(
      `INSERT INTO motorcycles (brand, model, year, userId) VALUES (?, ?, ?, ?)`,
      moto.brand,
      moto.model,
      moto.year,
      moto.userId
    );
    if (result.lastID === undefined) {
  throw new Error('Erreur lors de l’insertion de la moto.');
}
return result.lastID;

  }

  static async getAll(): Promise<Motorcycle[]> {
    const db = await initDb();
    return await db.all(`SELECT * FROM motorcycles`);
  }

  static async getById(id: number): Promise<Motorcycle | undefined> {
    const db = await initDb();
    return await db.get(`SELECT * FROM motorcycles WHERE id = ?`, id);
  }

  static async update(id: number, data: NewMotorcycle): Promise<void> {
  const db = await initDb();
  await db.run(
    `UPDATE motorcycles SET brand = ?, model = ?, year = ? WHERE id = ?`,
    data.brand,
    data.model,
    data.year,
    id
  );
}

static async delete(id: number): Promise<void> {
  const db = await initDb();
  await db.run(`DELETE FROM motorcycles WHERE id = ?`, id);
}


}
