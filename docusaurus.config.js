// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const {themes} = require('prism-react-renderer');
const lightTheme = themes.github;
const darkTheme = themes.dracula;

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'garoyeri.dev',
  tagline: 'Garo Yeriazarian, Software Whisperer',
  url: 'https://garoyeri.dev',
  baseUrl: '/',
  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'garoyeri', // Usually your GitHub org/user name.
  projectName: 'garoyeri-dev-site', // Usually your repo name.

  presets: [
    [
      '@docusaurus/preset-classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: false,
        blog: {
          showReadingTime: true,
          routeBasePath: '/',
          path: './blog',
          blogSidebarCount: 15,
          // Please change this to your repo.
          editUrl:
            'https://github.com/garoyeri/garoyeri-dev-site/edit/main/website/blog/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
        gtag: {
          trackingID: 'G-7MP5SQJPWM',
          anonymizeIP: true,
        }
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: 'garoyeri.dev',
        logo: {
          alt: 'GaroYeri Logo',
          src: 'img/avatar.png',
        },
        items: [
          {to: '/', label: 'Blog', position: 'left'},
          {to: '/about', label: 'About Me', position: 'left'},
          {
            href: 'https://github.com/garoyeri',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Social',
            items: [
              {
                label: 'LinkedIn',
                href: 'https://linkedin.com/in/garoyeri',
              },
              {
                label: 'Twitter',
                href: 'https://twitter.com/garoyeri',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'GitHub',
                href: 'https://github.com/garoyeri',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Garo Yeriazarian. Built with Docusaurus.`,
      },
      prism: {
        theme: lightTheme,
        darkTheme: darkTheme,
      },
    }),
};

module.exports = config;
