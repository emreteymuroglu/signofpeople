import React from 'react';

export const MissionSection: React.FC = () => {
  return (
    <section className="py-24 bg-brand-dark relative overflow-hidden">
      <div className="container mx-auto px-8 md:px-16 lg:px-24">
        
        <div className="flex flex-col lg:flex-row gap-20 items-center">
          {/* Image Grid - Artistic Composition */}
          <div className="lg:w-1/2 relative">
            <div className="grid grid-cols-2 gap-4">
              <img 
                src="https://picsum.photos/400/600?random=20" 
                alt="Community" 
                className="w-full h-80 object-cover rounded-2xl grayscale hover:grayscale-0 transition-all duration-500 translate-y-12" 
              />
              <img 
                src="https://picsum.photos/400/600?random=21" 
                alt="Event" 
                className="w-full h-80 object-cover rounded-2xl grayscale hover:grayscale-0 transition-all duration-500" 
              />
            </div>
            {/* Decorative Element */}
            <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] border border-white/5 rounded-full animate-spin-slow"></div>
          </div>

          {/* Text Content */}
          <div className="lg:w-1/2">
            <span className="text-brand-yellow font-bold tracking-widest uppercase text-sm mb-4 block">Misyonumuz</span>
            <h2 className="text-4xl md:text-6xl font-black text-white mb-8 leading-tight">
              SOSYAL KODLARI <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-yellow to-yellow-600">YENİDEN YAZIYORUZ.</span>
            </h2>
            
            <div className="space-y-6 text-white/60 text-lg leading-relaxed font-light">
              <p>
                Hiper-bağlantılı bir çağda, paradoksal olarak her zamankinden daha yalnızız. 
                Sign of People, "yalnızlık salgınını" sizi bir uygulamada tutarak değil, 
                uygulamadan çıkarıp gerçek hayata katarak çözmek için var.
              </p>
              <p>
                Tesadüflerin yaşandığı alanlar kurguluyoruz. Müziğin yüksek, sanatın kışkırtıcı 
                ve sohbetlerin gerçek olduğu yerler. Biz sadece etkinlik listelemiyoruz; ekosistemler inşa ediyoruz.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-8 mt-12 border-t border-white/10 pt-8">
              <div>
                <span className="block text-3xl font-bold text-white mb-1">70+</span>
                <span className="text-xs text-white/40 uppercase">Etkinlik</span>
              </div>
              <div>
                <span className="block text-3xl font-bold text-white mb-1">10b+</span>
                <span className="text-xs text-white/40 uppercase">Bağlantı</span>
              </div>
              <div>
                <span className="block text-3xl font-bold text-white mb-1">0%</span>
                <span className="text-xs text-white/40 uppercase">Sıkıcılık</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};