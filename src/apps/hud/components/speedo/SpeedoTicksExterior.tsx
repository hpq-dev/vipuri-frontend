import { radius, pointOnCircle, NUMBER_OF_TICKS } from '@/apps/hud/data/speedo';
import { useMemo } from 'react';

interface props {
  speed: number
}

export const SpeedoTicksExterior = ({ speed }: props) => {
  const gapAngle = (1 - 0.8) * -500;
  const halfGap = gapAngle / 2;
  const startAngle = 180 + halfGap;
  const endAngle = 360 - halfGap;
  const totalAngle = endAngle - startAngle;

  const ticksExterior = useMemo(() => {
    const ticks = [];
    const tickLength = 4;

    for (let i = 0; i <= NUMBER_OF_TICKS; i++) {
      const angle = startAngle + (totalAngle * i) / NUMBER_OF_TICKS;
      const baseRadius = radius + 12;
      const basePoint = pointOnCircle(angle, baseRadius);

      const perpAngleRad = (angle + 90) * (Math.PI / 180);

      const x1 = basePoint.x + (tickLength / 2) * Math.cos(perpAngleRad);
      const y1 = basePoint.y + (tickLength / 2) * Math.sin(perpAngleRad);
      const x2 = basePoint.x - (tickLength / 2) * Math.cos(perpAngleRad);
      const y2 = basePoint.y - (tickLength / 2) * Math.sin(perpAngleRad);

      ticks.push(
        <line
          key={`ext-tick-${i}`}
          x1={x1}
          y1={y1}
          x2={x2}
          y2={y2}
          strokeLinecap="round"
          className={`${speed > 180 ? 'stroke-error' : speed > 100 ? 'stroke-warning' : 'stroke-light'}`}
          strokeWidth={4}
          strokeOpacity={0.75}
        />
      );
    }

    return ticks;
  }, [startAngle, totalAngle, speed]);


  return <>{ticksExterior}</>;
};
