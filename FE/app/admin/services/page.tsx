'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { servicesService, Service, CreateServiceDto, UpdateServiceDto } from '@/app/lib/api/services.service';
import DataTable from '../components/DataTable';
import DataForm from '../components/DataForm';

export default function AdminServicesPage() {
  const router = useRouter();
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editingItem, setEditingItem] = useState<Service | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<Service | null>(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

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
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to create service');
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
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to update service');
    }
  };

  const handleDelete = async () => {
    if (!showDeleteConfirm) return;
    try {
      await servicesService.delete(showDeleteConfirm.serviceId);
      setSuccess('Service deleted successfully');
      setShowDeleteConfirm(null);
      fetchServices();
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to delete service');
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (isEditing) {
    return (
      <DataForm<CreateServiceDto>
        title={editingItem ? 'Edit Service' : 'Create Service'}
        schema={[
          { name: 'title', label: 'Title', type: 'text', required: true },
          { name: 'description', label: 'Description', type: 'textarea', required: true },
          { name: 'image', label: 'Image', type: 'image', required: true },
          { name: 'order', label: 'Order', type: 'number', required: false },
        ]}
        initialValues={editingItem || { title: '', description: '', image: '', order: 0 }}
        onSubmit={editingItem ? handleUpdate : handleCreate}
        onCancel={() => {
          setIsEditing(false);
          setEditingItem(null);
        }}
      />
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Services</h1>
          <p className="text-gray-600 mt-1">Manage your services</p>
        </div>
        <button
          onClick={() => setIsEditing(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
        >
          + Add Service
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
          {error}
          <button onClick={() => setError('')} className="float-right">&times;</button>
        </div>
      )}
      {success && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-4">
          {success}
          <button onClick={() => setSuccess('')} className="float-right">&times;</button>
        </div>
      )}

      <DataTable
        data={services}
        columns={[
          { key: 'title', header: 'Title' },
          { key: 'description', header: 'Description', render: (val) => <span className="truncate max-w-xs">{val}</span> },
          { key: 'order', header: 'Order' },
          { key: 'isActive', header: 'Active', render: (val) => val ? '✅' : '❌' },
        ]}
        onEdit={(item) => {
          setEditingItem(item);
          setIsEditing(true);
        }}
        onDelete={(item) => setShowDeleteConfirm(item)}
      />

      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md">
            <h3 className="text-lg font-semibold mb-4">Delete Service</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete "{showDeleteConfirm.title}"? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowDeleteConfirm(null)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}