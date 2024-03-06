import * as React from "react"
import { SVGProps, memo } from "react"
const SvgComponent = (props: SVGProps<SVGSVGElement>) => {
  const { color = "#828282" } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill={color}
        d="M12 10a2.02 2.02 0 0 0-1.111.332 1.98 1.98 0 0 0-.737.886 1.949 1.949 0 0 0 .434 2.15 2.026 2.026 0 0 0 2.18.428c.365-.15.677-.403.897-.727a1.953 1.953 0 0 0-.249-2.491A2.014 2.014 0 0 0 12 10Zm-7 0a2.02 2.02 0 0 0-1.111.332 1.98 1.98 0 0 0-.737.886 1.948 1.948 0 0 0 .434 2.15 2.026 2.026 0 0 0 2.18.428c.365-.15.677-.403.897-.727a1.954 1.954 0 0 0-.249-2.491A2.014 2.014 0 0 0 5 10Zm14 0a2.02 2.02 0 0 0-1.111.332 1.98 1.98 0 0 0-.737.886 1.949 1.949 0 0 0 .434 2.15 2.026 2.026 0 0 0 2.18.428c.365-.15.677-.403.897-.727a1.953 1.953 0 0 0-.249-2.491A2.014 2.014 0 0 0 19 10Z"
      />
    </svg>
  )
}
const Memo = memo(SvgComponent)
export default Memo