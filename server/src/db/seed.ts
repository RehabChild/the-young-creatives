import bcrypt from 'bcryptjs';
import { pool } from './pool';

async function seed() {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    await client.query('DELETE FROM services');
    await client.query('DELETE FROM portfolio_projects');
    await client.query('DELETE FROM testimonials');
    await client.query('DELETE FROM admin_users');

    const services = [
      ['Business Websites', 'A credible home base that turns visitors into enquiries.', 'Multi-page sites for companies that need to explain what they do, prove they can be trusted, and make it easy to get in touch.', ['Custom page structure', 'CMS for easy edits', 'Contact & lead capture', 'SEO fundamentals']],
      ['E-commerce Websites', 'Storefronts built to move product, not just display it.', 'Product catalogues, cart and checkout flows, and inventory-friendly admin tools.', ['Product & catalogue setup', 'Secure checkout', 'Order management', 'Payment integration']],
      ['Portfolio Websites', 'A gallery that lets the work speak first.', 'Image-led layouts that stay out of the way of the work, with fast case-study pages.', ['Custom gallery layout', 'Case study templates', 'Image optimisation', 'Simple self-editing']],
      ['School Websites', 'Clear information for parents, staff, and prospective students.', 'Structured, accessible sites covering admissions, calendars, staff directories, and announcements.', ['Admissions & calendar pages', 'News & announcements', 'Staff directory', 'Accessibility checks']],
      ['Restaurant Websites', 'Menu, mood, and a table booked in three taps.', 'Sites built around the menu and the room, with photography-forward pages.', ['Digital menu pages', 'Reservation links', 'Location & hours', 'Photo-led design']],
      ['Landing Pages', 'One page, one job, built to convert.', 'Focused single-page builds for launches, campaigns, or lead generation.', ['Conversion-focused copy support', 'A/B-ready layout', 'Fast turnaround', 'Analytics setup']],
      ['Website Redesign', "Keep what works, rebuild what doesn't.", 'An audit of your current site followed by a rebuild that modernises design and speed.', ['Site & content audit', 'Modern rebuild', 'Redirect mapping', 'Performance upgrade']],
      ['Website Maintenance', 'Your site, kept fast, secure, and current.', 'Ongoing updates, backups, security patches, and small content changes.', ['Regular backups', 'Security patching', 'Uptime monitoring', 'Monthly content updates']],
      ['UI & UX Design', 'The plan before a single line of code.', 'Wireframes and high-fidelity Figma designs that map out the user journey.', ['User flow mapping', 'Wireframes', 'High-fidelity Figma files', 'Design system handoff']],
    ];
    for (const [i, [name, summary, detail, deliverables]] of services.entries()) {
      await client.query(
        `INSERT INTO services (sort_order, name, summary, detail, deliverables) VALUES ($1, $2, $3, $4, $5)`,
        [i, name, summary, detail, deliverables]
      );
    }

    const projects = [
      ['Kori Goods', 'E-commerce', "A ceramics studio's online store, built for browsing on a phone with one hand.", ['React', 'Tailwind CSS', 'Stripe', 'Node.js'], '#2F4BFF'],
      ['Lumen Dental Clinic', 'Business', 'A calm, trustworthy site for a dental practice, with online appointment requests.', ['React', 'TypeScript', 'Tailwind CSS'], '#1C2DB3'],
      ['Atelier Mora', 'Portfolio', "A photography studio's image-first portfolio with fast-loading galleries.", ['React', 'Framer Motion', 'Cloudinary'], '#10184D'],
      ['Brightpath Academy', 'School', 'An admissions-focused site for a growing school, with a self-service news section.', ['React', 'Node.js', 'PostgreSQL'], '#2439E6'],
      ['Hearth & Ember', 'Restaurant', 'A warm, photo-led site for a neighbourhood restaurant, with a reservation link built in.', ['React', 'Tailwind CSS', 'Framer Motion'], '#8AA3FF'],
      ['Northbeam Consulting', 'Landing Page', "A single-page launch site for a consulting firm's new advisory offering.", ['React', 'TypeScript', 'Tailwind CSS'], '#2F4BFF'],
    ];
    for (const [i, [name, category, description, tech, color]] of projects.entries()) {
      await client.query(
        `INSERT INTO portfolio_projects (name, category, description, tech, color, sort_order) VALUES ($1, $2, $3, $4, $5, $6)`,
        [name, category, description, tech, color, i]
      );
    }

    const testimonials = [
      ['Efua Mensah', 'Kori Goods', 'They turned a shoebox of product photos into a store that actually converts. Our mobile checkout completion rate nearly doubled after launch.', 5],
      ['Dr. Samuel Tetteh', 'Lumen Dental Clinic', 'Patients tell us the booking form is the easiest part of visiting us. The team explained every decision in plain language.', 5],
      ['Yaw Darko', 'Brightpath Academy', "Parents used to call the office for basic info. Now it's all on the site, and admissions enquiries are up since we relaunched.", 5],
      ['Abena Frimpong', 'Hearth & Ember', 'Fast, communicative, and genuinely good taste. The site looks like our restaurant feels.', 4],
    ];
    for (const [name, company, quote, rating] of testimonials) {
      await client.query(
        `INSERT INTO testimonials (name, company, quote, rating) VALUES ($1, $2, $3, $4)`,
        [name, company, quote, rating]
      );
    }

    const adminEmail = process.env.SEED_ADMIN_EMAIL || 'admin@theyoungcreatives.studio';
    const adminPassword = process.env.SEED_ADMIN_PASSWORD || 'ChangeMe123!';
    const passwordHash = await bcrypt.hash(adminPassword, 10);
    await client.query(
      `INSERT INTO admin_users (name, email, password_hash) VALUES ($1, $2, $3)`,
      ['Studio Admin', adminEmail, passwordHash]
    );

    await client.query('COMMIT');
    console.log('Seed complete.');
    console.log(`Admin login -> email: ${adminEmail}  password: ${adminPassword}`);
    console.log('Change this password after first login.');
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('Seed failed:', err);
    process.exitCode = 1;
  } finally {
    client.release();
    await pool.end();
  }
}

seed();
