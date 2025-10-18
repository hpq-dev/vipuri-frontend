import React from "react";
import { useCommandStore } from "../stores";

export const InputLine: React.FC = () => {
  const { input, setInput, executeCommand, navigateHistory } =
    useCommandStore();

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      setInput(navigateHistory("up"));
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setInput(navigateHistory("down"));
    } else if (e.key === "Enter" && input.trim()) {
      executeCommand(input);
    }
  };

  return (
    <div className="flex items-center px-[.7vw] py-[1.3vh] bg-neutral-800/50 border-t-[0.1vh] border-neutral-700/20">
      <span className="text-green-400 text-[.75vw] mr-[.4vw]">$</span>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        className="flex-1 bg-transparent text-white text-[.65vw] outline-none"
        placeholder="Type a command…"
        autoFocus
      />
    </div>
  );
};
