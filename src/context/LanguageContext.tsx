import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { translations } from '../translations';

export type Language = 'pt' | 'en';

interface LanguageContextType {
  lang: Language;
  t: typeof translations.pt;
  toggleLang: () => void;
}

const LanguageContext = createContext<LanguageContextType>({
  lang: 'pt',
  t: translations.pt,
  toggleLang: () => {},
});

export const useLanguage = () => useContext(LanguageContext);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Language>('en');
  const toggleLang = () => setLang(prev => prev === 'pt' ? 'en' : 'pt');
  const t = translations[lang];

  useEffect(() => {
    document.documentElement.lang = lang === 'pt' ? 'pt-PT' : 'en';
  }, [lang]);

  return (
    <LanguageContext.Provider value={{ lang, t, toggleLang }}>
      {children}
    </LanguageContext.Provider>
  );
}
