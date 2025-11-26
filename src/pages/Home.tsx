import React from 'react';
import { Hero } from '../components/Home/Hero';
import { FeaturedEvents } from '../components/Home/FeaturedEvents';
import { Newsletter } from '../components/Home/Newsletter';
import { SEO } from '../components/SEO/SEO';

export const Home: React.FC = () => {
  return (
    <>
      <SEO 
        title="Ana Sayfa"
        description="Sign of People: Şehrin sosyal nabzı. Konserler, sanat sergileri, atölyeler ve yeraltı buluşmaları için dijital bağlantı noktası. Bağlan, Keşfet, Yaşa."
        keywords="etkinlikler, konser istanbul, sergi, atölye, sosyal kulüp, sign of people, bilet al"
      />
      <Hero />
      <FeaturedEvents />
      <Newsletter />
    </>
  );
};