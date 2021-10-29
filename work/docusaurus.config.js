// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'garoyeri.dev',
  tagline: 'Garo Yeriazarian, Software Whisperer',
  url: 'https://garoyeri.dev',
  baseUrl: '/',
  onBrokenLinks: 'throw',
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
          // Please change this to your repo.
          editUrl:
            'https://github.com/garoyeri/garoyeri-dev-site/edit/main/website/blog/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: 'My Site',
        logo: {
          alt: 'My Site Logo',
          src: 'img/logo.svg',
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
                label: 'Blog',
                to: '/blog',
              },
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
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
