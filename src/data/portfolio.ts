export interface Project {
  id: string;
  name: string;
  category: string;
  description: string;
  tech: string[];
  color: string;
}

export const projects: Project[] = [
  {
    id: 'kori-goods',
    name: 'Kori Goods',
    category: 'E-commerce',
    description: 'A ceramics studio\u2019s online store, built for browsing on a phone with one hand.',
    tech: ['React', 'Tailwind CSS', 'Stripe', 'Node.js'],
    color: '#2F4BFF',
  },
  {
    id: 'lumen-clinic',
    name: 'Lumen Dental Clinic',
    category: 'Business',
    description: 'A calm, trustworthy site for a dental practice, with online appointment requests.',
    tech: ['React', 'TypeScript', 'Tailwind CSS'],
    color: '#1C2DB3',
  },
  {
    id: 'atelier-mora',
    name: 'Atelier Mora',
    category: 'Portfolio',
    description: 'A photography studio\u2019s image-first portfolio with fast-loading full-bleed galleries.',
    tech: ['React', 'Framer Motion', 'Cloudinary'],
    color: '#10184D',
  },
  {
    id: 'brightpath-academy',
    name: 'Brightpath Academy',
    category: 'School',
    description: 'An admissions-focused site for a growing school, with a self-service news section.',
    tech: ['React', 'Node.js', 'PostgreSQL'],
    color: '#2439E6',
  },
  {
    id: 'hearth-kitchen',
    name: 'Hearth & Ember',
    category: 'Restaurant',
    description: 'A warm, photo-led site for a neighbourhood restaurant, with a reservation link built in.',
    tech: ['React', 'Tailwind CSS', 'Framer Motion'],
    color: '#8AA3FF',
  },
  {
    id: 'northbeam',
    name: 'Northbeam Consulting',
    category: 'Landing Page',
    description: 'A single-page launch site for a consulting firm\u2019s new advisory offering.',
    tech: ['React', 'TypeScript', 'Tailwind CSS'],
    color: '#2F4BFF',
  },
];
