import { ArrowLeftIcon, ArrowRightIcon } from '@/utils/icons/dealership';
import { ArrowsIcon } from '@/utils/icons/storekit';
import { useRef, useEffect } from 'react';

interface Props {
  min: number;
  max: number;
  value: number;
  onChange: (value: number) => void;
  step: number;
  label: string;
}

export const Range = ({ min, max, value, onChange, step, label }: Props) => {



  const barRef = useRef<HTMLDivElement>(null);
  const lastValue = useRef<number>(value);

  useEffect(() => {
    lastValue.current = value;
  }, [value]);

  const getPercentage = () => {
    return ((value - min) / (max - min)) * 100;
  };

  const setValue = (newValue: number) => {
    const clamped = Math.min(Math.max(newValue, min), max);
    if (clamped !== lastValue.current) {
      lastValue.current = clamped;
      onChange(clamped);
    }
  };

  const handleDecrease = () => {
    setValue(value - step);
  };

  const handleIncrease = () => {
    setValue(value + step);
  };

  const getValueFromPosition = (clientX: number) => {
    if (!barRef.current) return value;
    const rect = barRef.current.getBoundingClientRect();
    const clickX = clientX - rect.left;
    const percentage = clickX / rect.width;
    const newValue = Math.round((percentage * (max - min) + min) / step) * step;
    return Math.min(Math.max(newValue, min), max);
  };

  const handleBarClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const newValue = getValueFromPosition(e.clientX);
    setValue(newValue);
  };

  const handleDrag = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    if (!barRef.current) return;

    const move = (moveEvent: MouseEvent) => {
      const newValue = getValueFromPosition(moveEvent.clientX);
      setValue(newValue);
    };

    const stop = () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseup', stop);
    };

    window.addEventListener('mousemove', move);
    window.addEventListener('mouseup', stop);
  };

  return (
    <div className="my-[1vh] flex w-full items-start justify-between gap-[1vw] select-none">
      <h1 className="text-[.9vw] w-fit font-bold italic text-success uppercase">{label}</h1>

      <div className='flex items-right justify-end w-full'>

        <div className="flex items-center w-[15vw] justify-center gap-[.7vw]">
          <div
            className="flex cursor-pointer items-center justify-center bg-primary/10 px-[.5vw] py-[0.3vh] transition hover:bg-primary/30"
            onClick={handleDecrease}
          >
            <ArrowLeftIcon className="w-[1vw] text-primary" />
          </div>
          <div
            className="relative h-[1vh] w-full overflow-visible bg-primary/10 cursor-pointer"
            ref={barRef}
            onClick={handleBarClick}
          >
            <div className="h-full bg-primary" style={{ width: `${getPercentage()}%` }} />
            <div
              className="absolute top-1/2 flex h-[1.8vh] w-[1.5vw] -translate-y-1/2 items-center justify-center bg-white cursor-grab active:cursor-grabbing"
              style={{
                left: `calc(${getPercentage()}% - ${getPercentage() > 50 ? 1 : 0}vw)`,
              }}
              onMouseDown={handleDrag}
            >
              <ArrowsIcon className="w-[1.2vw] text-dark-400" />
            </div>
          </div>
          <div
            className="flex cursor-pointer items-center justify-center bg-primary/10 px-[.5vw] py-[0.3vh] transition hover:bg-primary/30"
            onClick={handleIncrease}
          >
            <ArrowRightIcon className="w-[1vw] text-primary" />
          </div>
        </div>

      </div>


      <div className='flex items-center justify-end w-[2vw'>
        <h1 className="text-[.9vw] font-bold italic w-[1vw] text-white">{value}</h1>
      </div>
    </div>
  );
};
