import { SIZE, STROKE_WIDTH } from './constants';

export const radius = (SIZE - STROKE_WIDTH) / 2;
export const cx = SIZE / 2;
export const cy = SIZE / 2;

export const toRad = (deg: number) => (deg * Math.PI) / 180;

export function pointOnCircle(angle: number, radius: number) {
  const radians = (angle * Math.PI) / 180;
  return {
    x: SIZE / 2 + radius * Math.cos(radians),
    y: SIZE / 2 + radius * Math.sin(radians),
  };
}

export const describeArc = (
  startAngle: number,
  endAngle: number,
  r: number = radius
) => {
  const start = pointOnCircle(startAngle, r);
  const end = pointOnCircle(endAngle, r);
  const largeArcFlag = (endAngle - startAngle + 360) % 360 > 180 ? 1 : 0;
  return `M ${start.x} ${start.y} A ${r} ${r} 0 ${largeArcFlag} 1 ${end.x} ${end.y}`;
};
