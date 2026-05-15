'use client';

import { useState, useEffect } from 'react';
import { testimonialsService, Testimonial, CreateTestimonialDto, UpdateTestimonialDto } from '@/app/lib/api/testimonials.service';
import DataTable from '../components/DataTable';
import DataForm from '../components/DataForm';

export default function AdminTestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editingItem, setEditingItem] = useState<Testimonial | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<Testimonial | null>(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const fetchTestimonials = async () => {
    try {
      const data = await testimonialsService.getAll();
      setTestimonials(data);
    } catch (err) {
      setError('Failed to fetch testimonials');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => { fetchTestimonials(); }, []);

  const handleCreate = async (data: CreateTestimonialDto) => {
    try {
      await testimonialsService.create(data);
      setSuccess('Testimonial created successfully');
      setIsEditing(false);
      fetchTestimonials();
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to create testimonial');
    }
  };

  const handleUpdate = async (data: UpdateTestimonialDto) => {
    if (!editingItem) return;
    try {
      await testimonialsService.update(editingItem.testimonialId, data);
      setSuccess('Testimonial updated successfully');
      setIsEditing(false);
      setEditingItem(null);
      fetchTestimonials();
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to update testimonial');
    }
  };

  const handleDelete = async () => {
    if (!showDeleteConfirm) return;
    try {
      await testimonialsService.delete(showDeleteConfirm.testimonialId);
      setSuccess('Testimonial deleted successfully');
      setShowDeleteConfirm(null);
      fetchTestimonials();
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to delete testimonial');
    }
  };

  const clearMessages = () => { setError(''); setSuccess(''); };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (isEditing) {
    return (
      <DataForm<CreateTestimonialDto>
        title={editingItem ? 'Edit Testimonial' : 'Create Testimonial'}
        schema={[
          { name: 'quote', label: 'Quote', type: 'textarea', required: true },
          { name: 'author', label: 'Author', type: 'text', required: true },
          { name: 'role', label: 'Role', type: 'text', required: true },
          { name: 'company', label: 'Company', type: 'text', required: false },
        ]}
        initialValues={editingItem || { quote: '', author: '', role: '', company: '' }}
        onSubmit={editingItem ? handleUpdate : handleCreate}
        onCancel={() => { setIsEditing(false); setEditingItem(null); }}
      />
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Testimonials</h1>
          <p className="text-gray-600 mt-1">Manage customer testimonials</p>
        </div>
        <button onClick={() => setIsEditing(true)} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
          + Add Testimonial
        </button>
      </div>

      {error && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">{error}<button onClick={clearMessages} className="float-right">&times;</button></div>}
      {success && <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-4">{success}<button onClick={clearMessages} className="float-right">&times;</button></div>}

      <DataTable
        data={testimonials}
        columns={[
          { key: 'author', header: 'Author' },
          { key: 'role', header: 'Role' },
          { key: 'quote', header: 'Quote', render: (val) => <span className="truncate max-w-xs">"{val}"</span> },
          { key: 'isActive', header: 'Active', render: (val) => val ? '✅' : '❌' },
        ]}
        onEdit={(item) => { setEditingItem(item); setIsEditing(true); }}
        onDelete={(item) => setShowDeleteConfirm(item)}
      />

      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md">
            <h3 className="text-lg font-semibold mb-4">Delete Testimonial</h3>
            <p className="text-gray-600 mb-6">Are you sure you want to delete this testimonial?</p>
            <div className="flex justify-end gap-4">
              <button onClick={() => setShowDeleteConfirm(null)} className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">Cancel</button>
              <button onClick={handleDelete} className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}