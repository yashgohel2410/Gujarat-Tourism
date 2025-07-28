export interface Destination {
  id: string;
  name: string;
  shortDescription: string;
  description: string;
  image: string;
  bannerImage?: string;
  videoUrl?: string;
  type: string[];
  category: string;
  priceRange: string;
  rating: number;
  location: string;
  attractions: Attraction[];
  culture: Culture;
  weather: Weather;
  tips: string[];
}

export interface Attraction {
  name: string;
  description: string;
  image?: string;
}

export interface Culture {
  description: string;
  highlights: string[];
}

export interface Weather {
  bestTimeToVisit: string;
  seasons: {
    summer: string;
    monsoon: string;
    winter: string;
  };
}

export interface Itinerary {
  id: string;
  title: string;
  description: string;
  coverImage: string;
  duration: number;
  destinations: string[];
  destinationId: string;
  days: ItineraryDay[];
  basePrice: number;
  addons: Addon[];
}

export interface ItineraryDay {
  day: number;
  title: string;
  activities: {
    time: string;
    activity: string;
    description: string;
  }[];
}

export interface Addon {
  id: string;
  name: string;
  description: string;
  price: number;
}

export interface Review {
  id: string;
  destinationId: string;
  name: string;
  date: string;
  rating: number;
  comment: string;
}

export interface EnquiryFormData {
  name: string;
  email: string;
  phone: string;
  destination: string;
  message: string;
}

export interface FilterOptions {
  destinationType: string[];
  priceRange: [number, number];
  experienceType: string[];
}