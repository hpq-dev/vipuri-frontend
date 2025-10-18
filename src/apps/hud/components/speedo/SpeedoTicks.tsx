import { radius, pointOnCircle, NUMBER_OF_TICKS } from '@/apps/hud/data/speedo';
import { useMemo } from 'react';

export const SpeedoTicks = () => {
  const gapAngle = (1 - 0.8) * -500;
  const halfGap = gapAngle / 2;
  const startAngle = 180 + halfGap;
  const endAngle = 360 - halfGap;
  const totalAngle = endAngle - startAngle;

  const ticksAndLabels = useMemo(() => {
    const ticks = [];
    const labels = [];

    for (let i = 0; i <= NUMBER_OF_TICKS; i++) {
      const angle = startAngle + (totalAngle * i) / NUMBER_OF_TICKS;

      const outerRadius = radius - 25;
      const innerRadius = radius - 35;
      const labelRadius = radius - 50;

      const outerPoint = pointOnCircle(angle, outerRadius);
      const innerPoint = pointOnCircle(angle, innerRadius);
      const labelPoint = pointOnCircle(angle, labelRadius);

      ticks.push(
        <line
          key={`tick-${i}`}
          x1={outerPoint.x}
          y1={outerPoint.y}
          x2={innerPoint.x}
          y2={innerPoint.y}
          stroke="white"
          strokeWidth={4}
          strokeOpacity={0.9}
        />
      );

      labels.push(
        <text
          key={`label-${i}`}
          x={labelPoint.x}
          y={labelPoint.y}
          className="fill-light/60 text-[0.6vw] italic"
          textAnchor="middle"
          dominantBaseline="middle"
        >
          {i * 10}
        </text>
      );
    }

    return [...ticks, ...labels];
  }, [startAngle, totalAngle]);

  return <>{ticksAndLabels}</>;
};
