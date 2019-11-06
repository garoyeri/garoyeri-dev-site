/** @jsx jsx */
import { useStaticQuery, graphql, Link } from "gatsby"
import Image from "gatsby-image"
import { jsx, css, Flex } from "theme-ui"

const Bio = () => {
  const data = useStaticQuery(bioQuery)
  const {
    site: {
      siteMetadata: { author },
    },
    avatar,
  } = data

  return (
    <Flex as={Link} css={css({ alignItems: `center`, textDecoration: `none` })}
      to='/about'>
      {avatar ? (
        <Image
          fixed={avatar.childImageSharp.fixed}
          alt={author}
          css={css({
            mr: 2,
            mb: 0,
            width: 48,
            borderRadius: 99999,
          })}
        />
      ) : (
        <div
          css={css({
            mr: 2,
            mb: 0,
            width: 48,
            borderRadius: 99999,
          })}
          role="presentation"
        />
      )}
      <div sx={{
        color: `white`
      }}>
        {author}
        <br />
        Software Whisperer
      </div>
    </Flex>
  )
}

const bioQuery = graphql`
  query BioQuery {
    site {
      siteMetadata {
        author
      }
    }
    avatar: file(absolutePath: { regex: "/avatar.(jpeg|jpg|gif|png)/" }) {
      childImageSharp {
        fixed(width: 48, height: 48) {
          ...GatsbyImageSharpFixed
        }
      }
    }
  }
`

export default Bio
