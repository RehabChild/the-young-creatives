export interface Booking {
  id: number;
  company_name: string;
  contact_person: string;
  email: string;
  phone: string;
  service_needed: string;
  project_description: string;
  budget_range: string;
  preferred_date: string;
  status: 'new' | 'contacted' | 'in_progress' | 'closed';
  created_at: string;
}

export interface ContactMessage {
  id: number;
  name: string;
  email: string;
  message: string;
  is_read: boolean;
  created_at: string;
}

export interface Service {
  id: number;
  sort_order: number;
  name: string;
  summary: string;
  detail: string;
  deliverables: string[];
  created_at: string;
}

export interface PortfolioProject {
  id: number;
  name: string;
  category: string;
  description: string;
  tech: string[];
  color: string;
  image_url: string | null;
  sort_order: number;
  created_at: string;
}

export interface Testimonial {
  id: number;
  name: string;
  company: string;
  quote: string;
  rating: number;
  is_published: boolean;
  created_at: string;
}
