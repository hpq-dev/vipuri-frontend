import type React from "react";

export const RedEffect = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      {...props}
      viewBox="0 0 1920 900"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g
        style={{ mixBlendMode: "hard-light" }}
        filter="url(#filter0_f_851_800)"
      >
        <path
          d="M1945.81 470.627C1970.22 537.418 1983.26 607.82 1983.26 680.545C1983.26 1111.51 1525.13 1460.88 960 1460.88C394.867 1460.88 -63.2637 1111.51 -63.2639 680.545C-63.2639 607.82 -50.217 537.418 -25.8127 470.627C94.4025 799.638 490.233 1041.04 960 1041.04C1429.77 1041.04 1825.6 799.638 1945.81 470.627Z"
          fill="#F63C3C"
        />
      </g>
      <g
        style={{ mixBlendMode: "color-dodge" }}
        filter="url(#filter1_f_851_800)"
      >
        <path
          d="M2013.8 1116.98C2039.89 1137.94 2053.83 1160.03 2053.83 1182.86C2053.83 1318.1 1564.11 1427.73 960 1427.73C355.894 1427.73 -133.832 1318.1 -133.833 1182.86C-133.833 1160.03 -119.887 1137.94 -93.8003 1116.98C34.7042 1220.23 457.834 1295.99 960 1295.99C1462.17 1295.99 1885.29 1220.23 2013.8 1116.98Z"
          fill="#F8F8F8"
        />
      </g>
      <g
        style={{ mixBlendMode: "plus-lighter" }}
        filter="url(#filter2_f_851_800)"
      >
        <path
          d="M1790.41 951.244C1810.97 985.618 1821.96 1021.85 1821.96 1059.28C1821.96 1281.07 1436.05 1460.87 960 1460.87C483.952 1460.87 98.0394 1281.07 98.0388 1059.28C98.0388 1021.85 109.03 985.618 129.587 951.244C230.852 1120.57 564.285 1244.81 960 1244.81C1355.71 1244.81 1689.15 1120.57 1790.41 951.244Z"
          fill="#F8F8F8"
        />
      </g>
      <defs>
        <filter
          id="filter0_f_851_800"
          x="-533.115"
          y="0.775818"
          width="2986.23"
          height="1929.96"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur
            stdDeviation="234.926"
            result="effect1_foregroundBlur_851_800"
          />
        </filter>
        <filter
          id="filter1_f_851_800"
          x="-453.697"
          y="797.12"
          width="2827.39"
          height="950.474"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur
            stdDeviation="159.932"
            result="effect1_foregroundBlur_851_800"
          />
        </filter>
        <filter
          id="filter2_f_851_800"
          x="-207.737"
          y="645.468"
          width="2335.47"
          height="1121.18"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur
            stdDeviation="152.888"
            result="effect1_foregroundBlur_851_800"
          />
        </filter>
      </defs>
    </svg>
  );
};
