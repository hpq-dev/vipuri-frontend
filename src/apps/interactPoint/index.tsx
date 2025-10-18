import { motion, AnimatePresence } from "framer-motion";
import { useInteractPointStore } from "@/stores/apps";
import { RPCManager } from "@/utils/rpc"; 
import { useEffect } from "react";
import { isGameEnv } from "@/utils/helpers";
 

export const InteractPoint = () => {
  const { key, description, active, setInteractPoint, setActive } =
    useInteractPointStore();

 

  useEffect(() => {
    if (!isGameEnv()) return;

    RPCManager.registerApp(InteractPoint.name);
    return () => RPCManager.unregisterApp(InteractPoint.name);
  }, []);

  return (
    active && (
      <AnimatePresence>
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -50, opacity: 0 }}
          className="absolute w-full animate-bounce bottom-[6vh] flex justify-center items-center"
        >
          <div className="flex justify-center items-center gap-[0.3vw]">
            <div className="flex justify-center px-[0.5vw] py-[0.5vh] rounded-l-[1vh] items-center bg-primary">
              <h1 className="text-[0.8vw] font-black text-white">{key}</h1>
            </div>
            <div className="flex justify-center items-center rounded-r-[1vh] bg-primary/20 px-[0.5vw] py-[0.5vh]">
              <h1 className="text-primary font-bold text-[.7vw]">
                {description}
              </h1>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    )
  );
};
