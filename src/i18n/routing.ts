import { createNavigation } from 'next-intl/navigation';
import { defineRouting } from 'next-intl/routing';

// Define routing for the application
export const routing = defineRouting({
  locales: ['en', 'ar'],
  defaultLocale: 'en',
  pathnames: {
    '/': '/',
    '/pathnames': {
      en: '/pathnames',
      ar: '/pfadnamen',
    },
    '/dashboard': {
      en: '/dashboard',
      ar: '/لوحة-المعلومات', // Add the Arabic route as needed
    },
  },
});

// Type definitions for pathnames and locales
export type Pathnames = keyof typeof routing.pathnames;
export type Locale = (typeof routing.locales)[number];

// Create navigation helpers
export const { Link, getPathname, redirect, usePathname, useRouter } =
  createNavigation(routing);
