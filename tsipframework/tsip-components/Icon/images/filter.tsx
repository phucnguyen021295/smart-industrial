import { SVGProps, memo } from "react";

function Icon(props: SVGProps<SVGSVGElement>) {
  const { color = "#E71D36", ...otherProps } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width="24"
      height="24"
      fill="none"
      viewBox="0 0 24 24"
      {...otherProps}
    >
      <path fill="url(#pattern0)" d="M0 0H24V24H0z"></path>
      <defs>
        <pattern
          id="pattern0"
          width="1"
          height="1"
          patternContentUnits="objectBoundingBox"
        >
          <use transform="scale(.01042)" xlinkHref="#image0_114_15277"></use>
        </pattern>
        <image
          id="image0_114_15277"
          width="96"
          height="96"
          xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAABmJLR0QA/wD/AP+gvaeTAAAEPklEQVR4nO3cTYgcRRQH8P8relh0FQQPXjy4zlZ1z64oShYVRURUEN2LRkGRoBdBBMEchBDZy5Koe/DkQaIIMoIQSUBRXPAj4EFEZSEeFrr7ED/WPRlwk/jF9PTzEAIxbjZWTXdXf7zfceHVq60/NTXVwwwghBBCCCGEEEIIIbqCXAvTNF1k5r3MvABgusA5NcnvAL4hoteMMR+5DOAUQBzHBwHsc6ltK2Y+EEXRS7Z11gGkabqY5/mHtnVdQESLtjtB2TZh5r22NV3BzC/Y1rgEsMu2pkMWbAusAwBwhUNNV1xpW+ASgCiQBOCZBOCZBOCZBOCZSwCjwmfRHtZr4xLAKYeartiyLXC5iP1oW9MhJ2wLXHbAcYearvjetsAlgM8darriU9sC6wCmpqY+xtnn4OLfziilPrEtsg5gZmbmN2Z+17au7YhoqLW2foPidA8gomVm/sOltqX+VEq97FLoFEAYhr8Q0bJLbRsR0dLs7OzPTrWuTZlZJUmyCuA+1zFaYtUY8yAR5S7Fzo8iiChXSu1m5jXXMVrgO2Z+zHXxgQmfBWmtT/V6vXsAHJtknIb6IgiCe6MoOj3JIBM/jOv3+1ubm5v3E9Grk47VIIeyLHug3+9bP3q4kPMZsJ0kSZ7I8/xNIrq8yHFr5C9mfi6KoreLGrDQAAAgjuObABwFcH3RY/vEzD8R0e4wDL8tctzCPw8Iw/B4lmULAFaLHtuj1fF4fHPRiw+UsAPOYWaK4/hFIjqI5n7ww0S0orXeT0TjMhqUFsA5SZI8xMxDAFeV3atgp4noaWPMkTKblB4AAKyvr+sgCI4y8w1V9CtArJR6WGu9XnajSl4a5ubm0tFodDuAw1X0m9AHQRDcWsXiAxXtgPMlSfIMM78OoFd170sYM/P+MAxXiIiralp5AACQJMldzHwYwDU++m/jVyJ63BjzWdWNvQQAAGmaXpvn+fsAbvM1BwBg5jVmfmQwGPzgo7+3t4da6w2l1N0ADvmaA4Dh9PT0nb4WH/C4A84Xx/EeAG8AuKyiln8T0fPGGJ/hA6hJAACQpukteZ4fAXBdya02lFKPaq2/LrnP/1KbG6rWeg1nv+BQ5kH4Za/X21WXxRdCCCGE6K7a3AMuFMdxoQ/EwjCs5f9am3tAV0kAnkkAnkkAnkkAnkkAnkkAnkkAnkkAnkkAnkkAnkkAnkkAnkkAnnUlgJO+J3AxXQngHd8TuJguBPBWlmW1/Z3rwPcESrRFRM8aY97zPZGdtDWAY0qpPVrrDd8TuZS2BZABOGCMWS7rS3VFa1MAJ/I8f3IwGHzleyI22nIID7Msu7Fpiw80fwc04qDdSZMDaMxBu5M6B3ASwNXb/H0EYMkYszLJ7/TURZ3PgP/cXokoBXBHGIavtGHxgRrvgCzL9gVBAABPAcgBDEej0dL8/PwZvzMTQgghhBBCCCGEEMLNP3Y5HYtH0iSZAAAAAElFTkSuQmCC"
        ></image>
      </defs>
    </svg>
  );
}

export default memo(Icon);