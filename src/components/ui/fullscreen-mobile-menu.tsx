/**
 * Fullscreen Mobile Menu Component
 * Menú móvil de pantalla completa con efectos Liquid Glass
 */

'use client';

import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";
import { ContactButton } from "./contact-button";
import { SimpleThemeToggle } from "./simple-theme-toggle";

interface FullscreenMobileMenuProps {
    isOpen: boolean;
    onClose: () => void;
    navLinks: Array<{ href: string; label: string }>;
}

export function FullscreenMobileMenu({ isOpen, onClose, navLinks }: FullscreenMobileMenuProps) {
    // Prevenir scroll del body cuando el menú está abierto
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className={cn(
            "fixed inset-0 z-[100] md:hidden",
            // Animación de entrada
            "animate-in fade-in duration-300"
        )}>
            {/* Backdrop con Liquid Glass */}
            <div className={cn(
                "absolute inset-0",
                // Fondo translúcido con Liquid Glass
                "backdrop-blur-[12px] backdrop-saturate-[1.8]",
                // Temas adaptativos
                "dark:bg-black/40 light:bg-white/40",
                // Gradiente sutil para profundidad
                "bg-gradient-to-br dark:from-black/50 dark:via-black/30 dark:to-black/50 light:from-white/50 light:via-white/30 light:to-white/50"
            )} />

            {/* Contenido del menú */}
            <div className="relative z-10 h-full flex flex-col">
                {/* Header con botón de cerrar */}
                <div className="flex justify-between items-center p-6">
                    {/* Logo */}
                    <div className="font-heading font-bold text-lg sm:text-xl dark:text-white light:text-black">
                        <span className="text-orange-500">D</span>L
                    </div>

                    {/* Botón de cerrar con diseño más natural y redondeado */}
                    <button
                        onClick={onClose}
                        className={cn(
                            "w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center",
                            "backdrop-blur-[8px] backdrop-saturate-150",
                            "transition-all duration-500 ease-out",
                            "hover:scale-110 active:scale-95 hover:rotate-90",
                            // Fondo translúcido más sutil
                            "bg-white/8 dark:bg-white/6",
                            // Sombras más suaves y naturales
                            "shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08),inset_2px_4px_0px_-2px_rgba(255,255,255,0.85),inset_-2px_-2px_0px_-2px_rgba(255,255,255,0.75),inset_-4px_-10px_2px_-6px_rgba(255,255,255,0.55),inset_-0.5px_-1px_6px_0px_rgba(0,0,0,0.08),inset_-2px_3px_0px_-2px_rgba(0,0,0,0.15),inset_0px_4px_6px_-2px_rgba(0,0,0,0.15),inset_3px_-8px_2px_-4px_rgba(0,0,0,0.08),0px_2px_8px_0px_rgba(0,0,0,0.08),0px_8px_20px_0px_rgba(0,0,0,0.06)]",
                            // Temas adaptativos para texto
                            "dark:text-white light:text-black"
                        )}
                        aria-label="Cerrar menú"
                    >
                        <X className="w-5 h-5 sm:w-6 sm:h-6 transition-transform duration-300" />
                    </button>
                </div>

                {/* Navegación principal */}
                <div className="flex-1 flex flex-col justify-center px-6">
                    <nav className="space-y-4 sm:space-y-6">
                        {navLinks.map((link, index) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                onClick={onClose}
                                className={cn(
                                    "block text-center py-3 px-6 sm:py-4 sm:px-8 rounded-full", // Forma pill más compacta
                                    "font-heading text-lg sm:text-xl font-medium",
                                    // Liquid Glass con diseño más natural
                                    "backdrop-blur-[8px] backdrop-saturate-150",
                                    "bg-white/8 dark:bg-white/6",
                                    // Sombras más suaves y naturales
                                    "shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08),inset_2px_4px_0px_-2px_rgba(255,255,255,0.85),inset_-2px_-2px_0px_-2px_rgba(255,255,255,0.75),inset_-4px_-10px_2px_-6px_rgba(255,255,255,0.55),inset_-0.5px_-1px_6px_0px_rgba(0,0,0,0.08),inset_-2px_3px_0px_-2px_rgba(0,0,0,0.15),inset_0px_4px_6px_-2px_rgba(0,0,0,0.15),inset_3px_-8px_2px_-4px_rgba(0,0,0,0.08),0px_2px_8px_0px_rgba(0,0,0,0.08),0px_8px_20px_0px_rgba(0,0,0,0.06)]",
                                    "transition-all duration-700 ease-out",
                                    "hover:scale-110 active:scale-95 hover:bg-white/12",
                                    "transform translate-y-12 opacity-0",
                                    // Animación de entrada escalonada más suave
                                    isOpen && "translate-y-0 opacity-100",
                                    // Temas adaptativos para texto
                                    "dark:text-white light:text-black",
                                    // Hover con color de acento más suave
                                    "hover:text-orange-400 hover:shadow-[0_0_20px_rgba(251,146,60,0.3)]"
                                )}
                                style={{
                                    transitionDelay: isOpen ? `${index * 120 + 300}ms` : '0ms'
                                }}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </nav>
                </div>

                {/* Footer con controles */}
                <div className="p-6 space-y-6">
                    {/* Panel de controles */}
                    <div className={cn(
                        "flex justify-center items-center gap-4 p-4 rounded-2xl",
                        "backdrop-blur-[8px] backdrop-saturate-150",
                        "bg-white/8 dark:bg-white/6",
                        "shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08),inset_2px_4px_0px_-2px_rgba(255,255,255,0.85),inset_-2px_-2px_0px_-2px_rgba(255,255,255,0.75),inset_-4px_-10px_2px_-6px_rgba(255,255,255,0.55),inset_-0.5px_-1px_6px_0px_rgba(0,0,0,0.08),inset_-2px_3px_0px_-2px_rgba(0,0,0,0.15),inset_0px_4px_6px_-2px_rgba(0,0,0,0.15),inset_3px_-8px_2px_-4px_rgba(0,0,0,0.08),0px_2px_8px_0px_rgba(0,0,0,0.08),0px_8px_20px_0px_rgba(0,0,0,0.06)]"
                    )}>
                        <ContactButton />
                        <div className={cn(
                            "w-px h-8",
                            "bg-gradient-to-b from-transparent via-white/20 to-transparent"
                        )} />
                        <SimpleThemeToggle />
                    </div>
                    
                    {/* Decoración */}
                    <div className={cn(
                        "h-3 rounded-full mx-auto w-40",
                        // Liquid Glass más suave
                        "backdrop-blur-[8px] backdrop-saturate-150",
                        "bg-white/6 dark:bg-white/4",
                        // Sombras internas más suaves
                        "shadow-[inset_0_0_0_1px_rgba(255,255,255,0.06),inset_2px_2px_0px_-1px_rgba(255,255,255,0.5),inset_-2px_-2px_0px_-1px_rgba(255,255,255,0.3),0px_2px_6px_0px_rgba(0,0,0,0.08)]",
                        // Gradiente más sutil y natural
                        "bg-gradient-to-r from-orange-400/15 via-orange-500/25 to-orange-400/15",
                        // Animación sutil
                        "animate-pulse"
                    )} />
                </div>
            </div>
        </div>
    );
}