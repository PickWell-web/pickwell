import { motion } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';

const icons = [
  // Checkmark icon for "Sem custos para si"
  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>,
  // Coffee cup icon for "Comida & Café"
  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 8h1a4 4 0 1 1 0 8h-1"/><path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z"/><line x1="6" x2="6" y1="2" y2="4"/><line x1="10" x2="10" y1="2" y2="4"/><line x1="14" x2="14" y1="2" y2="4"/></svg>,
  // Clock icon for "Instalação & Manutenção"
  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
];

export default function HowItWorks() {
  const { t } = useLanguage();

  return (
    <section id="how-it-works" className="section-perf pt-16 pb-8 md:pt-24 md:pb-12 bg-white border-t border-pickwell-dark/5">
      <div className="max-w-7xl 2xl:max-w-[90rem] mx-auto px-6">
        {/* Title + Subtitle */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-pickwell-dark">{t.howItWorks.title}</h2>
          {t.howItWorks.subtitle && (
            <p className="text-base md:text-lg text-pickwell-dark/70">{t.howItWorks.subtitle}</p>
          )}
        </div>

        <div className="flex flex-col lg:flex-row items-center lg:items-center gap-10 lg:gap-12">
          {/* Left: 3 stacked cards */}
          <div className="w-full lg:w-2/3 flex flex-col gap-5">
            {t.howItWorks.steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.12, duration: 0.5 }}
                viewport={{ once: true }}
                className="flex items-start gap-5 bg-pickwell-cream/50 rounded-[2rem] p-6 md:p-8 border border-pickwell-dark/5 hover:bg-white hover:shadow-xl transition-all duration-300"
              >
                {/* Icon */}
                <div className="w-14 h-14 md:w-16 md:h-16 rounded-xl bg-pickwell-teal/10 text-pickwell-teal flex items-center justify-center shrink-0">
                  {icons[index]}
                </div>

                {/* Text content */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg md:text-xl font-bold text-pickwell-dark mb-2">{step.title}</h3>
                  <p className="text-pickwell-dark/60 leading-relaxed text-sm md:text-base">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Right: Image — smaller, centered with middle card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            viewport={{ once: true }}
            className="w-full lg:w-1/3 max-w-sm lg:max-w-none rounded-[2rem] overflow-hidden shadow-2xl border-4 md:border-8 border-white/50 bg-pickwell-cream shrink-0 self-center"
          >
            <img
              src="images/manutencao-640.jpg"
              srcSet="images/manutencao-640.jpg 640w, images/manutencao-900.jpg 900w"
              sizes="(max-width: 1024px) 90vw, 360px"
              alt={t.media.maintenanceAlt}
              className="w-full h-auto block"
              loading="lazy"
              decoding="async"
              width={900}
              height={1600}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
