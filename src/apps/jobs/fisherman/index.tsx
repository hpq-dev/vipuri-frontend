import { FishesIcon } from '@/utils/icons/jobs/fisherman';
import { CoinDollarIcon } from '@/utils/icons/dealership';
import { FishInfo } from './components/FishInfo';
import { FishBar } from './components/FishBar';
import { useRef, useEffect } from 'react';
import { useFishermanStore } from '@/stores/apps/jobs';

import fish from './assets/fish.png';

export const Fisherman = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const fishBarRef = useRef<{ triggerCatch: () => void }>(null);

  const fishermanStore = useFishermanStore();

  const handleCatch = (success: boolean) => {
    if (success) {
      const kg = +(Math.random() * 30 + 1).toFixed(1);
      const rarity = getRandomRarity();
      const { name, image } = getRandomFish();

      fishermanStore.setFishData({ kg, rarity, name, image });
      fishermanStore.setType('fish');
    }
  };

  useEffect(() => {
    containerRef.current?.focus();
  }, []);

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      fishBarRef.current?.triggerCatch();
    }
  };

  return (
    <div
      ref={containerRef}
      className="h-screen w-full overflow-hidden bg-black"
      onKeyDown={handleKeyPress}
      tabIndex={0}
    >
      <div className="absolute bottom-[3vh] flex w-full items-center justify-center">
        <div className="flex flex-col items-center justify-center gap-[14vh]">
          <div className="flex flex-col items-center justify-center gap-[2vh]">
            {fishermanStore.type === 'bar' ? (
              <>
                <FishBar ref={fishBarRef} onCatch={handleCatch} />
                <h1 className="text-[.7vw] font-bold uppercase italic text-white/70">
                  APASA TASTA{' '}
                  <span className="mx-[0.4vw] inline-block rotate-[8deg] transform bg-white px-[0.2vw] py-[0.1vh] font-extrabold text-dark-400">
                    ENTER
                  </span>
                  PENTRU A PRINDE PESTELE
                </h1>
              </>
            ) : (
              fishermanStore.fishData && (
                <FishInfo
                  {...fishermanStore.fishData}
                  onDone={() => {
                    setTimeout(() => {
                      fishermanStore.resetFish();
                    }, 2_000);
                  }}
                />
              )
            )}
          </div>
          <div className="flex items-center justify-center gap-[8vw]">
            <div className="flex h-[3.5vh] items-center justify-center bg-white px-[.7vw] py-[1vh] text-[.7vw] font-black text-dark-400">
              <FishesIcon className="w-[.8vw] text-dark-400" />
              <span className="ml-[0.5vw] italic">TOTAL PESTI</span>
              <span className="ml-[0.5vw] italic">
                {fishermanStore.totalFish}
              </span>
            </div>
            <div className="flex h-[3.5vh] w-[8vw] items-center justify-start bg-success px-[1vw] py-[1vh] font-black text-dark-400">
              <CoinDollarIcon
                variant="primary"
                className="w-[1vw] text-dark-400"
              />
              <span className="ml-[0.5vw] text-[.8vw] italic">
                {formatMoney(fishermanStore.totalMoney || 0)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const formatMoney = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    maximumFractionDigits: 2,
    minimumFractionDigits: 0,
  }).format(amount);
};

const getRandomRarity = () => {
  const roll = Math.random();
  if (roll < 0.6) return 'COMMON';
  if (roll < 0.8) return 'UNCOMMON';
  if (roll < 0.93) return 'RARE';
  if (roll < 0.98) return 'EPIC';
  return 'LEGENDARY';
};

const getRandomFish = () => {
  const fishes = [
    { name: 'Somn', image: fish },
    { name: 'Crap', image: fish },
    { name: 'Știucă', image: fish },
  ];
  return fishes[Math.floor(Math.random() * fishes.length)];
};
