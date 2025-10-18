import { useCharacterCreatorStore } from "@/stores/apps/characterCreator";
import { Controls } from "./components/Controls";
import { SideBar } from "./components/SideBar";

import Appearance from "./pages/Appearance";
import Clothes from "./pages/Clothes";
import Cosmetic from "./pages/Cosmetic";
import Features from "./pages/Features";
import Genetic from "./pages/Genetic";
import { useGameEnvEffect } from "@/utils/hooks";
import { RPCManager } from "@/utils/rpc";

const pageComponents = {
  genetic: Genetic,
  features: Features,
  appearance: Appearance,
  cosmetic: Cosmetic,
  clothes: Clothes,
};

export const CharacterCreator = () => {
  const { page, reset } = useCharacterCreatorStore();

  const PageComponent = pageComponents[page];

  useGameEnvEffect(() => {
    RPCManager.registerApp(CharacterCreator.name);
    reset();
    return () => RPCManager.unregisterApp(CharacterCreator.name);
  }, []);

  return (
    <div
      className="h-screen w-full"
      style={{
        background:
          "radial-gradient(41.48% 67.59% at 50% 50%, rgba(17, 17, 17, 0) 0%, #111111 100%)",
      }}
    >
      <SideBar />
      <Controls />
      {PageComponent && <PageComponent />}
    </div>
  );
};
