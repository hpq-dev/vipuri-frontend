

import { useEffect, useRef, useState } from 'react'
// import WireImg from '../../assets/wire.png'

import CapAsset from '../../assets/cap.png'
import CurvedLine from './line'
import { getPositionX, RENDER } from '.'

interface Vector2 {
    x: number
    y: number
}

interface wirePointType {
    startPosition: Vector2
    endPosition: Vector2
    rotate: boolean
    color: string
}

interface props extends wirePointType {
    onChange?: (correct: boolean, active: boolean) => void
    show: boolean
    index: number
}

const WirePoint = ({ startPosition, endPosition, rotate, color, onChange, show, index }: props) => {
    const [pos, setPos] = useState<Vector2>({ x: 0, y: 0 })
    const [active, setActive] = useState<boolean>(false)
    const [focus, setFocus] = useState<Vector2 | null>(null)

    const hitBoxRef = useRef<SVGPathElement | null>(null)
    const refEnd = useRef<HTMLDivElement | null>(null)
    const refSvg = useRef<HTMLDivElement | null>(null)

    const [size, setSize] = useState<Vector2>({ x: 0, y: 0 })
    const [position, setPosition] = useState<Vector2>({ x: 0, y: 0 })

    const tranformToRelativeSvgPosition = (pos: Vector2) => {
        const x = (pos.x - position.x) / size.x
        const y = (pos.y - position.y) / size.y

        return { x, y }
    }

    useEffect(() => {

        const update = () => {
            const svg = refSvg.current
            if (!svg)
                return

            const { left, top, width, height } = svg.getBoundingClientRect()

            setPosition({ x: left, y: top })
            setSize({ x: width, y: height })
        }

        update()
    }, [refSvg, hitBoxRef])

    useEffect(() => {
        const handler = ({ clientX, clientY }: MouseEvent) => {
            setPos(tranformToRelativeSvgPosition({ x: clientX - 5, y: (clientY * .98) }))
        }
        const handlerUp = () => {
            setActive(false)
        }

        document.addEventListener('mouseup', handlerUp)
        document.addEventListener('mousemove', handler)

        return () => {
            document.removeEventListener('mousemove', handler)
            document.removeEventListener('mouseup', handlerUp)
        }
    }, [position, size, hitBoxRef])

    const startX = (startPosition.x) / 100
    const startY = (startPosition.y - (!rotate ? 2 : -6.5)) / 100

    const onDrop = (endIndex: number) => {
        if (!active)
            return

        const target = refEnd.current
        if (!target)
            return

        const px = getPositionX(endIndex) / 100

        setFocus({ x: px, y: .95 })
        onChange?.(index === endIndex, true)
    }
    const onStart = () => {
        onChange?.(false, false)
        setFocus(null)
        setActive(true)
    }

    return <>
        <div className='absolute left-0 top-0 w-full h-full z-10 pointer-events-none' ref={refSvg}>
            <CurvedLine
                start={{ x: startX, y: startY }}
                end={!active ? !focus ? { x: startX, y: startY + .15 } : focus : pos}
                color={color}
                tension={-.002}
                ref={hitBoxRef}
                headImage={{
                    href: CapAsset,
                    width: 30,
                    height: 30,
                    offset: -5
                }}
            />
        </div>
        <div
            className='absolute min-w-[4vh] h-[8.5vh] top-0 -translate-x-1/2 z-[999]'
            style={{
                left: startPosition.x + '%',
                top: startPosition.y + '%'
            }}
            onMouseDown={onStart}
        />

        {active && <div>
            {Array.from({ length: RENDER }).map((_, i) => {
                const x = getPositionX(i)

                return <div
                    key={i}
                    className='absolute z-[99]'
                    style={{
                        left: x + '%',
                        top: endPosition.y + '%',
                        transform: `translateX(-50%)`
                    }}
                >
                    <div
                        className='w-[4vh] h-[2vh]'
                        onMouseUp={() => onDrop(i)}
                        ref={refEnd}
                    />
                </div>
            })}
        </div>}
        <div
            className='absolute pointer-events-none'
            style={{
                left: endPosition.x + '%',
                top: endPosition.y + '%',
                transform: `translateX(-50%) rotate(${rotate ? 180 : 0}deg)`
            }}
        >
            <div
                className='w-[4vh] h-[2vh]'
                style={{ background: show ? color : '#8B8B8B' }}
            />
        </div>
    </>
}

export default WirePoint