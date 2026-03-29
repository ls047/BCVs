export type TeamMember = {
  slug: string;
  name: string;
  /** PDF filename as stored in public/BitXeroCV/ */
  pdfFileName: string;
  role?: string;
  /** Short intro shown on the downloadable QR card */
  bio?: string;
};

/** URL path to the PDF (handles spaces and special characters in filenames). */
export function getTeamPdfHref(fileName: string): string {
  return `/BitXeroCV/${encodeURIComponent(fileName)}`;
}

export const teamMembers: TeamMember[] = [
  {
    slug: 'abdelqader',
    name: 'Abdelqader',
    role: 'Backend Developer',
    bio: 'Builds reliable APIs and server-side systems for BitXero products.',
    pdfFileName: 'AbdelqaderBackendDeveloper.pdf',
  },
  {
    slug: 'abdulghani-khalid',
    name: 'Abdulghani Khalid',
    bio: 'Delivers end-to-end solutions with a focus on quality and maintainability.',
    pdfFileName: 'Abdulghani Khalid CV 2025 (4).pdf',
  },
  {
    slug: 'ali-khalil',
    name: 'Ali Khalil',
    bio: 'Contributes across the stack with attention to performance and UX.',
    pdfFileName: 'Ali-Khalil.pdf',
  },
  {
    slug: 'biscuit',
    name: 'Biscuit',
    bio: 'Creative portfolio work spanning design and technical execution.',
    pdfFileName: "Biscuit's portfolio.pdf",
  },
  {
    slug: 'hassan-hadi',
    name: 'Hassan Hadi',
    bio: 'Problem-solver who turns ideas into shipped features.',
    pdfFileName: 'CVHassan Hadi.pdf',
  },
  {
    slug: 'mohammed',
    name: 'Mohammed',
    bio: 'Team member supporting BitXero delivery and collaboration.',
    pdfFileName: 'Mohammed-Cv.pdf',
  },
  {
    slug: 'mustafa-jassem',
    name: 'Mustafa Jassem',
    bio: 'Focused on clear communication and solid engineering practices.',
    pdfFileName: 'Mustafa Jassem Hassan (1) (2).pdf',
  },
  {
    slug: 'mohammed-qasim',
    name: 'Mohammed Qasim',
    bio: 'Brings technical depth and ownership to every project.',
    pdfFileName: 'Mohammed_Qasim_CV_2.pdf',
  },
  {
    slug: 'mehdi-saadoun',
    name: 'Mehdi Saadoun',
    bio: 'Committed to building products users trust and teams rely on.',
    pdfFileName: 'Mehdi-Saadoun-CV.pdf',
  },
  {
    slug: 'samer',
    name: 'Samer',
    bio: 'Delivers value through thoughtful design and implementation.',
    pdfFileName: 'SamerCv.pdf',
  },
];

export function getMemberBySlug(slug: string): TeamMember | undefined {
  return teamMembers.find((m) => m.slug === slug);
}
