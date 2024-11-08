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
  i18n: [{
    locale: 'en',
    name: 'English'
  }, {
    locale: 'ko',
    name: 'Korean'
  }],
};

export default themeConfig;
