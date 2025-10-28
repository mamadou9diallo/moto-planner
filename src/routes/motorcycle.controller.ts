import { Request, Response } from 'express';
import { MotorcycleService } from '../services/motorcycle.service';
import { NewMotorcycle } from '../models/motorcycle.model';

export class MotorcycleController {
  // GET /motorcycles
  static async getAll(req: Request, res: Response) {
    try {
      const motos = await MotorcycleService.getAll();
      res.json(motos);
    } catch {
      res.status(500).json({ error: "Erreur lors de la récupération des motos" });
    }
  }

  // GET /motorcycles/:id
  static async getById(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      if (isNaN(id)) return res.status(400).json({ error: "ID invalide" });

      const moto = await MotorcycleService.getById(id);
      if (!moto) return res.status(404).json({ error: "Moto non trouvée" });

      res.json(moto);
    } catch {
      res.status(500).json({ error: "Erreur lors de la récupération de la moto" });
    }
  }

  // POST /motorcycles
  static async create(req: Request, res: Response) {
    try {
      const moto: NewMotorcycle = req.body;
      if (!moto.brand || !moto.model || !moto.year) {
        return res.status(400).json({ error: "Champs requis manquants" });
      }

      const id = await MotorcycleService.create(moto);
      res.status(201).json({ id, ...moto });
    } catch {
      res.status(500).json({ error: "Erreur lors de la création de la moto" });
    }
  }

  // PUT /motorcycles/:id
  static async update(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const data: NewMotorcycle = req.body;

      if (isNaN(id) || !data.brand || !data.model || !data.year) {
        return res.status(400).json({ error: "Requête invalide" });
      }

      const moto = await MotorcycleService.getById(id);
      if (!moto) return res.status(404).json({ error: "Moto non trouvée" });

      await MotorcycleService.update(id, data);
      res.json({ id, ...data });
    } catch {
      res.status(500).json({ error: "Erreur lors de la mise à jour de la moto" });
    }
  }

  // DELETE /motorcycles/:id
  static async delete(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      if (isNaN(id)) return res.status(400).json({ error: "ID invalide" });

      const moto = await MotorcycleService.getById(id);
      if (!moto) return res.status(404).json({ error: "Moto non trouvée" });

      await MotorcycleService.delete(id);
      res.json({ message: "Moto supprimée avec succès" });
    } catch {
      res.status(500).json({ error: "Erreur lors de la suppression de la moto" });
    }
  }
}
