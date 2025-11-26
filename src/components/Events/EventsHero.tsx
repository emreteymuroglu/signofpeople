import React from 'react';

export const EventsHero: React.FC = () => {
  return (
    <section className="relative pt-40 pb-20 bg-brand-dark overflow-hidden">
      {/* Dynamic Background */}
      <div className="absolute inset-0 z-0">
         <div className="absolute bottom-0 right-0 w-[60vw] h-[60vw] bg-brand-yellow/10 rounded-full blur-[150px] translate-y-1/2 translate-x-1/4"></div>
      </div>

      <div className="container mx-auto px-8 md:px-16 lg:px-24 relative z-10 text-center">
        <h1 className="text-6xl md:text-8xl font-black text-white mb-6 tracking-tighter animate-slide-up">
          ETKİNLİK <span className="text-brand-yellow">AJANDASI.</span>
        </h1>
        <p className="text-xl text-white/50 max-w-2xl mx-auto font-light animate-fade-in-up [animation-delay:0.2s]">
          Underground partilerden yüksek konseptli sanat galerilerine. 
          Eğer bilmediğin bir şeyler oluyorsa, hepsi burada.
        </p>
      </div>
    </section>
  );
};