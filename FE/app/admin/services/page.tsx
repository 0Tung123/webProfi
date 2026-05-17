'use client';

import { useState, useEffect } from 'react';
import { servicesService, Service, CreateServiceDto, UpdateServiceDto } from '@/app/lib/api/services.service';
import { getApiErrorMessage } from '@/app/lib/types/errors';
import DataTable from '../components/DataTable';
import DataForm from '../components/DataForm';
import { PageHeader, DeleteConfirmModal, MessageBanner, LoadingSpinner, EmptyState, StatusBadge } from '../components/AdminLayout';
import { Box, LayoutGrid } from 'lucide-react';

export default function AdminServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editingItem, setEditingItem] = useState<Service | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<Service | null>(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const fetchServices = async () => {
    try {
      const data = await servicesService.getAll();
      setServices(data);
    } catch (err) {
      setError('Failed to fetch services');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleCreate = async (data: CreateServiceDto) => {
    try {
      await servicesService.create(data);
      setSuccess('Service created successfully');
      setIsEditing(false);
      fetchServices();
    } catch (err: unknown) {
      setError(getApiErrorMessage(err as Error));
    }
  };

  const handleUpdate = async (data: UpdateServiceDto) => {
    if (!editingItem) return;
    try {
      await servicesService.update(editingItem.serviceId, data);
      setSuccess('Service updated successfully');
      setIsEditing(false);
      setEditingItem(null);
      fetchServices();
    } catch (err: unknown) {
      setError(getApiErrorMessage(err as Error));
    }
  };

  const handleDelete = async () => {
    if (!showDeleteConfirm) return;
    try {
      await servicesService.delete(showDeleteConfirm.serviceId);
      setSuccess('Service deleted successfully');
      setShowDeleteConfirm(null);
      fetchServices();
    } catch (err: unknown) {
      setError(getApiErrorMessage(err as Error));
    }
  };

  const clearMessages = () => {
    setError('');
    setSuccess('');
  };

  const filteredServices = services.filter(s =>
    s.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return <LoadingSpinner fullScreen />;
  }

  if (isEditing) {
    return (
      <DataForm<CreateServiceDto>
        title={editingItem ? 'Edit Service' : 'Create Service'}
        schema={[
          { name: 'title', label: 'Service Title', type: 'text', required: true, placeholder: 'Enter service title' },
          { name: 'description', label: 'Description', type: 'textarea', required: true, placeholder: 'Describe your service' },
          { name: 'image', label: 'Service Image', type: 'image', required: true },
          { name: 'order', label: 'Display Order', type: 'number', required: false },
        ]}
        initialValues={editingItem || { title: '', description: '', image: '', order: 0 }}
        onSubmit={editingItem ? handleUpdate : handleCreate}
        onCancel={() => {
          setIsEditing(false);
          setEditingItem(null);
        }}
        submitLabel={editingItem ? 'Update Service' : 'Create Service'}
      />
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Services"
        subtitle="Manage your service offerings"
        onAdd={() => setIsEditing(true)}
        addLabel="Add Service"
      />

      {error && <MessageBanner type="error" message={error} onClose={clearMessages} />}
      {success && <MessageBanner type="success" message={success} onClose={clearMessages} />}

      <DataTable
        data={filteredServices}
        searchTerm={searchTerm}
        onSearch={setSearchTerm}
        columns={[
          {
            key: 'image',
            header: 'Preview',
            render: (val) => (
              <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-100">
                <img src={String(val || '')} alt="" className="w-full h-full object-cover" />
              </div>
            ),
          },
          { key: 'title', header: 'Service' },
          {
            key: 'description',
            header: 'Description',
            render: (val) => <span className="truncate max-w-xs text-[var(--text-2)]">{String(val)}</span>,
          },
          { key: 'order', header: 'Order' },
          {
            key: 'isActive',
            header: 'Status',
            render: (val) => <StatusBadge active={Boolean(val)} />,
          },
        ]}
        onEdit={(item) => {
          setEditingItem(item);
          setIsEditing(true);
        }}
        onDelete={(item) => setShowDeleteConfirm(item)}
      />

      {filteredServices.length === 0 && (
        <EmptyState
          icon={LayoutGrid}
          title="No services found"
          description={searchTerm ? 'Try adjusting your search' : 'Add your first service to get started'}
          action={
            <button
              onClick={() => setIsEditing(true)}
              className="inline-flex items-center gap-2 px-5 py-3 bg-[var(--accent)] hover:bg-[var(--accent-deep)] text-white font-semibold rounded-xl"
            >
              <LayoutGrid size={18} />
              Add Service
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