'use client';

import { useState } from 'react';

interface FormField {
  name: string;
  label: string;
  type: 'text' | 'email' | 'number' | 'textarea' | 'select';
  required?: boolean;
  options?: Array<{ value: string; label: string }>;
}

interface DataFormProps<T extends object> {
  title: string;
  schema: FormField[];
  initialValues: T;
  onSubmit: (data: T) => void | Promise<void>;
  onCancel: () => void;
}

export default function DataForm<T extends object>({
  title,
  schema,
  initialValues,
  onSubmit,
  onCancel,
}: DataFormProps<T>) {
  const [values, setValues] = useState<T>(initialValues);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = <K extends keyof T>(name: K, value: string) => {
    setValues((prev) => ({ ...prev, [name]: value }) as T);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await onSubmit(values);
    } catch (err: any) {
      setError(err.response?.data?.error || err.message || 'Something went wrong');
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
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="space-y-6">
          {schema.map((field) => (
            <div key={field.name}>
              <label
                htmlFor={field.name}
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                {field.label}
                {field.required && <span className="text-red-500 ml-1">*</span>}
              </label>

              {field.type === 'textarea' ? (
                <textarea
                  id={field.name}
                  rows={4}
                  value={getValue(field.name as keyof T)}
                  onChange={(e) => handleChange(field.name as keyof T, e.target.value)}
                  required={field.required}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              ) : field.type === 'select' ? (
                <select
                  id={field.name}
                  value={getValue(field.name as keyof T)}
                  onChange={(e) => handleChange(field.name as keyof T, e.target.value)}
                  required={field.required}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select...</option>
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
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              )}
            </div>
          ))}
        </div>

        <div className="flex justify-end gap-4 mt-8">
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            {isLoading ? 'Saving...' : 'Save'}
          </button>
        </div>
      </form>
    </div>
  );
}