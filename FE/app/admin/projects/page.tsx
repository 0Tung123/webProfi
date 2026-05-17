'use client';

import { useState, useEffect } from 'react';
import { projectsService, Project, CreateProjectDto, UpdateProjectDto } from '@/app/lib/api/projects.service';
import { getApiErrorMessage } from '@/app/lib/types/errors';
import DataTable from '../components/DataTable';
import DataForm from '../components/DataForm';
import { PageHeader, DeleteConfirmModal, MessageBanner, LoadingSpinner, EmptyState, StatusBadge } from '../components/AdminLayout';
import { Briefcase, Grid3x3 } from 'lucide-react';

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editingItem, setEditingItem] = useState<Project | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<Project | null>(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

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

  const filteredProjects = projects.filter(p =>
    p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return <LoadingSpinner fullScreen />;
  }

  if (isEditing) {
    return (
      <DataForm<CreateProjectDto>
        title={editingItem ? 'Edit Project' : 'Create Project'}
        schema={[
          { name: 'title', label: 'Project Title', type: 'text', required: true, placeholder: 'Enter project title' },
          { name: 'category', label: 'Category', type: 'text', required: true, placeholder: 'e.g., Web Development, Branding' },
          { name: 'description', label: 'Description', type: 'textarea', required: false, placeholder: 'Describe the project' },
          { name: 'image', label: 'Project Image', type: 'image', required: true },
          { name: 'order', label: 'Display Order', type: 'number', required: false },
        ]}
        initialValues={editingItem || { title: '', category: '', description: '', image: '', order: 0 }}
        onSubmit={editingItem ? handleUpdate : handleCreate}
        onCancel={() => {
          setIsEditing(false);
          setEditingItem(null);
        }}
        submitLabel={editingItem ? 'Update Project' : 'Create Project'}
      />
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Projects"
        subtitle="Manage your portfolio projects"
        onAdd={() => setIsEditing(true)}
        addLabel="Add Project"
      />

      {error && <MessageBanner type="error" message={error} onClose={clearMessages} />}
      {success && <MessageBanner type="success" message={success} onClose={clearMessages} />}

      <DataTable
        data={filteredProjects}
        searchTerm={searchTerm}
        onSearch={setSearchTerm}
        columns={[
          {
            key: 'image',
            header: 'Preview',
            render: (val) => (
              <div className="w-14 h-14 rounded-xl overflow-hidden bg-gray-100 shadow-sm">
                <img src={String(val || '')} alt="" className="w-full h-full object-cover" />
              </div>
            ),
          },
          { key: 'title', header: 'Project' },
          { key: 'category', header: 'Category' },
          {
            key: 'description',
            header: 'Description',
            render: (val) => <span className="truncate max-w-xs text-[var(--text-2)]">{String(val || '-')}</span>,
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

      {filteredProjects.length === 0 && (
        <EmptyState
          icon={Briefcase}
          title="No projects found"
          description={searchTerm ? 'Try adjusting your search' : 'Add your first project to showcase your work'}
          action={
            <button
              onClick={() => setIsEditing(true)}
              className="inline-flex items-center gap-2 px-5 py-3 bg-[var(--accent)] hover:bg-[var(--accent-deep)] text-white font-semibold rounded-xl"
            >
              <Briefcase size={18} />
              Add Project
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