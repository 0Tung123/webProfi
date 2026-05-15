-- CreateTable
CREATE TABLE "hero_config" (
    "id" TEXT NOT NULL DEFAULT 'hero-main',
    "title1" TEXT NOT NULL DEFAULT 'WE COMPLETE',
    "title2" TEXT NOT NULL DEFAULT 'YOUR CREATIVE IDEAS',
    "subtext" TEXT NOT NULL DEFAULT 'HAT Studio is a visionary design agency that breathes life into ideas and transforms them into extraordinary realities.',
    "mediaUrl" TEXT NOT NULL DEFAULT 'https://res.cloudinary.com/dykmrgu8e/image/upload/v1778861498/hat-studio/blq1qtdlokrit4cbmhvp.jpg',
    "mediaType" TEXT NOT NULL DEFAULT 'image',
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "hero_config_pkey" PRIMARY KEY ("id")
);
