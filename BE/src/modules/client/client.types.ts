export interface Client {
  clientId: string;
  name: string;
  logo?: string | null;
  website?: string | null;
  order: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateClientInput {
  name: string;
  logo?: string;
  website?: string;
  order?: number;
}

export interface UpdateClientInput {
  name?: string;
  logo?: string;
  website?: string;
  order?: number;
  isActive?: boolean;
}