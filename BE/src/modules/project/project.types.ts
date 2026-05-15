export interface Project {
  projectId: string;
  title: string;
  category: string;
  description?: string | null;
  image: string;
  order: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateProjectInput {
  title: string;
  category: string;
  description?: string;
  image: string;
  order?: number;
}

export interface UpdateProjectInput {
  title?: string;
  category?: string;
  description?: string;
  image?: string;
  order?: number;
  isActive?: boolean;
}