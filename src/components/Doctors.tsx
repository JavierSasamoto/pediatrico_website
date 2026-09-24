import { useState, useEffect } from 'react';
import { Calendar, MapPin, X, Phone, Stethoscope, User } from 'lucide-react';
import { supabase, type Medico } from '@/lib/supabase';

export default function Doctors() {
  const [doctors, setDoctors] = useState<Medico[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Medico | null>(null);

  useEffect(() => {
    (async () => {
      const { data, error } = await supabase
        .from('medicos')
        .select(`
          id,
          profile_id,
          specialty,
          room_number,
          is_active,
          consultation_fee,
          solidaria_fee,
          profiles:profile_id (id, full_name, avatar_url, bio, phone )
        `)
        .eq('is_active', true);

      if (!error && data) {
        setDoctors(data as unknown as Medico[]);
      }
      setLoading(false);
    })();
  }, []);

  const formatFee = (n: number) =>
    new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(n);

  return (
    <section id="medicos" className="py-20 sm:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block rounded-full bg-sky-100 px-4 py-1.5 text-sm font-semibold text-sky-700 mb-4">
            Nuestro Equipo
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Pediatras y Especialistas
          </h2>
          <p className="text-lg text-gray-600">
            Profesionales dedicados a la salud de tus hijos, con experiencia
            comprobada y trato humano.
          </p>
        </div>

        {loading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="rounded-2xl bg-gray-50 p-6 animate-pulse h-80 border border-gray-100"
              />
            ))}
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {doctors.map((doc) => (
              <div
                key={doc.id}
                className="group rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden hover:-translate-y-1"
              >
                {/* Photo placeholder */}
                <div className="relative h-48 bg-gradient-to-br from-teal-100 to-sky-100 flex items-center justify-center">
                  {doc.profiles?.avatar_url ? (
                    <img
                      src={doc.profiles.avatar_url}
                      alt={doc.profiles.full_name}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-24 w-24 items-center justify-center rounded-full bg-white shadow-md">
                      <User className="h-12 w-12 text-teal-400" />
                    </div>
                  )}
                </div>

                <div className="p-5">
                  <h3 className="text-lg font-bold text-gray-900">
                    {doc.profiles?.full_name ?? 'Especialista'}
                  </h3>
                  <p className="text-sm font-medium text-teal-600 mt-1">
                    {doc.specialty}
                  </p>

                  <div className="mt-3 flex items-center gap-2 text-sm text-gray-500">
                    <MapPin className="h-4 w-4 flex-shrink-0" />
                    <span>{doc.room_number ?? 'Consultorio'}</span>
                  </div>

                  {doc.consultation_fee > 0 && (
                    <div className="mt-3 flex items-center justify-between">
                      <span className="text-xs text-gray-400">Consulta</span>
                      <span className="text-sm font-semibold text-gray-700">
                        {formatFee(doc.consultation_fee)}
                      </span>
                    </div>
                  )}

                  <div className="mt-4 flex gap-2">
                    <button
                      onClick={() => setSelected(doc)}
                      className="flex-1 rounded-lg border border-gray-200 px-3 py-2 text-xs font-medium text-gray-600 hover:bg-gray-50 transition-colors"
                    >
                      Ver Perfil
                    </button>
                    <button
                      onClick={() =>
                        document.querySelector('#contacto')?.scrollIntoView({ behavior: 'smooth' })
                      }
                      className="flex-1 flex items-center justify-center gap-1.5 rounded-lg bg-teal-600 px-3 py-2 text-xs font-semibold text-white hover:bg-teal-700 transition-colors"
                    >
                      <Calendar className="h-3.5 w-3.5" />
                      Reservar
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Doctor bio modal */}
      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
          onClick={() => setSelected(null)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative h-40 bg-gradient-to-br from-teal-500 to-sky-500 flex items-center justify-center">
              <button
                onClick={() => setSelected(null)}
                className="absolute top-4 right-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/20 text-white hover:bg-white/30 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white shadow-lg">
                <User className="h-10 w-10 text-teal-400" />
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900">
                {selected.profiles?.full_name}
              </h3>
              <div className="mt-2 flex items-center gap-2 text-teal-600">
                <Stethoscope className="h-4 w-4" />
                <span className="text-sm font-medium">{selected.specialty}</span>
              </div>
              <div className="mt-2 flex items-center gap-2 text-gray-500">
                <MapPin className="h-4 w-4" />
                <span className="text-sm">{selected.room_number}</span>
              </div>

              {selected.profiles?.bio && (
                <p className="mt-4 text-gray-600 leading-relaxed text-sm">
                  {selected.profiles.bio}
                </p>
              )}

              <div className="mt-5 grid grid-cols-2 gap-3">
                <div className="rounded-xl bg-gray-50 p-3">
                  <p className="text-xs text-gray-400">Tarifa Regular</p>
                  <p className="text-sm font-bold text-gray-700">
                    {formatFee(selected.consultation_fee)}
                  </p>
                </div>
                <div className="rounded-xl bg-amber-50 p-3">
                  <p className="text-xs text-amber-500">Tarifa Solidaria</p>
                  <p className="text-sm font-bold text-amber-600">
                    {formatFee(selected.solidaria_fee)}
                  </p>
                </div>
              </div>

              {selected.profiles?.phone && (
                <div className="mt-4 flex items-center gap-2 text-gray-500">
                  <Phone className="h-4 w-4" />
                  <span className="text-sm">{selected.profiles.phone}</span>
                </div>
              )}

              <button
                onClick={() => {
                  setSelected(null);
                  document.querySelector('#contacto')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="mt-6 w-full flex items-center justify-center gap-2 rounded-xl bg-teal-600 px-5 py-3 text-sm font-semibold text-white hover:bg-teal-700 transition-colors"
              >
                <Calendar className="h-4 w-4" />
                Reservar Cita con {selected.profiles?.full_name?.split(' ').slice(0, 2).join(' ')}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
