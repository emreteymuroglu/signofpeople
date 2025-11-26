
import React, { useState, useEffect } from 'react';
import { supabase } from '../../SupabaseClient';
import { EventCard } from './EventCard';
import { type Event } from '../../types';
import { Search, Filter, Loader2 } from 'lucide-react';

export const EventsList: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('Tümü');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [events, setEvents] = useState<Event[]>([]);
  const [categories, setCategories] = useState<string[]>(['Tümü']);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // 1. Fetch Categories
        const { data: catData, error: catError } = await supabase
          .from('categories')
          .select('name');
        
        if (!catError && catData) {
          const distinctCategories = Array.from(new Set(catData.map((c: any) => c.name)));
          setCategories(['Tümü', ...distinctCategories]);
        }

        // 2. Fetch Events with Category Join
        // We assume a relationship 'categories' exists on 'category_id'
        const { data, error } = await supabase
          .from('events')
          .select('*, categories(name)')
          .order('created_at', { ascending: true });

        if (error) throw error;

        const formattedEvents = (data || []).map((e: any) => ({
          ...e,
          // Map DB columns to Typescript Interface
          date: e.date_display || e.date, 
          attendees: e.attendees_count || e.attendees || 0,
          imageUrl: e.image_url || `https://picsum.photos/800/600?random=${e.id || 'default'}`,
          // Handle joined category data
          category: e.categories?.name || e.category || 'Genel',
          // Map DB map_url to frontend mapUrl
          mapUrl: e.map_url
        }));

        setEvents(formattedEvents);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filtering Logic
  const filteredEvents = events.filter(event => {
    // Determine category match
    const matchesCategory = activeCategory === 'Tümü' || event.category === activeCategory;
    
    // Safely handle potential null values for title and location
    const safeTitle = (event.title || '').toLowerCase();
    const safeLocation = (event.location || '').toLowerCase();
    const searchLower = searchQuery.toLowerCase();

    const matchesSearch = safeTitle.includes(searchLower) || safeLocation.includes(searchLower);
    
    return matchesCategory && matchesSearch;
  });

  return (
    <section className="pb-32 bg-brand-dark relative z-10">
      <div className="container mx-auto px-8 md:px-16 lg:px-24">
        
        {/* Controls Bar - Glass Effect */}
        <div className="relative top-5 z-10 mb-12 animate-fade-in-up [animation-delay:0.4s]">
          <div className="glass-panel rounded-2xl p-4 md:p-6 flex flex-col md:flex-row gap-6 items-center shadow-2xl">
            
            {/* Search Input */}
            <div className="relative w-full md:w-1/3 group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 w-5 h-5 group-focus-within:text-brand-yellow transition-colors" />
              <input 
                type="text" 
                placeholder="Etkinlik veya mekan ara..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-black/40 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white focus:outline-none focus:border-brand-yellow/50 transition-all placeholder:text-white/30"
              />
            </div>

            {/* Category Filter */}
            <div className="flex-grow w-full overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
              <div className="flex gap-2 items-center">
                <Filter className="text-white/40 w-5 h-5 mr-2 hidden md:block" />
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-5 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-all border ${
                      activeCategory === cat 
                      ? 'bg-brand-yellow text-black border-brand-yellow shadow-[0_0_15px_rgba(250,204,21,0.3)]' 
                      : 'bg-transparent text-white/60 border-white/10 hover:border-white/30 hover:bg-white/5'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Results Grid */}
        {loading ? (
          <div className="flex items-center justify-center py-32">
            <Loader2 className="w-10 h-10 text-brand-yellow animate-spin" />
          </div>
        ) : filteredEvents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredEvents.map((event, index) => (
              <div key={event.id} className="animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <EventCard event={event} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-24 border border-dashed border-white/10 rounded-3xl">
            <h3 className="text-2xl font-bold text-white mb-2">Etkinlik bulunamadı.</h3>
            <p className="text-white/50">Filtreleri değiştirmeyi veya başka bir şey aramayı dene.</p>
            <button 
                onClick={() => {setActiveCategory('Tümü'); setSearchQuery('');}}
                className="mt-6 text-brand-yellow underline hover:text-white transition-colors"
            >
                Filtreleri temizle
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
