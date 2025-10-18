import { useEffect, useState } from "react"
import AnimateNumbers from "./numberAnim"

interface props {
    value: number
    puase: boolean
    onEnd?: () => void
}

const Counter = ({ value, onEnd, puase = false }: props) => {
    const [val, setVal] = useState<number>(value)


    useEffect(() => {
        if (puase)
            return

        const timer = setInterval(() => {
            setVal(prev => {
                if (--prev < 0) {
                    clearInterval(timer)
                    onEnd?.()
                    return 0
                }

                return prev
            })
        }, 1000)
        return () => clearInterval(timer)
    }, [puase])

    const n1 = Math.floor(val / 10)
    const n2 = Math.floor(val % 10)

    return <div className="flex gap-x-[.5vh] h-[7.5vh] w-full relative">
        <div className="w-full h-full bg-[#262626] text-[#2CE24E] grid place-items-center relative text-[3.6vh] font-black overflow-hidden">
            <div
                className="w-full h-full absolute left-0 top-0 grid place-items-center"
                style={{ WebkitMask: 'radial-gradient(129.68% 50% at 50% 50%, #ffffff 0%, #ffffff00 100%)' }}
            >

                <AnimateNumbers
                    value={n1}
                />
            </div>
        </div>
        <div className="w-full h-full bg-[#262626] text-[#2CE24E] grid place-items-center relative text-[3.6vh] font-black overflow-hidden">
            <div
                className="w-full h-full absolute left-0 top-0 grid place-items-center"
                style={{ WebkitMask: 'radial-gradient(129.68% 50% at 50% 50%, #ffffff 0%, #ffffff00 100%)' }}
            >

                <AnimateNumbers
                    value={n2}
                />
            </div>
        </div>
    </div>
}

export default Counter