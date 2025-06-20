export interface Regret {
  id: number;
  content: string;
  author?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateRegretDto {
  content: string;
  author?: string;
}

export interface UpdateRegretDto {
  content?: string;
  author?: string;
}

