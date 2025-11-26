import React from 'react';

export const ContactHero: React.FC = () => {
  return (
    <section className="relative pt-16 md:pt-24 pb-12 bg-brand-dark overflow-hidden">
      {/* Background Abstract */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-900/20 rounded-full blur-[120px] translate-x-1/2 -translate-y-1/2"></div>
      
      <div className="container mx-auto px-8 md:px-16 lg:px-24 relative z-10">
        <div className="max-w-5xl">
          <div className="overflow-hidden">
            <h1 className="text-4xl md:text-8xl lg:text-9xl font-black text-white leading-[0.85] tracking-tighter animate-slide-up">
              HADİ BİR
            </h1>
          </div>
          
          <div className="flex flex-col md:flex-row md:items-end gap-2 md:gap-6 mt-2">
             <div className="overflow-hidden">
                <h1 className="text-5xl sm:text-5xl md:text-8xl lg:text-9xl font-black text-brand-yellow leading-[0.85] tracking-tighter animate-slide-up [animation-delay:0.1s]">
                  DEVRİM BAŞLATALIM.
                </h1>
             </div>
             <span className="text-white/50 text-xl md:text-2xl font-light italic animate-fade-in-up [animation-delay:0.5s] whitespace-nowrap mb-2 md:mb-6">
               (iyi olanından.)
             </span>
          </div>
          
          <p className="mt-10 text-xl text-white/60 max-w-2xl animate-fade-in-up [animation-delay:0.3s]">
            Bir etkinlik vizyonun mu var? Ortak olmak mı istiyorsun?
            Yoksa sadece sesimizin çok çıktığını mı söylemek istiyorsun? Dinliyoruz.
          </p>
        </div>
      </div>
    </section>
  );
};