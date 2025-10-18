import { useEffect, useRef, useMemo } from "react";
import { useAccountStore } from "@/stores/apps";
import { isGameEnv } from "@/utils/helpers";
import { Logo } from "@/components/common"; 
 

const LOADING_CONFIG = {
  DURATION: 3500,
  COMPLETION_THRESHOLD: 95,
  COMPLETION_DURATION: 200,
  TARGET_FPS: 60,
} as const;

const FRAME_TIME = 1000 / LOADING_CONFIG.TARGET_FPS;

const easeOutCubic = (t: number): number => {
  return 1 - Math.pow(1 - t, 3);
};

const calculateProgress = (elapsed: number, duration: number): number => {
  const normalizedTime = Math.min(elapsed / duration, 1);
  return easeOutCubic(normalizedTime) * 100;
};

export const Loading = () => {
  const loading = useAccountStore((state) => state.loading);
  const setLoading = useAccountStore((state) => state.setLoading);
  const setPage = useAccountStore((state) => state.setPage);

  const animationState = useRef({
    rafId: null as number | null,
    startTime: null as number | null,
    lastFrameTime: 0,
    isCompleting: false,
    resolver: null as ((result: { success: boolean }) => void) | null,
  });

  const progressBarStyle = useMemo(
    () => ({
      width: `${loading}%`,
      transform: "translateZ(0)",
      willChange: loading < 100 ? "width" : "auto",
    }),
    [loading]
  );

  useEffect(() => {
    if (!isGameEnv()) return;

    const cleanupAnimation = () => {
      const { rafId, resolver } = animationState.current;

      if (rafId) cancelAnimationFrame(rafId);

      if (resolver) resolver({ success: false });

      animationState.current = {
        rafId: null,
        startTime: null,
        lastFrameTime: 0,
        isCompleting: false,
        resolver: null,
      };
    };

    const completeAnimation = (startCompleteTime: number) => {
      const animate = (currentTime: number) => {
        const elapsed = currentTime - startCompleteTime;
        const progress = Math.min(
          elapsed / LOADING_CONFIG.COMPLETION_DURATION,
          1
        );

        const finalProgress =
          LOADING_CONFIG.COMPLETION_THRESHOLD +
          progress * (100 - LOADING_CONFIG.COMPLETION_THRESHOLD);

        setLoading(finalProgress);

        if (progress < 1)
          animationState.current.rafId = requestAnimationFrame(animate);
        else {
          setLoading(100);
          if (animationState.current.resolver) {
            animationState.current.resolver({ success: true });
            animationState.current.resolver = null;
          }
        }
      };

      animationState.current.rafId = requestAnimationFrame(animate);
    };

    const mainAnimation = (currentTime: number) => {
      const state = animationState.current;

      if (!state.startTime) {
        state.startTime = currentTime;
        state.lastFrameTime = currentTime;
      }

      const deltaTime = currentTime - state.lastFrameTime;
      if (deltaTime < FRAME_TIME) {
        state.rafId = requestAnimationFrame(mainAnimation);
        return;
      }

      state.lastFrameTime = currentTime;
      const elapsed = currentTime - state.startTime;
      const progress = calculateProgress(elapsed, LOADING_CONFIG.DURATION);

      setLoading(progress);

      if (
        progress >= LOADING_CONFIG.COMPLETION_THRESHOLD &&
        !state.isCompleting
      ) {
        state.isCompleting = true;
        completeAnimation(currentTime);
      } else if (progress < LOADING_CONFIG.COMPLETION_THRESHOLD)
        state.rafId = requestAnimationFrame(mainAnimation);
    };

    const startLoadingAnimation = () => {
      cleanupAnimation();
      setLoading(0);

      return new Promise<{ success: boolean }>((resolve) => {
        animationState.current.resolver = resolve;
        animationState.current.rafId = requestAnimationFrame(mainAnimation);
      });
    };

    
  }, [setLoading, setPage]);

  return (
    <div className="flex justify-center items-center min-h-screen flex-col gap-[4vh]">
      <Logo scale="xl" />
      <div className="flex justify-start items-center h-4 bg-primary/20 w-[15vw] overflow-hidden">
        <div
          className="h-full bg-primary transition-all duration-75 ease-out"
          style={progressBarStyle}
        />
      </div>
    </div>
  );
};
