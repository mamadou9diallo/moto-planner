import { User, NewUser } from '../models/user.model';
import { initDb } from '../db/db';
import { error } from 'console';

export class UserService {
  static async create(user: NewUser ): Promise<number> {
    const db = await initDb();
    const result = await db.run(
      `INSERT INTO users (pseudo, email) VALUES (?, ?)`,
      user.pseudo,
      user.email
    );
    if(result.lastID == undefined){
        throw new Error("Erreur lors de l'ajout de l'utilisateur ")
    }
    return result.lastID;
  }

  static async getAll(): Promise<User[]> {
    const db = await initDb();
    return await db.all(`SELECT * FROM users`);
  }

  static async getById(id: number): Promise<User | undefined> {
    const db = await initDb();
    return await db.get(`SELECT * FROM users WHERE id = ?`, id);
  }

  static async update(id: number, data: NewUser): Promise<void> {
  const db = await initDb();
  await db.run(
    `UPDATE users SET pseudo = ?, email = ? WHERE id = ?`,
    data.pseudo,
    data.email,
    id
  );
}

static async delete(id: number): Promise<void> {
  const db = await initDb();
  await db.run(`DELETE FROM users WHERE id = ?`, id);
}


}
