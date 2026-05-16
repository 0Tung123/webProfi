'use client';

import { useState, useEffect } from 'react';
import { heroService, HeroConfig, UpdateHeroDto } from '@/app/lib/api/hero.service';
import { getApiErrorMessage } from '@/app/lib/types/errors';
import DataForm from '../components/DataForm';

export default function AdminHeroPage() {
  const [config, setConfig] = useState<HeroConfig | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const fetchConfig = async () => {
    try {
      const data = await heroService.get();
      setConfig(data);
    } catch (err) {
      setError('Failed to fetch Hero configuration');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchConfig();
  }, []);

  const handleUpdate = async (data: UpdateHeroDto) => {
    try {
      await heroService.update(data);
      setSuccess('Hero configuration updated successfully');
      fetchConfig();
    } catch (err: unknown) {
      setError(getApiErrorMessage(err as Error));
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Hero Section</h1>
        <p className="text-gray-600 mt-1">Configure the main hero section of your website</p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4 flex justify-between items-center">
          <span>{error}</span>
          <button onClick={() => setError('')} className="text-xl">&times;</button>
        </div>
      )}
      {success && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-4 flex justify-between items-center">
          <span>{success}</span>
          <button onClick={() => setSuccess('')} className="text-xl">&times;</button>
        </div>
      )}

      {config && (
        <DataForm<UpdateHeroDto>
          title="Edit Hero Content"
          schema={[
            { name: 'title1', label: 'Title Line 1', type: 'text', required: true },
            { name: 'title2', label: 'Title Line 2', type: 'text', required: true },
            { name: 'subtext', label: 'Subtext', type: 'textarea', required: true },
            {
              name: 'mediaType',
              label: 'Media Type',
              type: 'select',
              required: true,
              options: [
                { label: 'Image', value: 'image' },
                { label: 'Video', value: 'video' }
              ]
            },
            { name: 'mediaUrl', label: 'Hero Media (Image or Video)', type: 'image', required: true },
          ]}
          initialValues={{
            title1: config.title1,
            title2: config.title2,
            subtext: config.subtext,
            mediaType: config.mediaType,
            mediaUrl: config.mediaUrl,
          }}
          onSubmit={handleUpdate}
          onCancel={() => {}} // No cancel for single record edit
        />
      )}
    </div>
  );
}
