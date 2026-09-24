import { useState } from 'react';
import { HeartHandshake, Users, TrendingUp, Percent, Calculator, Info } from 'lucide-react';

const REGULAR_FEE = 45000;
const SOLIDARIA_FEE = 15000;

const STATS = [
  { icon: Users, value: '+1,200', label: 'Niños atendidos', color: 'teal' },
  { icon: Percent, value: '35%', label: 'Consultas solidarias', color: 'amber' },
  { icon: TrendingUp, value: '+800', label: 'Familias beneficiadas', color: 'sky' },
  { icon: HeartHandshake, value: '100%', label: 'Compromiso social', color: 'teal' },
];

const COLOR_MAP: Record<string, string> = {
  teal: 'bg-teal-50 text-teal-600',
  amber: 'bg-amber-50 text-amber-600',
  sky: 'bg-sky-50 text-sky-600',
};

export default function TarifaSolidaria() {
  const [income, setIncome] = useState(1500000);
  const [familyMembers, setFamilyMembers] = useState(4);

  const qualifiesForSolidaria = income / familyMembers < 500000;
  const suggestedFee = qualifiesForSolidaria ? SOLIDARIA_FEE : REGULAR_FEE;
  const savings = REGULAR_FEE - suggestedFee;
  const perPerson = Math.round(income / familyMembers);

  const formatCOP = (n: number) =>
    new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(n);

  return (
    <section
      id="tarifa-solidaria"
      className="py-20 sm:py-28 bg-gradient-to-b from-amber-50/50 to-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block rounded-full bg-amber-100 px-4 py-1.5 text-sm font-semibold text-amber-700 mb-4">
            Impacto Social
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Modelo de Tarifa Benéfica Solidaria
          </h2>
          <p className="text-lg text-gray-600">
            Creemos que la salud de los niños no debe depender de los recursos
            económicos de su familia. Nuestro modelo dual de tarifas garantiza
            atención de calidad para todos.
          </p>
        </div>

        {/* Dual tariff cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {/* Regular */}
          <div className="rounded-2xl bg-white p-8 shadow-sm border border-gray-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-sky-100 text-sky-600">
                <Users className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">Tarifa Regular</h3>
                <p className="text-sm text-gray-500">Consulta estándar</p>
              </div>
            </div>
            <p className="text-3xl font-bold text-gray-900">
              {formatCOP(REGULAR_FEE)}
            </p>
            <p className="mt-3 text-gray-600 text-sm leading-relaxed">
              Tarifa estándar para familias con capacidad económica. Incluye
              consulta completa, diagnóstico y plan de tratamiento.
            </p>
          </div>

          {/* Solidaria */}
          <div className="relative rounded-2xl bg-gradient-to-br from-amber-500 to-amber-600 p-8 shadow-xl shadow-amber-500/20 text-white">
            <div className="absolute top-4 right-4 rounded-full bg-white/20 px-3 py-1 text-xs font-semibold">
              Subsidio
            </div>
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/20">
                <HeartHandshake className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold">Tarifa Solidaria</h3>
                <p className="text-sm text-amber-100">Atención accesible</p>
              </div>
            </div>
            <p className="text-3xl font-bold">{formatCOP(SOLIDARIA_FEE)}</p>
            <p className="mt-3 text-amber-50 text-sm leading-relaxed">
              Tarifa subsidiada para familias de bajos ingresos. Misma calidad
              de atención, costo reducido gracias a nuestro fondo solidario.
            </p>
          </div>
        </div>

        {/* Impact stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {STATS.map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl bg-white p-6 text-center shadow-sm border border-gray-100"
            >
              <div
                className={`mx-auto flex h-14 w-14 items-center justify-center rounded-xl ${COLOR_MAP[stat.color]} mb-3`}
              >
                <stat.icon className="h-7 w-7" />
              </div>
              <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
              <p className="mt-1 text-sm text-gray-500">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Interactive calculator */}
        <div className="rounded-2xl bg-white p-8 shadow-lg border border-gray-100">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal-100 text-teal-600">
              <Calculator className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">
                Calcula tu tarifa
              </h3>
              <p className="text-sm text-gray-500">
                Ingresa tus datos para conocer el costo estimado de tu consulta
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ingreso mensual familiar
                </label>
                <input
                  type="range"
                  min={500000}
                  max={5000000}
                  step={100000}
                  value={income}
                  onChange={(e) => setIncome(Number(e.target.value))}
                  className="w-full accent-teal-600"
                />
                <div className="mt-2 flex justify-between text-sm text-gray-500">
                  <span>{formatCOP(500000)}</span>
                  <span className="font-bold text-gray-900">
                    {formatCOP(income)}
                  </span>
                  <span>{formatCOP(5000000)}</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Miembros en el grupo familiar
                </label>
                <input
                  type="range"
                  min={1}
                  max={10}
                  step={1}
                  value={familyMembers}
                  onChange={(e) => setFamilyMembers(Number(e.target.value))}
                  className="w-full accent-teal-600"
                />
                <div className="mt-2 flex justify-between text-sm text-gray-500">
                  <span>1</span>
                  <span className="font-bold text-gray-900">
                    {familyMembers} personas
                  </span>
                  <span>10</span>
                </div>
              </div>
            </div>

            {/* Result */}
            <div
              className={`rounded-xl p-6 flex flex-col justify-center ${
                qualifiesForSolidaria
                  ? 'bg-amber-50 border-2 border-amber-200'
                  : 'bg-sky-50 border-2 border-sky-200'
              }`}
            >
              <div className="flex items-center gap-2 mb-3">
                <Info className={`h-5 w-5 ${qualifiesForSolidaria ? 'text-amber-600' : 'text-sky-600'}`} />
                <span className="text-sm font-medium text-gray-700">
                  Ingreso per cápita: {formatCOP(perPerson)}/mes
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-2">Tarifa sugerida</p>
              <p
                className={`text-4xl font-bold ${
                  qualifiesForSolidaria ? 'text-amber-600' : 'text-sky-600'
                }`}
              >
                {formatCOP(suggestedFee)}
              </p>
              {qualifiesForSolidaria ? (
                <div className="mt-3 rounded-lg bg-amber-100 px-4 py-2 text-sm font-medium text-amber-700">
                  Ahorro de {formatCOP(savings)} gracias al fondo solidario
                </div>
              ) : (
                <p className="mt-3 text-sm text-gray-500">
                  Tu ingreso per cápita supera el umbral solidario
                  ({formatCOP(500000)}). Considera apoyar el fondo contribuyendo
                  con la tarifa regular.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
