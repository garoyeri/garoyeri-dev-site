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
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        trackingId: 'UA-8105620-2',
        // Defines where to place the tracking script - `true` in the head and `false` in the body
        head: false,
        // Setting this parameter is optional
        anonymize: false,
        // Setting this parameter is also optional
        respectDNT: true,
        // Avoids sending pageview hits from custom paths
        // exclude: ['/preview/**', '/do-not-track/me/too/'],
        // Delays sending pageview hits on route update (in milliseconds)
        pageTransitionDelay: 0,
        // Enables Google Optimize using your container Id
        // optimizeId: 'YOUR_GOOGLE_OPTIMIZE_TRACKING_ID',
        // Enables Google Optimize Experiment ID
        // experimentId: 'YOUR_GOOGLE_EXPERIMENT_ID',
        // Set Variation ID. 0 for original 1,2,3....
        // variationId: 'YOUR_GOOGLE_OPTIMIZE_VARIATION_ID',
        // Any additional optional fields
        sampleRate: 100,
        siteSpeedSampleRate: 10,
        cookieDomain: 'garoyeri.dev',
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
