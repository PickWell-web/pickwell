import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Globe, ChevronRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { LogoIcon, LogoWordmark } from './Logo';

// Brand colors
const TEAL = '#4B8190';
const CREAM = '#ECEDDA';
const DARK = '#253d45';

export default function Navbar() {
  const { lang, t, toggleLang } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#healthy', label: t.nav.healthy },
    { href: '#design', label: t.nav.design },
    { href: '#experience', label: t.nav.experience },
    { href: '#travelbox', label: t.nav.travel },
    { href: '#contact', label: t.nav.contact },
  ];

  const handleNavClick = (href: string) => {
    const sectionId = href.replace('#', '');
    const targetSection = document.getElementById(sectionId);
    if (!targetSection) return;

    const runScroll = () => {
      const navHeight = document.getElementById('main-nav')?.offsetHeight ?? 0;
      const offset = 12;
      const top = targetSection.getBoundingClientRect().top + window.scrollY - navHeight - offset;
      window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
    };

    const shouldDelayScroll = isMenuOpen;
    setIsMenuOpen(false);

    if (shouldDelayScroll) {
      window.setTimeout(runScroll, 180);
      return;
    }

    runScroll();
  };

  // Colors adapt to scroll state
  // Not scrolled (Top): Transparent bg over Cream Hero -> Teal text & Normal Logo (Teal icon, Teal wordmark)
  // Scrolled: Dark bg -> Cream text & Inverted Logo (Cream icon, Cream wordmark)
  const iconBg = scrolled ? CREAM : TEAL;
  const iconFg = scrolled ? TEAL : CREAM;
  const wordmarkColor = scrolled ? CREAM : TEAL;

  return (
    <nav
      id="main-nav"
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-pickwell-dark/95 backdrop-blur-md shadow-2xl py-3 text-pickwell-cream'
          : 'bg-transparent py-4 text-pickwell-teal'
      }`}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* Logo: icon + wordmark, both color-adaptive */}
        <a
          href="#home"
          className="flex items-center gap-3"
          aria-label="PickWell Home"
          onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
        >
          <LogoIcon
            bgColor={iconBg}
            fgColor={iconFg}
            height={40}
            className="transition-all duration-500 flex-shrink-0"
          />
          <LogoWordmark
            color={wordmarkColor}
            height={22}
            className="transition-all duration-500"
          />
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map(link => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
              className="relative hover:opacity-80 transition-opacity font-medium text-sm tracking-wide group"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-pickwell-accent rounded-full group-hover:w-full transition-all duration-300" />
            </a>
          ))}
          <button
            onClick={toggleLang}
            className={`flex items-center gap-2 px-4 py-1.5 rounded-full border transition-all duration-300 text-sm ${
              scrolled
                ? 'border-pickwell-cream/30 hover:bg-pickwell-cream hover:text-pickwell-teal'
                : 'border-pickwell-teal/30 hover:bg-pickwell-teal hover:text-pickwell-cream'
            }`}
            aria-label={`Switch to ${lang === 'pt' ? 'English' : 'Português'}`}
          >
            <Globe size={14} />
            <span className="font-bold">{lang === 'pt' ? 'EN' : 'PT'}</span>
          </button>
        </div>

        {/* Mobile Toggle */}
        <button
          className={`md:hidden p-2 rounded-lg transition-colors ${
            scrolled ? 'hover:bg-white/10' : 'hover:bg-pickwell-teal/10'
          }`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="absolute top-full left-0 w-full bg-pickwell-dark/98 backdrop-blur-xl text-pickwell-cream md:hidden shadow-2xl overflow-hidden"
          >
            <div className="flex flex-col gap-1 p-6">
              {navLinks.map(link => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                  className="text-xl font-medium py-4 px-6 rounded-2xl hover:bg-white/5 active:bg-white/10 transition-all flex items-center justify-between group"
                >
                  {link.label}
                  <ChevronRight size={18} className="opacity-0 group-hover:opacity-50 transition-opacity" />
                </a>
              ))}
              <div className="border-t border-white/10 mt-4 pt-4">
                <button
                  onClick={() => { toggleLang(); setIsMenuOpen(false); }}
                  className="flex items-center gap-4 py-4 px-6 w-full rounded-2xl hover:bg-white/5 active:bg-white/10 transition-all"
                >
                  <Globe size={20} className="text-pickwell-teal" />
                  <span className="font-bold text-lg">{lang === 'pt' ? 'English' : 'Português'}</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
