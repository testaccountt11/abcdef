import { Router } from 'express';
import { upload, handleUploadError } from '../utils/upload';

const router = Router();

// Маршрут для загрузки изображения профиля
router.post('/profile-picture', 
  upload.single('image'), 
  handleUploadError,
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
      }

      // Возвращаем URL загруженного файла
      const fileUrl = `/uploads/${req.file.filename}`;
      res.json({ 
        imageUrl: fileUrl,
        message: 'File uploaded successfully' 
      });
    } catch (error) {
      console.error('Upload error:', error);
      res.status(500).json({ error: 'Failed to process upload' });
    }
  }
);

export default router; 