'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAdminAuth } from '@/contexts/admin/AdminAuthContext';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { Loader2, FileText, FolderOpen, TrendingUp } from 'lucide-react';

export default function AdminDashboard() {
  const { adminUser, isLoading } = useAdminAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !adminUser) {
      router.push('/admin/login');
    }
  }, [adminUser, isLoading, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <Loader2 className="w-8 h-8 animate-spin text-orange-500" />
      </div>
    );
  }

  if (!adminUser) {
    return null;
  }

  const stats = [
    { icon: FileText, label: 'Total Posts', value: '0', color: 'from-blue-500 to-blue-600' },
    { icon: FolderOpen, label: 'Categorías', value: '0', color: 'from-purple-500 to-purple-600' },
    { icon: TrendingUp, label: 'Publicados', value: '0', color: 'from-red-500 to-red-600' },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-black transition-colors">
      <AdminHeader title="Dashboard" />
      
      <div className="p-6 space-y-6">
        {/* Welcome */}
        <div className="bg-red-600 rounded-2xl p-6 text-white">
          <h2 className="text-2xl font-bold mb-2">
            Bienvenido, {adminUser.full_name}
          </h2>
          <p className="text-white/80">
            Gestiona el contenido del blog desde aquí
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className="bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-2xl p-6 hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.color}`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-black/60 dark:text-white/60 text-sm">{stat.label}</p>
                    <p className="text-3xl font-bold text-black dark:text-white">{stat.value}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick Actions */}
        <div className="bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-2xl p-6">
          <h3 className="text-lg font-bold text-black dark:text-white mb-4">Acciones Rápidas</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              onClick={() => router.push('/admin/posts/new')}
              className="p-4 rounded-xl bg-red-600 text-white font-semibold hover:bg-red-700 transition-all"
            >
              + Crear Nuevo Post
            </button>
            <button
              onClick={() => router.push('/admin/categories')}
              className="p-4 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-black dark:text-white font-semibold hover:bg-black/10 dark:hover:bg-white/10 transition-all"
            >
              Gestionar Categorías
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
