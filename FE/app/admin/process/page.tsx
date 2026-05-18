'use client';

import { useState, useEffect } from 'react';
import { processService, ProcessSection, CreateProcessSectionDto, UpdateProcessSectionDto } from '@/app/lib/api/process.service';
import { getApiErrorMessage } from '@/app/lib/types/errors';
import DataTable from '../components/DataTable';
import DataForm from '../components/DataForm';
import { PageHeader, DeleteConfirmModal, MessageBanner, LoadingSpinner, EmptyState, StatusBadge } from '../components/AdminLayout';
import { GitGraph, Hash } from 'lucide-react';

const CATEGORIES = [
  { value: 'design', label: 'Design' },
  { value: 'brand', label: 'Brand' },
  { value: 'code', label: 'Code' },
  { value: 'photo', label: 'Photo' },
];

const categoryIcons: Record<string, string> = {
  design: '🎨',
  brand: '🏷️',
  code: '💻',
  photo: '📷',
};

export default function AdminProcessPage() {
  const [sections, setSections] = useState<ProcessSection[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editingItem, setEditingItem] = useState<ProcessSection | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<ProcessSection | null>(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const fetchSections = async () => {
    try {
      const data = await processService.getAll();
      setSections(data);
    } catch (err) {
      setError('Failed to fetch process sections');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => { fetchSections(); }, []);

  const handleCreate = async (data: CreateProcessSectionDto) => {
    try {
      await processService.create(data);
      setSuccess('Process section created successfully');
      setIsEditing(false);
      fetchSections();
    } catch (err: unknown) {
      setError(getApiErrorMessage(err as Error));
    }
  };

  const handleUpdate = async (data: UpdateProcessSectionDto) => {
    if (!editingItem) return;
    try {
      await processService.update(editingItem.processId, data);
      setSuccess('Process section updated successfully');
      setIsEditing(false);
      setEditingItem(null);
      fetchSections();
    } catch (err: unknown) {
      setError(getApiErrorMessage(err as Error));
    }
  };

  const handleDelete = async () => {
    if (!showDeleteConfirm) return;
    try {
      await processService.delete(showDeleteConfirm.processId);
      setSuccess('Process section deleted successfully');
      setShowDeleteConfirm(null);
      fetchSections();
    } catch (err: unknown) {
      setError(getApiErrorMessage(err as Error));
    }
  };

  const clearMessages = () => { setError(''); setSuccess(''); };

  const filteredSections = sections.filter(s =>
    s.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return <LoadingSpinner fullScreen />;
  }

  if (isEditing) {
    return (
      <DataForm<CreateProcessSectionDto>
        title={editingItem ? 'Edit Process Section' : 'Create Process Section'}
        schema={[
          { name: 'category', label: 'Category', type: 'select', required: true, options: CATEGORIES },
          { name: 'title', label: 'Section Title', type: 'text', required: true, placeholder: 'Enter section title' },
          { name: 'description', label: 'Description', type: 'textarea', required: true, placeholder: 'Describe this process step' },
          { name: 'order', label: 'Display Order', type: 'number', required: false },
        ]}
        initialValues={editingItem || { category: 'design', title: '', description: '', order: 0 }}
        onSubmit={editingItem ? handleUpdate : handleCreate}
        onCancel={() => { setIsEditing(false); setEditingItem(null); }}
        submitLabel={editingItem ? 'Update Section' : 'Create Section'}
      />
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Process"
        subtitle="Manage your workflow process steps"
        onAdd={() => setIsEditing(true)}
        addLabel="Add Step"
      />

      {error && <MessageBanner type="error" message={error} onClose={clearMessages} />}
      {success && <MessageBanner type="success" message={success} onClose={clearMessages} />}

      <DataTable
        data={filteredSections}
        searchTerm={searchTerm}
        onSearch={setSearchTerm}
        columns={[
          {
            key: 'order',
            header: '#',
            render: (val, row) => (
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--accent)] to-[var(--accent-deep)] flex items-center justify-center text-white font-bold">
                {row.order || 0}
              </div>
            ),
          },
          {
            key: 'category',
            header: 'Category',
            render: (val) => (
              <span className="inline-flex items-center gap-2">
                <span>{categoryIcons[val as string] || '📁'}</span>
                <span className="uppercase font-semibold text-sm">{String(val)}</span>
              </span>
            ),
          },
          { key: 'title', header: 'Step Title' },
          {
            key: 'description',
            header: 'Description',
            render: (val) => <span className="truncate max-w-xs text-[var(--text-2)]">{String(val)}</span>,
          },
          {
            key: 'isActive',
            header: 'Status',
            render: (val) => <StatusBadge active={Boolean(val)} />,
          },
          {
            key: 'steps',
            header: 'Sub-steps',
            render: (val) => {
              const steps = val as { length?: number } | undefined;
              return (
                <span className="inline-flex items-center gap-1 text-sm text-[var(--text-2)]">
                  <Hash size={14} />
                  {steps?.length ?? 0}
                </span>
              );
            },
          },
        ]}
        onEdit={(item) => { setEditingItem(item); setIsEditing(true); }}
        onDelete={(item) => setShowDeleteConfirm(item)}
      />

      {filteredSections.length === 0 && (
        <EmptyState
          icon={GitGraph}
          title="No process steps found"
          description={searchTerm ? 'Try adjusting your search' : 'Add your first process step to showcase your workflow'}
          action={
            <button
              onClick={() => setIsEditing(true)}
              className="inline-flex items-center gap-2 px-5 py-3 bg-[var(--accent)] hover:bg-[var(--accent-deep)] text-white font-semibold rounded-xl"
            >
              <GitGraph size={18} />
              Add Step
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