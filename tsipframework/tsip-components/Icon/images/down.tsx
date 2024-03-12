import {SVGProps, memo} from "react";

const SvgComponent = (props: SVGProps<SVGSVGElement>) => {
  const { color = "#7EDCFB", ...otherProps } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="12"
      height="12"
      fill="none"
      viewBox="0 0 12 12"
      {...otherProps}
    >
      <path
        fill={color}
        fillRule="evenodd"
        d="M11.093 3.821a.465.465 0 00-.6.037L6 8.214 1.507 3.858a.464.464 0 00-.643 0 .44.44 0 000 .635l4.53 4.392a.874.874 0 001.211 0l4.531-4.392a.44.44 0 000-.635l-.043-.037z"
        clipRule="evenodd"
      ></path>
      <mask
        style={{ maskType: "luminance" }}
        width="12"
        height="7"
        x="0"
        y="3"
        maskUnits="userSpaceOnUse"
      >
        <path
          fill="#fff"
          fillRule="evenodd"
          d="M11.093 3.821a.465.465 0 00-.6.037L6 8.214 1.507 3.858a.464.464 0 00-.643 0 .44.44 0 000 .635l4.53 4.392a.874.874 0 001.211 0l4.531-4.392a.44.44 0 000-.635l-.043-.037z"
          clipRule="evenodd"
        ></path>
      </mask>
    </svg>
  );
}

export default memo(SvgComponent);
