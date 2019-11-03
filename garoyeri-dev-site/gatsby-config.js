module.exports = {
  siteMetadata: {
    title: `garoyeri.dev`,
    author: `Garo Yeriazarian`,
    siteUrl: `https://garoyeri.dev`,
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
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allBlogPost } }) => {
              return allBlogPost.edges.map(edge => {
                return Object.assign({}, edge.node, {
                  description: edge.node.excerpt,
                  date: edge.node.date,
                  url: site.siteMetadata.siteUrl + edge.node.slug,
                  guid: site.siteMetadata.siteUrl + edge.node.slug,
                  custom_elements: [{ "content:encoded": edge.node.excerpt }],
                })
              })
            },
            query: `
              {
                allBlogPost(sort: {fields: date, order: DESC}) {
                  edges {
                    node {
                      date
                      excerpt
                      title
                      slug
                      body
                    }
                  }
                }
              }
            `,
            output: "/rss.xml",
            title: "garoyeri.dev Posts",
          }
        ]
      }
    }
  ],
}
