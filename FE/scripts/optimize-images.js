#!/usr/bin/env node

/**
 * Phase 3: Image Optimization Script
 *
 * This script:
 * 1. Converts PNG images to WebP format
 * 2. Generates blur placeholder data (base64)
 * 3. Updates data.ts with .webp paths and blurDataURL
 * 4. Updates Image components to include placeholder="blur"
 *
 * Run from FE directory: node scripts/optimize-images.js
 */

import { readFileSync, writeFileSync, existsSync } from 'fs';
import path, { join } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Image definitions with blur placeholder data (to be generated)
const images = [
  {
    pngPath: 'public/images/tk.png',
    webpPath: 'public/images/tk.webp',
    blurKey: 'tk',
  },
  {
    pngPath: 'public/images/code.png',
    webpPath: 'public/images/code.webp',
    blurKey: 'code',
  },
  {
    pngPath: 'public/images/camera.png',
    webpPath: 'public/images/camera.webp',
    blurKey: 'camera',
  },
];

// Step 1: Check if sharp is available for conversion
try {
  require('sharp');
} catch (e) {
  console.error('❌ Sharp library not installed. Please run: npm install sharp');
  console.error('Alternatively, manually convert PNG to WebP using an image editor or online tool.');
  process.exit(1);
}

const sharp = require('sharp');

// Step 2: Convert each image to WebP and generate blur data
const blurDataURLs = {};

for (const img of images) {
  const pngFullPath = join(__dirname, '..', img.pngPath);
  const webpFullPath = join(__dirname, '..', img.webpPath);

  if (!existsSync(pngFullPath)) {
    console.warn(`⚠️  Source image not found: ${pngFullPath}`);
    continue;
  }

  try {
    // Convert to WebP (80% quality for good compression)
    await sharp(pngFullPath)
      .webp({ quality: 80 })
      .toFile(webpFullPath);
    console.log(`✓ Converted ${img.pngPath} → ${img.webpPath}`);

    // Generate blur placeholder (10px width, maintain aspect ratio)
    const metadata = await sharp(pngFullPath).metadata();
    const height = Math.round((10 / metadata.width) * metadata.height);

    const blurBuffer = await sharp(pngFullPath)
      .resize(10, height)
      .webp({ quality: 50 })
      .toBuffer();

    const blurBase64 = blurBuffer.toString('base64');
    const blurDataURL = `data:image/webp;base64,${blurBase64}`;
    blurDataURLs[img.blurKey] = blurDataURL;

    console.log(`✓ Generated blur placeholder for ${img.blurKey}`);
  } catch (err) {
    console.error(`❌ Error processing ${img.pngPath}:`, err.message);
  }
}

// Step 3: Update data.ts with WebP paths and blurDataURL
const dataTsPath = join(__dirname, '..', 'app', 'lib', 'data.ts');
let dataTsContent = readFileSync(dataTsPath, 'utf8');

// Replace PNG with WebP in HERO_CARDS
dataTsContent = dataTsContent.replace(
  /src: "\/images\/tk\.png"/g,
  `src: "/images/tk.webp",\n    blurDataURL: "${blurDataURLs.tk || ''}"`
);
dataTsContent = dataTsContent.replace(
  /src: "\/images\/code\.png"/g,
  `src: "/images/code.webp",\n    blurDataURL: "${blurDataURLs.code || ''}"`
);
dataTsContent = dataTsContent.replace(
  /src: "\/images\/camera\.png"/g,
  `src: "/images/camera.webp",\n    blurDataURL: "${blurDataURLs.camera || ''}"`
);

// Replace in SERVICES array
dataTsContent = dataTsContent.replace(
  /image: "\/images\/tk\.png"/g,
  `image: "/images/tk.webp"`
);
dataTsContent = dataTsContent.replace(
  /image: "\/images\/code\.png"/g,
  `image: "/images/code.webp"`
);
dataTsContent = dataTsContent.replace(
  /image: "\/images\/camera\.png"/g,
  `image: "/images/camera.webp"`
);

// Replace in PROJECTS array
dataTsContent = dataTsContent.replace(
  /image: "\/images\/code\.png"/g,
  `image: "/images/code.webp"`
);
dataTsContent = dataTsContent.replace(
  /image: "\/images\/tk\.png"/g,
  `image: "/images/tk.webp"`
);

writeFileSync(dataTsPath, dataTsContent);
console.log('✓ Updated data.ts with WebP paths');

// Step 4: Add placeholder="blur" and blurDataURL to Image components
const sectionsToUpdate = [
  'app/sections/HeroSection.tsx',
  'app/sections/ServicesSection.tsx',
  'app/sections/ProjectsSection.tsx',
];

for (const section of sectionsToUpdate) {
  const sectionPath = join(__dirname, '..', section);
  if (!existsSync(sectionPath)) {
    console.warn(`⚠️  Section not found: ${sectionPath}`);
    continue;
  }

  let content = readFileSync(sectionPath, 'utf8');

  // For HeroSection: Add blurDataURL based on card index
  if (section === 'app/sections/HeroSection.tsx') {
    // Main card (tk)
    content = content.replace(
      /<Image([\s\S]*?)src=\{cards\[0\]\.src\}([\s\S]*?)\/>/,
      `<Image$1src={cards[0].src}$2 placeholder="blur" blurDataURL={cards[0].blurDataURL} />`
    );
    // Top right card (camera)
    content = content.replace(
      /<Image([\s\S]*?)src=\{cards\[2\]\.src\}([\s\S]*?)\/>/,
      `<Image$1src={cards[2].src}$2 placeholder="blur" blurDataURL={cards[2].blurDataURL} />`
    );
    // Bottom left card (code)
    content = content.replace(
      /<Image([\s\S]*?)src=\{cards\[1\]\.src\}([\s\S]*?)\/>/,
      `<Image$1src={cards[1].src}$2 placeholder="blur" blurDataURL={cards[1].blurDataURL} />`
    );
  }

  // For ServicesSection: Add blurDataURL to each service image
  if (section === 'app/sections/ServicesSection.tsx') {
    content = content.replace(
      /<Image([\s\S]*?)src=\{service\.image\}([\s\S]*?)\/>/g,
      `<Image$1src={service.image}$2 placeholder="blur" blurDataURL={service.blurDataURL} />`
    );
  }

  // For ProjectsSection: Add blurDataURL to each project image
  if (section === 'app/sections/ProjectsSection.tsx') {
    content = content.replace(
      /<Image([\s\S]*?)src=\{project\.image\}([\s\S]*?)\/>/,
      `<Image$1src={project.image}$2 placeholder="blur" blurDataURL={project.blurDataURL} />`
    );
  }

  writeFileSync(sectionPath, content);
  console.log(`✓ Updated ${section} with blur placeholders`);
}

console.log('\n✅ Image optimization complete!');
console.log('Next steps:');
console.log('1. Run `npm run build` to verify');
console.log('2. Test in production mode: `npm start`');
console.log('3. Use Lighthouse to measure improvements');
