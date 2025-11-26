import React from 'react';
import { Link } from 'react-router-dom';
import type { Event } from '../../types';
import { MapPin, Calendar, ArrowUpRight } from 'lucide-react';

interface EventCardProps {
  event: Event;
}

export const EventCard: React.FC<EventCardProps> = ({ event }) => {
  return (
    <Link to={`/events/${event.id}`} className="block">
      <div className="group relative bg-brand-gray rounded-2xl overflow-hidden cursor-pointer hover:-translate-y-2 transition-transform duration-300">
        {/* Image */}
        <div className="relative h-64 overflow-hidden">
          <img 
            src={event.imageUrl} 
            alt={event.title} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors"></div>
          <div className="absolute top-4 left-4 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full border border-white/20">
            <span className="text-xs font-bold text-white uppercase tracking-wider">{event.category}</span>
          </div>
          <div className="absolute top-4 right-4 bg-brand-yellow text-black font-bold px-3 py-1 rounded-full text-xs">
            {event.price}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 relative">
          <div className="flex justify-between items-start mb-4">
            <div>
              <div className="flex items-center gap-2 text-brand-yellow text-xs font-bold mb-2 uppercase tracking-wide">
                <Calendar className="w-3 h-3" />
                {event.date}
              </div>
              <h3 className="text-xl font-bold text-white mb-1 group-hover:text-brand-yellow transition-colors leading-tight">
                {event.title}
              </h3>
            </div>
            <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-brand-yellow group-hover:text-black transition-colors">
              <ArrowUpRight className="w-4 h-4" />
            </div>
          </div>

          <div className="flex items-center justify-between border-t border-white/10 pt-4 mt-2">
            <div className="flex items-center gap-2 text-white/50 text-sm">
              <MapPin className="w-3 h-3" />
              <span className="truncate max-w-[150px]">{event.location}</span>
            </div>
            <span className="text-xs text-white/40">{event.attendees} katılıyor</span>
          </div>
        </div>
        
        {/* Glow Effect on Hover */}
        <div className="absolute inset-0 border-2 border-transparent group-hover:border-brand-yellow/30 rounded-2xl pointer-events-none transition-colors duration-300"></div>
      </div>
    </Link>
  );
};