'use client';

import { useState, useEffect } from 'react';
import { contactService, ContactSubmission } from '@/app/lib/api/contact.service';

export default function AdminContactPage() {
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [filter, setFilter] = useState<'all' | 'unread' | 'read'>('all');

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
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to mark as read');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this submission?')) return;
    try {
      await contactService.delete(id);
      setSuccess('Deleted successfully');
      fetchSubmissions();
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to delete');
    }
  };

  const filteredSubmissions = submissions.filter((s) => {
    if (filter === 'unread') return !s.read;
    if (filter === 'read') return s.read;
    return true;
  });

  const clearMessages = () => { setError(''); setSuccess(''); };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Contact Submissions</h1>
          <p className="text-gray-600 mt-1">View messages from your contact form</p>
        </div>
      </div>

      {error && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">{error}<button onClick={clearMessages} className="float-right">&times;</button></div>}
      {success && <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-4">{success}<button onClick={clearMessages} className="float-right">&times;</button></div>}

      {/* Filters */}
      <div className="flex gap-2 mb-4">
        {(['all', 'unread', 'read'] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-lg capitalize ${
              filter === f ? 'bg-blue-600 text-white' : 'bg-white border border-gray-300 hover:bg-gray-50'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Submissions List */}
      <div className="space-y-4">
        {filteredSubmissions.length === 0 ? (
          <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
            <p className="text-gray-500">No submissions found</p>
          </div>
        ) : (
          filteredSubmissions.map((submission) => (
            <div
              key={submission.contactId}
              className={`bg-white rounded-lg border ${submission.read ? 'border-gray-200' : 'border-blue-300 border-2'} p-6 shadow-sm`}
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-semibold text-gray-900">{submission.name}</h3>
                  <p className="text-sm text-gray-600">{submission.email}</p>
                  {submission.phone && <p className="text-sm text-gray-600">{submission.phone}</p>}
                </div>
                <div className="flex gap-2">
                  {!submission.read && (
                    <button
                      onClick={() => handleMarkAsRead(submission.contactId)}
                      className="px-3 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 text-sm"
                    >
                      Mark as read
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(submission.contactId)}
                    className="px-3 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200 text-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
              <p className="text-gray-800 whitespace-pre-wrap">{submission.message}</p>
              <p className="text-sm text-gray-500 mt-4">
                {new Date(submission.createdAt).toLocaleString()}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}