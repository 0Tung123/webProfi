import apiClient from './apiClient';

export interface UploadResponse {
  url: string;
  publicId: string;
}

export interface MultipleUploadResponse {
  url: string;
  publicId: string;
}

export const uploadService = {
  /**
   * Upload a single file (image or video) to Cloudinary
   */
  async uploadFile(file: File): Promise<UploadResponse> {
    const formData = new FormData();
    formData.append('file', file);

    const response = await apiClient.post('/upload/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  /**
   * Upload multiple images to Cloudinary
   */
  async uploadMultipleImages(files: File[]): Promise<MultipleUploadResponse[]> {
    const formData = new FormData();
    files.forEach((file) => formData.append('images', file));

    const response = await apiClient.post('/upload/upload-multiple', formData, {
      headers: {
        'Content-Type': undefined, // Let browser set multipart/form-data with boundary
      },
    });
    return response.data;
  },
};