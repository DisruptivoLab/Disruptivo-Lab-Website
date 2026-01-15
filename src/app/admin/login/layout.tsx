import { AdminAuthProvider } from '@/contexts/admin/AdminAuthContext';
import { AdminSidebarProvider } from '@/contexts/admin/AdminSidebarContext';

export default function AdminLoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminAuthProvider>
      <AdminSidebarProvider>
        {children}
      </AdminSidebarProvider>
    </AdminAuthProvider>
  );
}
