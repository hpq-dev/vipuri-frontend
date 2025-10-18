import { type IStoreKitCard } from '@/stores/apps';
import texture_basic_img from '../assets/texture.png';
import texture_primary_img from '../assets/texture_primary.png';
import { useState } from 'react';

export const Card = (props: IStoreKitCard) => {
  const { image, title, price } = props;

  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative flex w-full cursor-pointer flex-col items-center justify-center gap-[.5vh] rounded-[.7vh] px-[1vw] py-[1vh] text-center"
      style={{
        backgroundImage: `url(${
          hovered ? texture_primary_img : texture_basic_img
        })`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: '100% 100%',
        width: '100%',
        aspectRatio: '3/4',
      }}
    >
      <img
        src={image}
        alt="cloth"
        className="relative w-4/5 flex-shrink-0 object-contain"
      />

      <h1 className="relative w-full truncate text-[.8vw] font-extrabold uppercase italic text-white">
        {title}
      </h1>

      <h1 className="relative w-full overflow-hidden text-ellipsis whitespace-nowrap bg-dark-100 px-[.2vw] py-[.2vh] text-[.8vw] font-extrabold text-success">
        {price.toLocaleString('en-US', {
          style: 'currency',
          currency: 'USD',
          minimumFractionDigits: 0,
        })}
      </h1>
    </div>
  );
};
