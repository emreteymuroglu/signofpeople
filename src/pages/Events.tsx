import React, { useEffect } from 'react';
import { EventsHero } from '../components/Events/EventsHero';
import { EventsList } from '../components/Events/EventsList';
import { Newsletter } from '../components/Home/Newsletter';
import { SEO } from '../components/SEO/SEO';

export const Events: React.FC = () => {
  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-brand-dark">
      <SEO 
        title="Etkinlik Takvimi"
        description="Yaklaşan tüm konserler, sergiler, atölyeler ve partiler. Biletini al, yerini ayırt ve şehrin en iyi etkinliklerini kaçırma."
        keywords="konser takvimi, istanbul etkinlikleri, etkinlik biletleri, bu hafta sonu nereye gidilir, sanat etkinlikleri"
      />
      <EventsHero />
      <EventsList />
      <div className="border-t border-white/10">
        <Newsletter />
      </div>
    </div>
  );
};