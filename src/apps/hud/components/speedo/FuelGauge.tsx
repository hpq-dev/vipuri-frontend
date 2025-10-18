import React from 'react';

interface FuelGaugeArcProps {
  progress: number;
  angle?: number;
}

export const FuelGauge: React.FC<FuelGaugeArcProps> = ({
  progress,
  angle = 50,
}) => {
  const safeProgress = Math.min(Math.max(progress, 0), 1);
  const size = 200;
  const strokeWidth = 10;
  const radius = (size - strokeWidth) / 2;
  const center = size / 2;

  const describeArc = (
    x: number,
    y: number,
    radius: number,
    startAngle: number,
    endAngle: number
  ) => {
    const start = {
      x: x + radius * Math.cos((Math.PI * startAngle) / 180),
      y: y + radius * Math.sin((Math.PI * startAngle) / 180),
    };
    const end = {
      x: x + radius * Math.cos((Math.PI * endAngle) / 180),
      y: y + radius * Math.sin((Math.PI * endAngle) / 180),
    };
    const largeArcFlag = Math.abs(endAngle - startAngle) <= 180 ? '0' : '1';
    return `M ${start.x} ${start.y} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${end.x} ${end.y}`;
  };

  const halfAngle = angle / 2;
  const arcStart = 270 - halfAngle;
  const arcEnd = 270 + halfAngle;
  const arcPath = describeArc(center, center, radius, arcStart, arcEnd);
  const arcLength = (Math.PI * radius * angle) / 180;
  const dashOffset = arcLength * (1 - safeProgress);

  return (
    <svg
      className="absolute mt-[170px] rotate-[180deg]"
      viewBox={`0 0 ${size} ${size - 140}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Fuel gauge"
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={1}
      aria-valuenow={safeProgress}
    >
      <path d={arcPath} stroke="#FFCC2226" strokeWidth={strokeWidth} />
      <path
        d={arcPath}
        stroke="#FFCC22"
        strokeWidth={strokeWidth}
        strokeDasharray={arcLength}
        strokeDashoffset={dashOffset}
        style={{ transition: 'stroke-dashoffset 0.3s ease' }}
      />
    </svg>
  );
};
