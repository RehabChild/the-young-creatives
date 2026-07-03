export interface Testimonial {
  name: string;
  company: string;
  quote: string;
  rating: number;
}

export const testimonials: Testimonial[] = [
  {
    name: 'Efua Mensah',
    company: 'Kori Goods',
    quote:
      'They turned a shoebox of product photos into a store that actually converts. Our mobile checkout completion rate nearly doubled after launch.',
    rating: 5,
  },
  {
    name: 'Dr. Samuel Tetteh',
    company: 'Lumen Dental Clinic',
    quote:
      'Patients tell us the booking form is the easiest part of visiting us. The team explained every decision in plain language, no jargon.',
    rating: 5,
  },
  {
    name: 'Yaw Darko',
    company: 'Brightpath Academy',
    quote:
      'Parents used to call the office for basic info. Now it\u2019s all on the site, and admissions enquiries are up since we relaunched.',
    rating: 5,
  },
  {
    name: 'Abena Frimpong',
    company: 'Hearth & Ember',
    quote:
      'Fast, communicative, and genuinely good taste. The site looks like our restaurant feels, which is harder to pull off than it sounds.',
    rating: 4,
  },
];
