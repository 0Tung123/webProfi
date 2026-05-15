'use client';

import { useState, useEffect } from 'react';
import { clientsService, Client, CreateClientDto, UpdateClientDto } from '@/app/lib/api/clients.service';
import DataTable from '../components/DataTable';
import DataForm from '../components/DataForm';

export default function AdminClientsPage() {
  const [clients, setClients] = useState<Client[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editingItem, setEditingItem] = useState<Client | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<Client | null>(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const fetchClients = async () => {
    try {
      const data = await clientsService.getAll();
      setClients(data);
    } catch (err) {
      setError('Failed to fetch clients');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => { fetchClients(); }, []);

  const handleCreate = async (data: CreateClientDto) => {
    try {
      await clientsService.create(data);
      setSuccess('Client created successfully');
      setIsEditing(false);
      fetchClients();
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to create client');
    }
  };

  const handleUpdate = async (data: UpdateClientDto) => {
    if (!editingItem) return;
    try {
      await clientsService.update(editingItem.clientId, data);
      setSuccess('Client updated successfully');
      setIsEditing(false);
      setEditingItem(null);
      fetchClients();
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to update client');
    }
  };

  const handleDelete = async () => {
    if (!showDeleteConfirm) return;
    try {
      await clientsService.delete(showDeleteConfirm.clientId);
      setSuccess('Client deleted successfully');
      setShowDeleteConfirm(null);
      fetchClients();
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to delete client');
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
      <DataForm<CreateClientDto>
        title={editingItem ? 'Edit Client' : 'Create Client'}
        schema={[
          { name: 'name', label: 'Name', type: 'text', required: true },
          { name: 'logo', label: 'Logo Path', type: 'text', required: false },
          { name: 'website', label: 'Website', type: 'text', required: false },
          { name: 'order', label: 'Order', type: 'number', required: false },
        ]}
        initialValues={editingItem || { name: '', logo: '', website: '', order: 0 }}
        onSubmit={editingItem ? handleUpdate : handleCreate}
        onCancel={() => { setIsEditing(false); setEditingItem(null); }}
      />
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Clients</h1>
          <p className="text-gray-600 mt-1">Manage your clients</p>
        </div>
        <button onClick={() => setIsEditing(true)} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
          + Add Client
        </button>
      </div>

      {error && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">{error}<button onClick={clearMessages} className="float-right">&times;</button></div>}
      {success && <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-4">{success}<button onClick={clearMessages} className="float-right">&times;</button></div>}

      <DataTable
        data={clients}
        columns={[
          { key: 'name', header: 'Name' },
          { key: 'website', header: 'Website', render: (val) => val ? <a href={val} target="_blank" className="text-blue-600 hover:underline">{val}</a> : '-' },
          { key: 'order', header: 'Order' },
          { key: 'isActive', header: 'Active', render: (val) => val ? '✅' : '❌' },
        ]}
        onEdit={(item) => { setEditingItem(item); setIsEditing(true); }}
        onDelete={(item) => setShowDeleteConfirm(item)}
      />

      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md">
            <h3 className="text-lg font-semibold mb-4">Delete Client</h3>
            <p className="text-gray-600 mb-6">Are you sure you want to delete "{showDeleteConfirm.name}"?</p>
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