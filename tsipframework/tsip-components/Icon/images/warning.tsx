import React, {SVGProps} from "react";

function Warning(props: SVGProps<SVGSVGElement>) {
    const {color = "#E71D36"} = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="25"
      fill="none"
      viewBox="0 0 24 25"
    >
      <path
        fill={color}
        d="M22.195 17.82L13.948 3.57a2.252 2.252 0 00-3.895 0L1.806 17.82a2.25 2.25 0 001.946 3.377h16.496a2.25 2.25 0 001.947-3.377zM11.249 9.948a.75.75 0 111.5 0v3.75a.75.75 0 11-1.5 0v-3.75zm.751 8.25a1.125 1.125 0 110-2.25 1.125 1.125 0 010 2.25z"
      ></path>
    </svg>
  );
}

export default React.memo(Warning);
