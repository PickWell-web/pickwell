import { useLanguage } from '../context/LanguageContext';
import { LogoIcon, LogoWordmark } from './Logo';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="section-perf bg-pickwell-dark text-pickwell-cream py-10 md:py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <LogoIcon bgColor="#ECEDDA" fgColor="#4B8190" height={36} />
            <LogoWordmark color="#ECEDDA" height={20} />
          </div>
          <p className="text-sm text-pickwell-cream/40 text-center md:text-right max-w-sm">
            {t.footer.description}
          </p>
        </div>
        <div className="mt-8 pt-6 border-t border-pickwell-cream/10 text-center">
          <p className="text-xs text-pickwell-cream/30">
            © {new Date().getFullYear()} PickWell. {t.footer.rights}
          </p>
        </div>
      </div>
    </footer>
  );
}
