import texture_primary from "../assets/texture_primary.png";
import texture from "../assets/texture.png";
import { useState } from "react";

interface AssetsProps {
  id: number;
  image?: string;
  onClick?: (id: number) => void;
  isSelected?: boolean;
}

export const Assets = ({ id, image, onClick, isSelected }: AssetsProps) => {
  const [hovered, setHovered] = useState<number | null>(null);

  const handleMouseEnter = (hoverId: number) => {
    setHovered(hoverId);
  };

  return (
    <div className="flex min-w-[6vw] items-center justify-center">
      <div
        className="relative flex cursor-pointer flex-col items-center justify-center gap-[.5vh] rounded-[.7vh] px-[0.5vw] py-[1vh] text-center"
        onMouseEnter={() => handleMouseEnter(id)}
        onMouseLeave={() => setHovered(null)}
        onClick={() => onClick?.(id)}
        style={{
          backgroundImage: `url(${
            isSelected || hovered === id ? texture_primary : texture
          })`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "100% 100%",
          width: "100%",
          aspectRatio: "3/1",
        }}
      >
        {image && <img src={image} alt="parent" className="w-[5vw]" />}
      </div>
    </div>
  );
};
