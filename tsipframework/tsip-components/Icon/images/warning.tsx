import { SVGProps, memo } from "react";

function Warning(props: SVGProps<SVGSVGElement>) {
  const { color = "#E71D36", ...otherProps } = props;
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
        d="M22.195 17.622l-8.247-14.25a2.25 2.25 0 00-3.895 0l-8.247 14.25a2.25 2.25 0 001.946 3.377h16.496a2.25 2.25 0 001.947-3.377zM11.249 9.75a.75.75 0 111.5 0v3.75a.75.75 0 11-1.5 0V9.75zM12 18a1.125 1.125 0 110-2.25A1.125 1.125 0 0112 18z"
      ></path>
    </svg>
  );
}

export default memo(Warning);
