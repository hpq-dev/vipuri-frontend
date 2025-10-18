import { type ReactNode } from "react"

interface props {
    children?: ReactNode
    money: number
}

const NavSide = ({ children, money }: props) => {
    return <div className="flex flex-col gap-y-[1vh] items-center h-full justify-between py-[1vh] pt-[6vh]">
        {children}
        <div className="text-[2.5vh] font-black italic text-[#F8F8F8]">
            TOTAL / <span className="text-[#2CE24E]">$   {new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
                minimumFractionDigits: 0,
                maximumFractionDigits: 2,
            }).format(money ?? 0)}</span>
        </div>
    </div>
}

export default NavSide