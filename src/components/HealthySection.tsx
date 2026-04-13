import { Leaf, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function HealthySection() {
  const { t } = useLanguage();

  return (
    <section id="healthy" className="py-16 md:py-24 bg-pickwell-cream border-t border-pickwell-dark/5 scroll-mt-20 md:scroll-mt-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
          <div className="order-2 md:order-1 flex justify-center">
            <div className="relative w-full max-w-[320px] md:max-w-[460px]">
              <img
                src="/montra_editada.jpeg"
                alt="PickWell healthy product showcase"
                className="rounded-3xl shadow-xl border-4 border-white w-full"
                loading="lazy"
              />
              <div className="absolute -top-4 -right-4 w-20 h-20 md:w-24 md:h-24 bg-pickwell-teal rounded-full flex items-center justify-center text-pickwell-cream shadow-lg">
                <Leaf size={36} />
              </div>
            </div>
          </div>
          <div className="order-1 md:order-2">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 flex items-center gap-3 text-pickwell-dark">
              <span className="w-12 h-1 bg-pickwell-teal rounded-full" />
              {t.healthy.title}
            </h2>
            <p className="text-base md:text-lg text-pickwell-dark/70 mb-8 leading-relaxed">
              {t.healthy.description}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {t.healthy.items.map(item => (
                <div key={item} className="flex items-center gap-3 p-3 rounded-xl bg-white/60 border border-pickwell-dark/5">
                  <CheckCircle2 className="text-pickwell-teal flex-shrink-0" size={20} />
                  <span className="font-medium text-pickwell-dark/80">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
