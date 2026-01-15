'use client';

import { useAdminSidebar } from '@/contexts/admin/AdminSidebarContext';
import { cn } from '@/lib/utils';

export function AdminLayoutContent({ children }: { children: React.ReactNode }) {
  const { isExpanded } = useAdminSidebar();

  return (
    <main className={cn(
      "flex-1 transition-all duration-300",
      isExpanded ? "ml-56" : "ml-10"
    )}>
      {children}
    </main>
  );
}
