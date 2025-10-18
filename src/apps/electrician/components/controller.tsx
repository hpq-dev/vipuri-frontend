import BoltIcon from "@/utils/icons/bolt"
import clsx from "clsx"

interface props {
    value: boolean
    onToggle?: () => void
}

const Controller = ({ value, onToggle }: props) => {
    const createPart = () => {
        return <svg height="100%" viewBox="0 0 46 236" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="45.8438" height="235.637" fill="#353535" />
            <g clip-path="url(#clip0_4857_923)">
                <rect width="36.6751" height="129.28" transform="translate(4.58447 36.6748)" fill="#262626" />
                <rect width="36.6751" height="67.8489" transform="translate(4.58447 42.177)" fill="#171717" />
            </g>
            <defs>
                <clipPath id="clip0_4857_923">
                    <rect width="36.6751" height="129.28" fill="white" transform="translate(4.58447 36.6748)" />
                </clipPath>
            </defs>
        </svg>
    }

    return <div
        className="flex w-[21vh] justify-between h-[23vh] items-center relative transition-all duration-300 active:scale-95 active:opacity-60"
        onClick={onToggle}
    >
        {createPart()}
        <div className={clsx("text-[4.5vh] transition-all duration-300", !value ? 'text-[#353535]' : 'text-[#2CE24E]')}>
            <BoltIcon />
        </div>
        {createPart()}
        <div
            className="bg-[#F63C3C] w-[150%] h-[4.5vh] shadow-[0_1.3vh_0_#00000088] absolute left-1/2 -translate-x-1/2 transition-all duration-300 ease-out"
            style={{ top: !value ? '2vh' : '15vh' }}
        />
    </div>
}

export default Controller