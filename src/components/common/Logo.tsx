import { clsx } from 'clsx/lite';

type LogoScale = 'sm' | 'md' | 'lg' | 'xl' | '2xl';

interface LogoProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  scale: LogoScale;
}

const scaleWidthMap: Record<LogoScale, string> = {
  sm: 'w-[4vw]',
  md: 'w-[6vw]',
  lg: 'w-[8vw]',
  xl: 'w-[10vw]',
  '2xl': 'w-[12vw]',
};

export const Logo = ({ scale, className, ...rest }: LogoProps) => (
  <img
    src="/logo.png"
    alt="Logo"
    className={clsx('object-contain', scaleWidthMap[scale], className)}
    {...rest}
  />
);
