import {
  describeArc,
  radius,
  STROKE_WIDTH,
  PERCENT,
} from '@/apps/hud/data/speedo';
import React, { useMemo } from 'react';

interface SpeedoArcProps {
  progress: number;
}

export const SpeedoArc: React.FC<SpeedoArcProps> = ({ progress }) => {
  const gapAngle = (1 - PERCENT) * -500;
  const halfGap = gapAngle / 2;
  const startAngle = 180 + halfGap;
  const endAngle = 360 - halfGap;

  const backgroundPath = useMemo(
    () => describeArc(startAngle, endAngle),
    [startAngle, endAngle]
  );

  const circumference = useMemo(() => 2 * Math.PI * radius * PERCENT, []);
  const dashOffset = circumference * (1 - progress);

  return (
    <>
      <path
        d={backgroundPath}
        stroke="#FFFFFF40"
        strokeWidth={STROKE_WIDTH}
        fill="none"
      />
      <path
        d={backgroundPath}
        stroke="url(#grad)"
        strokeWidth={STROKE_WIDTH}
        fill="none"
        strokeDasharray={circumference}
        strokeDashoffset={dashOffset}
      />
    </>
  );
};
