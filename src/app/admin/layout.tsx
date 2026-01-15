import { AdminAuthProvider } from '@/contexts/admin/AdminAuthContext';
import { AdminSidebarProvider } from '@/contexts/admin/AdminSidebarContext';
import { AdminThemeProvider } from '@/contexts/admin/AdminThemeContext';
import { AdminSidebar } from '@/components/admin/AdminSidebar';
import { AdminLayoutContent } from '@/components/admin/AdminLayoutContent';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminAuthProvider>
      <AdminThemeProvider>
        <AdminSidebarProvider>
          <div className="flex min-h-screen bg-white dark:bg-black transition-colors">
            <AdminSidebar />
            <AdminLayoutContent>
              {children}
            </AdminLayoutContent>
          </div>
        </AdminSidebarProvider>
      </AdminThemeProvider>
    </AdminAuthProvider>
  );
}
