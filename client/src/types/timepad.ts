export interface TimePadEvent {
  id: number;
  name: {
    text: string;
  };
  description: {
    text: string;
    html: string;
  };
  starts_at: string;
  ends_at: string;
  location: {
    country: string;
    city: string;
    address: string;
  };
  poster_image: {
    default_url: string;
  };
  organization: {
    name: string;
    logo_image: {
      default_url: string;
    }
  };
  registration_data: {
    price_min: number;
    price_max: number;
    tickets_limit: number;
  };
  categories: Array<{
    id: number;
    name: string;
  }>;
  url: string;
} 