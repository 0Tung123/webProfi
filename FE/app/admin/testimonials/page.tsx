'use client';

import { useState, useEffect } from 'react';
import { testimonialsService, Testimonial, CreateTestimonialDto, UpdateTestimonialDto } from '@/app/lib/api/testimonials.service';
import { getApiErrorMessage } from '@/app/lib/types/errors';
import DataTable from '../components/DataTable';
import DataForm from '../components/DataForm';
import { PageHeader, DeleteConfirmModal, MessageBanner, LoadingSpinner, EmptyState, StatusBadge } from '../components/AdminLayout';
import { MessageCircle, Quote } from 'lucide-react';

export default function AdminTestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editingItem, setEditingItem] = useState<Testimonial | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<Testimonial | null>(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

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
    } catch (err: unknown) {
      setError(getApiErrorMessage(err as Error));
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
    } catch (err: unknown) {
      setError(getApiErrorMessage(err as Error));
    }
  };

  const handleDelete = async () => {
    if (!showDeleteConfirm) return;
    try {
      await testimonialsService.delete(showDeleteConfirm.testimonialId);
      setSuccess('Testimonial deleted successfully');
      setShowDeleteConfirm(null);
      fetchTestimonials();
    } catch (err: unknown) {
      setError(getApiErrorMessage(err as Error));
    }
  };

  const clearMessages = () => {
    setError('');
    setSuccess('');
  };

  const filteredTestimonials = testimonials.filter(t =>
    t.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.quote.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.company?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return <LoadingSpinner fullScreen />;
  }

  if (isEditing) {
    return (
      <DataForm<CreateTestimonialDto>
        title={editingItem ? 'Edit Testimonial' : 'Create Testimonial'}
        schema={[
          { name: 'quote', label: 'Testimonial Quote', type: 'textarea', required: true, placeholder: 'Enter the testimonial quote' },
          { name: 'author', label: 'Author Name', type: 'text', required: true, placeholder: 'Author full name' },
          { name: 'role', label: 'Job Title / Role', type: 'text', required: true, placeholder: 'e.g., CEO, Manager' },
          { name: 'company', label: 'Company', type: 'text', required: false, placeholder: 'Company name' },
        ]}
        initialValues={editingItem || { quote: '', author: '', role: '', company: '' }}
        onSubmit={editingItem ? handleUpdate : handleCreate}
        onCancel={() => { setIsEditing(false); setEditingItem(null); }}
        submitLabel={editingItem ? 'Update Testimonial' : 'Create Testimonial'}
      />
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Testimonials"
        subtitle="Manage customer testimonials and reviews"
        onAdd={() => setIsEditing(true)}
        addLabel="Add Testimonial"
      />

      {error && <MessageBanner type="error" message={error} onClose={clearMessages} />}
      {success && <MessageBanner type="success" message={success} onClose={clearMessages} />}

      <DataTable
        data={filteredTestimonials}
        searchTerm={searchTerm}
        onSearch={setSearchTerm}
        columns={[
          { key: 'author', header: 'Author' },
          { key: 'role', header: 'Role' },
          { key: 'company', header: 'Company' },
          {
            key: 'quote',
            header: 'Quote',
            render: (val) => (
              <div className="max-w-xs">
                <span className="text-[var(--text-2)] italic truncate block">"{String(val)}"</span>
              </div>
            ),
          },
          {
            key: 'isActive',
            header: 'Status',
            render: (val) => <StatusBadge active={Boolean(val)} />,
          },
        ]}
        onEdit={(item) => { setEditingItem(item); setIsEditing(true); }}
        onDelete={(item) => setShowDeleteConfirm(item)}
      />

      {filteredTestimonials.length === 0 && (
        <EmptyState
          icon={MessageCircle}
          title="No testimonials found"
          description={searchTerm ? 'Try adjusting your search' : 'Add your first testimonial to showcase client feedback'}
          action={
            <button
              onClick={() => setIsEditing(true)}
              className="inline-flex items-center gap-2 px-5 py-3 bg-[var(--accent)] hover:bg-[var(--accent-deep)] text-white font-semibold rounded-xl"
            >
              <MessageCircle size={18} />
              Add Testimonial
            </button>
          }
        />
      )}

      <DeleteConfirmModal
        item={showDeleteConfirm}
        onConfirm={handleDelete}
        onCancel={() => setShowDeleteConfirm(null)}
      />
    </div>
  );
}