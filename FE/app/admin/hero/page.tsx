'use client';

import { useState, useEffect } from 'react';
import { heroService, HeroConfig, UpdateHeroDto } from '@/app/lib/api/hero.service';
import { getApiErrorMessage } from '@/app/lib/types/errors';
import DataForm from '../components/DataForm';
import { PageHeader, MessageBanner, LoadingSpinner } from '../components/AdminLayout';
import { Sparkles, Image as ImageIcon, Play } from 'lucide-react';

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

  const clearMessages = () => {
    setError('');
    setSuccess('');
  };

  if (isLoading) {
    return <LoadingSpinner fullScreen />;
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Hero Section"
        subtitle="Configure the main hero section of your website"
        showAdd={false}
      />

      {error && <MessageBanner type="error" message={error} onClose={clearMessages} />}
      {success && <MessageBanner type="success" message={success} onClose={clearMessages} />}

      {config && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Preview Panel */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 sticky top-6">
              <h3 className="text-lg font-bold text-[var(--text-0)] mb-4">Preview</h3>
              <div className="aspect-video rounded-xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 relative">
                {config.mediaUrl ? (
                  config.mediaType === 'video' ? (
                    <video
                      src={config.mediaUrl}
                      className="w-full h-full object-cover"
                      controls
                    />
                  ) : (
                    <img
                      src={config.mediaUrl}
                      alt="Hero preview"
                      className="w-full h-full object-cover"
                    />
                  )
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <ImageIcon size={48} className="text-gray-400" />
                  </div>
                )}

                {/* Text Overlay Preview */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-6">
                  <div className="text-white">
                    <h2 className="text-xl font-bold mb-2">
                      {config.title1 || 'Title'}
                    </h2>
                    <p className="text-sm opacity-90">{config.subtext || 'Subtext'}</p>
                  </div>
                </div>
              </div>

              {/* Info Cards */}
              <div className="mt-6 space-y-3">
                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                  <div className="w-10 h-10 bg-[var(--accent)]/10 rounded-lg flex items-center justify-center">
                    <Sparkles size={20} className="text-[var(--accent)]" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-[var(--text-0)]">Media Type</p>
                    <p className="text-xs text-[var(--text-2)] capitalize">{config.mediaType}</p>
                  </div>
                </div>

                <div className="p-4 bg-blue-50 rounded-xl">
                  <p className="text-xs text-blue-700">
                    💡 Tip: Keep hero content concise and impactful for maximum engagement
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Form Panel */}
          <div className="lg:col-span-2">
            <DataForm<UpdateHeroDto>
              title="Edit Hero Content"
              schema={[
                {
                  name: 'title1',
                  label: 'Headline - First Line',
                  type: 'text',
                  required: true,
                  placeholder: 'Enter your main headline',
                  helpText: 'This is the first line of your hero headline',
                },
                {
                  name: 'title2',
                  label: 'Headline - Second Line',
                  type: 'text',
                  required: true,
                  placeholder: 'Enter the second line',
                  helpText: 'This is the second line of your hero headline',
                },
                {
                  name: 'subtext',
                  label: 'Subheading',
                  type: 'textarea',
                  required: true,
                  placeholder: 'Enter a compelling subheading...',
                  helpText: 'Brief description or value proposition',
                },
                {
                  name: 'mediaType',
                  label: 'Media Type',
                  type: 'select',
                  required: true,
                  options: [
                    { label: 'Image', value: 'image' },
                    { label: 'Video', value: 'video' }
                  ],
                  helpText: 'Choose whether to display an image or video',
                },
                {
                  name: 'mediaUrl',
                  label: 'Hero Media',
                  type: 'image',
                  required: true,
                },
              ]}
              initialValues={{
                title1: config.title1,
                title2: config.title2,
                subtext: config.subtext,
                mediaType: config.mediaType,
                mediaUrl: config.mediaUrl,
              }}
              onSubmit={handleUpdate}
              onCancel={() => {}}
              submitLabel="Update Hero Section"
            />
          </div>
        </div>
      )}
    </div>
  );
}