import { motion } from 'motion/react';
import { CheckCircle2, TreePine, Package, ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function CaseStudies() {
  const { t } = useLanguage();

  return (
    <section id="cases" className="py-16 md:py-24 bg-white border-t border-pickwell-dark/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-pickwell-dark">{t.collection.title}</h2>
          <p className="text-base md:text-lg text-pickwell-dark/70">{t.collection.description}</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {t.collection.items.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative bg-pickwell-cream rounded-[2rem] md:rounded-[2.5rem] overflow-hidden shadow-xl shadow-pickwell-dark/5 border border-pickwell-dark/5 hover:shadow-2xl transition-all duration-500"
            >
              <div className="aspect-[3/4] overflow-hidden relative">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-pickwell-dark/90 via-pickwell-dark/20 to-transparent" />

                {/* Case Study Badge */}
                <div className="absolute top-4 left-4 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full border border-white/30">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-white">
                    {t.collection.caseStudyLabel} {index + 1}
                  </span>
                </div>

                {/* Hover Overlay */}
                <div className="absolute inset-0 flex items-center justify-center p-4 md:p-6">
                  <div className="w-full h-full border-2 border-white/30 rounded-2xl flex flex-col p-4 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-2 h-2 rounded-full bg-pickwell-teal animate-pulse" />
                      <span className="text-[10px] font-bold uppercase tracking-widest text-white">
                        {t.collection.integratedSolution}
                      </span>
                    </div>
                    <div className="flex-1 flex flex-col justify-center">
                      <p className="text-white font-bold text-xs mb-3 uppercase tracking-wider opacity-70">
                        {t.collection.focusArea}
                      </p>
                      <ul className="space-y-2">
                        {item.products.map((product, pIndex) => (
                          <li key={pIndex} className="flex items-center gap-2 text-white/90 text-sm font-medium">
                            <CheckCircle2 size={14} className="text-pickwell-teal flex-shrink-0" />
                            {product}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="mt-4 pt-4 border-t border-white/10">
                      <div className="flex justify-between items-center">
                        <div className="flex gap-1">
                          {[...Array(3)].map((_, i) => (
                            <div key={i} className="w-4 h-1 bg-white/20 rounded-full" />
                          ))}
                        </div>
                        <TreePine size={16} className="text-white/40" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Title Overlay */}
                <div className="absolute bottom-4 md:bottom-6 left-4 md:left-6 right-4 md:right-6 group-hover:opacity-0 transition-opacity duration-300">
                  <h3 className="text-lg md:text-xl font-bold text-white mb-1">{item.title}</h3>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-[1px] bg-pickwell-teal" />
                    <span className="text-[10px] font-bold uppercase tracking-widest text-pickwell-teal">
                      {t.collection.viewAnalysis}
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-6 md:p-8">
                <p className="text-pickwell-dark/60 text-sm leading-relaxed line-clamp-3">{item.description}</p>
                <div className="mt-4 md:mt-6 pt-4 md:pt-6 border-t border-pickwell-dark/5 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Package size={14} className="text-pickwell-teal" />
                    <span className="text-[10px] font-bold uppercase tracking-widest text-pickwell-dark/40">
                      {t.collection.spaceOptimization}
                    </span>
                  </div>
                  <ArrowRight size={16} className="text-pickwell-teal group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
