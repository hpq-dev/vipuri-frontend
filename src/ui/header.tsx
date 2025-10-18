
interface props {
    title: string
    description: string
    badge?: {
        color?: string
        title: string
    }
    onClose?: () => void
}

const Header = ({ title, description, badge = undefined, onClose }: props) => {
    return <div className="flex w-full items-start justify-between">
        <div className="flex flex-col items-start justify-start gap-[0.5vh]">
            <div className="flex items-center justify-start gap-[0.7vw]">
                <h1 className="text-[1.3vw] font-extrabold uppercase italic text-white">
                    {title}
                </h1>
                {badge && <div
                    className="flex rotate-[6deg] items-center justify-center px-[0.3vw] py-[0.1vh]"
                    style={{ background: badge.color ?? '#2CE24E' }}
                >
                    <h1 className="text-[1vw] font-black uppercase text-dark-400">
                        {badge.title}
                    </h1>
                </div>}
            </div>
            <p className="w-1/2 text-start text-[.6vw] font-medium leading-[1.2] text-white/80">
                {description}
            </p>
        </div>
        <h1
            className="rounded-[.5vh] bg-error px-[0.5vw] py-[0.3vh] text-[.7vw] font-semibold italic text-white"
            onClick={onClose}
        >
            ESC
        </h1>
    </div>
}

export default Header