export * from "./Environment";
export * from "./Notify";
export * from "./GameEnv";

export const fromAsset = (path: string) => {
  const assetsURL = import.meta.env.VITE_BASE_ASSETS_URL;
  return `${assetsURL}/${path}`;
};
