import React, { useState } from 'react';
import { supabase } from '../../SupabaseClient.tsx';
import { Button } from '../UI/Button';
import { MapPin, Mail, Send, Loader2, Check } from 'lucide-react';

export const ContactFormSection: React.FC = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: 'Genel Bilgi',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    
    try {
      const { error } = await supabase
        .from('contact_messages')
        .insert([formState]);

      if (error) throw error;
      setStatus('success');
      setFormState({ name: '', email: '', subject: 'Genel Bilgi', message: '' });
    } catch (error) {
      console.error('Error submitting contact form', error);
      setStatus('error');
    }
  };

  return (
    <section className="py-20 bg-brand-dark relative">
      <div className="container mx-auto px-8 md:px-16 lg:px-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* Left Column: Info */}
          <div className="space-y-12 animate-fade-in-up [animation-delay:0.4s]">
            
            {/* Contact Blocks */}
            <div className="space-y-8">
              <div className="group flex items-start gap-6 p-6 border border-white/5 rounded-2xl hover:bg-white/5 transition-colors duration-300">
                <div className="w-12 h-12 bg-brand-yellow/10 rounded-full flex items-center justify-center text-brand-yellow group-hover:scale-110 transition-transform">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Merkez</h3>
                  <p className="text-white/60 leading-relaxed">
                    Sadık Şendil Sk No: 25, <br/>
                    Bomonti, İstanbul <br/>
                    Türkiye
                  </p>
                </div>
              </div>

              <div className="group flex items-start gap-6 p-6 border border-white/5 rounded-2xl hover:bg-white/5 transition-colors duration-300">
                <div className="w-12 h-12 bg-brand-yellow/10 rounded-full flex items-center justify-center text-brand-yellow group-hover:scale-110 transition-transform">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Direkt Bağlantı</h3>
                  <p className="text-white/60 mb-1">merhaba@signofpeople.com</p>
                  <p className="text-white/60">kurumsal@signofpeople.com</p>
                </div>
              </div>
            </div>

            {/* Interactive Map Placeholder */}
             <div className="w-full h-64 rounded-2xl overflow-hidden relative group grayscale hover:grayscale-0 transition-all duration-500">
               {/* Embed Map Iframe */}
               <iframe 
                 /* REPLACE THE SRC BELOW WITH YOUR GOOGLE MAPS EMBED LINK */
                 src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4173.614753827378!2d28.98203299093132!3d41.05665173880228!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cab71065a39eb9%3A0x88d8b8a8c749727!2zQm9tb250aSwgTWVya2V6LCAzNDM4MSDFnmnFn2xpL8Swc3RhbmJ1bA!5e0!3m2!1sen!2str!4v1764070285230!5m2!1sen!2str" 
                 width="100%" 
                 height="100%" 
                 style={{border:0}} 
                 allowFullScreen 
                 loading="lazy" 
                 referrerPolicy="no-referrer-when-downgrade"
                 className="w-full h-full"
                 title="Google Maps Location"
               ></iframe>

              
               {/* Overlay with Link Button */}
               <div className="absolute inset-0 bg-black/50 group-hover:bg-transparent transition-colors flex items-center justify-center group-hover:pointer-events-none">
                 <a 
                   /* REPLACE THE HREF BELOW WITH YOUR GOOGLE MAPS LINK */
                   href="https://maps.app.goo.gl/9TkjnXALACgq6TNL9" 
                   target="_blank" 
                   rel="noopener noreferrer"
                   className="pointer-events-auto"
                 >
                    <Button variant="outline" className="backdrop-blur-md">Haritada Gör</Button>
                 </a>
               </div>
            </div>

          </div>

          {/* Right Column: Form */}
          <div className="bg-white/5 p-8 md:p-12 rounded-3xl border border-white/10 backdrop-blur-sm animate-fade-in-up [animation-delay:0.6s]">
            <h2 className="text-3xl font-bold text-white mb-8">Sinyal Gönder</h2>
            
            {status === 'success' ? (
              <div className="py-20 text-center">
                 <div className="w-16 h-16 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                   <Check className="w-8 h-8" />
                 </div>
                 <h3 className="text-2xl font-bold text-white mb-2">Mesaj İletildi</h3>
                 <p className="text-white/50">En kısa sürede dönüş yapacağız.</p>
                 <button 
                   onClick={() => setStatus('idle')}
                   className="mt-6 text-brand-yellow underline"
                 >
                   Yeni Mesaj Gönder
                 </button>
              </div>
            ) : (
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-white/50 uppercase tracking-wider">İsim Soyisim</label>
                    <input 
                      required
                      type="text" 
                      name="name"
                      value={formState.name}
                      onChange={handleChange}
                      className="w-full bg-black/30 border-b-2 border-white/10 px-4 py-3 text-white focus:outline-none focus:border-brand-yellow transition-colors rounded-t-lg"
                      placeholder="Bize adın lazım"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-white/50 uppercase tracking-wider">E-posta Adresi</label>
                    <input 
                      required
                      type="email" 
                      name="email"
                      value={formState.email}
                      onChange={handleChange}
                      className="w-full bg-black/30 border-b-2 border-white/10 px-4 py-3 text-white focus:outline-none focus:border-brand-yellow transition-colors rounded-t-lg"
                      placeholder="eposta@adresin.com"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-white/50 uppercase tracking-wider">Konu</label>
                  <select 
                    name="subject"
                    value={formState.subject}
                    onChange={handleChange}
                    className="w-full bg-black/30 border-b-2 border-white/10 px-4 py-3 text-white focus:outline-none focus:border-brand-yellow transition-colors rounded-t-lg appearance-none"
                  >
                    <option className="bg-black" value="Genel Bilgi">Genel Bilgi</option>
                    <option className="bg-black" value="Etkinlik Ortaklığı">Etkinlik Ortaklığı</option>
                    <option className="bg-black" value="Basın & Medya">Basın & Medya</option>
                    <option className="bg-black" value="Sorun Bildir">Sorun Bildir</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-white/50 uppercase tracking-wider">Mesajın</label>
                  <textarea 
                    required
                    name="message"
                    value={formState.message}
                    onChange={handleChange}
                    rows={4}
                    className="w-full bg-black/30 border-b-2 border-white/10 px-4 py-3 text-white focus:outline-none focus:border-brand-yellow transition-colors rounded-t-lg resize-none"
                    placeholder="Aklındakileri bize anlat..."
                  ></textarea>
                </div>

                <div className="pt-4">
                  <Button 
                    disabled={status === 'submitting'}
                    type="submit" 
                    className="w-full justify-center py-4 text-base"
                  >
                    {status === 'submitting' ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4 mr-2" />}
                    {status === 'submitting' ? 'İletiliyor...' : 'Mesajı İlet'}
                  </Button>
                </div>
                {status === 'error' && (
                  <p className="text-red-500 text-sm text-center">Bir hata oluştu. Lütfen tekrar dene.</p>
                )}
              </form>
            )}
          </div>

        </div>
      </div>
    </section>
  );
};