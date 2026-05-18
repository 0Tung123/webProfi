'use client';

import { useState, useEffect } from 'react';
import { contactService, ContactSubmission } from '@/app/lib/api/contact.service';
import { getApiErrorMessage } from '@/app/lib/types/errors';
import { PageHeader, MessageBanner, LoadingSpinner, EmptyState } from '../components/AdminLayout';
import {
  Mail,
  MailCheck,
  Trash2,
  User,
  Phone,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Search
} from 'lucide-react';

export default function AdminContactPage() {
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [filter, setFilter] = useState<'all' | 'unread' | 'read'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubmission, setSelectedSubmission] = useState<ContactSubmission | null>(null);

  const fetchSubmissions = async () => {
    try {
      const data = await contactService.getAll();
      setSubmissions(data);
    } catch (err) {
      setError('Failed to fetch submissions');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => { fetchSubmissions(); }, []);

  const handleMarkAsRead = async (id: string) => {
    try {
      await contactService.markAsRead(id);
      setSuccess('Marked as read');
      fetchSubmissions();
    } catch (err: unknown) {
      setError(getApiErrorMessage(err as Error));
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this submission?')) return;
    try {
      await contactService.delete(id);
      setSuccess('Deleted successfully');
      fetchSubmissions();
    } catch (err: unknown) {
      setError(getApiErrorMessage(err as Error));
    }
  };

  const filteredSubmissions = submissions.filter((s) => {
    if (filter === 'unread') return !s.read;
    if (filter === 'read') return s.read;
    return true;
  }).filter((s) => {
    if (!searchTerm) return true;
    const search = searchTerm.toLowerCase();
    return (
      s.name.toLowerCase().includes(search) ||
      s.email.toLowerCase().includes(search) ||
      s.message.toLowerCase().includes(search)
    );
  });

  const clearMessages = () => { setError(''); setSuccess(''); };

  const unreadCount = submissions.filter(s => !s.read).length;

  if (isLoading) {
    return <LoadingSpinner fullScreen />;
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Contact Messages"
        subtitle="View and manage contact form submissions"
        showAdd={false}
      />

      {error && <MessageBanner type="error" message={error} onClose={clearMessages} />}
      {success && <MessageBanner type="success" message={success} onClose={clearMessages} />}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div
          onClick={() => setFilter('all')}
          className={`p-5 rounded-2xl border cursor-pointer transition-all ${
            filter === 'all'
              ? 'bg-[var(--accent)] text-white border-[var(--accent)] shadow-lg'
              : 'bg-white border-gray-100 hover:border-gray-200'
          }`}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm ${filter === 'all' ? 'text-white/80' : 'text-[var(--text-2)]'}`}>
                Total Messages
              </p>
              <p className="text-3xl font-bold mt-1">{submissions.length}</p>
            </div>
            <Mail size={32} className={filter === 'all' ? 'text-white/60' : 'text-gray-400'} />
          </div>
        </div>

        <div
          onClick={() => setFilter('unread')}
          className={`p-5 rounded-2xl border cursor-pointer transition-all ${
            filter === 'unread'
              ? 'bg-blue-500 text-white border-blue-500 shadow-lg'
              : 'bg-white border-gray-100 hover:border-gray-200'
          }`}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm ${filter === 'unread' ? 'text-blue-100' : 'text-[var(--text-2)]'}`}>
                Unread
              </p>
              <p className="text-3xl font-bold mt-1">{unreadCount}</p>
            </div>
            <Mail size={32} className={filter === 'unread' ? 'text-blue-200' : 'text-gray-400'} />
          </div>
        </div>

        <div
          onClick={() => setFilter('read')}
          className={`p-5 rounded-2xl border cursor-pointer transition-all ${
            filter === 'read'
              ? 'bg-green-500 text-white border-green-500 shadow-lg'
              : 'bg-white border-gray-100 hover:border-gray-200'
          }`}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm ${filter === 'read' ? 'text-green-100' : 'text-[var(--text-2)]'}`}>
                Read
              </p>
              <p className="text-3xl font-bold mt-1">{submissions.filter(s => s.read).length}</p>
            </div>
            <MailCheck size={32} className={filter === 'read' ? 'text-green-200' : 'text-gray-400'} />
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-2)]" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search messages..."
          className="w-full pl-12 pr-4 py-3 bg-white rounded-xl border border-gray-100 focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/20 outline-none transition-all"
        />
      </div>

      {/* Submissions List */}
      <div className="space-y-4">
        {filteredSubmissions.length === 0 ? (
          <EmptyState
            icon={Mail}
            title="No messages found"
            description={searchTerm ? 'Try adjusting your search' : 'Messages from your contact form will appear here'}
          />
        ) : (
          filteredSubmissions.map((submission) => (
            <div
              key={submission.contactId}
              onClick={() => setSelectedSubmission(submission)}
              className={`bg-white rounded-2xl border cursor-pointer transition-all hover:shadow-md ${
                submission.read ? 'border-gray-100' : 'border-[var(--accent)] border-2 shadow-sm'
              }`}
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-4 flex-1">
                    <div className="w-12 h-12 bg-gradient-to-br from-[var(--accent)] to-[var(--accent-deep)] rounded-xl flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold text-lg">
                        {submission.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-[var(--text-0)]">{submission.name}</h3>
                        {!submission.read && (
                          <span className="px-2 py-0.5 bg-[var(--accent)] text-white text-xs font-semibold rounded-full">
                            New
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-4 mt-1 text-sm text-[var(--text-2)]">
                        <span className="flex items-center gap-1">
                          <Mail size={14} />
                          {submission.email}
                        </span>
                        {submission.phone && (
                          <span className="flex items-center gap-1">
                            <Phone size={14} />
                            {submission.phone}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    {!submission.read && (
                      <button
                        onClick={(e) => { e.stopPropagation(); handleMarkAsRead(submission.contactId); }}
                        className="px-4 py-2 bg-[var(--accent)] hover:bg-[var(--accent-deep)] text-white text-sm font-medium rounded-lg transition-colors"
                      >
                        Mark Read
                      </button>
                    )}
                    <button
                      onClick={(e) => { e.stopPropagation(); handleDelete(submission.contactId); }}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
                <p className="text-[var(--text-1)] line-clamp-2">{submission.message}</p>
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-50">
                  <p className="text-xs text-[var(--text-2)] flex items-center gap-1">
                    <Calendar size={12} />
                    {new Date(submission.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                  <ChevronRight size={18} className="text-[var(--text-2)]" />
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Detail Modal */}
      {selectedSubmission && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedSubmission(null)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-[var(--accent)] to-[var(--accent-deep)] rounded-2xl flex items-center justify-center">
                    <span className="text-white font-bold text-2xl">
                      {selectedSubmission.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[var(--text-0)]">{selectedSubmission.name}</h3>
                    <p className="text-[var(--text-2)] flex items-center gap-2 mt-1">
                      <Mail size={16} />
                      {selectedSubmission.email}
                    </p>
                    {selectedSubmission.phone && (
                      <p className="text-[var(--text-2)] flex items-center gap-2 mt-1">
                        <Phone size={16} />
                        {selectedSubmission.phone}
                      </p>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => setSelectedSubmission(null)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <ChevronLeft size={24} />
                </button>
              </div>

              <div className="bg-gray-50 rounded-xl p-5 mb-6">
                <p className="text-sm text-[var(--text-2)] mb-2">Message</p>
                <p className="text-[var(--text-1)] whitespace-pre-wrap">{selectedSubmission.message}</p>
              </div>

              <div className="flex items-center justify-between">
                <p className="text-sm text-[var(--text-2)] flex items-center gap-1">
                  <Calendar size={14} />
                  Received on{' '}
                  {new Date(selectedSubmission.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
                <div className="flex items-center gap-3">
                  {!selectedSubmission.read && (
                    <button
                      onClick={() => {
                        handleMarkAsRead(selectedSubmission.contactId);
                        setSelectedSubmission(null);
                      }}
                      className="px-5 py-2.5 bg-[var(--accent)] hover:bg-[var(--accent-deep)] text-white font-medium rounded-xl transition-colors"
                    >
                      Mark as Read
                    </button>
                  )}
                  <button
                    onClick={() => {
                      handleDelete(selectedSubmission.contactId);
                      setSelectedSubmission(null);
                    }}
                    className="px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white font-medium rounded-xl transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}