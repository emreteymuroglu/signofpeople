
import React from 'react';
import { TEAM_MEMBERS } from '../../constants';
import type { TeamMember } from '../../types';
import { Linkedin, Instagram } from 'lucide-react';

export const TeamSection: React.FC = () => {
  return (
    <section className="py-32 bg-black text-white">
      <div className="container mx-auto px-8 md:px-16 lg:px-24">
        
        <div className="mb-20">
          <h2 className="text-4xl md:text-6xl font-black mb-6">MİMARLAR <span className="text-brand-yellow">TAKIMI</span></h2>
          <p className="text-xl text-white/50 max-w-2xl">
             Bir sonraki etkinliği düzenlemek için kafayı bozmuş kişilerle tanışın.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {TEAM_MEMBERS.map((member: TeamMember) => (
            <div key={member.id} className="group relative">
              {/* Card Image */}
              <div className="h-[500px] overflow-hidden rounded-sm filter grayscale group-hover:grayscale-0 transition-all duration-700">
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              {/* Overlay Content */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-300 flex flex-col justify-end p-8">
                <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="text-2xl font-bold text-white mb-1">{member.name}</h3>
                  <p className="text-brand-yellow font-medium mb-4">{member.role}</p>
                  
                  <div className="h-0 group-hover:h-auto overflow-hidden transition-all duration-300 opacity-0 group-hover:opacity-100">
                    <p className="text-sm text-white/80 mb-6 leading-relaxed">
                      {member.bio}
                    </p>
                    <div className="flex gap-4">
                      {member.linkedin && (
                        <a 
                          href={member.linkedin} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="p-2 bg-white/10 hover:bg-brand-yellow hover:text-black rounded-full transition-colors"
                        >
                          <Linkedin className="w-4 h-4" />
                        </a>
                      )}
                      {member.instagram && (
                        <a 
                          href={member.instagram} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="p-2 bg-white/10 hover:bg-brand-yellow hover:text-black rounded-full transition-colors"
                        >
                          <Instagram className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Border effect */}
              <div className="absolute inset-0 border border-white/10 group-hover:border-brand-yellow/50 transition-colors pointer-events-none"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};