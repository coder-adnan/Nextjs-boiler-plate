import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';

// Define a type for the valid locales
type LocaleType = 'en' | 'ar';
export default getRequestConfig(async ({ requestLocale }) => {
  let locale: LocaleType | undefined = (await requestLocale) as
    | LocaleType
    | undefined;

  if (!locale || !routing.locales.includes(locale)) {
    locale = routing.defaultLocale as LocaleType;
  }

  return {
    locale,
    messages: (
      await (locale === 'en'
        ? import('../../messages/en.json')
        : import(`../../messages/${locale}.json`))
    ).default,
  };
});
