export interface Service {
  serviceId: string;
  title: string;
  description: string;
  image: string;
  order: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateServiceInput {
  title: string;
  description: string;
  image: string;
  order?: number;
}

export interface UpdateServiceInput {
  title?: string;
  description?: string;
  image?: string;
  order?: number;
  isActive?: boolean;
}