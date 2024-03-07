import {memo, SVGProps} from "react";

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
      <circle
        cx="9.416"
        cy="9.416"
        r="9.416"
        fill={color}
        opacity="0.2"
        transform="matrix(-1 0 0 1 21.832 3)"
      ></circle>
      <circle
        cx="4.708"
        cy="4.708"
        r="4.708"
        fill={color}
        transform="matrix(-1 0 0 1 17.125 7.708)"
      ></circle>
    </svg>
  );
}

export default memo(Icon);