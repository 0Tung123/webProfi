'use client';

import { useState } from 'react';
import ImageUploader from './ImageUploader';
import { getApiErrorMessage } from '@/app/lib/types/errors';
import {
  Save,
  X as XIcon,
  Upload as UploadIcon,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

interface FormField {
  name: string;
  label: string;
  type: 'text' | 'email' | 'number' | 'textarea' | 'select' | 'image';
  required?: boolean;
  options?: Array<{ value: string; label: string }>;
  placeholder?: string;
  helpText?: string;
}

interface DataFormProps<T extends object> {
  title: string;
  schema: FormField[];
  initialValues: T;
  onSubmit: (data: T) => void | Promise<void>;
  onCancel: () => void;
  submitLabel?: string;
}

export default function DataForm<T extends object>({
  title,
  schema,
  initialValues,
  onSubmit,
  onCancel,
  submitLabel = 'Save Changes',
}: DataFormProps<T>) {
  const [values, setValues] = useState<T>(initialValues);
  const [isLoading, setIsLoading] = useState(false);
  const [isFileUploading, setIsFileUploading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = <K extends keyof T>(name: K, value: string) => {
    setValues((prev) => ({ ...prev, [name]: value }) as T);
    if (success) setSuccess(false);
  };

  const handleImageUpload = <K extends keyof T>(name: K, url: string) => {
    setValues((prev) => ({ ...prev, [name]: url }) as T);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isFileUploading) {
      setError('Please wait for the file to finish uploading');
      return;
    }
    setError('');
    setIsLoading(true);

    try {
      await onSubmit(values);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err: unknown) {
      setError(getApiErrorMessage(err as Error));
    } finally {
      setIsLoading(false);
    }
  };

  const getValue = <K extends keyof T>(name: K): string => {
    const val = values[name];
    if (typeof val === 'string' || typeof val === 'number') return String(val);
    return '';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[var(--text-0)]">{title}</h1>
          <p className="text-[var(--text-2)] mt-1">
            Fill in the information below to update your content
          </p>
        </div>
        <button
          onClick={onCancel}
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors lg:hidden"
          aria-label="Close"
        >
          <XIcon size={24} className="text-[var(--text-1)]" />
        </button>
      </div>

      {/* Success Message */}
      {success && (
        <div className="flex items-center gap-3 bg-green-50 border border-green-200 text-green-700 px-5 py-4 rounded-xl">
          <CheckCircle size={20} />
          <span className="font-medium">Changes saved successfully!</span>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="flex items-start gap-3 bg-red-50 border border-red-200 text-red-700 px-5 py-4 rounded-xl">
          <AlertCircle size={20} className="flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="font-medium">Error</p>
            <p className="text-sm mt-1">{error}</p>
          </div>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-gray-100">
        <div className="p-6 space-y-6">
          {schema.map((field) => (
            <div key={field.name} className="space-y-2">
              <label
                htmlFor={field.name}
                className="block text-sm font-semibold text-[var(--text-1)]"
              >
                {field.label}
                {field.required && <span className="text-red-500 ml-1">*</span>}
              </label>

              {field.type === 'image' ? (
                <ImageUploader
                  label=""
                  initialValue={getValue(field.name as keyof T)}
                  onUploadComplete={(url) => handleImageUpload(field.name as keyof T, url)}
                  onUploading={setIsFileUploading}
                />
              ) : field.type === 'textarea' ? (
                <textarea
                  id={field.name}
                  rows={5}
                  value={getValue(field.name as keyof T)}
                  onChange={(e) => handleChange(field.name as keyof T, e.target.value)}
                  required={field.required}
                  placeholder={field.placeholder}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent outline-none transition-all resize-none text-[var(--text-1)]"
                />
              ) : field.type === 'select' ? (
                <select
                  id={field.name}
                  value={getValue(field.name as keyof T)}
                  onChange={(e) => handleChange(field.name as keyof T, e.target.value)}
                  required={field.required}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent outline-none transition-all appearance-none text-[var(--text-1)]"
                >
                  <option value="">Select an option...</option>
                  {field.options?.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type={field.type}
                  id={field.name}
                  value={getValue(field.name as keyof T)}
                  onChange={(e) => handleChange(field.name as keyof T, e.target.value)}
                  required={field.required}
                  placeholder={field.placeholder}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent outline-none transition-all text-[var(--text-1)]"
                />
              )}

              {field.helpText && (
                <p className="text-sm text-[var(--text-2)]">{field.helpText}</p>
              )}
            </div>
          ))}
        </div>

        {/* Footer Actions */}
        <div className="p-6 bg-gray-50 border-t border-gray-100 flex items-center justify-end gap-4">
          <button
            type="button"
            onClick={onCancel}
            className="flex items-center gap-2 px-6 py-3 text-[var(--text-1)] hover:text-[var(--text-0)] font-medium transition-colors"
            disabled={isLoading}
          >
            <XIcon size={18} />
            Cancel
          </button>
          <button
            type="submit"
            disabled={isLoading || isFileUploading}
            className="flex items-center gap-2 px-8 py-3 bg-[var(--accent)] hover:bg-[var(--accent-deep)] text-white font-semibold rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-[var(--accent)]/25 hover:shadow-xl hover:shadow-[var(--accent)]/30"
          >
            {isLoading || isFileUploading ? (
              <>
                <div className="w-5 h-5 border-2 border-white/50 border-t-transparent rounded-full animate-spin" />
                <span>{isFileUploading ? 'Uploading...' : 'Saving...'}</span>
              </>
            ) : (
              <>
                <Save size={18} />
                <span>{submitLabel}</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}