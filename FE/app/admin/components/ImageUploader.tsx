'use client';

import { useState, useRef } from 'react';
import { uploadService, UploadResponse } from '@/app/lib/api/upload.service';
import { getApiErrorMessage } from '@/app/lib/types/errors';
import { Upload, X, FileVideo, Image as ImageIcon, CheckCircle } from 'lucide-react';

interface ImageUploaderProps {
  onUploadComplete: (url: string) => void;
  onUploading?: (isUploading: boolean) => void;
  initialValue?: string;
  label?: string;
  acceptedTypes?: string[];
  maxFileSizeMB?: number;
}

export default function ImageUploader({
  onUploadComplete,
  onUploading,
  initialValue = '',
  label = 'Media (Image/Video)',
  acceptedTypes = ['image/jpeg', 'image/png', 'image/webp', 'video/mp4', 'video/quicktime'],
  maxFileSizeMB = 50,
}: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState(initialValue);
  const [error, setError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const isVideo = (url: string) => {
    return url.match(/\.(mp4|mov|webm|ogg|mkv|avi)$|video/i);
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    const isAccepted = acceptedTypes.some(type => {
      if (type.endsWith('/*')) {
        return file.type.startsWith(type.replace('/*', ''));
      }
      return type === file.type;
    });

    if (!isAccepted && acceptedTypes.length > 0) {
      setError(`Please select a valid file type: ${acceptedTypes.join(', ')}`);
      return;
    }

    // Validate file size
    const fileSizeMB = file.size / (1024 * 1024);
    if (fileSizeMB > maxFileSizeMB) {
      setError(`File size must be less than ${maxFileSizeMB}MB`);
      return;
    }

    setError('');
    setUploading(true);
    onUploading?.(true);

    // Create preview
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else if (file.type.startsWith('video/')) {
      setPreview(URL.createObjectURL(file));
    }

    try {
      const result = await uploadService.uploadFile(file);
      onUploadComplete(result.url);
    } catch (err: unknown) {
      setError(getApiErrorMessage(err as Error));
      setPreview('');
    } finally {
      setUploading(false);
      onUploading?.(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleRemove = () => {
    setPreview('');
    onUploadComplete('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-3">
      <label className="block text-sm font-semibold text-[var(--text-1)]">
        {label}
      </label>

      {error && (
        <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
          <X size={16} />
          {error}
        </div>
      )}

      {preview ? (
        <div className="relative group">
          <div className="relative rounded-2xl overflow-hidden border-2 border-gray-100 shadow-sm">
            {isVideo(preview) ? (
              <video
                src={preview}
                controls
                className="w-full h-64 object-contain bg-gray-50"
              />
            ) : (
              <img
                src={preview}
                alt="Preview"
                className="w-full h-64 object-cover"
              />
            )}

            {/* Overlay with remove button */}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
              <a
                href={preview}
                download
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-white rounded-full hover:bg-gray-100 transition-colors shadow-lg"
                title="Download"
              >
                <CheckCircle size={20} className="text-green-600" />
              </a>
              <button
                type="button"
                onClick={handleRemove}
                className="p-3 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors shadow-lg"
                title="Remove"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {/* File info badge */}
          <div className="absolute top-3 left-3 px-3 py-1.5 bg-white/90 backdrop-blur-sm rounded-lg text-xs font-medium text-[var(--text-1)] shadow-sm flex items-center gap-1.5">
            {isVideo(preview) ? (
              <FileVideo size={14} className="text-blue-600" />
            ) : (
              <ImageIcon size={14} className="text-green-600" />
            )}
            {isVideo(preview) ? 'Video' : 'Image'}
          </div>
        </div>
      ) : (
        <div
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-gray-200 rounded-2xl p-8 text-center cursor-pointer hover:border-[var(--accent)] hover:bg-[var(--accent)]/5 transition-all group"
        >
          {uploading ? (
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 border-4 border-[var(--accent)] border-t-transparent rounded-full animate-spin mb-4" />
              <p className="text-[var(--text-1)] font-medium">Uploading...</p>
              <p className="text-sm text-[var(--text-2)] mt-1">Please wait</p>
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-gradient-to-br from-[var(--accent)] to-[var(--accent-deep)] rounded-2xl flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform">
                <Upload size={28} className="text-white" />
              </div>
              <p className="text-[var(--text-1)] font-medium">Click to upload media</p>
              <p className="text-sm text-[var(--text-2)] mt-1">
                Images or Videos up to {maxFileSizeMB}MB
              </p>
              <div className="flex items-center gap-2 mt-4 text-xs text-[var(--text-2)]">
                <ImageIcon size={14} />
                <span> JPG, PNG, WebP</span>
                <span className="mx-1">•</span>
                <FileVideo size={14} />
                <span> MP4, MOV</span>
              </div>
            </div>
          )}
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept={acceptedTypes.join(',')}
        onChange={handleFileSelect}
        className="hidden"
      />
    </div>
  );
}