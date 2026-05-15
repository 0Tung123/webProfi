export interface ContactSubmission {
  contactId: string;
  name: string;
  email: string;
  phone?: string | null;
  message: string;
  read: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateContactInput {
  name: string;
  email: string;
  phone?: string;
  message: string;
}

export interface UpdateContactInput {
  read?: boolean;
}