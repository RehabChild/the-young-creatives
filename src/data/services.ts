export interface Service {
  id: string;
  index: string;
  name: string;
  summary: string;
  detail: string;
  deliverables: string[];
}

export const services: Service[] = [
  {
    id: 'business-websites',
    index: '01',
    name: 'Business Websites',
    summary: 'A credible home base that turns visitors into enquiries.',
    detail:
      'Multi-page sites for companies that need to explain what they do, prove they can be trusted, and make it easy to get in touch — built to load fast and read clearly on any device.',
    deliverables: ['Custom page structure', 'CMS for easy edits', 'Contact & lead capture', 'SEO fundamentals'],
  },
  {
    id: 'ecommerce-websites',
    index: '02',
    name: 'E-commerce Websites',
    summary: 'Storefronts built to move product, not just display it.',
    detail:
      'Product catalogues, cart and checkout flows, and inventory-friendly admin tools, designed so browsing feels effortless on mobile where most shopping happens.',
    deliverables: ['Product & catalogue setup', 'Secure checkout', 'Order management', 'Payment integration'],
  },
  {
    id: 'portfolio-websites',
    index: '03',
    name: 'Portfolio Websites',
    summary: 'A gallery that lets the work speak first.',
    detail:
      'For designers, photographers, and studios — image-led layouts that stay out of the way of the work, with fast case-study pages and simple project uploads.',
    deliverables: ['Custom gallery layout', 'Case study templates', 'Image optimisation', 'Simple self-editing'],
  },
  {
    id: 'school-websites',
    index: '04',
    name: 'School Websites',
    summary: 'Clear information for parents, staff, and prospective students.',
    detail:
      'Structured, accessible sites covering admissions, calendars, staff directories, and announcements — built for non-technical staff to update on their own.',
    deliverables: ['Admissions & calendar pages', 'News & announcements', 'Staff directory', 'Accessibility checks'],
  },
  {
    id: 'restaurant-websites',
    index: '05',
    name: 'Restaurant Websites',
    summary: 'Menu, mood, and a table booked in three taps.',
    detail:
      'Sites built around the menu and the room — photography-forward pages, opening hours, location, and reservation or ordering links front and centre.',
    deliverables: ['Digital menu pages', 'Reservation links', 'Location & hours', 'Photo-led design'],
  },
  {
    id: 'landing-pages',
    index: '06',
    name: 'Landing Pages',
    summary: 'One page, one job, built to convert.',
    detail:
      'Focused single-page builds for launches, campaigns, or lead generation — fast to ship, easy to test, and stripped of anything that distracts from the call to action.',
    deliverables: ['Conversion-focused copy support', 'A/B-ready layout', 'Fast turnaround', 'Analytics setup'],
  },
  {
    id: 'website-redesign',
    index: '07',
    name: 'Website Redesign',
    summary: 'Keep what works, rebuild what doesn\u2019t.',
    detail:
      'An audit of your current site followed by a rebuild that modernises the design, improves speed, and carries your content and rankings across cleanly.',
    deliverables: ['Site & content audit', 'Modern rebuild', 'Redirect mapping', 'Performance upgrade'],
  },
  {
    id: 'website-maintenance',
    index: '08',
    name: 'Website Maintenance',
    summary: 'Your site, kept fast, secure, and current.',
    detail:
      'Ongoing updates, backups, security patches, and small content changes, so the site keeps working quietly in the background while you run the business.',
    deliverables: ['Regular backups', 'Security patching', 'Uptime monitoring', 'Monthly content updates'],
  },
  {
    id: 'ui-ux-design',
    index: '09',
    name: 'UI & UX Design',
    summary: 'The plan before a single line of code.',
    detail:
      'Wireframes and high-fidelity Figma designs that map out how people move through your product, tested for clarity before development ever begins.',
    deliverables: ['User flow mapping', 'Wireframes', 'High-fidelity Figma files', 'Design system handoff'],
  },
];
