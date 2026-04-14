import { Hotel, ChevronRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function TravelBox() {
  const { t } = useLanguage();

  return (
    <section id="travelbox" className="section-perf py-16 md:py-24 bg-pickwell-cream border-t border-pickwell-dark/5 scroll-mt-20 md:scroll-mt-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-pickwell-teal/10 rounded-full mb-6 text-pickwell-teal">
              <Hotel size={18} />
              <span className="text-sm font-bold uppercase tracking-widest">{t.nav.travel}</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-pickwell-dark">{t.hotel.title}</h2>
            <p className="text-base md:text-lg text-pickwell-dark/70 mb-8 leading-relaxed">{t.hotel.description}</p>
            <ul className="space-y-4">
              {t.hotel.items.map(item => (
                <li key={item} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-pickwell-teal/10 flex items-center justify-center text-pickwell-teal flex-shrink-0">
                    <ChevronRight size={14} />
                  </div>
                  <span className="font-medium text-pickwell-dark/80">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              <img
                src="images/hotel-amenity.webp"
                alt="Hotel hygiene and amenity vending products"
                className="rounded-2xl shadow-lg mt-8 border-4 border-white w-full object-cover aspect-[3/4]"
                loading="lazy"
                decoding="async"
              />
              <img
                src="images/hotel-lobby.webp"
                alt="PickWell vending machine in a luxury hotel lobby"
                className="rounded-2xl shadow-lg border-4 border-white w-full object-cover aspect-[3/4]"
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
