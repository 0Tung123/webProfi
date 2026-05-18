'use client';

import {
  Edit3,
  Trash2,
  Eye,
  Search,
  Filter,
  MoreHorizontal,
  ChevronLeft,
  ChevronRight,
  Check,
  X
} from 'lucide-react';

interface DataTableProps<T> {
  data: T[];
  columns: Array<{
    key: keyof T | string;
    header: string;
    render?: (value: T[keyof T], row: T) => React.ReactNode;
  }>;
  onEdit?: (item: T) => void;
  onDelete?: (item: T) => void;
  onView?: (item: T) => void;
  searchTerm?: string;
  onSearch?: (term: string) => void;
}

export default function DataTable<T>({
  data,
  columns,
  onEdit,
  onDelete,
  onView,
  searchTerm = '',
  onSearch,
}: DataTableProps<T>) {
  if (data.length === 0) {
    return (
      <div className="text-center py-16 bg-white rounded-2xl border border-gray-100">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Search size={28} className="text-gray-400" />
        </div>
        <p className="text-[var(--text-1)] font-medium">No data available</p>
        <p className="text-sm text-[var(--text-2)] mt-1">Try adjusting your search or filters</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      {onSearch && (
        <div className="relative">
          <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-2)]" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => onSearch(e.target.value)}
            placeholder="Search..."
            className="w-full pl-12 pr-4 py-3 bg-white rounded-xl border border-gray-100 focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/20 outline-none transition-all"
          />
        </div>
      )}

      {/* Table Container */}
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-100">
            <thead>
              <tr className="bg-gray-50/50">
                {columns.map((column) => (
                  <th
                    key={String(column.key)}
                    className="px-6 py-4 text-left text-xs font-semibold text-[var(--text-2)] uppercase tracking-wider"
                  >
                    {column.header}
                  </th>
                ))}
                {(onEdit || onDelete || onView) && (
                  <th className="px-6 py-4 text-right text-xs font-semibold text-[var(--text-2)] uppercase tracking-wider">
                    Actions
                  </th>
                )}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-50">
              {data.map((row, rowIndex) => (
                <tr
                  key={rowIndex}
                  className="hover:bg-gray-50/80 transition-colors group"
                >
                  {columns.map((column) => (
                    <td
                      key={String(column.key)}
                      className="px-6 py-4 text-sm text-[var(--text-1)]"
                    >
                      {column.render
                        ? column.render(row[column.key as keyof T], row)
                        : (row[column.key as keyof T] as React.ReactNode)}
                    </td>
                  ))}
                  {(onEdit || onDelete || onView) && (
                    <td className="px-6 py-4 text-right text-sm">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        {onView && (
                          <button
                            onClick={() => onView(row)}
                            className="p-2 rounded-lg hover:bg-blue-50 text-blue-600 hover:text-blue-700 transition-colors"
                            title="View"
                          >
                            <Eye size={18} />
                          </button>
                        )}
                        {onEdit && (
                          <button
                            onClick={() => onEdit(row)}
                            className="p-2 rounded-lg hover:bg-[var(--accent)]/10 text-[var(--accent)] hover:text-[var(--accent-deep)] transition-colors"
                            title="Edit"
                          >
                            <Edit3 size={18} />
                          </button>
                        )}
                        {onDelete && (
                          <button
                            onClick={() => onDelete(row)}
                            className="p-2 rounded-lg hover:bg-red-50 text-red-600 hover:text-red-700 transition-colors"
                            title="Delete"
                          >
                            <Trash2 size={18} />
                          </button>
                        )}
                      </div>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Empty State Footer */}
        {data.length > 0 && (
          <div className="px-6 py-4 bg-gray-50/50 border-t border-gray-100">
            <p className="text-sm text-[var(--text-2)]">
              Showing {data.length} {data.length === 1 ? 'item' : 'items'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}