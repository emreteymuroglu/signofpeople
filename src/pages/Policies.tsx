
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Shield, FileText, Cookie, Lock, ChevronRight } from 'lucide-react';
import { Newsletter } from '../components/Home/Newsletter';
import { SEO } from '../components/SEO/SEO';

type PolicyTab = 'terms' | 'privacy' | 'cookies' | 'kvkk';

export const Policies: React.FC = () => {
  const [activeTab, setActiveTab] = useState<PolicyTab>('terms');
  const location = useLocation();
  const navigate = useNavigate();

  // Sync state with URL query params
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tab = params.get('tab') as PolicyTab;
    if (tab && ['terms', 'privacy', 'cookies', 'kvkk'].includes(tab)) {
      setActiveTab(tab);
    }
    window.scrollTo(0, 0);
  }, [location]);

  const handleTabChange = (tab: PolicyTab) => {
    setActiveTab(tab);
    navigate(`/policies?tab=${tab}`, { replace: true });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const menuItems = [
    { id: 'terms', label: 'Kullanım Koşulları', icon: FileText },
    { id: 'privacy', label: 'Gizlilik Politikası', icon: Lock },
    { id: 'cookies', label: 'Çerez Politikası', icon: Cookie },
    { id: 'kvkk', label: 'KVKK Aydınlatma Metni', icon: Shield },
  ];

  return (
    <div className="min-h-screen bg-brand-dark pt-20">
    <SEO 
        title="Sözleşme & Politikalar"
        description="Sign of People Kullanım Koşulları, Gizlilik Politikası, Çerez Politikası ve KVKK aydınlatma metni. Şeffaflık standartımızdır."
        keywords="kullanım koşulları, gizlilik politikası, kvkk, çerez politikası, yasal uyarı"
    />
      {/* Hero Header */}
      <section className="relative pt-20 pb-12 overflow-hidden border-b border-white/10">
         <div className="absolute top-0 left-0 w-full h-full z-0 opacity-20">
            <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-brand-yellow blur-[150px] rounded-full"></div>
         </div>
         <div className="container mx-auto px-8 md:px-16 lg:px-24 relative z-10">
            <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-4 animate-slide-up">
               SÖZLEŞME & <span className="text-brand-yellow">POLİTİKALAR</span>
            </h1>
            <p className="text-white/50 text-xl max-w-2xl font-light">
               Sign of People ekosisteminin işleyiş prensipleri, haklarınız ve sorumluluklarımız. Şeffaflık bizim için bir seçenek değil, standarttır.
            </p>
         </div>
      </section>

      <div className="container mx-auto px-4 md:px-16 lg:px-24 py-16">
        <div className="flex flex-col lg:flex-row gap-12 xl:gap-24">
          
          {/* Sticky Sidebar Navigation */}
          <aside className="lg:w-1/4">
            <div className="sticky top-32 space-y-2">
              <p className="text-xs font-bold text-white/30 uppercase tracking-widest mb-4 px-4 hidden lg:block">İçindekiler</p>
              
              {/* Mobile Scrollable Menu */}
              <div className="flex lg:flex-col overflow-x-auto lg:overflow-visible gap-2 pb-4 lg:pb-0 scrollbar-hide">
                {menuItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleTabChange(item.id as PolicyTab)}
                      className={`flex items-center gap-3 px-6 py-4 rounded-xl transition-all duration-300 whitespace-nowrap lg:whitespace-normal group text-left border ${
                        isActive 
                          ? 'bg-brand-yellow text-black border-brand-yellow shadow-[0_0_20px_rgba(250,204,21,0.2)]' 
                          : 'bg-white/5 text-white/60 border-transparent hover:bg-white/10 hover:text-white'
                      }`}
                    >
                      <Icon className={`w-5 h-5 ${isActive ? 'text-black' : 'text-white/40 group-hover:text-white'}`} />
                      <span className="font-bold text-sm">{item.label}</span>
                      {isActive && <ChevronRight className="w-4 h-4 ml-auto hidden lg:block animate-fade-in-slow" />}
                    </button>
                  );
                })}
              </div>
            </div>
          </aside>

          {/* Main Content Area */}
          <main className="lg:w-3/4 min-h-[600px]">
             <div className="animate-fade-in-up">
                
                {activeTab === 'terms' && (
                  <div className="space-y-8 text-white/80 font-light leading-relaxed">
                    <div className="border-b border-white/10 pb-6 mb-8">
                       <h2 className="text-3xl font-bold text-white mb-2">Kullanım Koşulları</h2>
                       <p className="text-sm text-brand-yellow">Son Güncelleme: 25 Kasım 2025</p>
                    </div>
                    
                    <div className="prose prose-invert max-w-none">
                      <p>
                        Sign of People ("Platform") web sitesine ve hizmetlerine hoş geldiniz. Bu platformu kullanarak, aşağıda belirtilen şartları kabul etmiş sayılırsınız.
                      </p>

                      <h3 className="text-xl font-bold text-white mt-8 mb-4">1. Hizmetin Tanımı</h3>
                      <p>
                        Sign of People, kullanıcıların etkinlikleri keşfetmesini, bilet satın almasını ve sosyal etkileşimde bulunmasını sağlayan dijital bir platformdur. Platform, etkinlik organizatörleri ile katılımcıları bir araya getiren bir aracı konumundadır.
                      </p>

                      <h3 className="text-xl font-bold text-white mt-8 mb-4">2. Üyelik ve Hesap Güvenliği</h3>
                      <ul className="list-disc list-inside space-y-2 ml-4">
                        <li>Platforma üye olurken verdiğiniz bilgilerin doğruluğunu taahhüt edersiniz.</li>
                        <li>Hesap güvenliğinizden siz sorumlusunuz. Şifrenizi üçüncü kişilerle paylaşmamalısınız.</li>
                        <li>Platform, şüpheli gördüğü hesapları askıya alma veya silme hakkını saklı tutar.</li>
                      </ul>

                      <h3 className="text-xl font-bold text-white mt-8 mb-4">3. Etkinlik Katılımı ve Biletler</h3>
                      <p>
                        Satın alınan veya rezervasyon yapılan biletler, aksi belirtilmedikçe kişiye özeldir. Etkinlik iptali durumunda iade prosedürleri organizatörün belirlediği kurallar çerçevesinde ve Sign of People güvencesiyle yürütülür. Mücbir sebepler dışında bilet iadesi, etkinlikten en geç 48 saat önce talep edilebilir.
                      </p>

                      <h3 className="text-xl font-bold text-white mt-8 mb-4">4. Fikri Mülkiyet</h3>
                      <p>
                        Web sitesindeki tüm tasarımlar, metinler, grafikler ve yazılımlar Sign of People'ın mülkiyetindedir. İzinsiz kopyalanması ve ticari amaçla kullanılması yasaktır.
                      </p>

                       <h3 className="text-xl font-bold text-white mt-8 mb-4">5. Davranış Kuralları</h3>
                      <p>
                        Sign of People etkinliklerinde ve dijital platformlarında nefret söylemi, taciz, ayrımcılık ve şiddet içeren davranışlara sıfır tolerans gösterilir. Bu tür davranışlarda bulunan kullanıcıların platforma erişimi kalıcı olarak engellenir.
                      </p>
                    </div>
                  </div>
                )}

                {activeTab === 'privacy' && (
                  <div className="space-y-8 text-white/80 font-light leading-relaxed">
                    <div className="border-b border-white/10 pb-6 mb-8">
                       <h2 className="text-3xl font-bold text-white mb-2">Gizlilik Politikası</h2>
                       <p className="text-sm text-brand-yellow">Verileriniz bizimle güvende.</p>
                    </div>

                    <p>
                      Sign of People olarak gizliliğinize büyük önem veriyoruz. Bu politika, kişisel verilerinizin nasıl toplandığını, kullanıldığını ve korunduğunu açıklar.
                    </p>

                    <div className="bg-white/5 border border-white/10 p-6 rounded-2xl my-8">
                      <h4 className="text-brand-yellow font-bold mb-2">Özet</h4>
                      <p className="text-sm">
                        Verilerinizi asla üçüncü taraflara satmıyoruz. Topladığımız verileri sadece deneyiminizi iyileştirmek, biletleme işlemlerini gerçekleştirmek ve size özel etkinlik önerileri sunmak için kullanıyoruz.
                      </p>
                    </div>

                    <h3 className="text-xl font-bold text-white mt-8 mb-4">Toplanan Bilgiler</h3>
                    <p>
                      Hizmetlerimizi kullandığınızda aşağıdaki bilgileri toplayabiliriz:
                    </p>
                    <ul className="grid gap-4 mt-4">
                      <li className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-brand-yellow mt-2"></div>
                        <span><strong>Kimlik Bilgileri:</strong> Ad, soyad, doğum tarihi.</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-brand-yellow mt-2"></div>
                        <span><strong>İletişim Bilgileri:</strong> E-posta adresi, telefon numarası.</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-brand-yellow mt-2"></div>
                        <span><strong>İşlem Bilgileri:</strong> Bilet satın alma geçmişi, favori etkinlikler.</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-brand-yellow mt-2"></div>
                        <span><strong>Teknik Veriler:</strong> IP adresi, cihaz bilgisi, tarayıcı türü.</span>
                      </li>
                    </ul>

                    <h3 className="text-xl font-bold text-white mt-8 mb-4">Veri Güvenliği</h3>
                    <p>
                      Verileriniz, endüstri standardı şifreleme yöntemleri (SSL/TLS) ile korunmaktadır. Veri tabanlarımız yüksek güvenlikli sunucularda barındırılmakta ve düzenli olarak güvenlik denetimlerinden geçmektedir.
                    </p>
                  </div>
                )}

                {activeTab === 'cookies' && (
                  <div className="space-y-8 text-white/80 font-light leading-relaxed">
                    <div className="border-b border-white/10 pb-6 mb-8">
                       <h2 className="text-3xl font-bold text-white mb-2">Çerez Politikası</h2>
                    </div>

                    <p>
                      Deneyiminizi kişiselleştirmek ve hizmetlerimizi geliştirmek için çerezler (cookies) kullanıyoruz. Sitemizi kullanarak çerez kullanımını kabul etmiş olursunuz.
                    </p>

                    <div className="grid md:grid-cols-2 gap-6 mt-8">
                      <div className="bg-brand-gray p-6 rounded-2xl border border-white/5 hover:border-brand-yellow/30 transition-colors">
                        <h4 className="text-lg font-bold text-white mb-3">Zorunlu Çerezler</h4>
                        <p className="text-sm text-white/60">
                          Web sitesinin temel işlevleri (oturum açma, sepet işlemleri) için gereklidir. Bu çerezler kapatılamaz.
                        </p>
                      </div>
                      <div className="bg-brand-gray p-6 rounded-2xl border border-white/5 hover:border-brand-yellow/30 transition-colors">
                        <h4 className="text-lg font-bold text-white mb-3">Analitik Çerezler</h4>
                        <p className="text-sm text-white/60">
                          Sitemizi nasıl kullandığınızı analiz ederek performansı artırmamıza yardımcı olur. Veriler anonim olarak toplanır.
                        </p>
                      </div>
                      <div className="bg-brand-gray p-6 rounded-2xl border border-white/5 hover:border-brand-yellow/30 transition-colors">
                        <h4 className="text-lg font-bold text-white mb-3">Pazarlama Çerezleri</h4>
                        <p className="text-sm text-white/60">
                          İlgi alanlarınıza uygun etkinlikleri size göstermek için kullanılır.
                        </p>
                      </div>
                    </div>

                    <h3 className="text-xl font-bold text-white mt-8 mb-4">Çerezleri Yönetme</h3>
                    <p>
                      Tarayıcı ayarlarınızdan dilediğiniz zaman çerezleri engelleyebilir veya silebilirsiniz. Ancak, zorunlu çerezleri engellemek sitenin bazı bölümlerinin çalışmamasına neden olabilir.
                    </p>
                  </div>
                )}

                {activeTab === 'kvkk' && (
                  <div className="space-y-8 text-white/80 font-light leading-relaxed">
                     <div className="border-b border-white/10 pb-6 mb-8">
                       <h2 className="text-3xl font-bold text-white mb-2">KVKK Aydınlatma Metni</h2>
                       <p className="text-sm text-brand-yellow">Kişisel Verilerin Korunması Kanunu</p>
                    </div>
                    
                    <p>
                      Sign of People olarak, 6698 sayılı Kişisel Verilerin Korunması Kanunu ("KVKK") uyarınca kişisel verilerinizin güvenliği hususuna azami hassasiyet göstermekteyiz. Veri Sorumlusu sıfatıyla, kişisel verilerinizi aşağıda izah edildiği surette ve mevzuat tarafından emredilen sınırlar çerçevesinde işlemekteyiz.
                    </p>

                    <h3 className="text-xl font-bold text-white mt-8 mb-4">1. Kişisel Verilerin İşlenme Amacı</h3>
                    <p>
                      Kişisel verileriniz; Platform üyelik işlemlerinin gerçekleştirilmesi, etkinlik biletlerinin oluşturulması, müşteri hizmetleri faaliyetlerinin yürütülmesi, pazarlama analiz çalışmalarının yapılması ve yasal yükümlülüklerin yerine getirilmesi amaçlarıyla işlenmektedir.
                    </p>

                    <h3 className="text-xl font-bold text-white mt-8 mb-4">2. Kişisel Veri Toplamanın Yöntemi ve Hukuki Sebebi</h3>
                    <p>
                      Kişisel verileriniz, web sitemiz, mobil uygulamamız, e-posta, çağrı merkezi ve sosyal medya kanalları aracılığıyla elektronik ortamda toplanmaktadır. Bu veriler, KVKK Madde 5'te belirtilen "sözleşmenin kurulması veya ifası", "hukuki yükümlülüğün yerine getirilmesi" ve "ilgili kişinin temel hak ve özgürlüklerine zarar vermemek kaydıyla veri sorumlusunun meşru menfaatleri için veri işlenmesinin zorunlu olması" hukuki sebeplerine dayanarak toplanmaktadır.
                    </p>

                    <h3 className="text-xl font-bold text-white mt-8 mb-4">3. İlgili Kişinin Hakları</h3>
                    <p className="mb-4">
                      KVKK'nın 11. maddesi uyarınca veri sahipleri olarak aşağıdaki haklara sahipsiniz:
                    </p>
                    <ul className="list-disc list-inside space-y-2 ml-4 mb-8">
                      <li>Kişisel verilerinizin işlenip işlenmediğini öğrenme,</li>
                      <li>İşlenmişse buna ilişkin bilgi talep etme,</li>
                      <li>İşlenme amacını ve amacına uygun kullanılıp kullanılmadığını öğrenme,</li>
                      <li>Yurt içinde veya yurt dışında aktarıldığı 3. kişileri bilme,</li>
                      <li>Eksik veya yanlış işlenmişse düzeltilmesini isteme,</li>
                      <li>KVKK'da öngörülen şartlar çerçevesinde silinmesini veya yok edilmesini isteme.</li>
                    </ul>

                    <p className="bg-white/5 p-6 rounded-lg border-l-4 border-brand-yellow">
                      <strong>Başvuru:</strong> Yukarıda belirtilen haklarınızı kullanmak için talebinizi yazılı olarak veya kayıtlı elektronik posta (KEP) adresi, güvenli elektronik imza, mobil imza ya da tarafınızca daha önce bildirilen ve sistemimizde kayıtlı bulunan elektronik posta adresini kullanmak suretiyle <span className="text-brand-yellow">merhaba@signofpeople.com</span> adresine iletebilirsiniz.
                    </p>
                  </div>
                )}
             </div>
          </main>
        </div>
      </div>

      <div className="border-t border-white/10 mt-20">
         <Newsletter />
      </div>
    </div>
  );
};
