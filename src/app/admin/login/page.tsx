'use client';

import { useState } from 'react';
import { useAdminAuth } from '@/contexts/admin/AdminAuthContext';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Eye, EyeOff, Loader2 } from 'lucide-react';

export default function AdminLoginPage() {
  const { signIn } = useAdminAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await signIn(email, password);
    } catch (err) {
      setError('Credenciales inválidas. Verifica tu email y contraseña.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-black via-gray-900 to-black">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center gap-3">
            <Image
              src="/media/Identidad/Icono-Disruptivo-Lab.webp"
              alt="Disruptivo Lab"
              width={48}
              height={48}
              className="h-12 w-auto"
            />
            <span className="font-mono font-bold text-2xl text-white">
              Disruptivo_Lab
            </span>
          </div>
        </div>

        {/* Login Card */}
        <div className={cn(
          "rounded-3xl p-8",
          "backdrop-blur-[12px] backdrop-saturate-150",
          "bg-white/8 border border-white/10",
          "shadow-[inset_0_1px_0_rgba(255,255,255,0.1),0_10px_40px_rgba(0,0,0,0.3)]"
        )}>
          <h1 className="text-2xl font-bold text-white mb-2 text-center">
            Admin Panel
          </h1>
          <p className="text-white/60 text-sm text-center mb-8">
            Ingresa tus credenciales para continuar
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-white/80 mb-2">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className={cn(
                  "w-full px-4 py-3 rounded-xl",
                  "bg-white/5 border border-white/10",
                  "text-white placeholder:text-white/40",
                  "focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500/50",
                  "transition-all duration-200"
                )}
                placeholder="admin@disruptivolab.com"
              />
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-white/80 mb-2">
                Contraseña
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className={cn(
                    "w-full px-4 py-3 rounded-xl pr-12",
                    "bg-white/5 border border-white/10",
                    "text-white placeholder:text-white/40",
                    "focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500/50",
                    "transition-all duration-200"
                  )}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/80 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20">
                <p className="text-sm text-red-400">{error}</p>
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className={cn(
                "w-full py-3 rounded-xl font-semibold",
                "bg-gradient-to-r from-orange-500 to-red-500",
                "hover:from-orange-600 hover:to-red-600",
                "text-white shadow-lg shadow-orange-500/25",
                "transition-all duration-200",
                "disabled:opacity-50 disabled:cursor-not-allowed",
                "flex items-center justify-center gap-2"
              )}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Iniciando sesión...
                </>
              ) : (
                'Iniciar Sesión'
              )}
            </button>
          </form>
        </div>

        {/* Footer */}
        <p className="text-center text-white/40 text-sm mt-6">
          © 2025 Disruptivo Lab. Todos los derechos reservados.
        </p>
      </div>
    </div>
  );
}
