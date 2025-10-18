// Dropdown.tsx
import { useState, useRef, useEffect } from "react";
import { Icon as Iconify } from "@iconify/react";
import { motion } from "framer-motion";
import clsx from "clsx";

interface DropdownOption {
  value: string;
  label: string;
}

interface DropdownProps {
  id: string;
  title: string;
  placeholder: string;
  options: DropdownOption[];
  value: string;
  onChange: (value: string) => void;
  icon?: React.ElementType;
}

export const Dropdown = ({ id, title, placeholder, options, value, onChange, icon: Icon }: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedOption = options.find((opt) => opt.value === value);

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <label
        htmlFor={id}
        className={clsx(
          "absolute -top-[0.8vh] left-[0.3vw] z-10 rounded-t-[.8vh] px-[0.5vw] py-[0.2vh] text-[0.6vw] italic text-light/50",
          isFocused ? "bg-dark-200/70" : "bg-dark-200"
        )}
      >
        {title}
      </label>
      <div className="relative flex items-center">
        {Icon && <Icon className="absolute left-[0.8vw] w-[0.7vw] text-primary z-10" />}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={clsx(
            "w-full rounded-[1.7vh] border-[0.5vh] border-dark-300 bg-dark-200 py-[1.5vh] text-left text-[0.65vw] italic text-light transition placeholder:text-light hover:bg-dark-200/80 focus:bg-dark-200/70",
            Icon ? "pl-[1.7vw] pr-[2vw]" : "px-[0.8vw] pr-[2.5vw]"
          )}
        >
          {selectedOption?.label || placeholder}
        </button>
        <Iconify
          icon="ic:outline-arrow-drop-down"
          className="absolute right-[0.8vw] w-[1vw] text-light/50 pointer-events-none"
        />
      </div>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="absolute z-20 mt-[0.5vh] w-full rounded-[1vh] border-[0.5vh] border-dark-300 bg-dark-200 shadow-lg max-h-[20vh] pr-[0.05vw] overflow-y-auto [&::-webkit-scrollbar]:w-[0.5vw] [&::-webkit-scrollbar-thumb]:bg-primary/50"
        >
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => {
                onChange(option.value);
                setIsOpen(false);
              }}
              className={clsx(
                "w-full px-[0.8vw] py-[1vh] text-left text-[0.65vw] text-light hover:bg-primary/20 transition",
                option.value === value && "bg-primary/30"
              )}
            >
              {option.label}
            </button>
          ))}
        </motion.div>
      )}
    </div>
  );
};
