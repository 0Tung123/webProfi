'use client';

import { useState, useEffect } from 'react';
import { clientsService, Client, CreateClientDto, UpdateClientDto } from '@/app/lib/api/clients.service';
import { getApiErrorMessage } from '@/app/lib/types/errors';
import DataTable from '../components/DataTable';
import DataForm from '../components/DataForm';
import { PageHeader, DeleteConfirmModal, MessageBanner, LoadingSpinner, EmptyState, StatusBadge } from '../components/AdminLayout';
import { Building2, Globe } from 'lucide-react';

export default function AdminClientsPage() {
  const [clients, setClients] = useState<Client[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editingItem, setEditingItem] = useState<Client | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<Client | null>(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

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
    } catch (err: unknown) {
      setError(getApiErrorMessage(err as Error));
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
    } catch (err: unknown) {
      setError(getApiErrorMessage(err as Error));
    }
  };

  const handleDelete = async () => {
    if (!showDeleteConfirm) return;
    try {
      await clientsService.delete(showDeleteConfirm.clientId);
      setSuccess('Client deleted successfully');
      setShowDeleteConfirm(null);
      fetchClients();
    } catch (err: unknown) {
      setError(getApiErrorMessage(err as Error));
    }
  };

  const clearMessages = () => { setError(''); setSuccess(''); };

  const filteredClients = clients.filter(c =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.website?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return <LoadingSpinner fullScreen />;
  }

  if (isEditing) {
    return (
      <DataForm<CreateClientDto>
        title={editingItem ? 'Edit Client' : 'Create Client'}
        schema={[
          { name: 'name', label: 'Client Name', type: 'text', required: true, placeholder: 'Enter client/company name' },
          { name: 'logo', label: 'Client Logo', type: 'image', required: false },
          { name: 'website', label: 'Website URL', type: 'text', required: false, placeholder: 'https://example.com' },
          { name: 'order', label: 'Display Order', type: 'number', required: false },
        ]}
        initialValues={editingItem || { name: '', logo: '', website: '', order: 0 }}
        onSubmit={editingItem ? handleUpdate : handleCreate}
        onCancel={() => { setIsEditing(false); setEditingItem(null); }}
        submitLabel={editingItem ? 'Update Client' : 'Create Client'}
      />
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Clients"
        subtitle="Manage your clients and partners"
        onAdd={() => setIsEditing(true)}
        addLabel="Add Client"
      />

      {error && <MessageBanner type="error" message={error} onClose={clearMessages} />}
      {success && <MessageBanner type="success" message={success} onClose={clearMessages} />}

      <DataTable
        data={filteredClients}
        searchTerm={searchTerm}
        onSearch={setSearchTerm}
        columns={[
          {
            key: 'logo',
            header: 'Logo',
            render: (val) => (
              <div className="w-14 h-14 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center overflow-hidden">
                {val ? (
                  <img src={String(val)} alt="" className="w-full h-full object-contain p-1" />
                ) : (
                  <Building2 size={24} className="text-gray-400" />
                )}
              </div>
            ),
          },
          { key: 'name', header: 'Client Name' },
          {
            key: 'website',
            header: 'Website',
            render: (val) => {
              const website = val as string | undefined;
              return website ? (
                <a
                  href={website.startsWith('http') ? website : `https://${website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[var(--accent)] hover:underline"
                >
                  <Globe size={14} />
                  {website}
                </a>
              ) : (
                <span className="text-[var(--text-2)]">-</span>
              );
            },
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

      {filteredClients.length === 0 && (
        <EmptyState
          icon={Building2}
          title="No clients found"
          description={searchTerm ? 'Try adjusting your search' : 'Add your first client to showcase your partners'}
          action={
            <button
              onClick={() => setIsEditing(true)}
              className="inline-flex items-center gap-2 px-5 py-3 bg-[var(--accent)] hover:bg-[var(--accent-deep)] text-white font-semibold rounded-xl"
            >
              <Building2 size={18} />
              Add Client
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