'use client';

import { useAdminSidebar } from '@/contexts/admin/AdminSidebarContext';
import { useAdminAuth } from '@/contexts/admin/AdminAuthContext';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { cn } from '@/lib/utils';

export function AdminLayoutContent({ children }: { children: React.ReactNode }) {
  const { isExpanded } = useAdminSidebar();
  const { user, isLoading } = useAdminAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!isLoading && !user && pathname !== '/admin/login') {
      router.push('/admin/login');
    }
  }, [user, isLoading, router, pathname]);

  if (isLoading) {
    return (
      <main className="flex-1 flex items-center justify-center min-h-screen">
        <div className="text-black/60 dark:text-white/60">Cargando...</div>
      </main>
    );
  }

  if (!user && pathname !== '/admin/login') {
    return null;
  }

  return (
    <main className={cn(
      "flex-1 transition-all duration-300",
      isExpanded ? "ml-56" : "ml-10"
    )}>
      {children}
    </main>
  );
}
