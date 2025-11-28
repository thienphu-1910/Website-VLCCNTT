import { twMerge } from "tailwind-merge";
import svgPaths from "../imports/LogoGradient";

function Shield({ className = "" }) {
  return (
    <div
      className={twMerge("relative shrink-0 size-10", className)}
      data-name="Shield"
    >
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 44 44"
      >
        <g id="Shield">
          <path
            d={svgPaths.p23d2fc00}
            id="Icon"
            stroke="url(#paint0_linear_1_79)"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="4"
          />
        </g>
        <defs>
          <linearGradient
            gradientUnits="userSpaceOnUse"
            id="paint0_linear_1_79"
            x1="22"
            x2="22.9167"
            y1="3.66667"
            y2="41.7083"
          >
            <stop stopColor="#FC4778" />
            <stop offset="1" stopColor="#3952F5" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

function ShieldLogo({ className = "" }) {
  return (    
    <Shield className={className} />          
  );
}

export default ShieldLogo;
