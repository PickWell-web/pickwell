import { motion } from 'motion/react';
import { ArrowRight, TreePine, Smartphone, Heart, Briefcase, Building, GraduationCap, HeartPulse, LayoutGrid } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const BottleIcon = ({ size = 32 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10 2h4v4h-4z" />
    <path d="M7 10v10a2 2 0 0 0 2 2h6a2 2 0 0 0 2 -2V10l-2 -4V6H9v4l-2 4Z" />
    <path d="M7 14h10" />
  </svg>
);

const WoodFrameIcon = ({ size = 32 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <g transform="rotate(-8 12 12)">
      <path d="M 4 2 L 20 2 L 20 18 L 15 18 L 15 7 L 4 7 Z" />
      <line x1="7" y1="4.5" x2="10" y2="4.5" strokeWidth="1.5" />
      <line x1="12" y1="4.5" x2="14" y2="4.5" strokeWidth="1.5" />
      <line x1="17.5" y1="9" x2="17.5" y2="12" strokeWidth="1.5" />
      <line x1="17.5" y1="14" x2="17.5" y2="15.5" strokeWidth="1.5" />
      <path d="M 2 9 L 12 9 L 12 22 L 7 22 L 7 14 L 2 14 Z" />
      <line x1="4" y1="11.5" x2="6" y2="11.5" strokeWidth="1.5" />
      <line x1="9.5" y1="16" x2="9.5" y2="19" strokeWidth="1.5" />
    </g>
  </svg>
);

export default function Hero() {
  const { t } = useLanguage();

  const scrollToContact = () => {
    const getTargetTop = () => {
      const contactSection = document.getElementById('contact');
      if (!contactSection) return null;
      const navHeight = document.getElementById('main-nav')?.offsetHeight ?? 0;
      const offset = 12;
      const mobileExtraDown = window.matchMedia('(max-width: 767px)').matches ? 88 : 0;
      const top = contactSection.getBoundingClientRect().top + window.scrollY - navHeight - offset + mobileExtraDown;
      return Math.max(0, top);
    };

    const runScroll = (behavior: ScrollBehavior) => {
      const top = getTargetTop();
      if (top === null) return;
      window.scrollTo({ top, behavior });
    };

    const isContactAligned = () => {
      const contactSection = document.getElementById('contact');
      if (!contactSection) return false;
      const navHeight = document.getElementById('main-nav')?.offsetHeight ?? 0;
      const targetTop = navHeight + 12;
      const delta = Math.abs(contactSection.getBoundingClientRect().top - targetTop);
      return delta < 24;
    };

    // Keep the first transition smooth, then do a single corrective snap
    // if mobile layout shifts after deferred rendering/hydration.
    runScroll('smooth');
    window.setTimeout(() => {
      if (!isContactAligned()) runScroll('auto');
    }, 420);
  };

  const statCards = [
    { href: "#healthy", icon: <Heart size={40} className="fill-pickwell-teal/20" strokeWidth={2.5} />, value: t.stats.card1Value, label: t.stats.card1Title, delay: 0.4 },
    { href: "#design", icon: <WoodFrameIcon size={40} />, value: t.stats.card2Value, label: t.stats.card2Title, delay: 0.5 },
    { href: "#experience", icon: <Smartphone size={40} />, value: t.stats.card3Value, label: t.stats.card3Title, delay: 0.6 },
  ];

  return (
    <section id="home" className="relative min-h-[100dvh] flex flex-col justify-center pt-24 pb-8 md:pt-20 bg-pickwell-cream overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-4 md:gap-6 items-center relative z-10 pb-6 md:pb-8">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center md:text-left"
        >
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-pickwell-dark leading-tight mb-4 md:mb-6">
            {t.hero.title}
          </h1>
          <p className="text-base md:text-xl text-pickwell-dark/70 mb-6 md:mb-8 max-w-lg mx-auto md:mx-0">
            {t.hero.subtitle}
          </p>
          <a
            href="#contact"
            id="hero-cta"
            onClick={(e) => {
              e.preventDefault();
              scrollToContact();
            }}
            className="inline-flex items-center gap-2 px-8 py-3.5 md:py-4 bg-pickwell-teal text-pickwell-cream rounded-full font-bold text-base md:text-lg hover:scale-105 hover:shadow-xl transition-all duration-300"
          >
            {t.hero.cta}
            <ArrowRight size={20} />
          </a>
        </motion.div>

        <motion.a
          href="#design"
          initial={{ opacity: 0, scale: 0.8, x: 50 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative flex justify-center group cursor-pointer mt-8 md:mt-0"
        >
          <div className="w-full max-w-[220px] md:max-w-[340px] aspect-[3/4] md:aspect-square rounded-3xl overflow-hidden shadow-2xl border-8 border-white/50 bg-pickwell-cream group-hover:scale-[1.03] group-hover:border-white/80 transition-all duration-500">
            <img
              src="images/hero-machine-640.jpg"
              srcSet="images/hero-machine-640.jpg 640w, images/hero-machine-1200.jpg 1200w"
              sizes="(max-width: 768px) 220px, 340px"
              alt="PickWell vending machine slightly blue standard mockup"
              className="w-full h-full object-cover object-top md:object-contain"
              width={340}
              height={340}
              loading="eager"
              decoding="async"
              fetchPriority="high"
            />
          </div>
          {/* Floating Badge - Scaled for mobile */}
          <div className="absolute -bottom-2 -right-0 md:-bottom-4 md:-right-4 bg-pickwell-teal p-3 md:p-5 rounded-2xl shadow-xl max-w-[140px] md:max-w-[180px] text-pickwell-cream group-hover:-translate-y-2 group-hover:shadow-2xl transition-all duration-500">
            <div className="flex items-center gap-1.5 md:gap-2 mb-1 md:mb-2">
              <TreePine size={16} md:size={18} fill="currentColor" />
              <span className="font-bold text-[9px] md:text-xs uppercase tracking-wider">{t.hero.badge}</span>
            </div>
            <p className="text-pickwell-cream/70 text-[9px] md:text-[11px] font-medium leading-snug">{t.hero.badgeDesc}</p>
          </div>
        </motion.a>
      </div>

      {/* Stats Cards - Pushed down slightly more per user request */}
      <div className="max-w-6xl mx-auto px-6 mt-6 md:mt-8 mb-4 md:mb-6 relative z-20">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {statCards.map((card, i) => (
            <motion.a
              key={i}
              href={card.href}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: card.delay }}
              className="bg-white/70 backdrop-blur-md p-4 md:p-5 rounded-3xl shadow-xl shadow-pickwell-dark/5 border border-white/50 flex flex-col items-center text-center group hover:bg-white transition-all duration-300"
            >
              <div className="w-12 h-12 md:w-14 md:h-14 bg-pickwell-teal/10 rounded-2xl flex items-center justify-center text-pickwell-teal mb-2 md:mb-3 group-hover:scale-110 transition-transform">
                {card.icon}
              </div>
              <p className="font-bold text-pickwell-dark text-lg md:text-xl leading-tight">{card.value}</p>
              <p className="text-pickwell-dark/60 text-[10px] md:text-xs mt-1 uppercase tracking-widest font-semibold">{card.label}</p>
            </motion.a>
          ))}
        </div>
      </div>

      {/* Target Audience Banner */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="max-w-7xl mx-auto px-6 mt-8 md:mt-10 relative z-20 flex flex-col items-center"
      >
        <p className="text-sm md:text-base font-bold text-pickwell-dark/50 uppercase tracking-widest mb-4 md:mb-5">{t.audience.title}</p>
        <div className="flex flex-wrap justify-center gap-5 md:gap-10 items-center opacity-70">
          <div className="flex items-center gap-2 group cursor-default">
            <Briefcase size={22} className="text-pickwell-teal group-hover:scale-110 transition-transform" />
            <span className="font-semibold text-sm md:text-base text-pickwell-dark">{t.audience.offices}</span>
          </div>
          <div className="flex items-center gap-2 group cursor-default">
            <Building size={22} className="text-pickwell-teal group-hover:scale-110 transition-transform" />
            <span className="font-semibold text-sm md:text-base text-pickwell-dark">{t.audience.hotels}</span>
          </div>
          <div className="flex items-center gap-2 group cursor-default">
            <GraduationCap size={24} className="text-pickwell-teal group-hover:scale-110 transition-transform" />
            <span className="font-semibold text-sm md:text-base text-pickwell-dark">{t.audience.schools}</span>
          </div>
          <div className="flex items-center gap-2 group cursor-default">
            <HeartPulse size={22} className="text-pickwell-teal group-hover:scale-110 transition-transform" />
            <span className="font-semibold text-sm md:text-base text-pickwell-dark">{t.audience.hospitals}</span>
          </div>
          <div className="flex items-center gap-2 group cursor-default">
            <LayoutGrid size={20} className="text-pickwell-teal group-hover:scale-110 transition-transform" />
            <span className="font-semibold text-sm md:text-base text-pickwell-dark">{t.audience.others}</span>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
