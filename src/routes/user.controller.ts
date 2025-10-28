import { Request, Response } from 'express';
import { UserService } from '../services/user.service';
import { NewUser } from '../models/user.model';

export class UserController {
  // GET /users
  static async getAll(req: Request, res: Response) {
    try {
      const users = await UserService.getAll();
      res.json(users);
    } catch {
      res.status(500).json({ error: 'Erreur lors de la récupération des utilisateurs' });
    }
  }

  // GET /users/:id
  static async getById(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      if (isNaN(id)) return res.status(400).json({ error: 'ID invalide' });

      const user = await UserService.getById(id);
      if (!user) return res.status(404).json({ error: 'Utilisateur non trouvé' });

      res.json(user);
    } catch {
      res.status(500).json({ error: 'Erreur lors de la récupération de l’utilisateur' });
    }
  }

  // POST /users
  static async create(req: Request, res: Response) {
    try {
      const user: NewUser = req.body;
      if (!user.pseudo) return res.status(400).json({ error: 'Le pseudo est requis' });

      const id = await UserService.create(user);
      res.status(201).json({ id, ...user });
    } catch {
      res.status(500).json({ error: 'Erreur lors de la création de l’utilisateur' });
    }
  }

  // PUT /users/:id
  static async update(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const data: NewUser = req.body;

      if (isNaN(id) || !data.pseudo) return res.status(400).json({ error: 'Requête invalide' });

      const user = await UserService.getById(id);
      if (!user) return res.status(404).json({ error: 'Utilisateur non trouvé' });

      await UserService.update(id, data);
      res.json({ id, ...data });
    } catch {
      res.status(500).json({ error: 'Erreur lors de la mise à jour de l’utilisateur' });
    }
  }

  // DELETE /users/:id
  static async delete(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      if (isNaN(id)) return res.status(400).json({ error: 'ID invalide' });

      const user = await UserService.getById(id);
      if (!user) return res.status(404).json({ error: 'Utilisateur non trouvé' });

      await UserService.delete(id);
      res.json({ message: 'Utilisateur supprimé avec succès' });
    } catch {
      res.status(500).json({ error: 'Erreur lors de la suppression de l’utilisateur' });
    }
  }
}
