interface TimePadEvent {
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

export const fetchTimePadEvents = async () => {
  try {
    const response = await fetch('https://api.timepad.ru/v1/events?limit=50&sort=+starts_at', {
      headers: {
        'Authorization': 'Bearer OPQJC3ZIRSGY44OTGII5'
      }
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch events');
    }

    const data = await response.json();
    return data.values as TimePadEvent[];
  } catch (error) {
    console.error('Error fetching TimePad events:', error);
    return [];
  }
}; 