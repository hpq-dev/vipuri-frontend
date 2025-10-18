import { useCommonStore } from "@/stores";
import { useQuickMenuStore } from "@/stores/apps/quickMenu";
import { useGameEnvEffect } from "@/utils/hooks";
import { TriangleIcon } from "@/utils/icons/quickMenu";
import { RPCManager } from "@/utils/rpc";
import { Icon } from "@iconify/react"; 
import clsx from "clsx";
import { useCallback, useEffect, useMemo, useRef } from "react";

const MAX_ITEMS_PER_ROW = 3;
 

export const QuickMenu = () => {
  const { setAppStatus, ability } = useCommonStore();

  const {
    selectedItemIdentifier,
    setItems,
    getCurrentItems,
    navigateToSibling,
    navigateToChild,
    navigateUp,
    getCurrentLabel,
    getCurrentLevel,
  } = useQuickMenuStore();

  const containerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

 

  const currentItems = getCurrentItems().filter(({ requiredPermission }) => {
    if (requiredPermission?.action && requiredPermission.resource) {
      const result = ability.can(
        requiredPermission?.action,
        requiredPermission.resource
      );
      return requiredPermission.inverted ? !result : result;
    }
    return true;
  });

  const selectedItemIndex = useMemo(() => {
    return currentItems.findIndex(
      (item) =>
        item.identifier ===
        selectedItemIdentifier[selectedItemIdentifier.length - 1]
    );
  }, [selectedItemIdentifier, currentItems]);

  const setSelectedItemIndex = useCallback(
    (index: number) => {
      if (index >= 0 && index < currentItems.length) {
        navigateToSibling(currentItems[index].identifier);
      }
    },
    [currentItems, navigateToSibling]
  );

  useEffect(() => {
    if (selectedItemIndex >= 0) {
      const selectedEl = itemRefs.current[selectedItemIndex];
      if (selectedEl) {
        selectedEl.scrollIntoView({
          block: "nearest",
          inline: "nearest",
          behavior: "smooth",
        });
      }
    }
  }, [selectedItemIndex]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (
        [
          "ArrowLeft",
          "ArrowRight",
          "ArrowUp",
          "ArrowDown",
          "Enter",
          "Backspace",
        ].includes(event.key)
      ) {
        event.preventDefault();
      }

      switch (event.key) {
        case "ArrowLeft": {
          if (currentItems.length > 0) {
            const nextIndex =
              selectedItemIndex <= 0
                ? currentItems.length - 1
                : selectedItemIndex - 1;
            setSelectedItemIndex(nextIndex);
          }
          break;
        }
        case "ArrowRight": {
          if (currentItems.length > 0) {
            const nextIndex =
              selectedItemIndex >= currentItems.length - 1
                ? 0
                : selectedItemIndex + 1;
            setSelectedItemIndex(nextIndex);
          }
          break;
        }
        case "ArrowUp": {
          if (currentItems.length > 0) {
            const nextIndex = selectedItemIndex - MAX_ITEMS_PER_ROW;
            if (nextIndex >= 0) {
              setSelectedItemIndex(nextIndex);
            }
          }
          break;
        }
        case "ArrowDown": {
          if (currentItems.length > 0) {
            const nextIndex = selectedItemIndex + MAX_ITEMS_PER_ROW;
            if (nextIndex < currentItems.length) {
              setSelectedItemIndex(nextIndex);
            }
          }
          break;
        }
        case "Backspace": {
          if (getCurrentLevel() === 1) {
            setAppStatus(QuickMenu.name, false);
          } else {
            navigateUp();
          }
          break;
        }
        case "Enter": {
          if (selectedItemIndex >= 0 && currentItems[selectedItemIndex]) {
            const selectedItem = currentItems[selectedItemIndex];

            if (selectedItem.children && selectedItem.children.length > 0) {
              navigateToChild(selectedItem.children[0].identifier);
            } else { 
            }
          }
          break;
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [
    selectedItemIndex,
    currentItems,
    setSelectedItemIndex,
    navigateUp,
    navigateToChild,
    getCurrentLevel,
    setAppStatus,
    selectedItemIdentifier,
  ]);

  useEffect(() => {
    if (currentItems.length > 0 && selectedItemIndex === -1) {
      setSelectedItemIndex(0);
    }
  }, [currentItems, selectedItemIndex, setSelectedItemIndex]);

  return (
    <div className="absolute right-[1vw] bottom-[1vh] z-[9999]">
      <div className="flex justify-between flex-col gap-[1vh] items-center bg-dark-300 w-[13vw] py-[1vh] h-[45vh] px-[0.5vw] rounded-[0.7vh]">
        <div className="flex justify-start items-start flex-col gap-[1vh] w-full">
          <div className="flex justify-center bg-dark-200/40 items-center w-full py-[0.5vh]">
            <h1 className="text-primary text-[0.8vw] font-extrabold italic">
              QUICK MENU {getCurrentLabel()}
            </h1>
          </div>

          <div
            ref={containerRef}
            className="grid grid-cols-3 w-full gap-x-[0.4vw] gap-y-[0.6vh] max-h-[34vh] pr-[0.3vw] scroll-smooth overflow-auto [&::-webkit-scrollbar-thumb]:rounded-[0.1vw] [&::-webkit-scrollbar-thumb]:bg-dark-100 [&::-webkit-scrollbar-track]:bg-dark-200 [&::-webkit-scrollbar]:w-[0.5vw]"
          >
            {currentItems.map(({ label, identifier, icon }, idx) => (
              <div
                ref={(el) => {
                  itemRefs.current[idx] = el;
                }}
                className={clsx(
                  "flex justify-center text-white/30 items-center flex-col rounded-[1.5vh] bg-dark-200/40 px-[0.6vw] gap-[0.3vh] py-[1.2vh] relative",
                  {
                    "bg-primary !text-white": idx === selectedItemIndex,
                  }
                )}
                key={identifier}
              >
                {icon ? (
                  <Icon icon={icon} className="text-[1.5vw]" />
                ) : (
                  <TriangleIcon className="w-[1.5vw]" />
                )}
                <h1 className="text-[.55vw] font-bold uppercase text-center">
                  {label}
                </h1>
              </div>
            ))}
          </div>
        </div>

        <h1 className="text-white/30 text-[.55vw]">
          Quickly access essential actions and tools without leaving your
          screen.
        </h1>
      </div>
    </div>
  );
};
