import { useEffect, type DependencyList } from "react";
import { isGameEnv } from "./helpers";

/**
 * A react effect which only runs in the game environment.
 */
export const useGameEnvEffect = <T extends DependencyList>(
  cb: () => void,
  deps: T
) => {
  useEffect(() => {
    if (!isGameEnv()) return;
    return cb();
  }, deps);
};
