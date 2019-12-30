module.exports = options => {
  return {
    plugins: [
      {
        resolve: `gatsby-theme-blog-core`,
        options,
      },
      `gatsby-plugin-react-helmet`,
      `gatsby-plugin-twitter`,
      `gatsby-plugin-emotion`,
      `gatsby-plugin-theme-ui`,
      {
        resolve: `gatsby-plugin-disqus`,
        options: {
          shortname: `garoyeri-dev`,
        },
      },
    ],
  }
}
