'use client';

import React, { useState, useEffect } from 'react';
import {
  servicesService,
  projectsService,
  testimonialsService,
  clientsService,
  contactService,
  ContactSubmission
} from '@/app/lib/api';
import {
  Box,
  Palette,
  MessageCircle,
  Building2,
  Mail,
  Bell,
  TrendingUp,
  Eye,
  Edit3,
  Trash2,
  Plus,
  ArrowUpRight,
  Users,
  Award,
  Zap,
  Briefcase,
  CheckCircle2,
  Clock
} from 'lucide-react';
import Link from 'next/link';

interface Stat {
  label: string;
  value: number;
  color: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  trend?: number;
  bgGradient: string;
}

interface QuickAction {
  label: string;
  href: string;
  description: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  color: string;
}

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
  const [recentActivity, setRecentActivity] = useState<Array<{
    id: string;
    type: 'project' | 'testimonial' | 'contact' | 'service';
    title: string;
    time: string;
    icon: React.ComponentType<{ size?: number; className?: string }>;
  }>>([]);

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

        // Mock recent activity
        setRecentActivity([
          { id: '1', type: 'project', title: 'New project added', time: '2 hours ago', icon: Briefcase },
          { id: '2', type: 'testimonial', title: 'New testimonial received', time: '5 hours ago', icon: MessageCircle },
          { id: '3', type: 'contact', title: 'New contact submission', time: '1 day ago', icon: Mail },
          { id: '4', type: 'service', title: 'Service updated', time: '2 days ago', icon: Box },
        ]);
      } catch (error) {
        console.error('Failed to fetch stats:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, []);

  const statCards: Stat[] = [
    {
      label: 'Services',
      value: stats.services,
      color: 'blue',
      icon: Box,
      bgGradient: 'from-blue-500 to-blue-600',
    },
    {
      label: 'Projects',
      value: stats.projects,
      color: 'purple',
      icon: Briefcase,
      bgGradient: 'from-purple-500 to-purple-600',
    },
    {
      label: 'Testimonials',
      value: stats.testimonials,
      color: 'green',
      icon: MessageCircle,
      bgGradient: 'from-green-500 to-green-600',
    },
    {
      label: 'Clients',
      value: stats.clients,
      color: 'orange',
      icon: Building2,
      bgGradient: 'from-orange-500 to-orange-600',
    },
    {
      label: 'Contact Messages',
      value: stats.contactSubmissions,
      color: 'pink',
      icon: Mail,
      bgGradient: 'from-pink-500 to-pink-600',
    },
    {
      label: 'Unread Messages',
      value: stats.unreadContacts,
      color: 'red',
      icon: Bell,
      bgGradient: 'from-red-500 to-red-600',
      trend: stats.unreadContacts > 0 ? 100 : 0,
    },
  ];

  const quickActions: QuickAction[] = [
    {
      label: 'Add Project',
      href: '/admin/projects',
      description: 'Create new portfolio item',
      icon: Plus,
      color: 'blue',
    },
    {
      label: 'Manage Services',
      href: '/admin/services',
      description: 'Edit service offerings',
      icon: Edit3,
      color: 'green',
    },
    {
      label: 'View Messages',
      href: '/admin/contact',
      description: 'Read contact submissions',
      icon: Mail,
      color: 'purple',
    },
    {
      label: 'Clients',
      href: '/admin/clients',
      description: 'Manage partners',
      icon: Building2,
      color: 'orange',
    },
  ];

  const activityItems = [
    { id: '1', title: 'New project "Website Redesign" added', time: '2 hours ago', icon: Briefcase, color: 'blue' },
    { id: '2', title: 'New testimonial from John Doe', time: '5 hours ago', icon: MessageCircle, color: 'green' },
    { id: '3', title: 'Contact submission from jane@email.com', time: '1 day ago', icon: Mail, color: 'purple' },
    { id: '4', title: 'Service "Web Development" updated', time: '2 days ago', icon: Box, color: 'orange' },
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[var(--accent)] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-[var(--text-2)]">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl lg:text-4xl font-bold text-[var(--text-0)] tracking-tight">
            Dashboard
          </h1>
          <p className="text-[var(--text-2)] mt-2">
            Welcome back! Here's what's happening with your content.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 bg-[var(--accent)] hover:bg-[var(--accent-deep)] text-white rounded-xl font-medium transition-colors shadow-lg shadow-[var(--accent)]/25">
            <Plus size={18} />
            <span>Add New</span>
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="group relative bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-xl hover:border-gray-200 transition-all duration-300"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-[var(--text-2)]">{stat.label}</p>
                  <p className="text-4xl font-bold text-[var(--text-0)] mt-2">{stat.value}</p>
                  {stat.trend && stat.trend > 0 && (
                    <div className="flex items-center gap-1 mt-2 text-green-600">
                      <TrendingUp size={14} />
                      <span className="text-sm font-medium">{stat.trend}% new</span>
                    </div>
                  )}
                </div>
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${stat.bgGradient} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <Icon size={24} className="text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Actions & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Quick Actions */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center gap-2 mb-6">
            <Zap size={22} className="text-[var(--accent)]" />
            <h2 className="text-xl font-bold text-[var(--text-0)]">Quick Actions</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {quickActions.map((action) => {
              const Icon = action.icon;
              return (
                <Link
                  key={action.label}
                  href={action.href}
                  className="group flex items-start gap-4 p-4 rounded-xl bg-gray-50 hover:bg-gradient-to-br hover:from-gray-50 hover:to-gray-100 border border-gray-100 hover:border-gray-200 transition-all duration-300"
                >
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br from-${action.color}-500 to-${action.color}-600 flex items-center justify-center shadow-md group-hover:scale-110 transition-transform`}>
                    <Icon size={20} className="text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-[var(--text-0)] group-hover:text-[var(--accent)] transition-colors">
                      {action.label}
                    </p>
                    <p className="text-sm text-[var(--text-2)] mt-0.5">{action.description}</p>
                  </div>
                  <ArrowUpRight size={18} className="text-gray-400 group-hover:text-[var(--accent)] transition-colors self-center" />
                </Link>
              );
            })}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center gap-2 mb-6">
            <Clock size={22} className="text-[var(--accent)]" />
            <h2 className="text-xl font-bold text-[var(--text-0)]">Recent Activity</h2>
          </div>
          <div className="space-y-4">
            {activityItems.map((activity) => {
              const Icon = activity.icon;
              return (
                <div
                  key={activity.id}
                  className="flex items-start gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors"
                >
                  <div className={`w-10 h-10 rounded-xl bg-${activity.color}-100 flex items-center justify-center flex-shrink-0`}>
                    <Icon size={18} className={`text-${activity.color}-600`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-[var(--text-0)] truncate">
                      {activity.title}
                    </p>
                    <p className="text-xs text-[var(--text-2)] mt-0.5">{activity.time}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Quick Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-2xl p-6 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-indigo-100 text-sm font-medium">Total Views</p>
              <p className="text-3xl font-bold mt-1">12,458</p>
            </div>
            <Eye size={32} className="text-indigo-200" />
          </div>
          <div className="flex items-center gap-1 mt-3 text-indigo-100 text-sm">
            <TrendingUp size={14} />
            <span>+12.5% from last month</span>
          </div>
        </div>

        <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl p-6 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-emerald-100 text-sm font-medium">Conversion Rate</p>
              <p className="text-3xl font-bold mt-1">3.24%</p>
            </div>
            <CheckCircle2 size={32} className="text-emerald-200" />
          </div>
          <div className="flex items-center gap-1 mt-3 text-emerald-100 text-sm">
            <TrendingUp size={14} />
            <span>+0.8% from last month</span>
          </div>
        </div>

        <div className="bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl p-6 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-amber-100 text-sm font-medium">Active Projects</p>
              <p className="text-3xl font-bold mt-1">{stats.projects}</p>
            </div>
            <Award size={32} className="text-amber-200" />
          </div>
          <div className="flex items-center gap-1 mt-3 text-amber-100 text-sm">
            <Users size={14} />
            <span>Portfolio live</span>
          </div>
        </div>
      </div>
    </div>
  );
}