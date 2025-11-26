
import React, { useState, useEffect } from 'react';
import { supabase } from '../../SupabaseClient';
import { EventCard } from '../Events/EventCard';
import { Button } from '../UI/Button';
import { type Event } from '../../types';
import { Link } from 'react-router-dom';

export const FeaturedEvents: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>('Tümü');
  const [events, setEvents] = useState<Event[]>([]);
  const [categories, setCategories] = useState<string[]>(['Tümü']);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const { data, error } = await supabase
          .from('events')
          .select('*, categories(name)')
          .limit(6);
          
        if (error) throw error;
        
        // Map snake_case from DB to camelCase and handle mappings
        const formattedEvents = (data || []).map((e: any) => ({
          ...e,
          date: e.date_display || e.date,
          attendees: e.attendees_count || e.attendees || 0,
          imageUrl: e.image_url || `https://picsum.photos/800/600?random=${e.id || 'feat'}`,
          category: e.categories?.name || e.category || 'Genel',
          mapUrl: e.map_url
        }));

        setEvents(formattedEvents);

        // Extract categories from the fetched featured events for the mini-filter
        const distinctCats = Array.from(new Set(formattedEvents.map((e: any) => e.category)));
        setCategories(['Tümü', ...distinctCats]);

      } catch (error) {
        console.error('Error fetching events:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);
  
  const filteredEvents = activeFilter === 'Tümü' 
    ? events 
    : events.filter(e => e.category === activeFilter);

  return (
    <section id="events" className="py-24 bg-brand-dark relative">
      <div className="container mx-auto px-8 md:px-16 lg:px-24">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
              SEÇKİN <span className="text-brand-yellow">ETKİNLİKLER</span>
            </h2>
            <p className="text-white/50 max-w-xl">
              Sadece kenardan izleme. Cesurlar için tasarlanmış deneyimlerin içine dal.
            </p>
          </div>
          
          <div className="flex flex-wrap gap-2">
             {categories.map(cat => (
               <button
                 key={cat}
                 onClick={() => setActiveFilter(cat)}
                 className={`px-4 py-2 rounded-full text-sm font-bold transition-all border ${
                   activeFilter === cat 
                   ? 'bg-white text-black border-white' 
                   : 'bg-transparent text-white/60 border-white/10 hover:border-white/40'
                 }`}
               >
                 {cat}
               </button>
             ))}
          </div>
        </div>

        {/* Grid */}
        {loading ? (
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
             {[1,2,3].map(i => (
               <div key={i} className="h-96 bg-white/5 rounded-2xl animate-pulse"></div>
             ))}
           </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredEvents.map(event => (
              <EventCard key={event.id} event={event} />
            ))}
            {filteredEvents.length === 0 && (
              <div className="col-span-full text-center py-12 text-white/40 border border-dashed border-white/10 rounded-2xl">
                Bu kategoride henüz etkinlik yok.
              </div>
            )}
          </div>
        )}

        {/* View All */}
        <div className="mt-16 text-center">
          <Link to="/events">
            <Button variant="outline" className="px-12">Tüm Etkinlikleri Gör</Button>
          </Link>
        </div>
      </div>
    </section>
  );
};
