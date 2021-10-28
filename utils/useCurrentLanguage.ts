import { useRouter, NextRouter } from 'next/router';

export const defaultLanguageCode = 'zh';
export const supportedLanguages = {
  en: {
    key: 'en',
    name: 'English',
    flag: '/images/flags/us.svg',
    pathname: '/en',
  },
  zh: {
    key: 'zh',
    name: '中文',
    flag: '/images/flags/cn.svg',
    pathname: '/',
  },
};

export const useCurrentLanguage = (router?: NextRouter) => {
  if (!router) router = useRouter();

  const currentLanguage =
    supportedLanguages[router.pathname.split('/')[1]] ||
    supportedLanguages[defaultLanguageCode];

  let setCurrentLanguage = (key) => {
    if (currentLanguage.key === key) return;

    let pathname = router.pathname;
    if (
      currentLanguage.key !== defaultLanguageCode &&
      key === defaultLanguageCode
    ) {
      pathname = router.pathname.replace(`/${currentLanguage.key}`, '');
    } else if (
      currentLanguage.key !== defaultLanguageCode &&
      currentLanguage.key !== key
    ) {
      pathname = router.pathname.replace(`/${currentLanguage.key}`, `/${key}`);
    } else {
      pathname = `/${key}${router.pathname}`;
    }

    router.push(pathname);
    return null;
  };

  return { currentLanguage, setCurrentLanguage };
};
