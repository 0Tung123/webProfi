'use client';

import { useState, useEffect } from 'react';
import { contactInfoService, ContactInfo, CreateContactInfoInput, UpdateContactInfoInput } from '@/app/lib/api/contact-info.service';
import { getApiErrorMessage } from '@/app/lib/types/errors';
import DataTable from '../components/DataTable';
import DataForm from '../components/DataForm';
import { PageHeader, DeleteConfirmModal, MessageBanner, LoadingSpinner, EmptyState, StatusBadge } from '../components/AdminLayout';
import { Phone, Mail, MapPin, Globe, Link2 } from 'lucide-react';

const TYPE_CONFIG: Record<string, { icon: React.ComponentType<{ size?: number; className?: string }>; color: string; bg: string }> = {
  phone: { icon: Phone, color: 'text-green-600', bg: 'bg-green-50 border-green-200' },
  email: { icon: Mail, color: 'text-blue-600', bg: 'bg-blue-50 border-blue-200' },
  office: { icon: MapPin, color: 'text-purple-600', bg: 'bg-purple-50 border-purple-200' },
  social: { icon: Globe, color: 'text-orange-600', bg: 'bg-orange-50 border-orange-200' },
};

const TYPE_OPTIONS = [
  { value: 'phone', label: 'Phone' },
  { value: 'email', label: 'Email' },
  { value: 'office', label: 'Office / Address' },
  { value: 'social', label: 'Social Media' },
];

export default function AdminContactInfoPage() {
  const [items, setItems] = useState<ContactInfo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editingItem, setEditingItem] = useState<ContactInfo | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<ContactInfo | null>(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const fetchItems = async () => {
    try {
      const data = await contactInfoService.getAll();
      setItems(data);
    } catch (err) {
      setError('Failed to fetch contact information');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => { fetchItems(); }, []);

  const handleCreate = async (data: CreateContactInfoInput) => {
    try {
      await contactInfoService.create(data);
      setSuccess('Contact information created successfully');
      setIsEditing(false);
      fetchItems();
    } catch (err: unknown) {
      setError(getApiErrorMessage(err as Error));
    }
  };

  const handleUpdate = async (data: UpdateContactInfoInput) => {
    if (!editingItem) return;
    try {
      await contactInfoService.update(editingItem.contactInfoId, data);
      setSuccess('Contact information updated successfully');
      setIsEditing(false);
      setEditingItem(null);
      fetchItems();
    } catch (err: unknown) {
      setError(getApiErrorMessage(err as Error));
    }
  };

  const handleDelete = async () => {
    if (!showDeleteConfirm) return;
    try {
      await contactInfoService.delete(showDeleteConfirm.contactInfoId);
      setSuccess('Contact information deleted successfully');
      setShowDeleteConfirm(null);
      fetchItems();
    } catch (err: unknown) {
      setError(getApiErrorMessage(err as Error));
    }
  };

  const clearMessages = () => { setError(''); setSuccess(''); };

  const filteredItems = items.filter(item =>
    item.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.value.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return <LoadingSpinner fullScreen />;
  }

  if (isEditing) {
    return (
      <DataForm<CreateContactInfoInput>
        title={editingItem ? 'Edit Contact Information' : 'Add Contact Information'}
        schema={[
          {
            name: 'type',
            label: 'Type',
            type: 'select',
            required: true,
            options: TYPE_OPTIONS,
          },
          {
            name: 'label',
            label: 'Display Label',
            type: 'text',
            required: true,
            placeholder: 'e.g., Main Office, Support Email, Hotline',
          },
          {
            name: 'value',
            label: 'Value',
            type: 'text',
            required: true,
            placeholder: 'e.g., +84 123 456 789, hello@example.com, 123 Street Name',
          },
          {
            name: 'order',
            label: 'Display Order',
            type: 'number',
            required: false,
          },
        ]}
        initialValues={editingItem || { type: 'phone', label: '', value: '', order: 0 }}
        onSubmit={editingItem ? handleUpdate : handleCreate}
        onCancel={() => { setIsEditing(false); setEditingItem(null); }}
        submitLabel={editingItem ? 'Update' : 'Create'}
      />
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Contact Information"
        subtitle="Manage phone numbers, emails, addresses, and social links displayed on your site"
        onAdd={() => setIsEditing(true)}
        addLabel="Add Contact"
      />

      {error && <MessageBanner type="error" message={error} onClose={clearMessages} />}
      {success && <MessageBanner type="success" message={success} onClose={clearMessages} />}

      <DataTable
        data={filteredItems}
        searchTerm={searchTerm}
        onSearch={setSearchTerm}
        columns={[
          {
            key: 'type',
            header: 'Type',
            render: (val) => {
              const type = String(val);
              const config = TYPE_CONFIG[type];
              const Icon = config?.icon || Link2;
              return (
                <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border ${config?.bg || 'bg-gray-50 border-gray-200'} ${config?.color || 'text-gray-600'}`}>
                  <Icon size={14} />
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </span>
              );
            },
          },
          { key: 'label', header: 'Label' },
          {
            key: 'value',
            header: 'Value',
            render: (val) => (
              <span className="text-[var(--text-1)] font-medium">{String(val)}</span>
            ),
          },
          { key: 'order', header: 'Order' },
          {
            key: 'isActive',
            header: 'Status',
            render: (val) => <StatusBadge active={Boolean(val)} />,
          },
        ]}
        onEdit={(item) => { setEditingItem(item); setIsEditing(true); }}
        onDelete={(item) => setShowDeleteConfirm(item)}
      />

      {filteredItems.length === 0 && (
        <EmptyState
          icon={MapPin}
          title="No contact information yet"
          description={searchTerm ? 'Try adjusting your search' : 'Add phone numbers, emails, and addresses to display on your site'}
          action={
            <button
              onClick={() => setIsEditing(true)}
              className="inline-flex items-center gap-2 px-5 py-3 bg-[var(--accent)] hover:bg-[var(--accent-deep)] text-white font-semibold rounded-xl"
            >
              <MapPin size={18} />
              Add Contact
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
