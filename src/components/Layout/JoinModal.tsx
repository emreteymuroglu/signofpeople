import React, { useState, useEffect } from 'react';
import { supabase } from '../../SupabaseClient';
import { X, Check, Loader2, Calendar, AlertCircle } from 'lucide-react';
import { Button } from '../UI/Button';
import { TurnstileWidget } from '../UI/TurnstileWidget';

interface JoinModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const JoinModal: React.FC<JoinModalProps> = ({ isOpen, onClose }) => {
  const [isClosing, setIsClosing] = useState(false);
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [events, setEvents] = useState<{id: string, title: string, date: string}[]>([]);
  const [loadingEvents, setLoadingEvents] = useState(true);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  
  // Form State
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    selectedEvent: '',
    message: ''
  });

  // Fetch events for dropdown on mount
  useEffect(() => {
    const fetchEvents = async () => {
      setLoadingEvents(true);
      const { data, error } = await supabase
        .from('events')
        .select('id, title, date_display')
        .order('created_at', { ascending: false });
        
      if (error) {
        console.error("Error fetching dropdown events:", error);
      }
      
      if (data) {
        const mappedEvents = data.map((e: any) => ({
          id: e.id,
          title: e.title,
          date: e.date_display
        }));

        setEvents(mappedEvents);
        if (mappedEvents.length > 0) {
            setFormData(prev => ({ ...prev, selectedEvent: mappedEvents[0].id }));
        }
      }
      setLoadingEvents(false);
    };
    fetchEvents();
  }, []);

  // Reset state when opening
  useEffect(() => {
    if (isOpen) {
      setIsClosing(false);
      setStatus('idle');
      setCaptchaToken(null);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(onClose, 300); // Wait for animation
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!captchaToken) {
        return; // Button disabled anyway
    }

    setStatus('submitting');
    
    try {
      const selectedEventObj = events.find(e => e.id === formData.selectedEvent);

      const submissionData = {
          first_name: formData.firstName,
          last_name: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          message: formData.message,
          event_id: formData.selectedEvent || null,
          event_name: selectedEventObj?.title || 'General Join'
      };

      const { error } = await supabase
        .from('registrations')
        .insert([submissionData]);

      if (error) throw error;
      
      setStatus('success');
    } catch (error) {
      console.error(error);
      setStatus('error');
    }
  };

  if (!isOpen) return null;

  return (
    <div className={`fixed inset-0 z-[100] flex items-center justify-center p-4 transition-opacity duration-300 ${isClosing ? 'opacity-0' : 'opacity-100'}`}>
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={handleClose}
      ></div>

      {/* Modal Content */}
      <div className={`relative w-full max-w-lg bg-[#0a0a0a] border border-white/10 rounded-3xl shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden transition-transform duration-300 ${isClosing ? 'scale-95 translate-y-4' : 'scale-100 translate-y-0'} animate-fade-in-up max-h-[90vh] overflow-y-auto`}>
        
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-white/5 sticky top-0 bg-[#0a0a0a] z-10">
          <h3 className="text-xl font-bold text-white">Topluluğa Katıl</h3>
          <button 
            onClick={handleClose}
            className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-white/50 hover:bg-white hover:text-black transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 md:p-8">
          {status === 'success' ? (
            <div className="text-center py-12 animate-fade-in-up">
              <div className="w-20 h-20 bg-brand-yellow/20 text-brand-yellow rounded-full flex items-center justify-center mx-auto mb-6">
                <Check className="w-10 h-10" />
              </div>
              <h4 className="text-2xl font-black text-white mb-2">ARAMIZA HOŞ GELDİN.</h4>
              <p className="text-white/60 mb-8">
                Talebin alındı. Erişim detaylarınla birlikte kısa süre içinde seninle iletişime geçeceğiz.
              </p>
              <Button onClick={handleClose} className="w-full justify-center">Kapat</Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-white/40 uppercase tracking-wider flex items-center gap-2">
                  <Calendar className="w-3 h-3" /> Etkinlik Seç
                </label>
                <div className="relative">
                  <select 
                    value={formData.selectedEvent}
                    onChange={(e) => setFormData({...formData, selectedEvent: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white appearance-none focus:border-brand-yellow focus:outline-none transition-colors"
                  >
                    {loadingEvents ? (
                      <option className="bg-black text-white">Yükleniyor...</option>
                    ) : events.length > 0 ? (
                      events.map(event => (
                        <option key={event.id} value={event.id} className="bg-black text-white">
                          {event.title || 'Başlıksız Etkinlik'} — {event.date || 'Tarih Yok'}
                        </option>
                      ))
                    ) : (
                      <option className="bg-black text-white">Aktif etkinlik bulunamadı</option>
                    )}
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-white/50">
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"/></svg>
                  </div>
                </div>
              </div>

              {status === 'error' && (
                <div className="bg-red-500/10 border border-red-500/20 p-3 rounded-lg flex items-center gap-2 text-red-500 text-sm">
                  <AlertCircle className="w-4 h-4" />
                  Bir hata oluştu.
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-white/40 uppercase tracking-wider">Ad</label>
                  <input 
                    required
                    type="text" 
                    value={formData.firstName}
                    onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-brand-yellow focus:outline-none transition-colors"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-white/40 uppercase tracking-wider">Soyad</label>
                  <input 
                    required
                    type="text" 
                    value={formData.lastName}
                    onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-brand-yellow focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-white/40 uppercase tracking-wider">E-posta</label>
                <input 
                  required
                  type="email" 
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-brand-yellow focus:outline-none transition-colors"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-white/40 uppercase tracking-wider">Telefon</label>
                <input 
                  required
                  type="tel" 
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-brand-yellow focus:outline-none transition-colors"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-white/40 uppercase tracking-wider">Mesaj</label>
                <textarea 
                  rows={2}
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-brand-yellow focus:outline-none transition-colors resize-none"
                ></textarea>
              </div>

              <div className="pt-2">
                <TurnstileWidget onVerify={(token) => setCaptchaToken(token)} />

                <Button 
                  disabled={status === 'submitting' || !captchaToken}
                  type="submit" 
                  className={`w-full justify-center py-4 text-base ${!captchaToken ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {status === 'submitting' ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    'Kaydı Onayla'
                  )}
                </Button>
                <p className="text-[10px] text-white/30 text-center mt-3">
                  Gizliliğine önem veriyoruz. Spam yok.
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};