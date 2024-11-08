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
    locales: ['en', 'ko'],
    defaultLocale: 'en'
  },
  reactStrictMode: true
}))
