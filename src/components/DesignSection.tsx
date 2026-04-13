import { useState } from 'react';
import { Pencil, ChevronLeft, ChevronRight, Layers } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const WoodFrameIcon = ({ size = 32 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <g transform="rotate(-8 12 12)">
      {/* Outer L */}
      <path d="M 4 2 L 20 2 L 20 18 L 15 18 L 15 7 L 4 7 Z" />
      {/* Outer Grain */}
      <line x1="7" y1="4.5" x2="10" y2="4.5" strokeWidth="1.5" />
      <line x1="12" y1="4.5" x2="14" y2="4.5" strokeWidth="1.5" />
      <line x1="17.5" y1="9" x2="17.5" y2="12" strokeWidth="1.5" />
      <line x1="17.5" y1="14" x2="17.5" y2="15.5" strokeWidth="1.5" />
      <path d="M 2 9 L 12 9 L 12 22 L 7 22 L 7 14 L 2 14 Z" />
      {/* Inner Grain */}
      <line x1="4" y1="11.5" x2="6" y2="11.5" strokeWidth="1.5" />
      <line x1="9.5" y1="16" x2="9.5" y2="19" strokeWidth="1.5" />
    </g>
  </svg>
);

const designIcons = [<WoodFrameIcon size={32} />, <Layers size={32} />, <Pencil size={32} />];

const cardImages = [
  ['/standard_editada.jpeg'],
  ['/costumizavel.png', '/costumizavel%20_aeroporto.png', '/costumizvel_hotel.png'],
  ['/vinil_editado1.jpeg', '/vinil_editado2.jpeg', '/vinil_editado3.jpeg'],
];

export default function DesignSection() {
  const { t } = useLanguage();
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [galleryIndex, setGalleryIndex] = useState(0);

  return (
    <section id="design" className="py-16 md:py-24 bg-pickwell-cream border-t border-pickwell-dark/5 scroll-mt-20 md:scroll-mt-24">
      <div className="max-w-7xl mx-auto px-6">
        {/* Invisible backdrop to close the image when clicking outside */}
        {selectedImage !== null && (
          <div 
            className="fixed inset-0 z-20" 
            onClick={() => setSelectedImage(null)} 
          />
        )}

        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16 relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-pickwell-dark">{t.design.title}</h2>
          <p className="text-base md:text-lg text-pickwell-dark/70">{t.design.description}</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {t.design.features.map((feature, index) => {
            const isExpanded = selectedImage === index;
            return (
              <div
                key={index}
                onClick={() => {
                  setSelectedImage(isExpanded ? null : index);
                  if (!isExpanded) setGalleryIndex(0);
                }}
                style={{ zIndex: isExpanded ? 30 : 1 }}
                className="relative h-full flex flex-col bg-white p-8 md:p-10 rounded-[2.5rem] shadow-xl shadow-pickwell-dark/5 border border-pickwell-dark/5 hover:shadow-2xl transition-all duration-500 group cursor-pointer"
              >
                {/* Card content */}
                <div className={`flex flex-col h-full flex-grow transition-opacity duration-400 ${isExpanded ? 'opacity-0' : 'opacity-100'}`}>
                  <div className="w-16 h-16 bg-pickwell-teal/10 rounded-2xl flex items-center justify-center text-pickwell-teal mb-6 md:mb-8 group-hover:bg-pickwell-teal group-hover:text-white transition-colors duration-500 shrink-0">
                    {designIcons[index]}
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold mb-4 text-pickwell-dark">{feature}</h3>
                  <p className="text-gray-500 text-base md:text-lg leading-relaxed flex-grow">{t.design.featureDescs[index]}</p>
                  <p className="text-pickwell-teal text-sm font-semibold mt-6 opacity-80 group-hover:opacity-100 transition-opacity duration-300">
                    Clique para ver foto →
                  </p>
                </div>
                {/* Image overlay — grows large on top of other cards */}
                <div
                  className={`absolute inset-0 flex items-center justify-center bg-white rounded-3xl p-3 shadow-2xl border border-pickwell-dark/10 transition-all duration-500 origin-center ${isExpanded ? 'opacity-100 scale-[1.3] md:scale-[1.5]' : 'opacity-0 scale-100 pointer-events-none'}`}
                >
                  <img
                    src={cardImages[index][isExpanded ? galleryIndex : 0]}
                    alt={feature}
                    className="w-full h-full object-contain rounded-2xl"
                  />
                  
                  {isExpanded && cardImages[index].length > 1 && (
                    <>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setGalleryIndex((prev) => (prev > 0 ? prev - 1 : cardImages[index].length - 1));
                        }}
                        className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-pickwell-dark p-2 rounded-full shadow-lg transition-all z-40 transform hover:scale-110 border border-pickwell-dark/10"
                      >
                        <ChevronLeft size={20} />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setGalleryIndex((prev) => (prev < cardImages[index].length - 1 ? prev + 1 : 0));
                        }}
                        className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-pickwell-dark p-2 rounded-full shadow-lg transition-all z-40 transform hover:scale-110 border border-pickwell-dark/10"
                      >
                        <ChevronRight size={20} />
                      </button>
                      
                      {/* Dots indicator */}
                      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-40">
                        {cardImages[index].map((_, i) => (
                          <div 
                            key={i} 
                            className={`w-2 h-2 rounded-full transition-all duration-300 ${i === galleryIndex ? 'bg-pickwell-teal w-4' : 'bg-pickwell-dark/30'}`}
                          />
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>
        <div className="mt-12 md:mt-16 rounded-3xl overflow-hidden h-[300px] md:h-[450px] relative">
          <img
            src="/images/office-vending.webp"
            alt="PickWell vending machine integrated into a modern office breakroom"
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-pickwell-dark/50 flex items-center justify-center">
            <div className="text-center text-pickwell-cream px-6 max-w-2xl">
              <p className="text-xl md:text-3xl font-serif italic mb-6">"{t.design.quote}"</p>
              <div className="w-20 h-1 bg-pickwell-accent mx-auto rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
