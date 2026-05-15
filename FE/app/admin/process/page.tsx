'use client';

import { useState, useEffect } from 'react';
import { processService, ProcessSection, CreateProcessSectionDto, UpdateProcessSectionDto } from '@/app/lib/api/process.service';
import DataTable from '../components/DataTable';
import DataForm from '../components/DataForm';

const CATEGORIES = [
  { value: 'design', label: 'Design' },
  { value: 'brand', label: 'Brand' },
  { value: 'code', label: 'Code' },
  { value: 'photo', label: 'Photo' },
];

export default function AdminProcessPage() {
  const [sections, setSections] = useState<ProcessSection[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editingItem, setEditingItem] = useState<ProcessSection | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<ProcessSection | null>(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

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
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to create section');
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
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to update section');
    }
  };

  const handleDelete = async () => {
    if (!showDeleteConfirm) return;
    try {
      await processService.delete(showDeleteConfirm.processId);
      setSuccess('Process section deleted successfully');
      setShowDeleteConfirm(null);
      fetchSections();
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to delete section');
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
      <DataForm<CreateProcessSectionDto>
        title={editingItem ? 'Edit Process Section' : 'Create Process Section'}
        schema={[
          { name: 'category', label: 'Category', type: 'select', required: true, options: CATEGORIES },
          { name: 'title', label: 'Title', type: 'text', required: true },
          { name: 'description', label: 'Description', type: 'textarea', required: true },
          { name: 'order', label: 'Order', type: 'number', required: false },
        ]}
        initialValues={editingItem || { category: 'design', title: '', description: '', order: 0 }}
        onSubmit={editingItem ? handleUpdate : handleCreate}
        onCancel={() => { setIsEditing(false); setEditingItem(null); }}
      />
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Process Sections</h1>
          <p className="text-gray-600 mt-1">Manage your workflow process</p>
        </div>
        <button onClick={() => setIsEditing(true)} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
          + Add Section
        </button>
      </div>

      {error && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">{error}<button onClick={clearMessages} className="float-right">&times;</button></div>}
      {success && <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-4">{success}<button onClick={clearMessages} className="float-right">&times;</button></div>}

      <DataTable
        data={sections}
        columns={[
          { key: 'category', header: 'Category', render: (val) => <span className="uppercase font-medium">{val}</span> },
          { key: 'title', header: 'Title' },
          { key: 'description', header: 'Description', render: (val) => <span className="truncate max-w-xs">{val}</span> },
          { key: 'order', header: 'Order' },
          { key: 'isActive', header: 'Active', render: (val) => val ? '✅' : '❌' },
          { key: 'steps', header: 'Steps', render: (val) => val?.length || 0 },
        ]}
        onEdit={(item) => { setEditingItem(item); setIsEditing(true); }}
        onDelete={(item) => setShowDeleteConfirm(item)}
      />

      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md">
            <h3 className="text-lg font-semibold mb-4">Delete Section</h3>
            <p className="text-gray-600 mb-6">Are you sure you want to delete "{showDeleteConfirm.title}"?</p>
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