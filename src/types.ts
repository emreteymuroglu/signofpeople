
export const EventCategory = {
  Music: 'Müzik',
  Art: 'Sanat',
  Tech: 'Teknoloji',
  Social: 'Sosyal',
  Workshop: 'Atölye'
} as const;

// We keep this for fallbacks, but primary usage is now dynamic strings
export type EventCategory = string;

export interface Person {
  id: string | number;
  name: string;
  role: string;
  image_url?: string;
  bio?: string;
}

export interface Event {
  id: string;
  title: string;
  date: string;
  location: string;
  category: string;
  imageUrl: string;
  price: string;
  attendees: number;
  description?: string;
  lineup?: Person[];
  mapUrl?: string;
}

export interface TeamMember {
  id: number;
  name: string;
  role: string;
  image: string;
  bio: string;
  linkedin?: string;
  instagram?: string;
}