import apiClient from './apiClient';

export interface HeroConfig {
  id: string;
  title1: string;
  title2: string;
  subtext: string;
  mediaUrl: string;
  mediaType: 'image' | 'video';
  updatedAt: string;
}

export interface UpdateHeroDto {
  title1?: string;
  title2?: string;
  subtext?: string;
  mediaUrl?: string;
  mediaType?: 'image' | 'video';
}

export const heroService = {
  async get(): Promise<HeroConfig> {
    const response = await apiClient.get('/hero');
    return response.data;
  },

  async update(data: UpdateHeroDto): Promise<HeroConfig> {
    const response = await apiClient.put('/hero', data);
    return response.data;
  },
};
