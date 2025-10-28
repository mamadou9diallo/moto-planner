import { Request, Response } from 'express';
import { RideService } from '../services/ride.service';
import { NewRide } from '../models/ride.model';

export class RideController {
  // GET /rides
  static async getAll(req: Request, res: Response) {
    try {
      const rides = await RideService.getAll();
      res.json(rides);
    } catch {
      res.status(500).json({ error: 'Erreur lors de la récupération des balades' });
    }
  }

  // GET /rides/:id
  static async getById(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      if (isNaN(id)) return res.status(400).json({ error: 'ID invalide' });

      const ride = await RideService.getById(id);
      if (!ride) return res.status(404).json({ error: 'Balade non trouvée' });

      res.json(ride);
    } catch {
      res.status(500).json({ error: 'Erreur lors de la récupération de la balade' });
    }
  }

  // POST /rides
  static async create(req: Request, res: Response) {
    try {
      const ride: NewRide = req.body;
      if (!ride.title || !ride.startPoint || !ride.endPoint) {
        return res.status(400).json({ error: 'Champs requis manquants' });
      }

      const id = await RideService.create(ride);
      res.status(201).json({ id, ...ride });
    } catch {
      res.status(500).json({ error: 'Erreur lors de la création de la balade' });
    }
  }

  // PUT /rides/:id
  static async update(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const data: NewRide = req.body;

      if (isNaN(id) || !data.title) return res.status(400).json({ error: 'Requête invalide' });

      const ride = await RideService.getById(id);
      if (!ride) return res.status(404).json({ error: 'Balade non trouvée' });

      await RideService.update(id, data);
      res.json({ id, ...data });
    } catch {
      res.status(500).json({ error: 'Erreur lors de la mise à jour de la balade' });
    }
  }

  // DELETE /rides/:id
  static async delete(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      if (isNaN(id)) return res.status(400).json({ error: 'ID invalide' });

      const ride = await RideService.getById(id);
      if (!ride) return res.status(404).json({ error: 'Balade non trouvée' });

      await RideService.delete(id);
      res.json({ message: 'Balade supprimée avec succès' });
    } catch {
      res.status(500).json({ error: 'Erreur lors de la suppression de la balade' });
    }
  }
}
