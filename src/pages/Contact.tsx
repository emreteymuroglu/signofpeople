import React, { useEffect } from 'react';
import { ContactHero } from '../components/Contact/ContactHero';
import { ContactFormSection } from '../components/Contact/ContactFormSection';
import { Newsletter } from '../components/Home/Newsletter';
import { SEO } from '../components/SEO/SEO';

export const Contact: React.FC = () => {
  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pt-20"> {/* Offset for fixed header */}
      <SEO 
        title="İletişim"
        description="Bizimle iletişime geçin. Etkinlik ortaklıkları, basın talepleri veya sadece merhaba demek için. Kadıköy, İstanbul."
        keywords="iletişim, sign of people adres, e-posta, etkinlik ortaklığı"
      />
      <ContactHero />
      <ContactFormSection />
      <div className="border-t border-white/10">
         <Newsletter />
      </div>
    </div>
  );
};