export type TeamMember = {
  slug: string;
  name: string;
  /** PDF filename as stored in public/BitXeroCV/ */
  pdfFileName: string;
  role?: string;
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
    pdfFileName: 'AbdelqaderBackendDeveloper.pdf',
  },
  {
    slug: 'abdulghani-khalid',
    name: 'Abdulghani Khalid',
    pdfFileName: 'Abdulghani Khalid CV 2025 (4).pdf',
  },
  {
    slug: 'ali-khalil',
    name: 'Ali Khalil',
    pdfFileName: 'Ali-Khalil.pdf',
  },
  {
    slug: 'biscuit',
    name: 'Biscuit',
    pdfFileName: "Biscuit's portfolio.pdf",
  },
  {
    slug: 'hassan-hadi',
    name: 'Hassan Hadi',
    pdfFileName: 'CVHassan Hadi.pdf',
  },
  {
    slug: 'mohammed',
    name: 'Mohammed',
    pdfFileName: 'Mohammed-Cv.pdf',
  },
  {
    slug: 'mustafa-jassem',
    name: 'Mustafa Jassem',
    pdfFileName: 'Mustafa Jassem Hassan (1) (2).pdf',
  },
  {
    slug: 'mohammed-qasim',
    name: 'Mohammed Qasim',
    pdfFileName: 'Mohammed_Qasim_CV_2.pdf',
  },
  {
    slug: 'samer',
    name: 'Samer',
    pdfFileName: 'SamerCv.pdf',
  },
];

export function getMemberBySlug(slug: string): TeamMember | undefined {
  return teamMembers.find((m) => m.slug === slug);
}
