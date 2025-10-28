export interface Ride {
  id: number;
  title: string;
  description: string;
  startPoint: string;
  endPoint: string;
  distanceKm: number;
  difficulty: 'Facile' | 'Moyenne' | 'Difficile';
  createdAt: string;
  userId: number;
  motorcycleId: number;
}

export interface NewRide {
  title: string;
  description: string;
  startPoint: string;
  endPoint: string;
  distanceKm: number;
  difficulty: 'Facile' | 'Moyenne' | 'Difficile';
  userId: number;
  motorcycleId: number;
}
