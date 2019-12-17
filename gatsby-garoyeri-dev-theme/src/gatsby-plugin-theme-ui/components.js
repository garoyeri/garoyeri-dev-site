/** @jsx jsx */
import { jsx } from "theme-ui"
import { preToCodeBlock } from "mdx-utils"
import PrismCodeBlock from "@theme-ui/prism"
import PrismCore from "prismjs/components/prism-core"
import "prismjs/components/prism-clike"
import "prismjs/components/prism-csharp"
import "prismjs/components/prism-powershell"
import "prismjs/components/prism-javascript"
import "prismjs/components/prism-markup"
import "prismjs/components/prism-jsx"
import "prismjs/components/prism-yaml"

import headings from "../components/headings"

const CodeBlock = preProps => {
  const props = preToCodeBlock(preProps)

  if (props) {
    const { codeString, ...restProps } = props

    return (
      <div sx={{ mb: 2 }}>
        <PrismCodeBlock {...restProps} Prism={PrismCore}>{codeString}</PrismCodeBlock>
      </div>
    )
  } else {
    return <pre {...preProps} />
  }
}

export default {
  pre: CodeBlock,
  ...headings,
}
