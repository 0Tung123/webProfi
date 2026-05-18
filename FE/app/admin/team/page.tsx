'use client';

import { useState, useEffect } from 'react';
import { teamService, TeamMember, CreateTeamMemberInput, UpdateTeamMemberInput, SocialLinks } from '@/app/lib/api/team.service';
import { uploadService } from '@/app/lib/api/upload.service';
import { getApiErrorMessage } from '@/app/lib/types/errors';
import DataTable from '../components/DataTable';
import { PageHeader, DeleteConfirmModal, MessageBanner, LoadingSpinner, EmptyState, StatusBadge } from '../components/AdminLayout';
import { Users, Image as ImageIcon, X, Save, Upload } from 'lucide-react';

const SOCIAL_PLATFORMS: Array<{ key: keyof SocialLinks; label: string; placeholder: string }> = [
  { key: 'facebook', label: 'Facebook', placeholder: 'https://facebook.com/...' },
  { key: 'linkedin', label: 'LinkedIn', placeholder: 'https://linkedin.com/in/...' },
  { key: 'github', label: 'GitHub', placeholder: 'https://github.com/...' },
  { key: 'instagram', label: 'Instagram', placeholder: 'https://instagram.com/...' },
  { key: 'behance', label: 'Behance', placeholder: 'https://behance.net/...' },
  { key: 'dribbble', label: 'Dribbble', placeholder: 'https://dribbble.com/...' },
];

export default function AdminTeamPage() {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editingItem, setEditingItem] = useState<TeamMember | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<TeamMember | null>(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  // Form state
  const [formName, setFormName] = useState('');
  const [formRole, setFormRole] = useState('');
  const [formImage, setFormImage] = useState('');
  const [formOrder, setFormOrder] = useState(0);
  const [formSocials, setFormSocials] = useState<SocialLinks>({});
  const [formIsActive, setFormIsActive] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isImageUploading, setIsImageUploading] = useState(false);

  const fetchMembers = async () => {
    try {
      const data = await teamService.getAll();
      setMembers(data);
    } catch (err) {
      setError('Failed to fetch team members');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  const resetForm = () => {
    setFormName('');
    setFormRole('');
    setFormImage('');
    setFormOrder(0);
    setFormSocials({});
    setFormIsActive(true);
  };

  const openCreate = () => {
    resetForm();
    setEditingItem(null);
    setIsEditing(true);
  };

  const openEdit = (member: TeamMember) => {
    setFormName(member.name);
    setFormRole(member.role);
    setFormImage(member.image || '');
    setFormOrder(member.order);
    setFormSocials(member.socials || {});
    setFormIsActive(member.isActive);
    setEditingItem(member);
    setIsEditing(true);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsImageUploading(true);
    setError('');
    try {
      const result = await uploadService.uploadFile(file);
      setFormImage(result.url);
    } catch (err: unknown) {
      setError(getApiErrorMessage(err as Error));
    } finally {
      setIsImageUploading(false);
      if (e.target) e.target.value = '';
    }
  };

  const handleSocialChange = (key: keyof SocialLinks, value: string) => {
    setFormSocials(prev => ({
      ...prev,
      [key]: value || undefined,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim() || !formRole.trim()) {
      setError('Name and Role are required');
      return;
    }
    if (isImageUploading) {
      setError('Please wait for the image upload to finish');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      const data: CreateTeamMemberInput = {
        name: formName.trim(),
        role: formRole.trim(),
        image: formImage || null,
        socials: Object.keys(formSocials).length > 0 ? formSocials : null,
        order: formOrder,
      };

      if (editingItem) {
        await teamService.update(editingItem.teamMemberId, {
          ...data,
          isActive: formIsActive,
        } as UpdateTeamMemberInput);
        setSuccess('Team member updated successfully');
      } else {
        await teamService.create(data);
        setSuccess('Team member created successfully');
      }

      setIsEditing(false);
      resetForm();
      fetchMembers();
    } catch (err: unknown) {
      setError(getApiErrorMessage(err as Error));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!showDeleteConfirm) return;
    try {
      await teamService.delete(showDeleteConfirm.teamMemberId);
      setSuccess('Team member deleted successfully');
      setShowDeleteConfirm(null);
      fetchMembers();
    } catch (err: unknown) {
      setError(getApiErrorMessage(err as Error));
    }
  };

  const clearMessages = () => {
    setError('');
    setSuccess('');
  };

  const filteredMembers = members.filter(m =>
    m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return <LoadingSpinner fullScreen />;
  }

  if (isEditing) {
    const hasSocialEntries = SOCIAL_PLATFORMS.some(p => formSocials[p.key]);

    return (
      <div className="space-y-6 max-w-3xl">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-[var(--text-0)]">
              {editingItem ? 'Edit Team Member' : 'Add Team Member'}
            </h1>
            <p className="text-[var(--text-2)] mt-1">
              {editingItem ? `Editing ${editingItem.name}` : 'Add a new member to your team'}
            </p>
          </div>
        </div>

        {error && <MessageBanner type="error" message={error} onClose={clearMessages} />}
        {success && <MessageBanner type="success" message={success} onClose={clearMessages} />}

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-gray-100">
          <div className="p-6 space-y-6">
            {/* Name & Role */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-[var(--text-1)]">
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  required
                  placeholder="Full name"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent outline-none transition-all text-[var(--text-1)]"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-[var(--text-1)]">
                  Role <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formRole}
                  onChange={(e) => setFormRole(e.target.value)}
                  required
                  placeholder="e.g., Creative Director, Lead Developer"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent outline-none transition-all text-[var(--text-1)]"
                />
              </div>
            </div>

            {/* Image */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-[var(--text-1)]">
                Photo
              </label>
              <div className="flex items-start gap-4">
                {formImage ? (
                  <div className="relative group w-32 h-32 rounded-xl overflow-hidden border-2 border-gray-100 flex-shrink-0">
                    <img src={formImage} alt="Preview" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <button
                        type="button"
                        onClick={() => setFormImage('')}
                        className="p-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="w-32 h-32 rounded-xl overflow-hidden border-2 border-dashed border-gray-200 bg-gray-50 flex items-center justify-center flex-shrink-0">
                    <ImageIcon size={32} className="text-gray-300" />
                  </div>
                )}
                <div className="flex-1">
                  <label className="flex items-center gap-2 px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-[var(--text-1)] font-medium rounded-xl cursor-pointer transition-colors w-fit">
                    {isImageUploading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-[var(--accent)] border-t-transparent rounded-full animate-spin" />
                        Uploading...
                      </>
                    ) : (
                      <>
                        <Upload size={18} />
                        Upload Photo
                      </>
                    )}
                    <input
                      type="file"
                      accept="image/jpeg,image/png,image/webp"
                      onChange={handleImageUpload}
                      className="hidden"
                      disabled={isImageUploading}
                    />
                  </label>
                  <p className="text-xs text-[var(--text-2)] mt-2">
                    Recommended: 400x500px. JPG, PNG, or WebP. Max 5MB.
                  </p>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="block text-sm font-semibold text-[var(--text-1)]">
                  Social Links
                </label>
                {hasSocialEntries && (
                  <span className="text-xs text-[var(--text-2)]">
                    {Object.keys(formSocials).filter(k => formSocials[k as keyof SocialLinks]).length} link(s)
                  </span>
                )}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {SOCIAL_PLATFORMS.map((platform) => (
                  <div key={platform.key} className="space-y-1.5">
                    <label className="text-xs font-medium text-[var(--text-2)] flex items-center gap-1.5">
                      {platform.label}
                    </label>
                    <input
                      type="url"
                      value={formSocials[platform.key] || ''}
                      onChange={(e) => handleSocialChange(platform.key, e.target.value)}
                      placeholder={platform.placeholder}
                      className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent outline-none transition-all text-sm text-[var(--text-1)]"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Order & Status */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-[var(--text-1)]">
                  Display Order
                </label>
                <input
                  type="number"
                  value={formOrder}
                  onChange={(e) => setFormOrder(parseInt(e.target.value) || 0)}
                  min={0}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent outline-none transition-all text-[var(--text-1)]"
                />
                <p className="text-xs text-[var(--text-2)]">Lower numbers appear first</p>
              </div>
              {editingItem && (
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-[var(--text-1)]">
                    Status
                  </label>
                  <label className="flex items-center gap-3 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formIsActive}
                      onChange={(e) => setFormIsActive(e.target.checked)}
                      className="w-5 h-5 rounded border-gray-300 text-[var(--accent)] focus:ring-[var(--accent)]"
                    />
                    <span className="text-sm text-[var(--text-1)]">Active</span>
                  </label>
                </div>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="p-6 bg-gray-50 border-t border-gray-100 flex items-center justify-end gap-4">
            <button
              type="button"
              onClick={() => { setIsEditing(false); resetForm(); }}
              className="flex items-center gap-2 px-6 py-3 text-[var(--text-1)] hover:text-[var(--text-0)] font-medium transition-colors"
              disabled={isSubmitting}
            >
              <X size={18} />
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting || isImageUploading}
              className="flex items-center gap-2 px-8 py-3 bg-[var(--accent)] hover:bg-[var(--accent-deep)] text-white font-semibold rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-[var(--accent)]/25 hover:shadow-xl hover:shadow-[var(--accent)]/30"
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/50 border-t-transparent rounded-full animate-spin" />
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <Save size={18} />
                  <span>{editingItem ? 'Update Member' : 'Add Member'}</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Team"
        subtitle="Manage your team members"
        onAdd={openCreate}
        addLabel="Add Member"
      />

      {error && <MessageBanner type="error" message={error} onClose={clearMessages} />}
      {success && <MessageBanner type="success" message={success} onClose={clearMessages} />}

      <DataTable
        data={filteredMembers}
        searchTerm={searchTerm}
        onSearch={setSearchTerm}
        columns={[
          {
            key: 'image',
            header: 'Photo',
            render: (val) => (
              <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-100 shadow-sm">
                {val ? (
                  <img src={String(val)} alt="" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-200 to-gray-300">
                    <Users size={16} className="text-gray-500" />
                  </div>
                )}
              </div>
            ),
          },
          { key: 'name', header: 'Name' },
          {
            key: 'role',
            header: 'Role',
            render: (val) => (
              <span className="text-[var(--text-2)]">{String(val)}</span>
            ),
          },
          {
            key: 'socials',
            header: 'Social Links',
            render: (val) => {
              const socials = val as SocialLinks | null;
              const count = socials ? Object.keys(socials).filter(k => socials[k as keyof SocialLinks]).length : 0;
              return (
                <span className="text-sm text-[var(--text-2)]">
                  {count > 0 ? `${count} link(s)` : '-'}
                </span>
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
        onEdit={(item) => openEdit(item)}
        onDelete={(item) => setShowDeleteConfirm(item)}
      />

      {filteredMembers.length === 0 && (
        <EmptyState
          icon={Users}
          title="No team members found"
          description={searchTerm ? 'Try adjusting your search' : 'Add your first team member to build your team page'}
          action={
            <button
              onClick={openCreate}
              className="inline-flex items-center gap-2 px-5 py-3 bg-[var(--accent)] hover:bg-[var(--accent-deep)] text-white font-semibold rounded-xl"
            >
              <Users size={18} />
              Add Member
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
