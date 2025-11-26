import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../UI/Button';
import { Play } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-24 md:pt-30 pb-20 overflow-hidden bg-black">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-yellow/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2"></div>
      </div>

      <div className="container mx-auto px-8 md:px-16 lg:px-24 relative z-10 grid lg:grid-cols-2 gap-12 items-center">
        
        {/* Text Content */}
        <div className="space-y-8 animate-fade-in-up">
          
          <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black leading-[0.95] tracking-tight text-white">
            KALABALIKLARIN <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/50">KÜLTÜRE</span> <br/>
            DÖNÜŞTÜĞÜ <br/>
            <span className="text-brand-yellow italic pr-2">YER.</span>
          </h1>
          
          <p className="text-base text-white/60 max-w-md font-light leading-relaxed">
            Undeground etkinlikleri, sanat atölyelerini, aklına gelebilecek her şeyi keşfet. 
            Sign of People, bu şehrin sosyal nabzıdır.
          </p>
          
          <div className="flex flex-wrap gap-4 pt-4">
            <Link to="/events">
              <Button variant="primary" withArrow>Etkinlik Bul</Button>
            </Link>
            <button className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-all group">
              <Play className="w-4 h-4 fill-current group-hover:scale-110 transition-transform text-white" />
            </button>
            <span className="self-center text-sm font-medium text-white/50 pl-2">Videoyu İzle</span>
          </div>

          {/* Social Proof - Added mb-12 for spacing */}
          <div className="flex items-center gap-4 pt-8 border-t border-white/10 mb-12">
            <div className="flex -space-x-3">
              {[1,2,3,4].map((i) => (
                <img 
                  key={i} 
                  src={`https://picsum.photos/50/50?random=user${i}`} 
                  alt="User" 
                  className="w-10 h-10 rounded-full border-2 border-brand-dark object-cover"
                />
              ))}
            </div>
            <div>
              <p className="text-xl font-bold text-white">1.2b+</p>
              <p className="text-xs text-white/50 uppercase tracking-wider">Aktif Üye</p>
            </div>
          </div>
        </div>

        {/* Visual Content */}
        <div className="relative h-[600px] hidden lg:block">
           {/* Abstract Layout */}
           <div className="absolute top-10 right-10 w-80 h-96 rounded-2xl overflow-hidden rotate-6 hover:rotate-0 transition-transform duration-500 z-20 border-4 border-brand-dark shadow-2xl">
             <img src="https://vmccfvpzemsoazvnxfst.supabase.co/storage/v1/object/public/globals/banner2.jpg" alt="Party" className="w-full h-full object-cover" />
             <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-6">
                <span className="text-brand-yellow font-bold text-xl">Teras Partisi</span>
                <span className="text-white/80 text-sm">Yarın Gidelim mi? • Beşiktaş</span>
             </div>
           </div>
           
           <div className="absolute bottom-10 left-10 w-72 h-80 rounded-2xl overflow-hidden -rotate-6 hover:rotate-0 transition-transform duration-500 z-10 opacity-60 hover:opacity-100 grayscale hover:grayscale-0">
             <img src="https://vmccfvpzemsoazvnxfst.supabase.co/storage/v1/object/public/globals/banner1.jpg" alt="Concert" className="w-full h-full object-cover" />
           </div>

           {/* Floating Badge */}
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 bg-white text-black p-4 rounded-full font-black text-center shadow-[0_0_40px_rgba(255,255,255,0.3)] animate-pulse-slow">
             <span className="block text-2xl">70+</span>
             <span className="block text-[10px] uppercase tracking-bold">Toplam Etkinlik</span>
           </div>
        </div>
      </div>
    </section>
  );
};