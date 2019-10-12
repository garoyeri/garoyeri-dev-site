/** @jsx jsx */
import { Link } from "gatsby"
import { css, Styled, jsx } from "theme-ui"
import Bio from "../components/bio"

const rootPath = `${__PATH_PREFIX__}/`

const Title = ({ children, location }) => {
  return (
    <Styled.h1
      sx={{
        my: 0,
        fontSize: 4,
        color: `white`,
      }}
    >
      <Styled.a
        as={Link}
        css={{
          color: `inherit`,
          boxShadow: `none`,
          textDecoration: `none`,
        }}
        to={`/`}
      >
        {children}
      </Styled.a>
    </Styled.h1>
  )
}

export default ({ children, title, ...props }) => {
  return (
    <header
      sx={{
        backgroundColor: "primary"
      }}>
      <div
        css={css({
          maxWidth: `container`,
          mx: `auto`,
          px: 3,
          pt: 4,
        })}
      >
        <div
          css={css({
            display: `flex`,
            justifyContent: `space-between`,
            alignItems: `center`,
            pb: 4,
            mb: 4,
          })}
        >
          <Title {...props}>{title}</Title>
          {children}
          <Bio />
        </div>
        {/* {props.location.pathname === rootPath && <Bio />} */}
      </div>
    </header>
  )
}
