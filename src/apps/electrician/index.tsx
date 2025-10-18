import { useEffect, useState } from "react"
import Game from "./content/game"
import NavSide from "./content/navSide"
import Layout from "./layout"
import Controller from "./components/controller"
import Counter from "./components/counter"

enum STATUS_GAME {
    WAIT,
    RUNNING,
    END,
    FAILURE
}

enum PROGRESS_GAME {
    NONE,
    GOOD,
    BAD
}

export const ElectricianUI = () => {
    const [active, setActive] = useState<boolean>(false)
    const [status, setStatus] = useState<STATUS_GAME>(STATUS_GAME.WAIT)
    const [progress, setProgress] = useState<PROGRESS_GAME>(PROGRESS_GAME.NONE)

    useEffect(() => {
        const start = setTimeout(() => {
            setStatus(STATUS_GAME.RUNNING)
        }, 5000);

        return () => {
            clearTimeout(start)
        }
    }, [])

    const onFailure = () => {
        onEndGame(STATUS_GAME.FAILURE, false)
    }

    const onCheck = () => {
        if (progress === PROGRESS_GAME.NONE)
            return

        setActive(true)
        onEndGame(STATUS_GAME.END, progress === PROGRESS_GAME.GOOD)
    }


    const onEndGame = (status: STATUS_GAME, good: boolean) => {
        setStatus(status)
        console.log('jocul s-a terminat', good ? 'ai castigat' : 'ai pierdut')
    }

    return <Layout>
        <div className="flex-1 py-[1vh]">
            <div className="flex justify-between h-full">
                <NavSide
                    money={3523}
                >
                    <Controller
                        onToggle={onCheck}
                        value={active}
                    />
                    <div className="relative flex  flex-col gap-y-[1vh] w-[31.5vh]">
                        <Counter
                            puase={STATUS_GAME.END === status}
                            value={35}
                            onEnd={onFailure}
                        />
                        <div className="text-[1.4vh] text-[#353535] font-semibold w-full">
                            {STATUS_GAME.WAIT === status ? 'Ai timp 5 secunde se memorezi culorile si sa le conectezi' : 'Ai la dispozitie 30 secunde pentru a le conecta si dupa apasa maneta pentru a verifica'}
                        </div>
                    </div>
                </NavSide>
                <Game
                    disable={(STATUS_GAME.WAIT === status || STATUS_GAME.END === status)}
                    show={STATUS_GAME.WAIT === status || STATUS_GAME.END === status}
                    onConnectAll={(allcorect) => {
                        setProgress(allcorect ? PROGRESS_GAME.GOOD : PROGRESS_GAME.BAD)
                    }}
                />
            </div>
        </div>
    </Layout>
}