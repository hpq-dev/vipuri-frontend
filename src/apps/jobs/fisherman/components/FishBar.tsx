import { motion, useAnimation } from "framer-motion";
import {
  useEffect,
  useRef,
  useImperativeHandle,
  forwardRef,
  useCallback,
} from "react";
import goldfish_img from "../assets/goldfish.png";
import { Needle } from "./Needle";

interface FishBarProps {
  onCatch: (success: boolean) => void;
}

const getRandomDuration = (min: number, max: number): number =>
  min + Math.random() * (max - min);

export const FishBar = forwardRef<{ triggerCatch: () => void }, FishBarProps>(
  ({ onCatch }, ref) => {
    const fishControls = useAnimation();
    const needleControls = useAnimation();
    const needleFloatControls = useAnimation();

    const containerRef = useRef<HTMLDivElement>(null);
    const fishRef = useRef<HTMLImageElement | null>(null);
    const needleRef = useRef<HTMLDivElement | null>(null);
    const textureBoxRef = useRef<HTMLDivElement>(null);

    const animateBetweenBounds = async (
      controls: ReturnType<typeof useAnimation>,
      elementRef: React.RefObject<HTMLElement | null>,
      minDuration: number,
      maxDuration: number,
      flip: (dir: number) => number
    ) => {
      if (
        !elementRef.current ||
        !textureBoxRef.current ||
        !containerRef.current
      ) {
        return;
      }

      const textureRect = textureBoxRef.current.getBoundingClientRect();
      const containerRect = containerRef.current.getBoundingClientRect();
      const elementRect = elementRef.current.getBoundingClientRect();

      const textureLeft = textureRect.left - containerRect.left;
      const textureRight = textureRect.right - containerRect.left;
      const elementWidth = elementRect.width;

      const containerCenterX = containerRect.width / 2;

      const leftBound = textureLeft - containerCenterX + elementWidth / 2;
      const rightBound = textureRight - containerCenterX - elementWidth / 2;

      let dir = Math.random() > 0.5 ? 1 : -1;

      while (true) {
        const targetX = dir === 1 ? rightBound : leftBound;
        controls.set({ scaleX: flip(dir) });
        await controls.start({
          x: targetX,
          transition: {
            duration: getRandomDuration(minDuration, maxDuration),
            ease: "easeInOut",
          },
        });
        dir *= -1;
      }
    };

    const handleCatch = () => {
      if (!fishRef.current || !needleRef.current) return;

      const fishRect = fishRef.current.getBoundingClientRect();
      const needleRect = needleRef.current.getBoundingClientRect();
      const fishCenter = fishRect.left + fishRect.width / 2;
      const needleCenter = needleRect.left + needleRect.width / 2;
      const diff = Math.abs(fishCenter - needleCenter);

      const success = diff < 20;
      onCatch(success);
    };

    // Expune metoda triggerCatch pentru componenta părinte
    useImperativeHandle(ref, () => ({
      triggerCatch: handleCatch,
    }));

    const startAnimations = useCallback(() => {
      animateBetweenBounds(fishControls, fishRef, 0.5, 1.5, (d) => d);
      animateBetweenBounds(needleControls, needleRef, 5, 10, (d) => -d);

      const vw = window.innerWidth;
      needleFloatControls.start({
        y: [0, -vw * 0.01, 0],
        transition: {
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut",
        },
      });
    }, [fishControls, needleControls, needleFloatControls]);

    useEffect(() => {
      const timer = setTimeout(() => {
        startAnimations();
      }, 100);

      return () => clearTimeout(timer);
    }, [startAnimations]);

    useEffect(() => {
      const handleResize = () => {
        fishControls.stop();
        needleControls.stop();

        setTimeout(() => {
          startAnimations();
        }, 100);
      };

      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, [fishControls, needleControls, startAnimations]);

    return (
      <div
        ref={containerRef}
        className="relative flex w-full items-center justify-center"
        data-fishbar
      >
        <div className="h-[5vh] w-[1vw] bg-error"></div>
        <div className="relative flex items-center justify-center">
          <motion.div
            animate={needleControls}
            className="absolute z-20 w-[8vw]"
            ref={needleRef}
          >
            <motion.div animate={needleFloatControls}>
              <Needle />
            </motion.div>
          </motion.div>
          <div
            ref={textureBoxRef}
            className="h-[5vh] w-[16vw] bg-[url('/texture.png')]"
          >
            <div className="h-full w-full bg-dark-300/90"></div>
          </div>
          <motion.img
            animate={fishControls}
            className="absolute w-[5vh]"
            src={goldfish_img}
            alt="goldfish"
            ref={fishRef}
          />
        </div>
        <div className="h-[5vh] w-[1vw] bg-error"></div>
      </div>
    );
  }
);
