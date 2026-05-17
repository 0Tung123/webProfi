'use client';

import {
  Plus,
  Search,
  X,
  CheckCircle2,
  AlertCircle,
  MoreHorizontal,
  Trash2,
  Edit3,
  Eye,
  EyeOff,
  ShieldCheck
} from 'lucide-react';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  onAdd?: () => void;
  addLabel?: string;
  showAdd?: boolean;
}

export function PageHeader({
  title,
  subtitle,
  onAdd,
  addLabel = 'Add New',
  showAdd = true,
}: PageHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
      <div>
        <h1 className="text-3xl lg:text-4xl font-bold text-[var(--text-0)] tracking-tight">
          {title}
        </h1>
        {subtitle && (
          <p className="text-[var(--text-2)] mt-2">
            {subtitle}
          </p>
        )}
      </div>
      {showAdd && onAdd && (
        <button
          onClick={onAdd}
          className="inline-flex items-center gap-2 px-5 py-3 bg-[var(--accent)] hover:bg-[var(--accent-deep)] text-white font-semibold rounded-xl transition-all shadow-lg shadow-[var(--accent)]/25 hover:shadow-xl hover:shadow-[var(--accent)]/30"
        >
          <Plus size={20} />
          <span>{addLabel}</span>
        </button>
      )}
    </div>
  );
}

interface StatusBadgeProps {
  active: boolean;
}

export function StatusBadge({ active }: StatusBadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold ${
        active
          ? 'bg-green-50 text-green-700 border border-green-200'
          : 'bg-gray-100 text-gray-600 border border-gray-200'
      }`}
    >
      {active ? (
        <>
          <CheckCircle2 size={12} />
          Active
        </>
      ) : (
        <>
          <EyeOff size={12} />
          Inactive
        </>
      )}
    </span>
  );
}

interface DeleteConfirmModalProps<T extends object> {
  item: T | null;
  onConfirm: () => void;
  onCancel: () => void;
  title?: string;
}

export function DeleteConfirmModal<T extends object>({
  item,
  onConfirm,
  onCancel,
  title,
}: DeleteConfirmModalProps<T>) {
  if (!item) return null;

  const itemName = (item as any).title || (item as any).name || 'this item';

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 animate-fade-in">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
            <ShieldCheck size={24} className="text-red-600" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-[var(--text-0)]">Delete Item</h3>
            <p className="text-sm text-[var(--text-2)]">This action cannot be undone</p>
          </div>
        </div>

        <p className="text-[var(--text-1)] mb-6">
          Are you sure you want to delete <span className="font-semibold">{itemName}</span>?
          This action cannot be undone.
        </p>

        <div className="flex items-center justify-end gap-3">
          <button
            onClick={onCancel}
            className="px-5 py-2.5 text-[var(--text-1)] hover:text-[var(--text-0)] font-medium transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-xl transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

interface MessageBannerProps {
  type: 'success' | 'error';
  message: string;
  onClose: () => void;
}

export function MessageBanner({ type, message, onClose }: MessageBannerProps) {
  const isSuccess = type === 'success';

  return (
    <div
      className={`flex items-start gap-3 px-5 py-4 rounded-xl mb-6 animate-fade-in ${
        isSuccess
          ? 'bg-green-50 border border-green-200 text-green-700'
          : 'bg-red-50 border border-red-200 text-red-700'
      }`}
    >
      {isSuccess ? (
        <CheckCircle2 size={20} className="flex-shrink-0 mt-0.5" />
      ) : (
        <AlertCircle size={20} className="flex-shrink-0 mt-0.5" />
      )}
      <div className="flex-1">
        <p className="font-medium">{isSuccess ? 'Success' : 'Error'}</p>
        <p className="text-sm mt-0.5">{message}</p>
      </div>
      <button
        onClick={onClose}
        className="flex-shrink-0 p-1 hover:bg-black/5 rounded transition-colors"
      >
        <X size={18} />
      </button>
    </div>
  );
}

interface EmptyStateProps {
  icon?: React.ComponentType<{ size?: number; className?: string }>;
  title: string;
  description?: string;
  action?: React.ReactNode;
}

export function EmptyState({
  icon: Icon = Search,
  title,
  description,
  action,
}: EmptyStateProps) {
  return (
    <div className="text-center py-16 bg-white rounded-2xl border border-gray-100">
      <div className="w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center mx-auto mb-4">
        <Icon size={28} className="text-gray-500" />
      </div>
      <h3 className="text-lg font-bold text-[var(--text-0)]">{title}</h3>
      {description && (
        <p className="text-[var(--text-2)] mt-2 max-w-sm mx-auto">{description}</p>
      )}
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}

interface LoadingSpinnerProps {
  fullScreen?: boolean;
}

export function LoadingSpinner({ fullScreen = false }: LoadingSpinnerProps) {
  const content = (
    <div className="flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-[var(--accent)] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-[var(--text-2)]">Loading...</p>
      </div>
    </div>
  );

  return fullScreen ? (
    <div className="flex items-center justify-center h-full">{content}</div>
  ) : (
    content
  );
}