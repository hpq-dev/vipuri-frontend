import texture from "/texture.png";
import { clsx } from "clsx/lite";
import React from "react";

type ButtonVariant = "primary" | "secondary" | "dark";
type ButtonScale = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  scale?: ButtonScale;
  arrowsColor?: string;
  children: React.ReactNode;
  cooldown?: number;
}

const variantClassMap: Record<ButtonVariant, string> = {
  primary: "bg-primary border-primary",
  secondary: "bg-secondary border-secondary",
  dark: "bg-dark-100 border-dark-200",
};

const scaleClassMap: Record<
  ButtonScale,
  {
    padding: string;
    arrowSize: string;
    arrowOffset: string;
  }
> = {
  sm: {
    padding: "px-[1.3vw] py-[0.5vh]",
    arrowSize: "h-[1vh] w-[0.3vw]",
    arrowOffset: "0.4vh",
  },
  md: {
    padding: "px-[1.5vw] py-[0.5vh]",
    arrowSize: "h-[1.3vh] w-[0.4vw]",
    arrowOffset: "0.5vh",
  },
  lg: {
    padding: "px-[1.7vw] py-[0.6vh]",
    arrowSize: "h-[1.6vh] w-[0.5vw]",
    arrowOffset: "0.6vh",
  },
};

export const Button = ({
  variant = "primary",
  scale = "md",
  children,
  arrowsColor = "#fff",
  className,
  onClick,
  ...props
}: ButtonProps) => {
  const scaleClass = scaleClassMap[scale];
  const variantClass = variantClassMap[variant];
  const isDark = variant === "dark";

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    onClick?.(e);
  };

  return (
    <button
      className={clsx(
        "relative z-0 disabled:hover:scale-100 disabled:cursor-not-allowed items-center overflow-hidden rounded-[1.2vh] border-[0.4vh] bg-[length:15vw_15vw] bg-center font-extrabold transition duration-300 hover:scale-95",
        variantClass,
        isDark ? "text-light/70" : "text-light",
        scaleClass.padding,
        className
      )}
      style={{ backgroundImage: `url(${texture})` }}
      onClick={handleClick}
      {...props}
    >
      {isDark && (
        <div className="pointer-events-none absolute inset-0 z-[-1] bg-dark-300 opacity-65" />
      )}

      <div
        className={clsx(
          "absolute left-[0.2vw] z-10 -scale-y-100 bg-light",
          isDark ? "bg-zinc-400" : "bg-current",
          scaleClass.arrowSize
        )}
        style={{
          clipPath: "polygon(0 0, 100% 0, 0 100%)",
          backgroundColor: arrowsColor,
          bottom: scaleClass.arrowOffset,
        }}
      ></div>

      <span
        className="z-10 uppercase italic flex items-center gap-[0.5vw]"
        style={{ textShadow: "0 1px 2px rgba(0, 0, 0, 0.5)" }}
      >
        {children}
      </span>

      <div
        className={clsx(
          "absolute right-[0.2vw] z-10 -scale-x-100",
          isDark ? "bg-zinc-400" : "bg-current",
          scaleClass.arrowSize
        )}
        style={{
          clipPath: "polygon(0 0, 100% 0, 0 100%)",
          backgroundColor: arrowsColor,
          top: scaleClass.arrowOffset,
        }}
      ></div>
    </button>
  );
};
