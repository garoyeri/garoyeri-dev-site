import React, { Fragment } from "react"
import { Styled, css } from "theme-ui"
import { useSiteMetadata } from "../hooks/use-site-metadata"

const Footer = ({ socialLinks }) => {
  const { author } = useSiteMetadata()

  return (
    <footer
      css={css({
        mt: 4,
        pt: 3,
      })}
    >
      © {new Date().getFullYear()} {author}
      {` `}&bull;{` `}
      {socialLinks.map((platform, i, arr) => (
        <Fragment key={platform.url}>
          <Styled.a
            href={platform.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            {platform.name}
          </Styled.a>
          {arr.length - 1 !== i && (
            <Fragment>
              {` `}&bull;{` `}
            </Fragment>
          )}
        </Fragment>
      ))}
    </footer>
  )
}
export default Footer
