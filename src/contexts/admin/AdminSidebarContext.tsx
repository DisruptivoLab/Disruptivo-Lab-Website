'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

interface AdminSidebarContextType {
  isPinned: boolean;
  isHovered: boolean;
  isExpanded: boolean;
  togglePin: () => void;
  setHovered: (value: boolean) => void;
}

const AdminSidebarContext = createContext<AdminSidebarContextType | undefined>(undefined);

export function AdminSidebarProvider({ children }: { children: ReactNode }) {
  const [isPinned, setIsPinned] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const togglePin = () => {
    setIsPinned(!isPinned);
  };

  const handleSetHovered = (value: boolean) => {
    setIsHovered(value);
  };

  const isExpanded = isPinned || isHovered;

  return (
    <AdminSidebarContext.Provider
      value={{
        isPinned,
        isHovered,
        isExpanded,
        togglePin,
        setHovered: handleSetHovered,
      }}
    >
      {children}
    </AdminSidebarContext.Provider>
  );
}

export function useAdminSidebar() {
  const context = useContext(AdminSidebarContext);
  if (context === undefined) {
    throw new Error('useAdminSidebar must be used within AdminSidebarProvider');
  }
  return context;
}
