import React, { useEffect } from 'react';
import { AboutHero } from '../components/About/AboutHero';
import { MissionSection } from '../components/About/MissionSection';
import { TeamSection } from '../components/About/TeamSection';
import { Newsletter } from '../components/Home/Newsletter';
import { SEO } from '../components/SEO/SEO';

export const About: React.FC = () => {
  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pt-20"> {/* Offset for fixed header */}
      <SEO 
        title="Hakkımızda"
        description="Biz fiziksel dünya için tasarlanmış dijital sinir sistemiyiz. Sign of People'ın misyonunu, vizyonunu ve arkasındaki yaratıcı ekibi tanıyın."
        keywords="sign of people kimdir, etkinlik organizasyon, topluluk, vizyon, ekip"
      />
      <AboutHero />
      <MissionSection />
      <TeamSection />
      <div className="border-t border-white/10">
        <Newsletter />
      </div>
    </div>
  );
};