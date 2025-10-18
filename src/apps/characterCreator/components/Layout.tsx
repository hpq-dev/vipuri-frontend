import { useCharacterCreatorStore } from "@/stores/apps/characterCreator";
import { Button } from "@/components/common";
import { isGameEnv } from "@/utils/helpers"; 

interface CharacterSectionLayoutProps {
  children: React.ReactNode;
} 

export const CharacterSectionLayout = ({
  children,
}: CharacterSectionLayoutProps) => {
  const { page, reset } = useCharacterCreatorStore();

  const dispatchReset = () => {
    reset();

    if (isGameEnv()) { 
    }
  };

  const dispatchSaveAndExit = () => {
    if (isGameEnv()) { 
    }
  };

  const details = {
    genetic: {
      title: "GENETICA",
      description:
        "Defineste moștenirea genetică a personajului tău și conturează-i trăsăturile unice ale feței.",
    },
    appearance: {
      title: "ASPECT",
      description:
        "Alege coafura perfectă, ajustează culoarea, barba și sprâncenele. Creeaza un personaj cu o aspect cu adevărat unic.",
    },
    features: {
      title: "TRASATURI",
      description:
        "Personalizează fiecare detaliu: de la tonul pielii și culoarea ochilor până la semne distinctive, pistrui și machiaj.",
    },
    cosmetic: {
      title: "COSMETICA",
      description:
        "Modelează fizicul personajului tău, ajustând înălțimea, proporțiile și construcția corporală.",
    },
    clothes: {
      title: "IMBRACAMINTE",
      description:
        "Alege ținute, încălțăminte și accesorii pentru a completa look-ul personajului.",
    },
  };

  const { title, description } = details[page];

  return (
    <div className="absolute right-[3vw] flex min-h-screen flex-col items-center justify-center">
      <div className="flex h-full w-full flex-col items-center justify-center">
        <div className="flex w-full flex-col items-start justify-start gap-[0.2vh]">
          <h1 className="bg-white px-[0.2vw] text-[.7vw] font-black tracking-wider text-black">
            {title}
          </h1>
          <h1 className="text-[1.5vw] font-black italic tracking-wide text-white">
            CREAZA-TI CARACTERUL
          </h1>
          {description && (
            <p className="w-full max-w-[17vw] text-start text-[.6vw] font-medium text-white/60">
              {description}
            </p>
          )}
        </div>
        {children}
        <div className="mt-[3vh] flex w-full items-center justify-center gap-[0.5vw]">
          <Button
            onClick={dispatchReset}
            variant="dark"
            scale="md"
            className="flex w-[10vw] items-center justify-center py-[.9vh]"
          >
            <h1 className="text-[.8vw] font-extrabold text-white">RESET</h1>
          </Button>
          <Button
            onClick={dispatchSaveAndExit}
            variant="primary"
            scale="md"
            className="flex w-[70%] items-center justify-center py-[.9vh]"
          >
            <h1 className="whitespace-nowrap text-[.8vw] font-extrabold text-white">
              SAVE AND EXIT
            </h1>
          </Button>
        </div>
      </div>
    </div>
  );
};
