import sharp from 'sharp';
import { readdir, unlink, rename } from 'fs/promises';
import { join } from 'path';

const imagesDir = join(process.cwd(), 'public', 'images');

async function convertImages() {
  try {
    const files = await readdir(imagesDir);
    const pngFiles = files.filter(file => file.endsWith('.png'));

    console.log(`Found ${pngFiles.length} PNG files to convert`);

    for (const file of pngFiles) {
      const inputPath = join(imagesDir, file);
      const outputPath = join(imagesDir, file.replace('.png', '.webp'));

      await sharp(inputPath)
        .webp({ quality: 85, lossless: false })
        .toFile(outputPath);

      console.log(`Converted: ${file} -> ${file.replace('.png', '.webp')}`);

      // Optionally delete original PNG
      // await unlink(inputPath);
      // console.log(`Deleted original: ${file}`);
    }

    console.log('Conversion complete!');
  } catch (error) {
    console.error('Error converting images:', error);
    process.exit(1);
  }
}

convertImages();
