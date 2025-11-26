import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Twitter } from 'lucide-react';
import myLogo from '../../assets/logo-s-black.png';

const socialLinks = [
  { Icon: Instagram, href: "https://www.instagram.com/signofpeople.co/" }, // Insert Instagram link 
  { Icon: Twitter, href: "https://x.com/signofpeople_co" }    // Insert Twitter link 
];

export const Footer: React.FC = () => {
  return (
    <footer className="bg-black pt-20 pb-10 border-t border-white/10 text-white">
      <div className="container mx-auto px-8 md:px-16 lg:px-24">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
             <Link to="/" className="text-2xl font-black tracking-tighter text-white flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-brand-yellow rounded-full flex items-center justify-center group-hover:rotate-180 transition-transform duration-500 overflow-hidden">
               {/* Replaced Text S with Image - Replace src with your actual uploaded black png */}
               <img 
                 src={myLogo}
                 alt="S" 
                 className="w-5 h-5 object-contain"
                 onError={(e) => {
                   // Fallback if image fails to load while user is setting it up
                   e.currentTarget.style.display = 'none';
                   e.currentTarget.parentElement!.innerHTML = '<span class="text-black font-bold">S</span>';
                 }}
               />
            </div>
              <span>SIGN<span className="text-brand-yellow">OF</span>PEOPLE</span>
            </Link>
            <p className="text-white/50 max-w-sm mb-6">
              Biz, sen ve jenerasyonunu tanımlayan deneyimler arasındaki köprüyüz. 
              Bağlan, anı yaşa.
            </p>
            <div className="flex gap-4">
              {socialLinks.map(({ Icon, href }, i) => (
                <a 
                  key={i} 
                  href={href} 
                  target={href !== '#' ? "_blank" : undefined}
                  rel={href !== '#' ? "noopener noreferrer" : undefined}
                  className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-brand-yellow hover:text-black transition-all">
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-bold text-lg mb-6">Keşfet</h4>
            <ul className="space-y-4 text-white/60">
              <li><Link to="/events" className="hover:text-brand-yellow transition-colors">Konserler</Link></li>
              <li><Link to="/events" className="hover:text-brand-yellow transition-colors">Sergiler</Link></li>
              <li><Link to="/events" className="hover:text-brand-yellow transition-colors">Buluşmalar</Link></li>
              <li><Link to="/events" className="hover:text-brand-yellow transition-colors">Atölyeler</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-6">Kurumsal</h4>
            <ul className="space-y-4 text-white/60">
              <li><Link to="/about" className="hover:text-brand-yellow transition-colors">Hakkımızda</Link></li>
              <li><Link to="/contact" className="hover:text-brand-yellow transition-colors">Kariyer</Link></li>
              <li><Link to="/contact" className="hover:text-brand-yellow transition-colors">İletişim</Link></li>
              <li><Link to="/policies" className="hover:text-brand-yellow transition-colors">Sözleşme & Politikalar</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-white/40">
          <p>© {new Date().getFullYear()} Sign of People. Tüm hakları saklıdır.</p>
          <div className="flex gap-8 mt-4 md:mt-0">
             <Link to="/policies?tab=terms" className="hover:text-white">Şartlar</Link>
             <Link to="/policies?tab=privacy" className="hover:text-white">Gizlilik</Link>
             <Link to="/policies?tab=cookies" className="hover:text-white">Çerezler</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};