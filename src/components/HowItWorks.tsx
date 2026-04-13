import { motion } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';

const stepNumbers = ['01', '02', '03'];

export default function HowItWorks() {
  const { t } = useLanguage();

  return (
    <section id="how-it-works" className="pt-16 pb-8 md:pt-24 md:pb-12 bg-white border-t border-pickwell-dark/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-pickwell-dark">{t.howItWorks.title}</h2>
          <p className="text-base md:text-lg text-pickwell-dark/70">{t.howItWorks.subtitle}</p>
        </div>

        <div className="flex flex-col lg:flex-row items-center lg:items-center gap-10 lg:gap-12">
          
          <div className="w-full lg:w-2/3">
            <div className="grid sm:grid-cols-3 gap-6 md:gap-8 relative lg:h-full">
              {/* Connecting line (desktop only) */}
              <div className="hidden sm:block absolute top-16 left-[16.6%] right-[16.6%] h-[2px] bg-gradient-to-r from-pickwell-teal/20 via-pickwell-teal/40 to-pickwell-teal/20" />

              {t.howItWorks.steps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.15 }}
                  viewport={{ once: true }}
                  className="relative flex flex-col items-center text-center"
                >
                  {/* Step Number */}
                  <div className="relative z-10 w-14 h-14 md:w-16 md:h-16 rounded-full bg-pickwell-teal text-pickwell-cream flex items-center justify-center font-bold text-lg md:text-xl shadow-lg shadow-pickwell-teal/30 mb-6 shrink-0">
                    {stepNumbers[index]}
                  </div>

                  <div className="bg-pickwell-cream/50 rounded-[2rem] p-6 md:p-8 border border-pickwell-dark/5 hover:bg-white hover:shadow-xl transition-all duration-300 flex-1 w-full flex flex-col">
                    <h3 className="text-lg md:text-xl font-bold text-pickwell-dark mb-3">{step.title}</h3>
                    <p className="text-pickwell-dark/60 leading-relaxed text-sm md:text-base">{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            viewport={{ once: true }}
            className="w-full lg:w-1/3 max-w-sm lg:max-w-none rounded-[2rem] overflow-hidden shadow-2xl border-4 md:border-8 border-white/50 bg-pickwell-cream shrink-0 self-center"
          >
            <img
              src="manutencao.png"
              alt="Manutenção PickWell"
              className="w-full h-auto block"
              loading="lazy"
            />
          </motion.div>
          
        </div>
      </div>
    </section>
  );
}
