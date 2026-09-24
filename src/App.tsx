import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import Doctors from '@/components/Doctors';
import TarifaSolidaria from '@/components/TarifaSolidaria';
import Location from '@/components/Location';
import Footer from '@/components/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <Hero />
        <Services />
        <Doctors />
        <TarifaSolidaria />
        <Location />
      </main>
      <Footer />
    </div>
  );
}
