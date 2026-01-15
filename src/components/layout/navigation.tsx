'use client';

import { useModularTranslation } from "@/contexts/modular-translation-context";
import { useTheme } from "@/contexts/theme-context";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { HamburgerMenu } from "../ui/hamburger-menu";
import { LanguageModalTrigger } from "../ui/language-modal-trigger";
import { SimpleThemeToggle } from "../ui/simple-theme-toggle";
import { ContactButton } from "../ui/contact-button";
import { FullscreenMobileMenu } from "../ui/fullscreen-mobile-menu";
import Link from "next/link";
import Image from "next/image";

export function Navigation() {
  const { t, loadModularTranslation } = useModularTranslation();
  const { theme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    loadModularTranslation('common');
  }, [loadModularTranslation]);

  // Logo con iconotipo y texto - ahora dentro del componente para acceder a theme
  const Logo = () => (
    <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity duration-300">
      <Image
        src="/media/Identidad/Icono-Disruptivo-Lab.webp"
        alt="Disruptivo Lab Iconotipo"
        width={48}
        height={48}
        className="h-8 sm:h-10 md:h-12 w-auto"
        priority
      />
      <span className={cn(
        "font-mono font-bold text-sm sm:text-base md:text-lg lg:text-xl tracking-tight transition-colors duration-300",
        theme === 'dark' ? 'text-white' : 'text-black'
      )}>
        Disruptivo_Lab
      </span>
    </Link>
  );

  const navLinks = [
    { href: "/", label: t("navigation.home") },
    { href: "/method", label: t("navigation.method") },
    { href: "/services", label: t("navigation.services") },
    { href: "/portfolio", label: t("navigation.portfolio") },
    { href: "/blog", label: t("navigation.blog") },
    { href: "/about", label: t("navigation.about") },
  ];

  return (
    <>
      <header className={cn(
        "fixed z-50 top-[2vh] left-0 right-0",
        "transition-all duration-300"
      )}>
        <div className={cn(
          "relative px-3 sm:px-4 md:px-6 lg:px-8 xl:px-12",
          "mx-auto w-[97%]"
        )}>
          <div className="flex items-center justify-between h-12 sm:h-16 md:h-20">
            {/* Logo */}
            <Logo />

            {/* Navegación de Escritorio */}
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className={cn(
                    "font-body text-sm font-medium px-4 py-2 rounded-full transition-all duration-500 ease-out hover:scale-105 active:scale-95",
                    "hover:text-orange-400 hover:bg-white/8 hover:backdrop-blur-sm hover:shadow-[0_2px_8px_rgba(251,146,60,0.2)]",
                    theme === 'dark' ? 'text-white' : 'text-black'
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Controles - Siempre visibles */}
            <div className="flex items-center gap-2 sm:gap-2.5 md:gap-3">
              <LanguageModalTrigger />
              <ContactButton />

              {/* Theme Toggle - Solo en desktop */}
              <div className="hidden md:flex">
                <SimpleThemeToggle />
              </div>

              {/* Menú Hamburguesa para móvil */}
              <div className="md:hidden ml-1">
                <HamburgerMenu
                  isOpen={isMenuOpen}
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Menú Móvil Fullscreen */}
      <FullscreenMobileMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        navLinks={navLinks}
      />
    </>
  );
}
