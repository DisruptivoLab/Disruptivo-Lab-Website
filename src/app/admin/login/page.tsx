'use client';

import { useState, useEffect, useRef } from 'react';
import { useAdminAuth } from '@/contexts/admin/AdminAuthContext';
import { useAdminTheme } from '@/contexts/admin/AdminThemeContext';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Eye, EyeOff, Loader2, Sun, Moon } from 'lucide-react';

export default function AdminLoginPage() {
  const { signIn, user, isLoading: authLoading } = useAdminAuth();
  const { theme, toggleTheme } = useAdminTheme();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    console.log('👤 [LOGIN PAGE] Estado del usuario:', user ? 'Autenticado' : 'No autenticado');
    console.log('⏳ [LOGIN PAGE] authLoading:', authLoading);
    
    if (user && !authLoading) {
      console.log('🔄 [LOGIN PAGE] Usuario ya autenticado, redirigiendo a /admin');
      router.replace('/admin');
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth / 2;
    canvas.height = window.innerHeight;

    const particles: Array<{ x: number; y: number; vx: number; vy: number; size: number }> = [];
    const particleCount = 80;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 1
      });
    }

    function animate() {
      if (!ctx || !canvas) return;
      
      ctx.fillStyle = theme === 'dark' ? 'rgba(0, 0, 0, 0.05)' : 'rgba(255, 255, 255, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        const dx = mousePos.x - p.x;
        const dy = mousePos.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 150) {
          p.x -= dx * 0.01;
          p.y -= dy * 0.01;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = theme === 'dark' ? 'rgba(255, 255, 255, 0.6)' : 'rgba(0, 0, 0, 0.6)';
        ctx.fill();

        particles.forEach((p2, j) => {
          if (i === j) return;
          const dx2 = p.x - p2.x;
          const dy2 = p.y - p2.y;
          const dist2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);

          if (dist2 < 100) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = theme === 'dark' 
              ? `rgba(255, 255, 255, ${0.2 * (1 - dist2 / 100)})`
              : `rgba(0, 0, 0, ${0.2 * (1 - dist2 / 100)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });

      requestAnimationFrame(animate);
    }

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth / 2;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [mousePos, theme]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (rect) {
      setMousePos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    console.log('🔐 [LOGIN] Iniciando proceso de login...');
    console.log('📧 [LOGIN] Email:', email);

    try {
      console.log('⏳ [LOGIN] Llamando a signIn...');
      await signIn(email, password);
      console.log('✅ [LOGIN] signIn completado exitosamente');
    } catch (err) {
      console.error('❌ [LOGIN] Error en signIn:', err);
      setError('Credenciales inválidas. Verifica tu email y contraseña.');
    } finally {
      setIsLoading(false);
      console.log('🏁 [LOGIN] Proceso finalizado');
    }
  };

  return (
    <div className="min-h-screen flex bg-white dark:bg-black transition-colors">
      {/* Left Side - Interactive Canvas */}
      <div 
        className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-white dark:bg-black"
        onMouseMove={handleMouseMove}
      >
        <canvas 
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
        />
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="text-center space-y-4">
            <Image
              src="/media/Identidad/Icono-Disruptivo-Lab.webp"
              alt="Disruptivo Lab"
              width={120}
              height={120}
              className="mx-auto opacity-90"
            />
            <h1 className="font-mono font-bold text-4xl text-black dark:text-white">
              Disruptivo_Lab
            </h1>
            <p className="text-black/60 dark:text-white/60 text-lg">
              Innovation meets technology
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white dark:bg-black relative">
        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="absolute top-6 right-6 p-3 rounded-xl bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 text-black dark:text-white transition-colors"
        >
          {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>

        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden flex justify-center mb-8">
            <div className="flex items-center gap-3">
              <Image
                src="/media/Identidad/Icono-Disruptivo-Lab.webp"
                alt="Disruptivo Lab"
                width={48}
                height={48}
              />
              <span className="font-mono font-bold text-2xl text-black dark:text-white">
                Disruptivo_Lab
              </span>
            </div>
          </div>

          {/* Login Card */}
          <div className="space-y-6">
            <div>
              <h2 className="text-3xl font-bold text-black dark:text-white mb-2">
                Admin Panel
              </h2>
              <p className="text-black/60 dark:text-white/60">
                Ingresa tus credenciales para continuar
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-black/80 dark:text-white/80 mb-2">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                  className={cn(
                    "w-full px-4 py-3 rounded-xl",
                    "bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10",
                    "text-black dark:text-white placeholder:text-black/40 dark:placeholder:text-white/40",
                    "focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500/50",
                    "transition-all duration-200"
                  )}
                  placeholder="admin@disruptivolab.com"
                />
              </div>

              {/* Password */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-black/80 dark:text-white/80 mb-2">
                  Contraseña
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    autoComplete="current-password"
                    className={cn(
                      "w-full px-4 py-3 rounded-xl pr-12",
                      "bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10",
                      "text-black dark:text-white placeholder:text-black/40 dark:placeholder:text-white/40",
                      "focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500/50",
                      "transition-all duration-200"
                    )}
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-black/40 dark:text-white/40 hover:text-black/80 dark:hover:text-white/80 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Error */}
              {error && (
                <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20">
                  <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={isLoading}
                className={cn(
                  "w-full py-3 rounded-xl font-semibold",
                  "bg-red-600 hover:bg-red-700",
                  "text-white shadow-lg shadow-red-500/25",
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
          <p className="text-center text-black/40 dark:text-white/40 text-sm mt-8">
            © 2025 Disruptivo Lab. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </div>
  );
}
