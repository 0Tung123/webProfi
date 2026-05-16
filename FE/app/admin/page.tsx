'use client';

import { useState, useEffect } from 'react';
import { servicesService, projectsService, testimonialsService, clientsService, contactService, ContactSubmission } from '@/app/lib/api';

export default function AdminDashboardPage() {
  const [stats, setStats] = useState({
    services: 0,
    projects: 0,
    testimonials: 0,
    clients: 0,
    contactSubmissions: 0,
    unreadContacts: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [services, projects, testimonials, clients, contacts] = await Promise.all([
          servicesService.getAll(),
          projectsService.getAll(),
          testimonialsService.getAll(),
          clientsService.getAll(),
          contactService.getAll(),
        ]);

        setStats({
          services: services.length,
          projects: projects.length,
          testimonials: testimonials.length,
          clients: clients.length,
          contactSubmissions: contacts.length,
          unreadContacts: contacts.filter((c: ContactSubmission) => !c.read).length,
        });
      } catch (error) {
        console.error('Failed to fetch stats:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, []);

  const statCards = [
    { label: 'Services', value: stats.services, color: 'blue', icon: '📦' },
    { label: 'Projects', value: stats.projects, color: 'green', icon: '🎨' },
    { label: 'Testimonials', value: stats.testimonials, color: 'purple', icon: '💬' },
    { label: 'Clients', value: stats.clients, color: 'orange', icon: '🏢' },
    { label: 'Contact Submissions', value: stats.contactSubmissions, color: 'pink', icon: '✉️' },
    { label: 'Unread Messages', value: stats.unreadContacts, color: 'red', icon: '🔔' },
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">Overview of your content</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {statCards.map((stat) => (
          <div
            key={stat.label}
            className={`bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
              </div>
              <span className="text-4xl">{stat.icon}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <a href="/admin/projects" className="block p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors">
            <p className="font-medium text-blue-900">Manage Projects</p>
            <p className="text-sm text-blue-700">View all projects</p>
          </a>
          <a href="/admin/services" className="block p-4 bg-green-50 hover:bg-green-100 rounded-lg transition-colors">
            <p className="font-medium text-green-900">Manage Services</p>
            <p className="text-sm text-green-700">View all services</p>
          </a>
          <a href="/admin/testimonials" className="block p-4 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors">
            <p className="font-medium text-purple-900">Manage Testimonials</p>
            <p className="text-sm text-purple-700">View all testimonials</p>
          </a>
          <a href="/admin/clients" className="block p-4 bg-orange-50 hover:bg-orange-100 rounded-lg transition-colors">
            <p className="font-medium text-orange-900">Manage Clients</p>
            <p className="text-sm text-orange-700">Strategic partners</p>
          </a>
          <a href="/admin/contact" className="block p-4 bg-pink-50 hover:bg-pink-100 rounded-lg transition-colors">
            <p className="font-medium text-pink-900">View Messages</p>
            <p className="text-sm text-pink-700">Contact submissions</p>
          </a>
        </div>
      </div>
    </div>
  );
}