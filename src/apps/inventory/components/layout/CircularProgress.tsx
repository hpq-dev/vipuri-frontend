import { DumbbellIcon } from '@/utils/icons/inventory';

const CircularProgress = ({ percentage }: { percentage: number }) => {
  const getColors = (percent: number) => {
    if (percent >= 75)
      return {
        stroke: 'stroke-success',
        icon: 'text-success',
      };
    if (percent >= 50)
      return {
        stroke: 'stroke-warning',
        icon: 'text-warning',
      };
    return {
      stroke: 'stroke-error',
      icon: 'text-error',
    };
  };

  const colors = getColors(percentage);
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative mb-[4vh] flex h-[9vh] w-[4vw] items-center justify-center">
      <svg viewBox="0 0 100 100" className="h-full w-full rotate-[90deg]">
        <circle
          cx="50"
          cy="50"
          r={radius}
          fill="none"
          stroke="#262626"
          strokeWidth="7"
        />
        <circle
          cx="50"
          cy="50"
          r={radius}
          fill="none"
          className={colors.stroke}
          strokeWidth="7"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
        />
      </svg>

      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <DumbbellIcon className={`h-[2.3vh] w-[2.3vw] ${colors.icon}`} />
      </div>
    </div>
  );
};

export default CircularProgress;
