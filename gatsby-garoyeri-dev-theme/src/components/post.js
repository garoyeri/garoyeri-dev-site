import React from "react"
import { Styled, css } from "theme-ui"

import PostFooter from "../components/post-footer"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { MDXRenderer } from "gatsby-plugin-mdx"
import { Disqus } from "gatsby-plugin-disqus"

const Post = ({
  data: {
    post,
    site: {
      siteMetadata: { title, siteUrl },
    },
  },
  location,
  previous,
  next,
}) => {
  let disqusConfig = {
    url: `${siteUrl + location.pathname}`,
    identifier: post.id,
    title: post.title,
  }
  return (
    <Layout location={location} title={title}>
      <SEO title={post.title} description={post.excerpt} />
      <main>
        <Styled.h1>{post.title}</Styled.h1>
        <Styled.p
          css={css({
            fontSize: 1,
            mt: -3,
            mb: 3,
          })}
        >
          {post.date}
        </Styled.p>
        <MDXRenderer>{post.body}</MDXRenderer>
      </main>
      <PostFooter {...{ previous, next }} />
      <Disqus config={disqusConfig} />
    </Layout>
  )
}

export default Post
