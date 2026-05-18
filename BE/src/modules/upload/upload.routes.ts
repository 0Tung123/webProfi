import { Router, Request, Response } from 'express';
import multer from 'multer';
import { storage } from '../../lib/cloudinary';

const router = Router();

interface MulterFile {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  buffer: Buffer;
  size: number;
  path: string;
}

// Configure multer with Cloudinary storage
const upload = multer({
  storage,
  limits: {
    fileSize: 100 * 1024 * 1024,
  },
  fileFilter: (_req, file, cb) => {
    if (file.mimetype.startsWith('image/') || file.mimetype.startsWith('video/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image and video files are allowed'));
    }
  },
});

// Upload single image or video
router.post('/upload', upload.single('file'), (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, error: 'No file uploaded' });
    }
    const result = req.file as MulterFile & { path: string };
    console.log('Upload successful:', result.path);
    res.json({
      success: true,
      data: {
        url: result.path,
        publicId: result.fieldname,
      },
    });
  } catch (error: unknown) {
    console.error('Upload error:', (error as Error).message);
    res.status(500).json({ success: false, error: 'Failed to upload file' });
  }
});

// Upload multiple images
router.post('/upload-multiple', upload.array('images', 10), (req: Request, res: Response) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ success: false, error: 'No files uploaded' });
    }
    const files = req.files as (MulterFile & { path: string })[];
    const urls = files.map((file) => ({
      url: file.path,
      publicId: file.fieldname,
    }));
    console.log('Multiple upload successful:', urls.length, 'files');
    res.json({ success: true, data: urls });
  } catch (error: unknown) {
    console.error('Multiple upload error:', (error as Error).message);
    res.status(500).json({ success: false, error: 'Failed to upload images' });
  }
});

export default router;