'use client';

import { useState, useEffect } from 'react';
import { projectsService, Project, CreateProjectDto, UpdateProjectDto } from '@/app/lib/api/projects.service';
import { getApiErrorMessage } from '@/app/lib/types/errors';
import DataTable from '../components/DataTable';
import DataForm from '../components/DataForm';

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editingItem, setEditingItem] = useState<Project | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<Project | null>(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const fetchProjects = async () => {
    try {
      const data = await projectsService.getAll();
      setProjects(data);
    } catch (err) {
      setError('Failed to fetch projects');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleCreate = async (data: CreateProjectDto) => {
    try {
      await projectsService.create(data);
      setSuccess('Project created successfully');
      setIsEditing(false);
      fetchProjects();
    } catch (err: unknown) {
      setError(getApiErrorMessage(err as Error));
    }
  };

  const handleUpdate = async (data: UpdateProjectDto) => {
    if (!editingItem) return;
    try {
      await projectsService.update(editingItem.projectId, data);
      setSuccess('Project updated successfully');
      setIsEditing(false);
      setEditingItem(null);
      fetchProjects();
    } catch (err: unknown) {
      setError(getApiErrorMessage(err as Error));
    }
  };

  const handleDelete = async () => {
    if (!showDeleteConfirm) return;
    try {
      await projectsService.delete(showDeleteConfirm.projectId);
      setSuccess('Project deleted successfully');
      setShowDeleteConfirm(null);
      fetchProjects();
    } catch (err: unknown) {
      setError(getApiErrorMessage(err as Error));
    }
  };

  const clearMessages = () => {
    setError('');
    setSuccess('');
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
      <DataForm<CreateProjectDto>
        title={editingItem ? 'Edit Project' : 'Create Project'}
        schema={[
          { name: 'title', label: 'Title', type: 'text', required: true },
          { name: 'category', label: 'Category', type: 'text', required: true },
          { name: 'description', label: 'Description', type: 'textarea', required: false },
          { name: 'image', label: 'Image', type: 'image', required: true },
          { name: 'order', label: 'Order', type: 'number', required: false },
        ]}
        initialValues={editingItem || { title: '', category: '', description: '', image: '', order: 0 }}
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
          <h1 className="text-3xl font-bold text-gray-900">Projects</h1>
          <p className="text-gray-600 mt-1">Manage your portfolio projects</p>
        </div>
        <button
          onClick={() => setIsEditing(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
        >
          + Add Project
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
          {error}
          <button onClick={clearMessages} className="float-right">&times;</button>
        </div>
      )}
      {success && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-4">
          {success}
          <button onClick={clearMessages} className="float-right">&times;</button>
        </div>
      )}

      <DataTable
        data={projects}
        columns={[
          { key: 'title', header: 'Title' },
          { key: 'category', header: 'Category' },
          {
            key: 'description',
            header: 'Description',
            render: (val) => <span className="truncate max-w-xs">{String(val || '-')}</span>,
          },
          { key: 'order', header: 'Order' },
          {
            key: 'isActive',
            header: 'Active',
            render: (val) => (val ? '✅' : '❌'),
          },
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
            <h3 className="text-lg font-semibold mb-4">Delete Project</h3>
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