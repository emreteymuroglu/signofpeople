import React from 'react';

export const AboutHero: React.FC = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center pt-8 md:pt-16 pb-20 overflow-hidden bg-brand-dark">
      {/* Background Ambience */}
      <div className="absolute inset-0 z-0 opacity-20">
         <div className="absolute top-1/2 left-1/4 w-[600px] h-[600px] bg-brand-yellow rounded-full blur-[150px] -translate-y-1/2"></div>
      </div>

      <div className="container mx-auto px-8 md:px-16 lg:px-24 relative z-10">
        <div className="max-w-5xl">
          <div className="overflow-hidden mb-2">
            <h1 className="text-4xl md:text-8xl lg:text-9xl font-black text-white leading-[0.85] tracking-tighter animate-slide-up">
              BİR PLATFORMDAN
            </h1>
          </div>
          <div className="overflow-hidden mb-2">
            <h1 className="text-6xl sm:text-6xl md:text-8xl lg:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white/50 to-white/10 leading-[0.85] tracking-tighter animate-slide-up [animation-delay:0.1s]">
              ÇOK DAHA
            </h1>
          </div>
          <div className="overflow-hidden mb-8">
             <h1 className="text-6xl md:text-8xl lg:text-9xl font-black text-brand-yellow leading-[0.85] tracking-tighter animate-slide-up [animation-delay:0.2s]">
              FAZLASI.
             </h1>
          </div>

          <div className="h-px w-32 bg-brand-yellow mb-8 animate-fade-in-slow [animation-delay:0.8s]"></div>

          <p className=" md:text-2xl text-white/70 max-w-2xl font-light animate-fade-in-up [animation-delay:0.4s]">
            Biz fiziksel dünya için tasarlanmış dijital sinir sistemiyiz. 
            Ekran bariyerini yıkmak ve insanları tekrar aynı odaya getirmek için tasarlandık.
          </p>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-8 md:left-24 animate-bounce text-white/30">
        <span className="text-xs uppercase tracking-widest vertical-rl rotate-180">Aşağı Kaydır</span>
      </div>
    </section>
  );
};