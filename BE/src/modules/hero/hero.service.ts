import prisma from '../../lib/prisma';
import { UpdateHeroInput } from './hero.validation';

export const heroService = {
  async getConfig() {
    try {
      let config = await prisma.heroConfig.findUnique({
        where: { id: 'hero-main' },
      });

      if (!config) {
        config = await prisma.heroConfig.create({
          data: {
            id: 'hero-main',
            title1: 'WE COMPLETE',
            title2: 'YOUR CREATIVE IDEAS',
            subtext: 'HAT Studio is a visionary design agency that breathes life into ideas and transforms them into extraordinary realities.',
            mediaUrl: 'https://res.cloudinary.com/dykmrgu8e/image/upload/v1778861498/hat-studio/blq1qtdlokrit4cbmhvp.jpg',
            mediaType: 'image',
          },
        });
      }

      return config;
    } catch (error) {
      console.error('Database error in heroService.getConfig:', error);
      // Return default values if table doesn't exist or DB is not ready
      return {
        id: 'hero-main',
        title1: 'WE COMPLETE',
        title2: 'YOUR CREATIVE IDEAS',
        subtext: 'HAT Studio is a visionary design agency that breathes life into ideas and transforms them into extraordinary realities.',
        mediaUrl: 'https://res.cloudinary.com/dykmrgu8e/image/upload/v1778861498/hat-studio/blq1qtdlokrit4cbmhvp.jpg',
        mediaType: 'image',
      };
    }
  },

  async updateConfig(data: UpdateHeroInput) {
    return prisma.heroConfig.upsert({
      where: { id: 'hero-main' },
      update: data,
      create: {
        id: 'hero-main',
        title1: data.title1 || 'WE COMPLETE',
        title2: data.title2 || 'YOUR CREATIVE IDEAS',
        subtext: data.subtext || 'HAT Studio is a visionary design agency...',
        mediaUrl: data.mediaUrl || '',
        mediaType: data.mediaType || 'image',
      },
    });
  },
};
