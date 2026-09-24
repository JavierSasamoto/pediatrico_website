import { Stethoscope, Ruler, Syringe, Apple, Ambulance, Brain } from 'lucide-react';

const SERVICES = [
  {
    icon: Stethoscope,
    title: 'Pediatría General',
    description:
      'Consultas médicas, diagnóstico y tratamiento de enfermedades comunes en la infancia.',
    color: 'teal',
  },
  {
    icon: Ruler,
    title: 'Control de Crecimiento y Desarrollo',
    description:
      'Seguimiento del desarrollo físico, motor y cognitivo en cada etapa de tu hijo.',
    color: 'sky',
  },
  {
    icon: Syringe,
    title: 'Vacunación',
    description:
      'Esquema completo de vacunación infantil según el calendario nacional.',
    color: 'amber',
  },
  {
    icon: Apple,
    title: 'Nutrición Infantil',
    description:
      'Planes nutricionales personalizados para un crecimiento saludable y prevención de obesidad.',
    color: 'teal',
  },
  {
    icon: Ambulance,
    title: 'Urgencias Pediátricas',
    description:
      'Atención inmediata 24/7 para emergencias y accidentes en niños y recién nacidos.',
    color: 'sky',
  },
  {
    icon: Brain,
    title: 'Neurodesarrollo',
    description:
      'Diagnóstico y tratamiento de trastornos del neurodesarrollo y aprendizaje.',
    color: 'amber',
  },
];

const COLOR_MAP: Record<string, { bg: string; text: string; hover: string }> = {
  teal: { bg: 'bg-teal-50', text: 'text-teal-600', hover: 'group-hover:bg-teal-600 group-hover:text-white' },
  sky: { bg: 'bg-sky-50', text: 'text-sky-600', hover: 'group-hover:bg-sky-600 group-hover:text-white' },
  amber: { bg: 'bg-amber-50', text: 'text-amber-600', hover: 'group-hover:bg-amber-600 group-hover:text-white' },
};

export default function Services() {
  return (
    <section id="especialidades" className="py-20 sm:py-28 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block rounded-full bg-teal-100 px-4 py-1.5 text-sm font-semibold text-teal-700 mb-4">
            Nuestros Servicios
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Especialidades Pediátricas
          </h2>
          <p className="text-lg text-gray-600">
            Cobertura integral de la salud infantil con especialistas dedicados
            a cada área del desarrollo de tu hijo.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((service) => {
            const c = COLOR_MAP[service.color];
            return (
              <div
                key={service.title}
                className="group rounded-2xl bg-white p-7 shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <div
                  className={`flex h-14 w-14 items-center justify-center rounded-xl ${c.bg} ${c.text} ${c.hover} transition-colors duration-300`}
                >
                  <service.icon className="h-7 w-7" />
                </div>
                <h3 className="mt-5 text-xl font-bold text-gray-900">
                  {service.title}
                </h3>
                <p className="mt-3 text-gray-600 leading-relaxed">
                  {service.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
