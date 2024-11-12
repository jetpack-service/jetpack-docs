import bundleAnalyzer from '@next/bundle-analyzer'
import nextra from 'nextra'

const withNextra = nextra({
  theme: 'nextra-theme-docs',
  themeConfig: './theme.config.tsx',
  defaultShowCopyCode: true,
  latex: {
    renderer: 'katex'
  },
  search: {
    codeblocks: false
  }
})

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true'
})

export default withBundleAnalyzer(withNextra({
  output: 'export',
  images: {
    unoptimized: true // mandatory, otherwise won't export
  },
  i18n: {
    locales: [
      'en',
      'zh-Hans',
      'zh-Hant',
      'hi',
      'es',
      'fr',
      'ar',
      'ru',
      'pt',
      'id',
      'de',
      'ur-IN',
      'ja',
      'mr',
      'ko',
    ],
    defaultLocale: 'en'
  },
  reactStrictMode: true
}))
