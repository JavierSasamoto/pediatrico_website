import { useState } from 'react';
import { MapPin, Clock, Phone, MessageCircle, Send, CheckCircle, AlertCircle } from 'lucide-react';
import { supabase, type ContactMessage } from '@/lib/supabase';

const HOURS = [
  { day: 'Lunes a Viernes', time: '7:00 AM – 7:00 PM' },
  { day: 'Sábados', time: '8:00 AM – 2:00 PM' },
  { day: 'Domingos y Festivos', time: 'Solo urgencias 24h' },
];

export default function Location() {
  const [form, setForm] = useState<ContactMessage>({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    const { error } = await supabase.from('contact_messages').insert({
      name: form.name,
      email: form.email,
      phone: form.phone || null,
      message: form.message,
    });
    if (error) {
      setStatus('error');
    } else {
      setStatus('success');
      setForm({ name: '', email: '', phone: '', message: '' });
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  return (
    <section id="ubicacion" className="py-20 sm:py-28 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Location + Hours */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block rounded-full bg-teal-100 px-4 py-1.5 text-sm font-semibold text-teal-700 mb-4">
            Visítanos
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Ubicación, Horarios y Contacto
          </h2>
          <p className="text-lg text-gray-600">
            Estamos cerca de ti, listos para atender a tu familia cuando nos
            necesites.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 mb-12">
          {/* Address */}
          <div className="rounded-2xl bg-white p-7 shadow-sm border border-gray-100">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal-50 text-teal-600 mb-4">
              <MapPin className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-bold text-gray-900">Dirección</h3>
            <p className="mt-2 text-gray-600 text-sm leading-relaxed">
              Av. Bolívar #12-34, Sector Centro<br />
              Edificio Salud Integral, Piso 2<br />
              Teléfono: +57 601 555 1234
            </p>
          </div>

          {/* Hours */}
          <div className="rounded-2xl bg-white p-7 shadow-sm border border-gray-100">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-sky-50 text-sky-600 mb-4">
              <Clock className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-bold text-gray-900">Horarios</h3>
            <div className="mt-3 space-y-2">
              {HOURS.map((h) => (
                <div key={h.day} className="flex justify-between text-sm">
                  <span className="text-gray-500">{h.day}</span>
                  <span className="font-medium text-gray-700">{h.time}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Emergency + WhatsApp */}
          <div className="rounded-2xl bg-gradient-to-br from-teal-600 to-teal-700 p-7 text-white shadow-lg shadow-teal-600/20">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/20 mb-4">
              <Phone className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-bold">Línea de Emergencias</h3>
            <p className="mt-2 text-teal-50 text-sm">
              Atención 24 horas, 365 días
            </p>
            <p className="mt-2 text-2xl font-bold">+57 320 555 9999</p>
            <a
              href="https://wa.me/573205559999"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-teal-700 hover:bg-teal-50 transition-colors"
            >
              <MessageCircle className="h-5 w-5" />
              Escribir por WhatsApp
            </a>
          </div>
        </div>

        {/* Contact form */}
        <div id="contacto" className="grid lg:grid-cols-2 gap-8 scroll-mt-24">
          {/* Map placeholder */}
          <div className="rounded-2xl overflow-hidden shadow-sm border border-gray-100 min-h-[400px] bg-gray-100">
            <iframe
              title="Ubicación de la clínica"
              src="https://www.openstreetmap.org/export/embed.html?bbox=-74.08%2C4.65%2C-74.06%2C4.67&amp;layer=mapnik"
              className="w-full h-full min-h-[400px] border-0"
              loading="lazy"
            />
          </div>

          {/* Form */}
          <div className="rounded-2xl bg-white p-8 shadow-sm border border-gray-100">
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Envíanos un mensaje
            </h3>
            <p className="text-sm text-gray-500 mb-6">
              Te responderemos lo antes posible. Para urgencias llama a nuestra
              línea 24h.
            </p>

            {status === 'success' && (
              <div className="mb-5 flex items-center gap-3 rounded-xl bg-green-50 border border-green-200 px-4 py-3 text-green-700">
                <CheckCircle className="h-5 w-5 flex-shrink-0" />
                <span className="text-sm font-medium">
                  Mensaje enviado con éxito. Te contactaremos pronto.
                </span>
              </div>
            )}
            {status === 'error' && (
              <div className="mb-5 flex items-center gap-3 rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-red-700">
                <AlertCircle className="h-5 w-5 flex-shrink-0" />
                <span className="text-sm font-medium">
                  No se pudo enviar el mensaje. Inténtalo de nuevo.
                </span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Nombre completo
                </label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-900 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none transition-all"
                  placeholder="Tu nombre"
                />
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Correo electrónico
                  </label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-900 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none transition-all"
                    placeholder="tucorreo@email.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Teléfono
                  </label>
                  <input
                    type="tel"
                    value={form.phone ?? ''}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-900 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none transition-all"
                    placeholder="300 123 4567"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Mensaje
                </label>
                <textarea
                  required
                  rows={4}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-900 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none transition-all resize-none"
                  placeholder="¿En qué podemos ayudarte?"
                />
              </div>
              <button
                type="submit"
                disabled={status === 'sending'}
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-teal-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-teal-600/30 hover:bg-teal-700 disabled:opacity-60 disabled:cursor-not-allowed transition-all"
              >
                <Send className="h-4 w-4" />
                {status === 'sending' ? 'Enviando...' : 'Enviar Mensaje'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
