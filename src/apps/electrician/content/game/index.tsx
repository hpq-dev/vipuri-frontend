import { useEffect, useState } from 'react'
import WirePoint from './wirePoint'
import { generateRandomHexColor, shuffleArray } from '../../util'

export const RENDER = 4
export const MIN_POS = 8
export const MAX_POS = 122

type WirePointData = {
    id: number
    color: string
    startPosition: { x: number, y: number }
    endPosition: { x: number, y: number }
    endId: number
    rotate: boolean
    checked: boolean
}

// eslint-disable-next-line react-refresh/only-export-components
export const getPositionX = (index: number) => {
    const step = (MAX_POS - MIN_POS) / RENDER
    return MIN_POS + index * step
}

interface props {
    show: boolean
    disable: boolean
    onConnectAll?: (allCorrect: boolean, list: Array<{ id: number; correct: boolean }>) => void
}

const Game = ({ show, disable, onConnectAll }: props) => {
    const [wires, setWires] = useState<WirePointData[]>([])

    const [status, setStatus] =
        useState<Record<number, { active: boolean; correct: boolean }>>({})

    useEffect(() => {
        const positions = Array.from({ length: RENDER }, (_, i) => ({
            id: i,
            x: getPositionX(i)
        }))
        const shuffled = shuffleArray([...positions])

        const upperWires: WirePointData[] = positions.map((pos, i) => {
            const end = shuffled[i]
            return {
                id: i,
                endId: end.id,
                color: generateRandomHexColor(),
                startPosition: { x: pos.x, y: 0 },
                endPosition: { x: end.x, y: 95 },
                rotate: false,
                checked: false
            }
        })

        setWires(upperWires)
        setStatus({}) // reset
    }, [])

    const handleChange = (id: number, correct: boolean, active: boolean) => {
        // ținem status separat
        setStatus(prev => ({ ...prev, [id]: { correct, active } }))

        // dacă vrei să păstrezi și câmpul `checked` în wires, îl sincronizăm:
        setWires(prev => prev.map(w => (w.id === id ? { ...w, checked: active } : w)))
    }

    // când toate sunt active -> strâng lista + verific corectitudinea + emit evenimentul
    useEffect(() => {
        if (wires.length === 0) return

        const allActive = wires.every(w => status[w.id]?.active === true)
        if (!allActive) return

        const list = wires.map(w => ({
            id: w.id,
            correct: !!status[w.id]?.correct
        }))
        const allCorrect = list.every(i => i.correct)

        onConnectAll?.(allCorrect, list)
    }, [status, wires, onConnectAll])

    return (
        <div
            className='w-[52vh] h-[66vh] rounded-[1vh] bg-[#111111] relative py-[1vh]'
            style={{ pointerEvents: disable ? 'none' : 'all' }}
        >
            <div className='w-full h-full relative' id='layout-electrician'>
                {wires.map((wire) => (
                    <WirePoint
                        show={show}
                        key={wire.id}
                        startPosition={wire.startPosition}
                        endPosition={wire.endPosition}
                        rotate={wire.rotate}
                        color={wire.color}
                        index={wire.endId}
                        onChange={(correct, active) => handleChange(wire.id, correct, active)}
                    />
                ))}
            </div>
        </div>
    )
}

export default Game
