import { Calendar, Stethoscope, ShieldCheck, HeartHandshake, Activity, Ambulance } from 'lucide-react';

const TRUST_BADGES = [
  { icon: Stethoscope, label: 'Atención Pediatría General' },
  { icon: Ambulance, label: 'Atención de Emergencias' },
  { icon: HeartHandshake, label: 'Tarifas Solidarias' },
];

export default function Hero() {
  const scrollTo = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden bg-gradient-to-br from-teal-50 via-white to-sky-50"
    >
      {/* Decorative shapes */}
      <div className="absolute top-20 right-0 h-72 w-72 rounded-full bg-teal-200/30 blur-3xl" />
      <div className="absolute bottom-10 left-0 h-80 w-80 rounded-full bg-sky-200/30 blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
        {/* Left content */}
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-teal-100 px-4 py-2 text-sm font-medium text-teal-700 mb-6">
            <ShieldCheck className="h-4 w-4" />
            Atención pediátrica de calidad y calidez
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-[1.15] tracking-tight">
            Cuidamos la salud de tus hijos con{' '}
            <span className="text-teal-600">calidad</span>,{' '}
            <span className="text-sky-600">calidez</span> y{' '}
            <span className="text-amber-500">visión solidaria</span>
          </h1>

          <p className="mt-6 text-lg text-gray-600 leading-relaxed max-w-xl">
            Atención pediátrica integral con historias clínicas digitales y
            agendamiento de citas en línea. Cuidamos cada etapa del desarrollo
            de tu hijo con profesionales especializados y tarifas accesibles
            para todas las familias.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => scrollTo('#medicos')}
              className="flex items-center justify-center gap-2 rounded-xl bg-teal-600 px-7 py-4 text-base font-semibold text-white shadow-xl shadow-teal-600/30 hover:bg-teal-700 hover:shadow-teal-600/40 transition-all hover:-translate-y-0.5"
            >
              <Calendar className="h-5 w-5" />
              Reservar Cita Ahora
            </button>
            <button
              onClick={() => scrollTo('#especialidades')}
              className="flex items-center justify-center gap-2 rounded-xl border-2 border-sky-200 bg-white px-7 py-4 text-base font-semibold text-sky-600 hover:bg-sky-50 hover:border-sky-300 transition-all"
            >
              <Stethoscope className="h-5 w-5" />
              Conocer Especialidades
            </button>
          </div>

          {/* Trust badges */}
          <div className="mt-10 flex flex-wrap gap-4">
            {TRUST_BADGES.map((badge) => (
              <div
                key={badge.label}
                className="flex items-center gap-2.5 rounded-xl bg-white/80 backdrop-blur-sm px-4 py-3 shadow-sm border border-gray-100"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-teal-50 text-teal-600">
                  <badge.icon className="h-5 w-5" />
                </div>
                <span className="text-sm font-medium text-gray-700">
                  {badge.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right visual */}
        <div className="relative hidden lg:block">
          <div className="relative rounded-3xl overflow-hidden shadow-2xl">
            <img
              src="https://images.pexels.com/photos/7446997/pexels-photo-7446997.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
              alt="Pediatras atendiendo a un niño"
              className="w-full h-[520px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-teal-900/20 to-transparent" />
          </div>

          {/* Floating stat card */}
          <div className="absolute -bottom-6 -left-6 rounded-2xl bg-white p-5 shadow-xl border border-gray-100">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-100 text-amber-600">
                <Activity className="h-6 w-6" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">+1,200</p>
                <p className="text-sm text-gray-500">niños atendidos</p>
              </div>
            </div>
          </div>

          {/* Floating stat card top */}
          <div className="absolute -top-6 -right-6 rounded-2xl bg-white p-5 shadow-xl border border-gray-100">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal-100 text-teal-600">
                <HeartHandshake className="h-6 w-6" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">35%</p>
                <p className="text-sm text-gray-500">consultas solidarias</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
