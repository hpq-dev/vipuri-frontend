import type { ReactNode } from "react"

import BgImg from '../assets/bg.png'
import Header from "@/ui/header"

interface props {
    children?: ReactNode
}

const Layout = ({ children }: props) => {
    return <div className="bg-[#171717] w-[95vh] h-[84vh] absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 rounded-[1.5vh] overflow-hidden">
        <img
            className="w-full absolute left-0 top-0"
            src={BgImg}
            alt="bg"
        />
        <div className="relative p-[3vh] flex flex-col gap-y-[4vh] h-full">
            <Header
                title="ELECTRICIAN"
                description="Lorem Ipsum is simply dummy text of the printing and typesetting industry. "
                badge={{ title: 'skill 1' }}
            />
            {children}
        </div>
    </div>
}

export default Layout