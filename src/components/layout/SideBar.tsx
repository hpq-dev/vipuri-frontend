import { AnimatePresence, motion } from 'framer-motion';
import { useCommonStore } from '@/stores/common';
import { isDevEnvironment, isGameEnv } from '@/utils/helpers';
import React, { useEffect } from 'react';
import { Icon } from '@iconify/react';
import * as apps from '@/apps';
import clsx from 'clsx';

export const SideBar: React.FC = () => {
  const sideBar = useCommonStore(state => state.sideBar);
  const activeApps = useCommonStore(state => state.activeApps);
  const setAppStatus = useCommonStore(state => state.setAppStatus);
  const toggleSideBar = useCommonStore(state => state.toggleSideBar);

  useEffect(() => {
    console.log(isDevEnvironment(), isGameEnv())
    if (!isGameEnv() && isDevEnvironment()) {
      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === 'Shift') {
          toggleSideBar();
          console.log('toggle bar')
        }
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [toggleSideBar]);

  return (
    <AnimatePresence>
      {sideBar && (
        <div className="pointer-events-none fixed inset-0 z-[9999] select-none">
          <div className="pointer-events-auto absolute bottom-[0vh] right-[0vh] top-[0vh] mx-[0.4vw] my-[0.8vh]">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.3, ease: 'easeInOut', type: 'tween' }}
              className="flex h-full w-[15vw] flex-col items-center justify-start rounded-[1.5vh] bg-dark-300/70 px-[1vw] py-[2vh] backdrop-blur-[1vh]"
            >
              <div className="flex items-center justify-center gap-[0.3vw]">
                <Icon icon="ion:apps" className="text-[1.5vw] text-light" />
                <h1 className="text-[1.2vw] font-bold text-light">
                  Applications
                </h1>
              </div>
              <div className="my-[2vh] flex max-h-[90vh] w-full flex-col items-center justify-start gap-[0.7vh] overflow-y-auto [&::-webkit-scrollbar]:hidden">
                {Object.entries(apps).map(([name]) => (
                  <div
                    key={name}
                    onClick={() =>
                      setAppStatus(name, !activeApps.includes(name))
                    }
                    className={clsx(
                      'flex w-full cursor-pointer items-center justify-center rounded-[1vh] px-[0.5vw] py-[0.7vh] transition',
                      {
                        'bg-primary hover:bg-primary/80':
                          activeApps.includes(name),
                        'bg-dark-200 hover:bg-dark-200/80':
                          !activeApps.includes(name),
                      }
                    )}
                  >
                    <h1
                      className={clsx('text-[0.8vw] font-semibold text-light', {
                        'text-black': activeApps.includes(name),
                      })}
                    >
                      {name}
                    </h1>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};
