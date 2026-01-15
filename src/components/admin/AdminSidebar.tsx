'use client';

import { usePathname, useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useAdminSidebar } from '@/contexts/admin/AdminSidebarContext';
import { useAdminAuth } from '@/contexts/admin/AdminAuthContext';
import Image from 'next/image';
import { 
  LayoutDashboard, 
  FileText, 
  FolderOpen,
  Settings,
  LogOut,
  Pin,
  PinOff
} from 'lucide-react';

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/admin' },
  { icon: FileText, label: 'Posts', href: '/admin/posts' },
  { icon: FolderOpen, label: 'Categorías', href: '/admin/categories' },
  { icon: Settings, label: 'Config', href: '/admin/settings' },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { isPinned, isHovered, isExpanded, togglePin, setHovered } = useAdminSidebar();
  const { signOut } = useAdminAuth();

  return (
    <aside 
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={cn(
        "fixed top-0 left-0 h-screen bg-white dark:bg-black border-r border-black/10 dark:border-white/10 z-50 transition-all duration-300",
        "flex flex-col",
        isExpanded ? "w-56" : "w-10"
      )}
    >
      {/* Pin button */}
      <div className="h-10 flex items-center justify-between px-1 dark:border-white/10">
        <Image
          src="/media/Identidad/Icono-Disruptivo-Lab.webp"
          alt="Disruptivo Lab"
          width={32}
          height={32}
          className="w-8 h-8 flex-shrink-0"
        />
        {isExpanded && (
          <button
            onClick={togglePin}
            className="p-1.5 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white transition-colors"
          >
            {isPinned ? <Pin className="w-4 h-4" /> : <PinOff className="w-4 h-4" />}
          </button>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 px-2 space-y-1 overflow-y-auto">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          
          return (
            <button
              key={item.href}
              onClick={() => router.push(item.href)}
              className={cn(
                "w-full flex items-center gap-3 px-1 py-1 rounded-lg transition-all group relative",
                isActive 
                  ? "bg-red-600 text-white" 
                  : "text-black/70 dark:text-white/70 hover:bg-black/5 dark:hover:bg-white/5 hover:text-black dark:hover:text-white"
              )}
              title={!isExpanded ? item.label : undefined}
            >
              <Icon className="w-4 h-4 shrink-0" />
              {isExpanded && (
                <span className="text-sm font-medium truncate">{item.label}</span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="p-1 border-t">
        <button
          onClick={() => signOut()}
          className="w-full flex items-center gap-3 px-1 py-2.5 rounded-lg text-black/70 dark:text-white/70 hover:bg-black/5 dark:hover:bg-white/5 hover:text-black dark:hover:text-white transition-all"
          title={!isExpanded ? 'Cerrar Sesión' : undefined}
        >
          <LogOut className="w-4 h-4 flex-shrink-0" />
          {isExpanded && <span className="text-sm font-medium">Salir</span>}
        </button>
      </div>
    </aside>
  );
}
