module.exports = {
  siteMetadata: {
    title: `garoyeri.dev`,
    author: `Garo Yeriazarian`,
    description: `Software Whisperer who finds better ways to solve software problems with people and people problems with software.`,
    social: [
      {
        name: `Twitter`,
        url: `https://twitter.com/garoyeri`
      },
      {
        name: `GitHub`,
        url: `https://github.com/garoyeri`
      },
      {
        name: `LinkedIn`,
        url: `https://linkedin.com/in/garoyeri`
      }
    ]
  },
  plugins: [
    {
      resolve: `gatsby-garoyeri-dev-theme`,
      options: {},
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `garoyeri.dev`,
        short_name: `garoyeri`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#FFF`,
        display: `standalone`,
        icon: `content/assets/icon.png`,
        icon_options: {
          purpose: `maskable`,
        },
      },
    },
  ],
}
