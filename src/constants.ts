
import { type Event, EventCategory, type TeamMember } from './types';

export const MOCK_EVENTS: Event[] = [
  {
    id: '1',
    title: 'Neon Teras Caz Gecesi',
    date: '24 EKİM • 20:00',
    location: 'Skyline Lounge, Beyoğlu',
    category: EventCategory.Music,
    imageUrl: 'https://picsum.photos/800/600?random=1',
    price: '750₺',
    attendees: 142,
    description: "Şehrin ışıkları altında, saksafon ve kontrbasın büyüleyici uyumuyla dolu bir geceye hazır olun. Neon Teras, caz severleri modern bir ambiansta buluşturuyor. Özel kokteyller ve eşsiz bir manzara eşliğinde, ritmin ruhunuzu ele geçirmesine izin verin.",
    lineup: [
      { id: 101, name: 'Selin Demir', role: 'Saksafon', image_url: 'https://picsum.photos/200/200?random=101' },
      { id: 102, name: 'Bora Akın', role: 'Kontrbas', image_url: 'https://picsum.photos/200/200?random=102' }
    ]
  },
  {
    id: '2',
    title: 'Soyut Sanat & Şarap',
    date: '26 EKİM • 18:00',
    location: 'Void Galeri, Karaköy',
    category: EventCategory.Art,
    imageUrl: 'https://picsum.photos/800/600?random=2',
    price: 'Ücretsiz',
    attendees: 89,
    description: "Sanatın soyut formlarını keşfederken, seçkin şarapların tadına bakacağınız interaktif bir sergi deneyimi. Sanatçılarla birebir tanışma fırsatı ve eserlerin hikayelerini kendi ağızlarından dinleme şansı.",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Void+Galeri,+Karaköy",
    lineup: [
      { id: 103, name: 'Mert Kaya', role: 'Küratör', image_url: 'https://picsum.photos/200/200?random=103' }
    ]
  },
  {
    id: '3',
    title: 'Geleceğin Teknolojileri Zirvesi',
    date: '02 KASIM • 09:00',
    location: 'İnovasyon Merkezi, Maslak',
    category: EventCategory.Tech,
    imageUrl: 'https://picsum.photos/800/600?random=3',
    price: '1500₺',
    attendees: 450,
    description: "Yapay zeka, blockchain ve sürdürülebilir teknolojilerin dünyayı nasıl şekillendireceğini tartışıyoruz. Sektörün öncü isimleri ve vizyoner girişimcilerle dolu bir gün.",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=İnovasyon+Merkezi,+Maslak",
    lineup: []
  },
  {
    id: '4',
    title: 'Yeraltı Tekno',
    date: '05 KASIM • 23:00',
    location: 'Sektör 7 Depo, Bomonti',
    category: EventCategory.Music,
    imageUrl: 'https://picsum.photos/800/600?random=4',
    price: '400₺',
    attendees: 820,
    description: "Karanlık, endüstriyel ve yüksek BPM. Bomonti'nin eski depolarından birinde, sabahın ilk ışıklarına kadar sürecek bir tekno ayini.",
    lineup: []
  },
  {
    id: '5',
    title: 'Dijital Göçebe Buluşması',
    date: '10 KASIM • 14:00',
    location: 'Kolektif House, Levent',
    category: EventCategory.Social,
    imageUrl: 'https://picsum.photos/800/600?random=5',
    price: 'Ücretsiz',
    attendees: 65,
    description: "Dünyayı ofisi yapanlar bir araya geliyor. Deneyim paylaşımı, networking ve yeni rotalar üzerine keyifli bir sohbet.",
    lineup: []
  },
  {
    id: '6',
    title: 'Seramik Masterclass',
    date: '12 KASIM • 10:00',
    location: 'Çamur Atölyesi, Moda',
    category: EventCategory.Workshop,
    imageUrl: 'https://picsum.photos/800/600?random=6',
    price: '1200₺',
    attendees: 12,
    description: "Kendi ellerinizle şekil verin. Seramik sanatının inceliklerini öğreneceğiniz, meditatif ve yaratıcı bir atölye çalışması.",
    lineup: []
  },
  {
    id: '7',
    title: 'Retro Arcade Gecesi',
    date: '15 KASIM • 19:00',
    location: 'BitBar, Kadıköy',
    category: EventCategory.Social,
    imageUrl: 'https://picsum.photos/800/600?random=7',
    price: '250₺',
    attendees: 210
  },
  {
    id: '8',
    title: 'Yapay Zeka & Etik Paneli',
    date: '18 KASIM • 13:00',
    location: 'Salt Galata, Karaköy',
    category: EventCategory.Tech,
    imageUrl: 'https://picsum.photos/800/600?random=8',
    price: 'Ücretsiz',
    attendees: 300
  },
  {
    id: '9',
    title: 'Sokak Fotoğrafçılığı Yürüyüşü',
    date: '20 KASIM • 08:00',
    location: 'Balat Meydanı',
    category: EventCategory.Art,
    imageUrl: 'https://picsum.photos/800/600?random=9',
    price: '300₺',
    attendees: 45
  },
  {
    id: '10',
    title: 'Indie Rock Vitrini',
    date: '22 KASIM • 21:00',
    location: 'Karga Bar, Kadıköy',
    category: EventCategory.Music,
    imageUrl: 'https://picsum.photos/800/600?random=13',
    price: '350₺',
    attendees: 180
  }
];

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: 1,
    name: 'Büşra Adsız',
    role: 'Kurucu Beyin',
    image: 'https://picsum.photos/400/500?random=10',
    bio: 'Sahnenin emektarlarından. Fiziksel bağ kurmanın gücüne inanıyor.',
    linkedin: 'https://www.linkedin.com/in/b%C3%BC%C5%9Fradsiz13/',
    instagram: 'https://www.instagram.com/busra.adsizz/'
  },
  {
    id: 2,
    name: 'Emre Teymuroğlu',
    role: "IT'ci",
    image: 'https://picsum.photos/400/500?random=11',
    bio: 'Teknik tarafın mimarı. Yapay zeka beynini ele geçirdi.',
    linkedin: 'https://www.linkedin.com/in/emre-teymuroglu-1b2633221/',
    instagram: 'https://www.instagram.com/teymurogluemre/'
  },
  {
    id: 3,
    name: 'Emir Uysal',
    role: 'İşin Uzmanı',
    image: 'https://picsum.photos/400/500?random=12',
    bio: 'Etkinlik yapımcısı. Eğer bir şey "havalıysa", Emir onu altı ay önceden biliyordu.',
    linkedin: 'https://www.linkedin.com/in/emir-uysal-8a9874233/',
    instagram: 'https://www.instagram.com/emrruysall/'
  }
];

export const NAV_LINKS = [
  { name: 'Ana Sayfa', href: '/' },
  { name: 'Etkinlikler', href: '/events' },
  { name: 'Hakkımızda', href: '/about' },
  { name: 'İletişim', href: '/contact' },
];