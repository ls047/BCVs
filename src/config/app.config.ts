import type { AppConfig } from './types';

export const appConfig: AppConfig = {
  app: {
    name: 'BitXero Team',
    title: 'BitXero — Team CVs',
    description: 'Browse team member CVs and portfolios.',
    version: '1.0.0',
    author: 'Your Name',
    url: 'https://bitxero-iq.com',
    language: 'en',
  },

  theme: {
    /** Matches https://bitxero-iq.com/ (dark-first, green + gold accents) */
    defaultTheme: 'dark',
    light: {
      primary: '#26f184',
      secondary: '#efc818',
      accent: '#efc818',
      background: '#fafafa',
      surface: '#ffffff',
      text: '#0d0d0d',
      textSecondary: '#525252',
      border: '#e5e5e5',
      muted: '#f5f5f5',
      link: '#1a9e5c',
      linkHover: '#26f184',
      emphasis: '#26f184',
      success: '#26f184',
      warning: '#c9a010',
      error: '#dc2626',
      info: '#26f184',
    },
    dark: {
      primary: '#26f184',
      secondary: '#efc818',
      accent: '#efc818',
      background: '#0d0d0d',
      surface: '#1a1a1a',
      text: '#e5e5e5',
      textSecondary: '#a3a3a3',
      border: '#2a2a2a',
      muted: '#141414',
      link: '#26f184',
      linkHover: '#5af0a8',
      emphasis: '#26f184',
      success: '#26f184',
      warning: '#efc818',
      error: '#f87171',
      info: '#26f184',
    },
  },

  typography: {
    fonts: [
      {
        name: 'CODEINK',
        src: '/font/CODEINK.ttf',
        weight: 400,
        style: 'normal',
        display: 'swap',
        preload: true,
      },
      {
        name: 'MonaspaceArgonVar',
        src: '/font/MonaspaceArgonVar.ttf',
        weight: 400,
        style: 'normal',
        display: 'swap',
        preload: true,
      },
    ],
    primary: {
      family: 'CODEINK',
      fallbacks: ['ui-sans-serif', 'system-ui', 'sans-serif'],
      cssVariable: 'font-primary',
    },
    secondary: {
      family: 'MonaspaceArgonVar',
      fallbacks: ['ui-monospace', 'monospace'],
      cssVariable: 'font-secondary',
    },
    mono: {
      family: 'MonaspaceArgonVar',
      fallbacks: ['ui-monospace', 'monospace'],
      cssVariable: 'font-mono',
    },
    sizes: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
    },
    weights: {
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
  },

  icons: {
    favicon: '/vite.svg',
    sizes: ['192x192', '512x512'],
  },

  seo: {
    title: 'BitXero — Team CVs',
    description: 'Browse team member CVs and portfolios.',
    keywords: ['BitXero', 'team', 'CV', 'portfolio'],
    robots: 'index, follow',
    openGraph: {
      siteName: 'BitXero Team CVs',
      type: 'website',
      locale: 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
    },
  },

  layout: {
    containerMaxWidth: '1280px',
    spacing: {
      xs: '0.5rem',
      sm: '1rem',
      md: '1.5rem',
      lg: '2rem',
      xl: '3rem',
      '2xl': '4rem',
    },
  },
};
