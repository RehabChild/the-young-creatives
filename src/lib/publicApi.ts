const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';

export class PublicApiError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: { 'Content-Type': 'application/json', ...(options.headers as Record<string, string> | undefined) },
  });

  let body: unknown = null;
  try {
    body = await res.json();
  } catch {
    // no body
  }

  if (!res.ok) {
    const message =
      body && typeof body === 'object' && 'error' in body ? String((body as { error: unknown }).error) : res.statusText;
    throw new PublicApiError(message, res.status);
  }

  return body as T;
}

export interface ApiService {
  id: number;
  sort_order: number;
  name: string;
  summary: string;
  detail: string;
  deliverables: string[];
}

export interface ApiProject {
  id: number;
  name: string;
  category: string;
  description: string;
  tech: string[];
  color: string;
  image_url: string | null;
}

export interface ApiTestimonial {
  id: number;
  name: string;
  company: string;
  quote: string;
  rating: number;
}

export const publicApi = {
  getServices: () => request<{ services: ApiService[] }>('/services'),
  getPortfolio: (search?: string) =>
    request<{ projects: ApiProject[] }>(`/portfolio${search ? `?search=${encodeURIComponent(search)}` : ''}`),
  getTestimonials: () => request<{ testimonials: ApiTestimonial[] }>('/testimonials'),
  submitBooking: (data: {
    companyName: string;
    contactPerson: string;
    email: string;
    phone: string;
    serviceNeeded: string;
    projectDescription: string;
    budgetRange: string;
    preferredDate: string;
  }) => request('/bookings', { method: 'POST', body: JSON.stringify(data) }),
  submitContactMessage: (data: { name: string; email: string; message: string }) =>
    request('/contact', { method: 'POST', body: JSON.stringify(data) }),
};
