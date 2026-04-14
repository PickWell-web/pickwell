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
    <section id="experience" className="pt-16 pb-16 md:pt-24 md:pb-24 bg-white border-t border-pickwell-dark/5 scroll-mt-28 md:scroll-mt-32">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-8 md:mb-2">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 md:mb-8 text-pickwell-dark">{t.experience.title}</h2>
          <p className="text-base md:text-xl text-pickwell-dark/70 transition-all">{t.experience.description}</p>
        </div>

        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12 mt-8 md:-mt-20">
          {/* Left Side: Cards with icons restored */}
          <div className="w-full lg:w-[55%] flex justify-center lg:justify-start">
            <div className="flex flex-col items-center gap-5 md:gap-6 w-full max-w-4xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                viewport={{ once: true }}
                className="flex flex-col items-center text-center py-8 px-6 md:py-10 md:px-10 rounded-[2.5rem] bg-[#f2f4e8] border border-black/5 shadow-sm hover:shadow-lg transition-all duration-300 group w-full sm:w-1/2"
              >
                <div className="w-14 h-14 bg-pickwell-teal/10 rounded-full flex items-center justify-center text-pickwell-teal mb-4 group-hover:bg-pickwell-teal group-hover:text-white transition-colors duration-500">
                  <div className="scale-110">
                    {experienceIcons[1]}
                  </div>
                </div>
                <h3 className="text-lg md:text-xl font-bold mb-3 text-pickwell-dark">{t.experience.features[1]}</h3>
                <p className="text-pickwell-dark/60 leading-relaxed text-sm md:text-base font-medium">
                  {t.experience.featureDescs[1]}
                </p>
              </motion.div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-6 w-full">
                {[0, 2].map((originalIndex, displayIndex) => (
                  <motion.div
                    key={originalIndex}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: (displayIndex + 1) * 0.1 }}
                    viewport={{ once: true }}
                    className="flex flex-col items-center text-center py-8 px-6 rounded-[2.5rem] bg-[#f2f4e8] border border-black/5 shadow-sm hover:shadow-lg transition-all duration-300 group w-full"
                  >
                    <div className="w-12 h-12 bg-pickwell-teal/10 rounded-full flex items-center justify-center text-pickwell-teal mb-4 group-hover:bg-pickwell-teal group-hover:text-white transition-colors duration-500">
                      <div className="scale-100">
                        {experienceIcons[originalIndex]}
                      </div>
                    </div>
                    <h3 className="text-lg md:text-xl font-bold mb-3 text-pickwell-dark">{t.experience.features[originalIndex]}</h3>
                    <p className="text-pickwell-dark/60 leading-relaxed text-sm md:text-base">
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
            className="w-full lg:w-[45%] flex justify-center"
          >
            <div className="relative w-full max-w-[320px] md:max-w-[380px]">
              <img 
                src="iphone_2.png" 
                alt="PickWell iPhone" 
                className="w-full h-auto block drop-shadow-2xl"
                loading="lazy"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
