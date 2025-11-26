import React, { useState, useEffect } from 'react';
import { supabase } from '../../SupabaseClient';
import { X, Check, Loader2, AlertCircle } from 'lucide-react';
import { Button } from '../UI/Button';
import { TurnstileWidget } from '../UI/TurnstileWidget';

interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  eventName: string;
  eventId?: string;
}

export const RegistrationModal: React.FC<RegistrationModalProps> = ({ isOpen, onClose, eventName, eventId }) => {
  const [isClosing, setIsClosing] = useState(false);
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  
  // Form State
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: ''
  });

  // Reset state when opening
  useEffect(() => {
    if (isOpen) {
      setIsClosing(false);
      setStatus('idle');
      setCaptchaToken(null);
      setFormData({ firstName: '', lastName: '', email: '', phone: '', message: '' });
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
        return;
    }

    setStatus('submitting');
    
    try {
      const registrationData = {
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        message: formData.message,
        event_id: eventId,
        event_name: eventName
      };

      const { error } = await supabase
        .from('registrations')
        .insert([registrationData]);

      if (error) throw error;
      
      setStatus('success');
    } catch (error: any) {
      console.error('Registration error:', error);
      setStatus('error');
      setErrorMessage(error.message || 'Bir şeyler ters gitti.');
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
          <h3 className="text-xl font-bold text-white">Yerini Ayırt</h3>
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
              <div className="w-20 h-20 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Check className="w-10 h-10" />
              </div>
              <h4 className="text-2xl font-black text-white mb-2">LİSTEDESİN.</h4>
              <p className="text-white/60 mb-8">
                Biletin ve gizli konum koordinatları için e-postanı kontrol et.
              </p>
              <Button onClick={handleClose} className="w-full justify-center">Tamam</Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="bg-brand-yellow/10 border border-brand-yellow/20 rounded-lg p-3 mb-6">
                <p className="text-xs text-brand-yellow uppercase font-bold tracking-wider">Etkinlik</p>
                <p className="text-white font-medium truncate">{eventName}</p>
              </div>

              {status === 'error' && (
                <div className="bg-red-500/10 border border-red-500/20 p-3 rounded-lg flex items-center gap-2 text-red-500 text-sm">
                  <AlertCircle className="w-4 h-4" />
                  {errorMessage}
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
                <label className="text-[10px] font-bold text-white/40 uppercase tracking-wider">Mesaj (Opsiyonel)</label>
                <textarea 
                  rows={2}
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-brand-yellow focus:outline-none transition-colors resize-none"
                ></textarea>
              </div>

              <div className="pt-4">
                <TurnstileWidget onVerify={(token) => setCaptchaToken(token)} />

                <Button 
                  disabled={status === 'submitting' || !captchaToken}
                  type="submit" 
                  className={`w-full justify-center py-4 text-base ${!captchaToken ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {status === 'submitting' ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    'Kaydı Tamamla'
                  )}
                </Button>
                <p className="text-[10px] text-white/30 text-center mt-3">
                  Yukarıya tıklayarak Hizmet Şartlarımızı kabul etmiş olursun.
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};