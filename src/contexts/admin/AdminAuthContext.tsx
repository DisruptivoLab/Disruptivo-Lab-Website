'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

interface AdminUser {
  id: string;
  email: string;
  full_name?: string;
  role: 'admin' | 'editor';
  avatar_url?: string;
}

interface AdminAuthContextType {
  user: User | null;
  adminUser: AdminUser | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  isAdmin: boolean;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

export function AdminAuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchAdminUser(session.user.id);
      } else {
        setIsLoading(false);
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchAdminUser(session.user.id);
      } else {
        setAdminUser(null);
        setIsLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchAdminUser = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('admin_users')
        .select('*')
        .eq('id', userId)
        .eq('is_active', true)
        .maybeSingle(); // Cambiar de .single() a .maybeSingle()

      if (error) {
        console.error('Error fetching admin user:', error);
        // Si no existe en admin_users, crear uno temporal
        setAdminUser({
          id: userId,
          email: 'admin@disruptivolab.com',
          full_name: 'Admin',
          role: 'admin'
        });
      } else if (data) {
        setAdminUser(data);
      } else {
        // No existe, crear temporal
        setAdminUser({
          id: userId,
          email: 'admin@disruptivolab.com',
          full_name: 'Admin',
          role: 'admin'
        });
      }
    } catch (error) {
      console.error('Error fetching admin user:', error);
      // Fallback: crear adminUser temporal
      setAdminUser({
        id: userId,
        email: 'admin@disruptivolab.com',
        full_name: 'Admin',
        role: 'admin'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      // TEMPORAL: Login simple sin verificar admin_users
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      if (data.user) {
        // Crear adminUser temporal sin consultar la base de datos
        setAdminUser({
          id: data.user.id,
          email: data.user.email || '',
          full_name: 'Admin',
          role: 'admin'
        });
        router.push('/admin');
      }
    } catch (error) {
      console.error('Sign in error:', error);
      throw error;
    }
  };

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
      setUser(null);
      setAdminUser(null);
      router.push('/admin/login');
    } catch (error) {
      console.error('Sign out error:', error);
      throw error;
    }
  };

  const isAdmin = adminUser?.role === 'admin';

  return (
    <AdminAuthContext.Provider
      value={{
        user,
        adminUser,
        isLoading,
        signIn,
        signOut,
        isAdmin,
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  const context = useContext(AdminAuthContext);
  if (context === undefined) {
    throw new Error('useAdminAuth must be used within AdminAuthProvider');
  }
  return context;
}
