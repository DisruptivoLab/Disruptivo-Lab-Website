# 🎛️ Admin Panel Architecture - Disruptivo Lab

## 🎯 Visión General

Panel de administración modular, escalable y mantenible con:
- **Auth**: Login con Supabase Auth
- **Layout**: Sidebar colapsable + Header dinámico
- **Temas**: Dark/Light mode
- **i18n**: Multiidioma (ES/EN)
- **Módulos**: Blog (ahora) + CRM (futuro)

---

## 🏗️ Arquitectura de Carpetas

```
src/
├── app/
│   └── admin/
│       ├── layout.tsx              # Layout con sidebar + header
│       ├── page.tsx                # Dashboard principal
│       ├── login/
│       │   └── page.tsx            # Página de login
│       └── blog/
│           ├── page.tsx            # Lista de posts
│           ├── new/
│           │   └── page.tsx        # Crear post
│           └── [id]/
│               ├── page.tsx        # Ver post
│               └── edit/
│                   └── page.tsx    # Editar post
├── components/
│   └── admin/
│       ├── layout/
│       │   ├── AdminSidebar.tsx    # Sidebar colapsable
│       │   ├── AdminHeader.tsx     # Header dinámico
│       │   └── AdminLayout.tsx     # Layout wrapper
│       ├── auth/
│       │   ├── LoginForm.tsx       # Formulario login
│       │   └── ProtectedRoute.tsx  # HOC protección
│       └── blog/
│           ├── PostList.tsx        # Lista de posts
│           ├── PostForm.tsx        # Formulario crear/editar
│           ├── PostPreview.tsx     # Preview del post
│           └── PostStats.tsx       # Estadísticas
├── contexts/
│   └── admin/
│       ├── AdminSidebarContext.tsx # Estado del sidebar
│       └── AdminAuthContext.tsx    # Estado de auth
└── hooks/
    └── admin/
        ├── useAdminAuth.ts         # Hook de autenticación
        └── useAdminSidebar.ts      # Hook del sidebar
```

---

## 🎨 Componentes Clave

### 1. AdminSidebar
**Estados:**
- `collapsed`: Sidebar colapsado (solo iconos)
- `expanded`: Sidebar expandido (iconos + texto)
- `pinned`: Sidebar fijado (no se colapsa en hover out)

**Comportamiento:**
- Hover: Expande temporalmente si está colapsado
- Click pin: Fija/desfija el estado expandido
- Responsive: Overlay en mobile

### 2. AdminHeader
**Props dinámicos:**
- `title`: Título de la página actual
- `backUrl`: URL para botón back (opcional)
- `actions`: Array de botones de acción
- `breadcrumbs`: Migas de pan

**Componentes:**
- Back/Forward buttons
- Título dinámico
- Acciones contextuales
- Theme toggle
- Language selector
- User menu

### 3. LoginForm
**Features:**
- Email + Password
- Remember me
- Forgot password link
- Logo de Disruptivo Lab
- Liquid Glass design
- Error handling

---

## 🔐 Sistema de Autenticación

### Supabase Auth Setup

```sql
-- Crear tabla de usuarios admin
CREATE TABLE admin_users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL UNIQUE,
  full_name TEXT,
  role TEXT DEFAULT 'editor' CHECK (role IN ('admin', 'editor')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  last_login TIMESTAMPTZ
);

-- RLS
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can read all admin users"
  ON admin_users FOR SELECT
  USING (auth.uid() IN (SELECT id FROM admin_users));
```

### Auth Flow
1. Usuario ingresa email/password
2. Supabase Auth valida credenciales
3. Verifica que existe en `admin_users`
4. Guarda sesión en localStorage
5. Redirect a `/admin`

---

## 📐 Layout System

### Sidebar States

```typescript
type SidebarState = {
  isCollapsed: boolean;
  isPinned: boolean;
  isHovered: boolean;
};

// Ancho del sidebar
const SIDEBAR_WIDTH = {
  collapsed: '80px',
  expanded: '280px'
};
```

### Header Props

```typescript
interface AdminHeaderProps {
  title: string;
  backUrl?: string;
  actions?: HeaderAction[];
  breadcrumbs?: Breadcrumb[];
}

interface HeaderAction {
  label: string;
  icon: LucideIcon;
  onClick: () => void;
  variant?: 'primary' | 'secondary' | 'danger';
}
```

---

## 🎨 Design System

### Colores Admin
- **Primary**: #FF4500 (Disruptivo Orange)
- **Sidebar Dark**: #1a1a1a
- **Sidebar Light**: #f5f5f5
- **Header**: Glass effect con backdrop-blur

### Componentes
- Todos usan Liquid Glass Design System
- Frosted buttons para acciones
- Glass cards para contenido
- Minimal links para navegación

---

## 🔄 Estado Global

### AdminSidebarContext
```typescript
interface AdminSidebarContextType {
  isCollapsed: boolean;
  isPinned: boolean;
  toggleCollapse: () => void;
  togglePin: () => void;
  setCollapsed: (value: boolean) => void;
}
```

### AdminAuthContext
```typescript
interface AdminAuthContextType {
  user: User | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  isAdmin: boolean;
}
```

---

## 📱 Responsive Behavior

### Desktop (>1024px)
- Sidebar: Colapsable/expandible
- Header: Full con todas las acciones
- Content: Máximo ancho con padding

### Tablet (768px - 1024px)
- Sidebar: Colapsado por defecto
- Header: Acciones en dropdown
- Content: Ancho completo

### Mobile (<768px)
- Sidebar: Overlay con backdrop
- Header: Hamburger menu
- Content: Full width, padding reducido

---

## 🚀 Módulos Futuros

### CRM Module (Próximamente)
```
admin/
└── crm/
    ├── clients/
    ├── projects/
    ├── invoices/
    └── analytics/
```

### Analytics Module
```
admin/
└── analytics/
    ├── blog/
    ├── traffic/
    └── conversions/
```

---

## 🎯 Prioridades de Implementación

### Fase 1: Core (Ahora)
1. ✅ Auth system
2. ✅ Layout (Sidebar + Header)
3. ✅ Blog CRUD
4. ✅ Theme toggle
5. ✅ i18n

### Fase 2: Enhancement
1. ⏳ Rich text editor
2. ⏳ Image upload
3. ⏳ Preview mode
4. ⏳ Analytics dashboard

### Fase 3: CRM
1. ⏳ Client management
2. ⏳ Project tracking
3. ⏳ Invoicing

---

**Creado**: Enero 2025
**Versión**: 1.0
