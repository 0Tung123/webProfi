export interface ProcessStep {
  stepId: string;
  step: string;
  title: string;
  description: string;
  order: number;
}

export interface ProcessSection {
  processId: string;
  category: string;
  title: string;
  description: string;
  order: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  steps: ProcessStep[];
}

export interface ProcessStepInput {
  step: string;
  title: string;
  description: string;
  order?: number;
}

export interface CreateProcessInput {
  category: string;
  title: string;
  description: string;
  steps?: ProcessStepInput[];
  order?: number;
}

export interface UpdateProcessInput {
  title?: string;
  description?: string;
  order?: number;
  isActive?: boolean;
  steps?: (ProcessStepInput & { stepId?: string })[];
}