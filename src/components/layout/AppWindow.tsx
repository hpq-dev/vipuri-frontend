import { useCommonStore } from '@/stores/common';
import React, { useCallback } from 'react';
import { motion } from 'framer-motion';
import clsx from 'clsx';

interface AppWindowProps {
  name: string;
  zIndex: number;
  children: React.ReactNode;
}

export const AppWindow: React.FC<AppWindowProps> = React.memo(
  ({ name, zIndex, children }) => {
    const focusApp = useCommonStore(state => state.focusApp);
    const handleMouseDown = useCallback(() => {
      focusApp(name);
    }, [focusApp, name]);

    return (
      <motion.div
        className={clsx(
          'fixed left-0 top-0 h-screen w-screen overflow-hidden',
          'pointer-events-auto'
        )}
        style={{ zIndex }}
        onMouseDown={handleMouseDown}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.25, ease: 'easeInOut' }}
      >
        <div className="h-full w-full overflow-hidden">{children}</div>
      </motion.div>
    );
  }
);

AppWindow.displayName = 'AppWindow';
