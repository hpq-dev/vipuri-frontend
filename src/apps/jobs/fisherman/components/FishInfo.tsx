import { motion, animate, useAnimation } from 'framer-motion';
import { useEffect, useState } from 'react';
import texture from '../assets/texture.png';

interface FishInfoProps {
  kg: number;
  rarity: 'COMMON' | 'UNCOMMON' | 'RARE' | 'EPIC' | 'LEGENDARY';
  name: string;
  image: string;
  onDone: () => void;
}

export const FishInfo = ({
  kg,
  rarity,
  name,
  image,
  onDone,
}: FishInfoProps) => {
  const [money, setMoney] = useState(0);
  const fishControls = useAnimation();
  const titleControls = useAnimation();
  const priceControls = useAnimation();
  const moneyControls = useAnimation();

  useEffect(() => {
    const sequence = async () => {
      await fishControls.start({
        opacity: 1,
        scale: 1,
        transition: { duration: 0.6, ease: 'easeOut' },
      });
      await titleControls.start({
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: 'easeOut' },
      });
      await priceControls.start({
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: 'easeOut' },
      });
      await moneyControls.start({
        scale: [1, 1.3, 1],
        rotate: [0, 5, -5, 0],
        transition: { duration: 1.2, ease: 'easeOut' },
      });
      await animate(0, 200000, {
        duration: 1.2,
        ease: 'easeOut',
        onUpdate: v => setMoney(Math.floor(v)),
      }).finished;

      onDone();
    };
    sequence();
  }, [fishControls, titleControls, priceControls, moneyControls, onDone]);

  const rarityColor = {
    COMMON: 'bg-gray-400',
    UNCOMMON: 'bg-green-500',
    RARE: 'bg-secondary',
    EPIC: 'bg-purple-500',
    LEGENDARY: 'bg-yellow-400',
  }[rarity];

  return (
    <div className="flex flex-col items-center justify-center gap-[1vh]">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={fishControls}
        className="relative flex w-full cursor-pointer flex-col items-center justify-center gap-[.5vh] rounded-[.7vh] px-[1vw] py-[.7vh] text-center"
        style={{
          backgroundImage: `url(${texture})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: '100% 100%',
          width: '100%',
          aspectRatio: '16/9',
        }}
      >
        <div className="flex w-full flex-col items-center justify-center gap-[0.2vh]">
          <div className="flex w-full items-center justify-between">
            <h1 className="text-[.8vw] font-extrabold italic text-white/40">
              {kg}KG
            </h1>
            <h1
              className={`rounded-[.7vh] ${rarityColor} px-[0.4vw] py-[0.1vh] text-[.7vw] font-bold italic text-white`}
            >
              {rarity}
            </h1>
          </div>
          <img
            src={image}
            alt={name}
            className="relative w-[14vw] flex-shrink-0 object-contain"
          />
        </div>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 10 }}
        animate={titleControls}
        className="text-[.8vw] font-extrabold italic text-warning"
      >
        {name.toUpperCase()}
      </motion.h1>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={priceControls}
        className="mt-[2vh] flex items-center justify-center gap-[0.7vw]"
      >
        <h1 className="text-[.8vw] font-extrabold italic text-white">
          VINDE-L IN SHOP PENTRU
        </h1>
        <motion.h1
          animate={moneyControls}
          className="rotate-[5deg] bg-success px-[0.3vw] py-[0.1vh] text-[.8vw] font-black italic text-dark-400"
        >
          +${money.toLocaleString()}
        </motion.h1>
      </motion.div>
    </div>
  );
};
