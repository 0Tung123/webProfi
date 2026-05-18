'use client';

import { usePathname } from 'next/navigation';
import { useAuth } from '@/app/contexts/AuthContext';
import {
  Home,
  UserCircle,
  Briefcase,
  Layers,
  MessageSquare,
  Building2,
  GitGraph,
  Mail,
  Users,
  Contact,
  LogOut,
  Menu,
  X,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

interface NavItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
}

const navItems: NavItem[] = [
  { label: 'Dashboard', href: '/admin', icon: Home },
  { label: 'Hero Content', href: '/admin/hero', icon: UserCircle },
  { label: 'Projects', href: '/admin/projects', icon: Briefcase },
  { label: 'Services', href: '/admin/services', icon: Layers },
  { label: 'Testimonials', href: '/admin/testimonials', icon: MessageSquare },
  { label: 'Clients', href: '/admin/clients', icon: Building2 },
  { label: 'Team', href: '/admin/team', icon: Users },
  { label: 'Process', href: '/admin/process', icon: GitGraph },
  { label: 'Contact Info', href: '/admin/contact-info', icon: Contact },
  { label: 'Messages', href: '/admin/contact', icon: Mail },
];

export default function AdminSidebar({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { logout, user } = useAuth();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 1024;

  const handleLogout = () => {
    logout();
    window.location.href = '/admin/login';
  };

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className="flex min-h-screen bg-[var(--bg-0)]">
      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:static inset-y-0 left-0 z-50
          bg-[var(--text-0)] text-[var(--bg-0)]
          shadow-2xl lg:shadow-xl
          transition-all duration-300 ease-standard
          ${isCollapsed ? 'lg:w-20' : 'lg:w-72'}
          ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          flex flex-col
        `}
      >
        {/* Logo/Header */}
        <div className="flex items-center justify-between p-5 border-b border-[var(--surface-border)]">
          {!isCollapsed && (
            <Link href="/admin" className="flex items-center gap-3 flex-1">
              <div className="w-10 h-10 bg-[var(--accent)] rounded-xl flex items-center justify-center shadow-lg">
                <Layers size={22} className="text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold tracking-tight">HAT Admin</h1>
                <p className="text-xs text-[var(--text-2)]">Content Manager</p>
              </div>
            </Link>
          )}
          {isCollapsed && (
            <div className="w-10 h-10 bg-[var(--accent)] rounded-xl flex items-center justify-center mx-auto shadow-lg">
              <Layers size={22} className="text-white" />
            </div>
          )}
          <button
            onClick={toggleSidebar}
            className="hidden lg:flex p-2 rounded-lg hover:bg-[var(--bg-1)] transition-colors"
            aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </button>
          <button
            onClick={() => setIsMobileOpen(false)}
            className="lg:hidden p-2 rounded-lg hover:bg-[var(--bg-1)] transition-colors"
            aria-label="Close sidebar"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-5 px-3">
          <ul className="space-y-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setIsMobileOpen(false)}
                    className={`
                      flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-200
                      group relative overflow-hidden
                      ${isActive
                        ? 'bg-[var(--accent)] text-white shadow-md'
                        : 'text-[var(--text-1)] hover:bg-[var(--bg-1)] hover:text-[var(--text-0)]'
                      }
                    `}
                  >
                    <Icon
                      size={20}
                      className={`flex-shrink-0 ${isActive ? 'text-white' : 'text-[var(--text-2)] group-hover:text-[var(--text-0)]'}`}
                    />
                    {!isCollapsed && (
                      <span className="font-medium text-sm flex-1">{item.label}</span>
                    )}
                    {isActive && !isCollapsed && (
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-white/30 rounded-l-xl" />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* User & Logout */}
        <div className="p-4 border-t border-[var(--surface-border)]">
          {/* User Info */}
          {!isCollapsed && user && (
            <div className="mb-3 px-4 py-3 bg-[var(--bg-1)] rounded-xl">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-[var(--accent)] rounded-full flex items-center justify-center">
                  <span className="text-xs font-bold text-white">
                    {user.email?.charAt(0).toUpperCase() || 'U'}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-[var(--text-0)] truncate">
                    {user.email || 'User'}
                  </p>
                  <p className="text-xs text-[var(--text-2)]">Administrator</p>
                </div>
              </div>
            </div>
          )}

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className={`
              w-full flex items-center gap-3 px-4 py-3.5
              bg-red-500 hover:bg-red-600 text-white rounded-xl
              transition-all duration-200 shadow-sm hover:shadow-md
              ${isCollapsed ? 'justify-center' : ''}
            `}
            aria-label="Logout"
          >
            <LogOut size={20} />
            {!isCollapsed && <span className="font-medium text-sm">Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-h-0">
        {/* Mobile Header */}
        <header className="lg:hidden flex items-center justify-between p-4 bg-white border-b border-[var(--surface-border)]">
          <button
            onClick={() => setIsMobileOpen(true)}
            className="p-2 rounded-lg hover:bg-[var(--bg-1)] transition-colors"
            aria-label="Open menu"
          >
            <Menu size={22} className="text-[var(--text-0)]" />
          </button>
          <span className="font-semibold text-[var(--text-0)]">
            {navItems.find(item => item.href === pathname)?.label || 'Admin'}
          </span>
          <div className="w-10" /> {/* Spacer for centering */}
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-auto p-4 lg:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}