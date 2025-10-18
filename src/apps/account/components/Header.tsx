import { Logo } from '@/components/common';

interface IHeaderProps {
  title: string;
  description: string;
  withLogo: boolean;
  className?: string;
}

export function HeaderAuth({
  title,
  description,
  withLogo,
  ...props
}: IHeaderProps) {
  return (
    <div
      {...props}
      className="flex w-[17vw] flex-col items-center space-y-[1vh] text-center"
    >
      {withLogo && <Logo scale="lg" className="mb-[3vh]" />}
      <h2 className="text-[1.7vw] font-extrabold italic text-light">{title}</h2>
      <p className="text-[0.6vw] leading-[1.5vh] text-light/50">
        {description}
      </p>
    </div>
  );
}
