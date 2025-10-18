import { clsx } from "clsx/lite";

interface HeaderProps {
  title: string;
  description: string;
  buttonProps?: React.ButtonHTMLAttributes<HTMLButtonElement>;
  className?: string;
  titleClassName?: string;
  descriptionClassName?: string;
}

export const Header = ({
  buttonProps,
  className,
  description,
  title,
  titleClassName,
  descriptionClassName,
}: HeaderProps) => (
  <div
    className={clsx(
      "flex w-full flex-col items-start justify-start gap-[0.5vh]",
      className
    )}
  >
    <button
      {...buttonProps}
      className={clsx(
        "font-extrabold italic text-end",
        buttonProps?.className,
        titleClassName
      )}
    >
      {title}
    </button>
    <p
      className={clsx(
        "whitespace-pre-wrap break-words leading-snug",
        descriptionClassName
      )}
    >
      {description}
    </p>
  </div>
);
