import { useTerminalStore, useCommandStore, useEditorStore } from "../stores";
import React, { useCallback } from "react";
import { Icon } from "@iconify/react"; 

interface Props {
  className?: string;
}
 

export const Header: React.FC<Props> = ({ className = "" }) => {
  const {
    isResizeLocked,
    isTerminalHidden,
    size,
    toggleResizeLock,
    toggleTerminalHidden,
    toggleHide,
  } = useTerminalStore();
  const { clearOutput } = useCommandStore();
  const { isEditorOpen, toggleEditor } = useEditorStore();

  const handleIconClick = useCallback(
    (action: () => void) => (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      action();
    },
    []
  );

  const handleHidden = () => {
    toggleTerminalHidden();
    if (!isTerminalHidden) toggleHide(); 
  };

  return (
    <div
      className={`flex justify-between items-center px-[.5vw] py-[.8vh] bg-neutral-800/90 border-[0.1vh] border-neutral-700/20 ${className}`}
    >
      <div className="flex items-center gap-[.8vw]">
        <div className="flex items-center gap-[.4vw]">
          <Icon icon="flowbite:terminal-solid" className="text-[.8vw] z-30" />
          <span className="text-[.7vw] font-medium">Terminal</span>
        </div>

        <Icon
          onClick={handleIconClick(toggleEditor)}
          icon={isEditorOpen ? "jam:qr-code" : "mdi:code-brackets"}
          className={`cursor-pointer z-30 transition-colors select-none ${
            isEditorOpen
              ? "text-green-400 text-[.8vw]"
              : "hover:text-green-400 text-[.85vw]"
          }`}
          style={{ userSelect: "none" }}
        />

        <Icon
          onClick={handleIconClick(toggleResizeLock)}
          icon={
            isResizeLocked
              ? "flowbite:lock-outline"
              : "flowbite:lock-open-outline"
          }
          className="text-[.9vw] cursor-pointer z-30 hover:text-blue-400 transition-colors select-none"
          style={{ userSelect: "none" }}
        />
        <Icon
          onClick={handleHidden}
          icon={isTerminalHidden ? "mdi:eye-off" : "simple-line-icons:eye"}
          className="text-[.8vw] cursor-pointer z-30 hover:text-blue-400 transition-colors select-none"
          style={{ userSelect: "none" }}
        />
        <Icon
          onClick={handleIconClick(clearOutput)}
          icon="grommet-icons:clear"
          className="text-[.8vw] cursor-pointer z-30 hover:text-red-400 transition-colors select-none"
          style={{ userSelect: "none" }}
        />
      </div>

      <div className="text-[.6vw] text-neutral-400 select-none">
        {Math.round(size.width)}×{Math.round(size.height)}
      </div>
    </div>
  );
};
