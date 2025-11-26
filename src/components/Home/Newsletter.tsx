import React, { useState } from 'react';
import { supabase } from '../../SupabaseClient';
import { Button } from '../UI/Button';
import { Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { TurnstileWidget } from '../UI/TurnstileWidget';

export const Newsletter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    if (!captchaToken) {
       setErrorMessage("Lütfen robot olmadığınızı doğrulayın.");
       setStatus('error');
       return;
    }

    setStatus('submitting');
    setErrorMessage('');
    
    try {
      const { error } = await supabase
        .from('newsletters')
        .insert([{ email: email.trim() }]);
        
      if (error) {
        if (error.code === '23505') { // Unique violation code (duplicate email)
           setStatus('success'); // Treat duplicate as success from UX perspective
           return;
        }
        throw error;
      }
      
      setStatus('success');
      setEmail('');
    } catch (error: any) {
      console.error('Newsletter error:', error);
      setStatus('error');
      setErrorMessage(error.message || 'Bir hata oluştu. Lütfen tekrar dene.');
    }
  };

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background Graphic */}
      <div className="absolute inset-0 bg-brand-yellow">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, black 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>
      </div>

      <div className="container mx-auto px-8 md:px-16 lg:px-24 relative z-10">
        <div className="bg-black text-white rounded-3xl p-8 md:p-16 flex flex-col lg:flex-row items-center gap-12 shadow-2xl">
          <div className="lg:w-1/2">
            <h2 className="text-4xl md:text-5xl font-black mb-6">
              HİÇBİR ANI <br/> <span className="text-brand-yellow">KAÇIRMA.</span>
            </h2>
            <p className="text-white/60 text-lg">
              Yeraltı etkinlikleri, gizli buluşmalar ve topluluk hikayelerinin haftalık özetini doğrudan e-postana al.
            </p>
          </div>
          
          <div className="lg:w-1/2 w-full">
            {status === 'success' ? (
               <div className="flex items-center gap-4 bg-white/10 p-6 rounded-2xl border border-white/20 animate-fade-in-up">
                 <div className="w-12 h-12 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-6 h-6" />
                 </div>
                 <div>
                   <h4 className="font-bold text-white text-lg">Abone olundu!</h4>
                   <p className="text-white/60 text-sm">Gelişmelerden seni haberdar edeceğiz.</p>
                 </div>
               </div>
            ) : (
              <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                <div className="flex flex-col sm:flex-row gap-4 w-full">
                    <input 
                      type="email" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="eposta@adresin.com" 
                      className="flex-grow bg-white/10 border border-white/20 rounded-full px-6 py-4 text-white placeholder-white/40 focus:outline-none focus:border-brand-yellow focus:bg-white/5 transition-all"
                      required
                    />
                    <Button disabled={status === 'submitting'} type="submit" className="whitespace-nowrap min-w-[140px] hidden sm:flex">
                      {status === 'submitting' ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Abone Ol'}
                    </Button>
                </div>
                
                {/* Mobile Button - separate for layout */}
                <Button disabled={status === 'submitting'} type="submit" className="whitespace-nowrap w-full sm:hidden">
                    {status === 'submitting' ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Abone Ol'}
                </Button>

                <div className="mt-2">
                   <TurnstileWidget onVerify={(token) => setCaptchaToken(token)} />
                </div>

                <div className="text-xs text-white/30 min-h-[20px]">
                  {status === 'error' ? (
                    <span className="text-red-400 flex items-center gap-2 animate-pulse">
                      <AlertCircle className="w-3 h-3" />
                      {errorMessage}
                    </span>
                  ) : (
                    "Abone olarak Gizlilik Politikamızı kabul etmiş olursun. Asla spam yok."
                  )}
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};