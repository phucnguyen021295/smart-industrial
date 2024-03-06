import * as React from "react"
import { SVGProps, memo } from "react"
const SvgComponent = (props: SVGProps<SVGSVGElement>) => {
    const { color = "#828282" } = props;
    return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          width="1em"
          height="1em"
          viewBox="0 0 24 24"
          {...props}
        >
          <path fill="url(#a)" d="M0 0h24v24H0z" />
          <defs>
            <pattern
              id="a"
              width={1}
              height={1}
              patternContentUnits="objectBoundingBox"
            >
              <use xlinkHref="#b" transform="scale(.01042)" />
            </pattern>
            <image
              xlinkHref="data:image/png;base64,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"
              id="b"
              width={96}
              height={96}
            />
          </defs>
        </svg>
    )
}
const Memo = memo(SvgComponent)
export default Memo
