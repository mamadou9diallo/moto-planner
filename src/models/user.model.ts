export interface User {
  id: number;
  pseudo: string;
  email?: string;
}

export interface NewUser {
  pseudo: string;
  email?: string;
}
