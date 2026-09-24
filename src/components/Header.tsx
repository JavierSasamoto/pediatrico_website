import { useState, useEffect } from 'react';
import { Heart, Calendar, LogIn, Menu, X } from 'lucide-react';

const NAV_LINKS = [
  { label: 'Inicio', href: '#inicio' },
  { label: 'Especialidades', href: '#especialidades' },
  { label: 'Médicos', href: '#medicos' },
  { label: 'Tarifa Solidaria', href: '#tarifa-solidaria' },
  { label: 'Ubicación', href: '#ubicacion' },
  { label: 'Contacto', href: '#contacto' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white shadow-md py-3'
          : 'bg-white/95 backdrop-blur-sm py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-teal-600 text-white shadow-lg shadow-teal-600/30">
              <Heart className="h-6 w-6" fill="white" />
            </div>
            <div className="hidden sm:block">
              <p className="text-lg font-bold text-gray-900 leading-tight">
                Clínica Pediátrica
              </p>
              <p className="text-sm font-medium text-teal-600 leading-tight">
                Integral
              </p>
            </div>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className="px-4 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-teal-50 hover:text-teal-700 transition-colors"
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* CTAs */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              onClick={() => handleNavClick('#contacto')}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 hover:text-teal-700 transition-colors"
            >
              <LogIn className="h-4 w-4" />
              Acceso Personal
            </button>
            <button
              onClick={() => handleNavClick('#medicos')}
              className="flex items-center gap-2 rounded-xl bg-teal-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-teal-600/30 hover:bg-teal-700 hover:shadow-teal-600/40 transition-all hover:-translate-y-0.5"
            >
              <Calendar className="h-4 w-4" />
              Agendar Cita
            </button>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden flex h-10 w-10 items-center justify-center rounded-lg text-gray-700 hover:bg-gray-100"
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <nav className="lg:hidden mt-4 pb-2 space-y-1 border-t border-gray-100 pt-4">
            {NAV_LINKS.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className="block w-full text-left px-4 py-3 text-sm font-medium text-gray-700 rounded-lg hover:bg-teal-50 hover:text-teal-700 transition-colors"
              >
                {link.label}
              </button>
            ))}
            <div className="pt-2 space-y-2">
              <button
                onClick={() => handleNavClick('#medicos')}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-teal-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-teal-600/30"
              >
                <Calendar className="h-4 w-4" />
                Agendar Cita
              </button>
              <button
                onClick={() => handleNavClick('#contacto')}
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-gray-200 px-5 py-3 text-sm font-medium text-gray-600"
              >
                <LogIn className="h-4 w-4" />
                Acceso Personal
              </button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
