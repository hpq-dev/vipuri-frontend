
import { forwardRef } from "react";


export interface Vector2 {
    x: number;
    y: number;
}

interface Props {
    start: Vector2;
    end: Vector2;
    tension: number;
    color: string
    headImage?: CapImage;
}


interface CapImage {
    href: string;
    width: number;   // în unități viewBox
    height: number;
    offset?: number; // împinge “ștecărul” puțin spre interior
}

const CurvedLine = forwardRef<SVGPathElement, Props>(({ start, end, tension, color, headImage }, ref) => {
    const width = 518
    const height = 638

    const controlPointX1 = start.x + (end.x - start.x) / 4;
    const controlPointY1 = (start.y + end.y) / 2 - tension * 100;

    const controlPointX2 = end.x - (end.x - start.x) / 4;
    const controlPointY2 = (start.y + end.y) / 2 + tension * 100;

    const pathData = `
      M ${start.x * width},${start.y * height}
      C ${controlPointX1 * width},${controlPointY1 * height},
        ${controlPointX2 * width},${controlPointY2 * height},
        ${end.x * width},${end.y * height}
    `;

    const MarkerEnd = ({ id, img }: { id: string; img: CapImage }) => {
        const { width: w, height: h, offset = 0 } = img;
        // centrăm markerul pe vârf și îl tragem un pic în interior
        const refX = w / 2 + offset;
        const refY = h / 2;

        return (
            <marker
                id={id}
                markerWidth={w}
                markerHeight={h}
                refX={refX}
                refY={refY}
                orient="auto"
                markerUnits="userSpaceOnUse"
            >
                <image href={img.href} x={0} y={0} width={w} height={h} preserveAspectRatio="xMidYMid meet" />
            </marker>
        );
    };

    return (
        <svg width="100%" height="100%" viewBox={`0 0 ${width} ${height}`}>
            <defs>
                {headImage && <MarkerEnd id="wire-end" img={headImage} />}
            </defs>
            <path ref={ref} d={pathData} fill="none" stroke={color} strokeWidth='3.9vh' strokeLinecap='butt' markerEnd={headImage ? "url(#wire-end)" : undefined} />
        </svg>
    );
})

export default CurvedLine;