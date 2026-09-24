import { Heart, Facebook, Instagram, Twitter, Calendar, LogIn, Mail, Phone, MapPin } from 'lucide-react';

const QUICK_LINKS = [
  { label: 'Inicio', href: '#inicio' },
  { label: 'Especialidades', href: '#especialidades' },
  { label: 'Médicos', href: '#medicos' },
  { label: 'Tarifa Solidaria', href: '#tarifa-solidaria' },
  { label: 'Ubicación', href: '#ubicacion' },
  { label: 'Contacto', href: '#contacto' },
];

export default function Footer() {
  const handleNav = (href: string) =>
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-teal-600 text-white">
                <Heart className="h-6 w-6" fill="white" />
              </div>
              <div>
                <p className="text-lg font-bold text-white leading-tight">
                  Clínica Pediátrica
                </p>
                <p className="text-sm text-teal-400 leading-tight">Integral</p>
              </div>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              Cuidamos la salud de tus hijos con calidad, calidez y visión
              solidaria. Atención pediátrica integral para todas las familias.
            </p>
            <div className="mt-5 flex gap-3">
              {[Facebook, Instagram, Twitter].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-800 text-gray-400 hover:bg-teal-600 hover:text-white transition-colors"
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Enlaces Rápidos
            </h4>
            <ul className="space-y-2.5">
              {QUICK_LINKS.map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => handleNav(link.href)}
                    className="text-sm text-gray-400 hover:text-teal-400 transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Contacto
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm text-gray-400">
                <MapPin className="h-5 w-5 text-teal-500 flex-shrink-0 mt-0.5" />
                Av. Bolívar #12-34, Sector Centro
              </li>
              <li className="flex items-center gap-3 text-sm text-gray-400">
                <Phone className="h-5 w-5 text-teal-500 flex-shrink-0" />
                +57 601 555 1234
              </li>
              <li className="flex items-center gap-3 text-sm text-gray-400">
                <Mail className="h-5 w-5 text-teal-500 flex-shrink-0" />
                info@clinicapediatrica.co
              </li>
            </ul>
          </div>

          {/* Apps */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Accesos Rápidos
            </h4>
            <div className="space-y-3">
              <button
                onClick={() => handleNav('#medicos')}
                className="flex w-full items-center gap-3 rounded-xl bg-gray-800 px-4 py-3 text-sm font-medium text-gray-300 hover:bg-gray-700 transition-colors"
              >
                <Calendar className="h-5 w-5 text-teal-400" />
                Agendar Cita en PWA
              </button>
              <button
                onClick={() => handleNav('#contacto')}
                className="flex w-full items-center gap-3 rounded-xl bg-gray-800 px-4 py-3 text-sm font-medium text-gray-300 hover:bg-gray-700 transition-colors"
              >
                <LogIn className="h-5 w-5 text-sky-400" />
                Acceso Personal / Médicos
              </button>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-800 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-500">
            © 2026 Clínica Pediátrica Integral. Todos los derechos reservados.
          </p>
          <div className="flex gap-6 text-sm text-gray-500">
            <a href="#" className="hover:text-teal-400 transition-colors">
              Política de Privacidad
            </a>
            <a href="#" className="hover:text-teal-400 transition-colors">
              Términos de Servicio
            </a>
            <a href="#" className="hover:text-teal-400 transition-colors">
              Aviso Legal
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
