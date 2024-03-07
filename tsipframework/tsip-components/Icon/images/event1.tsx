import { memo, SVGProps } from "react";

function Icon(props: SVGProps<SVGSVGElement>) {
  const { color = "#00C6EF", ...otherProps } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="none"
      viewBox="0 0 24 24"
      {...otherProps}
    >
      <path
        fill={color}
        fillRule="evenodd"
        d="M6.5 17.5v-2.25h.75v1.5h9v-1.5H17v2.25H6.5zm5.119-2.906a1.691 1.691 0 01-1.898.997 1.691 1.691 0 01-1.215-2.31 1.68 1.68 0 012.452-.769l1.055-1.053a1.699 1.699 0 11.528.529l-1.053 1.053c.05.077.093.157.13.24.176.42.176.893 0 1.313zm1.819-4.969a.937.937 0 100 1.875.937.937 0 000-1.875zM6.5 9.25V7H17v2.25h-.75v-1.5h-9v1.5H6.5z"
        clipRule="evenodd"
      ></path>
    </svg>
  );
}

export default memo(Icon);
