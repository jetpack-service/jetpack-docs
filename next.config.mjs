import bundleAnalyzer from '@next/bundle-analyzer'
import nextra from 'nextra'

const withNextra = nextra({
  theme: 'nextra-theme-docs',
  themeConfig: './theme.config.tsx',
  defaultShowCopyCode: true,
  latex: true,
  search: {
    codeblocks: false
  }
})

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true'
})

export default withBundleAnalyzer(withNextra({
  i18n: {
    locales: ['en', 'ko', 'af', 'ak', 'sq', 'am', 'ar', 'hy', 'az', 'eu', 'be',
      'bn', 'bi', 'bs', 'br', 'bg', 'my', 'ca', 'ny', 'zh-Hans', 'zh-Hant',
      'hr', 'cs', 'da', 'fa-AF', 'dv', 'nl', 'eo', 'et', 'ee', 'fil', 'fi',
      'fr', 'gl', 'ka', 'de', 'ki', 'el', 'gu', 'ha', 'he', 'hi', 'hu', 'ig',
      'id', 'it', 'ja', 'kn', 'kk', 'km', 'ku', 'ky', 'lv', 'lt', 'lb', 'mk',
      'mai', 'ms', 'ml', 'mr', 'mn', 'ne', 'pcm', 'no', 'or', 'ps', 'fa', 'pl',
      'pt', 'pt-BR', 'pa', 'ro', 'ru', 'sat', 'sr-Latn', 'sn', 'si', 'sk', 'sl',
      'so', 'es', 'sw', 'sv', 'tl', 'tg', 'ta', 'te', 'th', 'ti', 'tr', 'tk',
      'uk', 'ur-IN', 'ur-PK', 'uz', 'vi', 'yo', 'zu'],
    defaultLocale: 'en'
  },
  reactStrictMode: true
}))
