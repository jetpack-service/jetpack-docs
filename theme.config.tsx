import {DocsThemeConfig, useConfig} from 'nextra-theme-docs';
import {useRouter} from "next/router";
import Image from 'next/image'

const themeConfig: DocsThemeConfig = {
  chat: {
    link: 'https://discord.com/invite/7jGcytKgpP',
  },
  darkMode: true,
  docsRepositoryBase: 'https://github.com/jetpack-service/jetpack-docs',
  logo: (<>
    <Image src="/images/jetpack_logo.svg" alt="JetPack Log" width={50} height={50} className="dark:hidden"/>
    <Image src="/images/jetpack_logo_dark.svg" alt="JetPack Log" width={50} height={50} className="hidden dark:block"/>
    <span style={{
      marginLeft: '1em',
      fontWeight: 800,
    }}>JetPack Service</span>
  </>),
  head: function useHead() {
    const config = useConfig<{ description?: string; image?: string }>()
    const {locale} = useRouter()
    const description = config.frontMatter.description || 'Comprehensive documentation for the JetPack Service, covering JetPack Tokens, the ecosystem, and all related services. Explore detailed guides, API references, and development resources to effectively utilize JetPack\'s offerings.'
    const title = `${config.title} | JetPack Service (${locale || 'en'})`
    return (<>
      <title>{title}</title>
      <meta property="og:title" content={title}/>
      <meta name="description" content={description}/>
      <meta property="og:description" content={description}/>
    </>)
  },
  footer: {
    content: (<span>
          Copyright © {new Date().getFullYear()} JetPack Service. All rights reserved.
      </span>)
  },
  i18n: [
    { locale: 'en', name: 'English', direction: 'ltr' },
    { locale: 'zh-Hans', name: '简体中文', direction: 'ltr' },
    { locale: 'hi', name: 'हिन्दी', direction: 'ltr' },
    { locale: 'es', name: 'Español', direction: 'ltr' },
    { locale: 'fr', name: 'Français', direction: 'ltr' },
    { locale: 'ar', name: 'العربية', direction: 'rtl' },
    { locale: 'bn', name: 'বাংলা', direction: 'ltr' },
    { locale: 'ru', name: 'Русский', direction: 'ltr' },
    { locale: 'pt', name: 'Português', direction: 'ltr' },
    { locale: 'ur-IN', name: 'اردو (بھارت)', direction: 'rtl' },
    { locale: 'id', name: 'Bahasa Indonesia', direction: 'ltr' },
    { locale: 'de', name: 'Deutsch', direction: 'ltr' },
    { locale: 'ja', name: '日本語', direction: 'ltr' },
    { locale: 'pcm', name: 'Naijá', direction: 'ltr' },
    { locale: 'mr', name: 'मराठी', direction: 'ltr' },
    // Other languages follow in the order of less usage
    { locale: 'ko', name: '한국어', direction: 'ltr' },
    { locale: 'af', name: 'Afrikaans', direction: 'ltr' },
    { locale: 'ak', name: 'Twi', direction: 'ltr' },
    { locale: 'sq', name: 'Shqip', direction: 'ltr' },
    { locale: 'am', name: 'አማርኛ', direction: 'ltr' },
    { locale: 'hy', name: 'Հայերեն', direction: 'ltr' },
    { locale: 'az', name: 'Azərbaycanca', direction: 'ltr' },
    { locale: 'eu', name: 'Euskara', direction: 'ltr' },
    { locale: 'be', name: 'Беларуская', direction: 'ltr' },
    { locale: 'bi', name: 'Bislama', direction: 'ltr' },
    { locale: 'bs', name: 'Bosanski', direction: 'ltr' },
    { locale: 'br', name: 'Brezhoneg', direction: 'ltr' },
    { locale: 'bg', name: 'Български', direction: 'ltr' },
    { locale: 'my', name: 'မြန်မာစာ', direction: 'ltr' },
    { locale: 'ca', name: 'Català', direction: 'ltr' },
    { locale: 'ny', name: 'Chichewa', direction: 'ltr' },
    { locale: 'zh-Hant', name: '繁體中文', direction: 'ltr' },
    { locale: 'hr', name: 'Hrvatski', direction: 'ltr' },
    { locale: 'cs', name: 'Čeština', direction: 'ltr' },
    { locale: 'da', name: 'Dansk', direction: 'ltr' },
    { locale: 'fa-AF', name: 'دری', direction: 'rtl' },
    { locale: 'dv', name: 'ދިވެހިބަސް', direction: 'rtl' },
    { locale: 'nl', name: 'Nederlands', direction: 'ltr' },
    { locale: 'eo', name: 'Esperanto', direction: 'ltr' },
    { locale: 'et', name: 'Eesti', direction: 'ltr' },
    { locale: 'ee', name: 'Eʋegbe', direction: 'ltr' },
    { locale: 'fil', name: 'Filipino', direction: 'ltr' },
    { locale: 'fi', name: 'Suomi', direction: 'ltr' },
    { locale: 'gl', name: 'Galego', direction: 'ltr' },
    { locale: 'ka', name: 'ქართული', direction: 'ltr' },
    { locale: 'ki', name: 'Taetae ni Kiribati', direction: 'ltr' },
    { locale: 'el', name: 'Ελληνικά', direction: 'ltr' },
    { locale: 'gu', name: 'ગુજરાતી', direction: 'ltr' },
    { locale: 'ha', name: 'Hausa', direction: 'ltr' },
    { locale: 'he', name: 'עברית', direction: 'rtl' },
    { locale: 'hu', name: 'Magyar', direction: 'ltr' },
    { locale: 'ig', name: 'Igbo', direction: 'ltr' },
    { locale: 'it', name: 'Italiano', direction: 'ltr' },
    { locale: 'kn', name: 'ಕನ್ನಡ', direction: 'ltr' },
    { locale: 'kk', name: 'Қазақша', direction: 'ltr' },
    { locale: 'km', name: 'ខ្មែរ', direction: 'ltr' },
    { locale: 'ku', name: 'Kurdî', direction: 'rtl' },
    { locale: 'ky', name: 'Кыргызча', direction: 'ltr' },
    { locale: 'lv', name: 'Latviešu', direction: 'ltr' },
    { locale: 'lt', name: 'Lietuvių', direction: 'ltr' },
    { locale: 'lb', name: 'Lëtzebuergesch', direction: 'ltr' },
    { locale: 'mk', name: 'Македонски', direction: 'ltr' },
    { locale: 'mai', name: 'मैथिली', direction: 'ltr' },
    { locale: 'ms', name: 'Bahasa Melayu', direction: 'ltr' },
    { locale: 'ml', name: 'മലയാളം', direction: 'ltr' },
    { locale: 'mn', name: 'Монгол', direction: 'ltr' },
    { locale: 'ne', name: 'नेपाली', direction: 'ltr' },
    { locale: 'no', name: 'Norsk', direction: 'ltr' },
    { locale: 'or', name: 'ଓଡ଼ିଆ', direction: 'ltr' },
    { locale: 'ps', name: 'پښتو', direction: 'rtl' },
    { locale: 'pl', name: 'Polski', direction: 'ltr' },
    { locale: 'ro', name: 'Română', direction: 'ltr' },
    { locale: 'sat', name: 'ᱥᱟᱱᱛᱟᱲᱤ', direction: 'ltr' },
    { locale: 'sr-Latn', name: 'Srpski (latinica)', direction: 'ltr' },
    { locale: 'sn', name: 'ChiShona', direction: 'ltr' },
    { locale: 'si', name: 'සිංහල', direction: 'ltr' },
    { locale: 'sk', name: 'Slovenčina', direction: 'ltr' },
    { locale: 'sl', name: 'Slovenščina', direction: 'ltr' },
    { locale: 'so', name: 'Soomaali', direction: 'ltr' },
    { locale: 'sw', name: 'Kiswahili', direction: 'ltr' },
    { locale: 'sv', name: 'Svenska', direction: 'ltr' },
    { locale: 'tl', name: 'Tagalog', direction: 'ltr' },
    { locale: 'tg', name: 'Тоҷикӣ', direction: 'ltr' },
    { locale: 'ta', name: 'தமிழ்', direction: 'ltr' },
    { locale: 'te', name: 'తెలుగు', direction: 'ltr' },
    { locale: 'th', name: 'ไทย', direction: 'ltr' },
    { locale: 'ti', name: 'ትግርኛ', direction: 'ltr' },
    { locale: 'tr', name: 'Türkçe', direction: 'ltr' },
    { locale: 'tk', name: 'Türkmençe', direction: 'ltr' },
    { locale: 'uk', name: 'Українська', direction: 'ltr' },
    { locale: 'uz', name: 'Oʻzbekcha', direction: 'ltr' },
    { locale: 'vi', name: 'Tiếng Việt', direction: 'ltr' },
    { locale: 'yo', name: 'Yorùbá', direction: 'ltr' },
    { locale: 'zu', name: 'isiZulu', direction: 'ltr' }
  ],
};

export default themeConfig;
