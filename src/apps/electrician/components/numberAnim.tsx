


import { useEffect, useMemo, useState } from "react"

const numberChars: string[] = [
    ...[...new Array(10)].map((_, i) => (9 - i).toString()),
    ...[...new Array(9)].map((_, i) => (i + 1).toString())
]

console.log(numberChars)

interface props {
    value: number | string
}

const AnimateNumbers = ({ value }: props) => {

    const numbers = useMemo(() => {
        if (typeof value !== 'number')
            return []

        return value.toString().split('').map((val) => parseInt(val)) as number[]
    }, [value])
    return <div className="flex">
        {
            numbers.length > 0 ?
                numbers.map((val) => <AnimListNumber
                    value={val}
                />) :
                value
        }
    </div>
}


interface numberAnimListType {
    value: number
}

const AnimListNumber = ({ value }: numberAnimListType) => {
    const [, setLast] = useState<number>(0)

    useEffect(() => setLast(value), [value])

    return <div className="relative w-fit">
        <span className="opacity-0">{value}</span>
        <div
            className="grid place-items-center w-fit absolute top-1/2 left-0 transition-all duration-500 leading-none"
            style={{
                transform: `translateY(-${50 - (50 * (value / 9.5))}%)`
            }}
        >
            {numberChars.map((val, i) => <span className="w-fit" key={i}>{val}</span>)}
        </div>
    </div>
}

export default AnimateNumbers