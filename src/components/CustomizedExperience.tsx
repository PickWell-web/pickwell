import { motion } from 'motion/react';
import { CreditCard, Smartphone, HeartPulse, QrCode } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import PhoneMockup from './PhoneMockup';

const SmartPhoneQrIcon = ({ size = 32 }) => (
  <div className="relative group-hover:scale-110 transition-transform">
    <Smartphone size={size} />
    <div className="absolute inset-0 flex items-center justify-center pt-1">
      <div className="scale-[0.45] opacity-80">
        <QrCode size={size} strokeWidth={3} />
      </div>
    </div>
  </div>
);

const experienceIcons = [
  <CreditCard size={32} />,
  <SmartPhoneQrIcon size={32} />,
  <HeartPulse size={32} />
];

export default function CustomizedExperience() {
  const { t } = useLanguage();

  return (
    <section id="experience" className="pt-8 pb-16 md:pt-12 md:pb-24 bg-white border-t border-pickwell-dark/5 scroll-mt-20 md:scroll-mt-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-pickwell-dark">{t.experience.title}</h2>
          <p className="text-base md:text-lg text-pickwell-dark/70">{t.experience.description}</p>
        </div>

        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
          {/* Left Side: Cards with icons restored */}
          <div className="w-full lg:w-[60%] flex justify-center lg:justify-start">
            <div className="flex flex-col items-center gap-6 md:gap-8 w-full max-w-2xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                viewport={{ once: true }}
                className="flex flex-col items-center text-center py-8 px-6 md:px-8 rounded-[2rem] bg-[#f2f4e8] border border-black/5 shadow-sm hover:shadow-md transition-all duration-300 group w-full sm:w-[calc(50%-12px)] md:w-[calc(50%-16px)]"
              >
                <div className="w-12 h-12 bg-pickwell-teal/10 rounded-full flex items-center justify-center text-pickwell-teal mb-4 group-hover:bg-pickwell-teal group-hover:text-white transition-colors duration-500">
                  {experienceIcons[1]}
                </div>
                <h3 className="text-lg md:text-xl font-bold mb-3 text-pickwell-dark">{t.experience.features[1]}</h3>
                <p className="text-pickwell-dark/60 leading-relaxed text-xs md:text-sm">
                  {t.experience.featureDescs[1]}
                </p>
              </motion.div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8 w-full">
                {[0, 2].map((originalIndex, displayIndex) => (
                  <motion.div
                    key={originalIndex}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: (displayIndex + 1) * 0.1 }}
                    viewport={{ once: true }}
                    className="flex flex-col items-center text-center py-8 px-6 rounded-[2rem] bg-[#f2f4e8] border border-black/5 shadow-sm hover:shadow-md transition-all duration-300 group w-full"
                  >
                    <div className="w-12 h-12 bg-pickwell-teal/10 rounded-full flex items-center justify-center text-pickwell-teal mb-4 group-hover:bg-pickwell-teal group-hover:text-white transition-colors duration-500">
                      {experienceIcons[originalIndex]}
                    </div>
                    <h3 className="text-lg md:text-xl font-bold mb-3 text-pickwell-dark">{t.experience.features[originalIndex]}</h3>
                    <p className="text-pickwell-dark/60 leading-relaxed text-xs md:text-sm">
                      {t.experience.featureDescs[originalIndex]}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Side: Simple Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="w-full lg:w-[40%] flex justify-center"
          >
            <div className="relative w-full max-w-[320px] rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white">
              <img 
                src="webpage2.png" 
                alt="PickWell App" 
                className="w-full h-auto block"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
