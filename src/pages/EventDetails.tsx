
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../SupabaseClient';
import { Button } from '../components/UI/Button';
import { RegistrationModal } from '../components/Events/RegistrationModal';
import { Newsletter } from '../components/Home/Newsletter';
import { MapPin, Calendar, Clock, Share2, AlertCircle, ArrowLeft, Loader2, ArrowUpRight } from 'lucide-react';
import { type Event } from '../types';
import { SEO } from '../components/SEO/SEO';

export const EventDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchEvent = async () => {
      if (!id) return;
      setLoading(true);
      try {
        // We fetch the event, join the 'categories' table, and join the 'people' table via 'event_people'
        const { data, error } = await supabase
          .from('events')
          .select(`
            *,
            categories(name),
            event_people(
              people(
                id,
                name,
                role,
                image_url,
                bio
              )
            )
          `)
          .eq('id', id)
          .single();

        if (error) throw error;
        
        // Format Lineup
        // The structure from join is usually { event_people: [ { people: {...} }, ... ] }
        const formattedLineup = data.event_people?.map((ep: any) => ({
             ...ep.people,
             image_url: ep.people.image_url || `https://picsum.photos/200/200?random=${ep.people.id}`
        })) || [];

        setEvent({
          ...data,
          // Handle mappings from DB snake_case columns
          date: data.date_display || data.date,
          attendees: data.attendees_count || data.attendees,
          imageUrl: data.image_url || `https://picsum.photos/800/600?random=${data.id || 'detail'}`,
          category: data.categories?.name || data.category || 'Genel',
          description: data.description, // Use DB description
          lineup: formattedLineup,
          mapUrl: data.map_url // Map database column to frontend property
        });
      } catch (err) {
        console.error("Event fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchEvent();
  }, [id]);

  if (loading) {
     return (
        <div className="min-h-screen flex items-center justify-center bg-brand-dark">
           <Loader2 className="w-10 h-10 text-brand-yellow animate-spin" />
        </div>
     );
  }

  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-brand-dark flex-col gap-4">
        <SEO title="Etkinlik Bulunamadı" description="Aradığınız etkinlik bulunamadı." />
        <h1 className="text-4xl font-black text-white">ETKİNLİK BULUNAMADI</h1>
        <Link to="/events" className="text-brand-yellow underline">Etkinliklere Dön</Link>
      </div>
    );
  }

  // Safe date parsing
  const dateStr = event.date || '';
  const datePart = dateStr.includes('•') ? dateStr.split('•')[0].trim() : dateStr;
  const timePart = dateStr.includes('•') ? dateStr.split('•')[1].trim() : '20:00';
  // Determine map link: use DB provided link, or fallback to Google Maps search based on location name
  const mapLink = event.mapUrl || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(event.location || '')}`;

  return (
    <div className="min-h-screen bg-brand-dark">
      {/* Dynamic SEO Tags based on fetched event data */}
      <SEO 
        title={event.title}
        description={event.description ? event.description.substring(0, 150) + '...' : `${event.title} etkinliği ${event.date} tarihinde ${event.location} konumunda. Biletini hemen al.`}
        image={event.imageUrl}
        keywords={`${event.title}, ${event.category}, ${event.location}, bilet al, etkinlik`}
      />
      <RegistrationModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        eventName={event.title || 'Etkinlik'}
        eventId={event.id}
      />

      {/* Hero Section */}
      <section className="relative h-[70vh] w-full overflow-hidden">
        <div className="absolute inset-0">
          <img src={event.imageUrl} alt={event.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/50 to-transparent"></div>
        </div>
        
        <div className="absolute top-32 left-8 md:left-16 z-20">
          <Link to="/events" className="inline-flex items-center text-white/60 hover:text-white transition-colors mb-8 bg-black/30 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Takvime Dön
          </Link>
        </div>

        <div className="absolute bottom-0 left-0 w-full z-10 pb-12 pt-32 bg-gradient-to-t from-brand-dark to-transparent">
          <div className="container mx-auto px-8 md:px-16 lg:px-24">
             {event.category && (
               <span className="bg-brand-yellow text-black font-bold px-3 py-1 rounded-md text-xs uppercase tracking-wider mb-4 inline-block">
                 {event.category}
               </span>
             )}
             <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white leading-none tracking-tight mb-4 animate-slide-up">
               {(event.title || 'Başlıksız').toUpperCase()}
             </h1>
             <div className="flex items-center gap-4 text-white/80 animate-fade-in-up [animation-delay:0.2s]">
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-brand-yellow" />
                  <span className="font-medium">{datePart}</span>
                </div>
                <div className="w-1.5 h-1.5 rounded-full bg-white/30"></div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-brand-yellow" />
                  <span className="font-medium">{event.location || 'Konum Belirtilmemiş'}</span>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Content Layout */}
      <section className="py-16 relative">
        <div className="container mx-auto px-8 md:px-16 lg:px-24">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            
            {/* Left Column: Details */}
            <div className="lg:col-span-2 space-y-12">
              
              {/* Description (Dynamic) */}
              <div className="space-y-6 animate-fade-in-up [animation-delay:0.3s]">
                <h3 className="text-2xl font-bold text-white">Etkinlik Hakkında</h3>
                {event.description ? (
                  <div className="text-lg text-white/70 leading-relaxed font-light whitespace-pre-wrap">
                    {event.description}
                  </div>
                ) : (
                   <p className="text-lg text-white/70 leading-relaxed font-light italic">
                     Bu etkinlik için henüz detaylı bir açıklama girilmemiş.
                   </p>
                )}
              </div>

              {/* Lineup / Kadro (Dynamic) */}
              {event.lineup && event.lineup.length > 0 && (
                <div className="border-t border-white/10 pt-10">
                  <h3 className="text-2xl font-bold text-white mb-6">
                    Kadro
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {event.lineup.map((person) => (
                      <div key={person.id} className="flex items-center gap-4 p-4 bg-white/5 rounded-xl border border-white/5 hover:border-white/20 transition-colors">
                          <img 
                            src={person.image_url || `https://picsum.photos/100/100?random=${person.id}`} 
                            alt={person.name} 
                            className="w-16 h-16 rounded-full object-cover" 
                          />
                          <div>
                            <p className="font-bold text-white">{person.name}</p>
                            <p className="text-xs text-brand-yellow uppercase tracking-wider">
                              {person.role}
                            </p>
                          </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Info Box */}
              <div className="bg-brand-yellow/5 border border-brand-yellow/20 p-6 rounded-2xl flex gap-4 items-start">
                <AlertCircle className="w-6 h-6 text-brand-yellow flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-white mb-2">Önemli Bilgiler</h4>
                  <ul className="list-disc list-inside text-white/60 space-y-1 text-sm">
                    <li>Bilet almak için başvuru yapın ve bizden haber bekleyin, büyük ihtimalle hem arayıp hem mail atacağız.</li>
                    <li>Etkinliklerde izinsiz profesyonel çekim yapılamaz.</li>
                    <li>En güncel duyurular için Instagram hesabımızı takip edin.</li>
                  </ul>
                </div>
              </div>

            </div>

            {/* Right Column: Sticky Sidebar */}
            <div className="relative">
              <div className="sticky top-24 space-y-6 animate-fade-in-up [animation-delay:0.5s]">
                
                {/* Action Card */}
                <div className="bg-[#111] border border-white/10 rounded-3xl p-8 shadow-2xl">
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-white/50 text-sm font-medium">Bilet Fiyatı</span>
                    <span className="text-3xl font-black text-white">{event.price || 'Belirsiz'}</span>
                  </div>

                  <div className="space-y-6 mb-8">
                     <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white shrink-0">
                           <Clock className="w-5 h-5" />
                        </div>
                        <div>
                           <p className="text-white font-bold">Saat</p>
                           <p className="text-white/50 text-sm">{timePart}</p>
                        </div>
                     </div>
                     <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white shrink-0">
                           <MapPin className="w-5 h-5" />
                        </div>
                        <div>
                           <p className="text-white font-bold">Konum</p>
                           <p className="text-white/50 text-sm">{event.location || 'Konum Bilgisi Yok'}</p>
                           <a 
                             href={mapLink} 
                             target="_blank" 
                             rel="noopener noreferrer"
                             className="text-brand-yellow text-xs underline mt-1 block hover:text-white transition-colors"
                           >
                             Haritada Gör
                             <ArrowUpRight className="w-3 h-3" />
                           </a>
                        </div>
                     </div>
                  </div>

                  <Button 
                    onClick={() => setIsModalOpen(true)}
                    className="w-full justify-center py-4 text-base shadow-[0_0_20px_rgba(250,204,21,0.2)]"
                  >
                    Bilet Ayır
                  </Button>
                  
                  <p className="text-center text-white/30 text-xs mt-4">
                    {event.attendees || 0} kişi şimdiden katılıyor
                  </p>
                </div>

                {/* Share */}
                <button className="w-full flex items-center justify-center gap-2 py-3 border border-white/10 rounded-xl text-white/50 hover:bg-white/5 hover:text-white transition-colors">
                  <Share2 className="w-4 h-4" />
                  <span className="text-sm font-bold">Etkinliği Paylaş</span>
                </button>

              </div>
            </div>

          </div>
        </div>
      </section>

      <div className="border-t border-white/10">
        <Newsletter />
      </div>
    </div>
  );
};
