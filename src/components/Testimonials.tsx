import { motion } from 'motion/react';
import { Quote } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function Testimonials() {
  const { t } = useLanguage();

  return (
    <section id="testimonials" className="py-16 md:py-24 bg-pickwell-cream border-t border-pickwell-dark/5">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-pickwell-dark">{t.testimonials.title}</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          {t.testimonials.items.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15 }}
              viewport={{ once: true }}
              className="bg-white rounded-[2rem] p-8 md:p-10 shadow-xl shadow-pickwell-dark/5 border border-pickwell-dark/5 relative"
            >
              <Quote size={32} className="text-pickwell-teal/20 absolute top-6 right-6" />
              <p className="text-pickwell-dark/70 text-base md:text-lg leading-relaxed mb-8 font-serif italic">
                "{item.text}"
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-pickwell-teal/10 flex items-center justify-center text-pickwell-teal font-bold text-lg">
                  {item.name.charAt(0)}
                </div>
                <div>
                  <p className="font-bold text-pickwell-dark">{item.name}</p>
                  <p className="text-pickwell-dark/50 text-sm">{item.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
