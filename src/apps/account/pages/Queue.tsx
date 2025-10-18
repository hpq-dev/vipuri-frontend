import { HeaderAuth } from '../components/Header';
import { UsersIcon } from '@/utils/icons';
import { Note } from '../components/Note';
import { motion } from 'framer-motion';
import { Icon } from '@iconify/react';
import { useEffect, useState } from 'react';
import { isGameEnv } from '@/utils/helpers';

const LoadingBox: React.FC<{ label: string; value: number }> = ({
  label,
  value,
}) => (
  <div className="flex w-full items-center justify-between rounded-[1.2vh] bg-dark-200 px-[0.5vw] py-[1vh]">
    <div className="flex items-center justify-start gap-[0.5vw]">
      <div className="flex items-center justify-center rounded-[1vh] bg-dark-300 px-[0.2vw] py-[.3vh]">
        <Icon
          icon="mingcute:loading-3-fill"
          className="animate-spin text-[1.2vw] text-primary"
        />
      </div>
      <h1 className="text-[0.75vw] font-semibold italic text-light/50">
        {label}
      </h1>
    </div>
    <h1 className="text-[0.7vw] font-bold italic text-light/50">{value}</h1>
  </div>
);

export const QueuePage = () => {

  const [position, setPosition] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {

    if (!isGameEnv()) return;

    mp.events.add('cef:loginqueue:update', (position: number, total: number) => {
      setPosition(position);
      setTotal(total);
    })

  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: 'easeInOut', type: 'spring' }}
      className="flex max-w-[18vw] flex-col items-center justify-center gap-[1.5vh] shadow-lg"
    >
      <HeaderAuth
        className="text-"
        withLogo
        title="Login Queue"
        description="Ești în login queue pentru a evita posibilul lag de pe server! Ai răbdare până când persoanele din fața ta se vor loga!"
      />
      <div className="my-[3vh] flex w-full items-center justify-between">
        <div className="flex items-center justify-start gap-[0.7vw]">
          <UsersIcon className="text-primary" />
          <h1 className="text-[0.85vw] font-bold italic text-primary">
            Playeri in queue
          </h1>
        </div>
        <h1 className="text-[0.7vw] font-bold italic text-primary">{total}</h1>
      </div>
      <LoadingBox label="Pozitia curenta in queue" value={position} />
      <Note note="Poti ajunge să aștepți și jumatate de oră pentru a te conecta, doar trebuie să ai răbdare!" />
    </motion.div>
  );
};
