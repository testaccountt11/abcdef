export interface HHVacancy {
  id: string;
  name: string;
  employer: {
    name: string;
    logo_urls?: {
      original?: string;
      90?: string;
    }
  };
  area: {
    name: string;
  };
  salary?: {
    from?: number;
    to?: number;
    currency?: string;
  };
  snippet: {
    requirement?: string;
    responsibility?: string;
  };
  schedule?: {
    id: string;
    name: string;
  };
  experience?: {
    id: string;
    name: string;
  };
  key_skills?: {
    name: string;
  }[];
  published_at: string;
  alternate_url: string;
  description?: string;
  professional_roles?: {
    name: string;
  }[];
  employment?: {
    id: string;
    name: string;
  };
  address?: {
    city?: string;
    street?: string;
    building?: string;
    lat?: number;
    lng?: number;
  };
  working_days?: {
    id: string;
    name: string;
  }[];
  working_time_intervals?: {
    id: string;
    name: string;
  }[];
  working_time_modes?: {
    id: string;
    name: string;
  }[];
}

export interface HHSearchResponse {
  items: HHVacancy[];
  found: number;
  pages: number;
  per_page: number;
  page: number;
}

export interface HHArea {
  id: string;
  name: string;
  parent_id?: string;
  areas?: HHArea[];
}

export interface HHIndustry {
  id: string;
  name: string;
  industries?: HHIndustry[];
}

export interface HHDictionaries {
  experience: Array<{ id: string; name: string }>;
  schedule: Array<{ id: string; name: string }>;
  employment: Array<{ id: string; name: string }>;
  order_type: Array<{ id: string; name: string }>;
  education_level: Array<{ id: string; name: string }>;
  currency: Array<{ code: string; abbr: string; name: string }>;
  working_days: Array<{ id: string; name: string }>;
  working_time_intervals: Array<{ id: string; name: string }>;
  working_time_modes: Array<{ id: string; name: string }>;
}

export interface HHResume {
  id: string;
  title: string;
  url: string;
  alternate_url: string;
  created_at: string;
  updated_at: string;
  first_name: string;
  last_name: string;
  middle_name?: string;
  age: number;
  area: {
    id: string;
    name: string;
  };
  salary?: {
    amount: number;
    currency: string;
  };
  photo?: {
    small: string;
    medium: string;
    large: string;
  };
  total_experience: number;
  skills: string[];
  education: {
    level: string;
    primary: Array<{
      name: string;
      year: number;
    }>;
  };
  experience: Array<{
    company: string;
    position: string;
    start: string;
    end?: string;
    description?: string;
  }>;
  language: Array<{
    name: string;
    level: string;
  }>;
} 