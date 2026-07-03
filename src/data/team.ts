export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  initials: string;
}

export const team: TeamMember[] = [
  {
    name: 'Amara Boateng',
    role: 'Founder & Design Lead',
    bio: 'Leads every project\u2019s visual direction, from first wireframe to final polish. Trained in graphic design, obsessed with type and spacing.',
    initials: 'AB',
  },
  {
    name: 'Kwame Owusu',
    role: 'Lead Developer',
    bio: 'Builds the systems behind the sites — fast frontends, clean APIs, and dashboards that clients actually enjoy using.',
    initials: 'KO',
  },
  {
    name: 'Nadia Asante',
    role: 'Client & Project Manager',
    bio: 'Keeps every project on schedule and every client in the loop, from the first booking call to launch day.',
    initials: 'NA',
  },
];
