import { useState, useRef, useEffect } from "react";

interface Option {
  value: string;
  label: string;
}

interface CustomSelectProps {
  placeholder: string;
  options: Option[];
  value: string;
  onChange: (value: string) => void;
}

export const CustomSelect = ({
  placeholder,
  options,
  value,
  onChange,
}: CustomSelectProps) => {
  const [open, setOpen] = useState(false);
  const [highlighted, setHighlighted] = useState<number>(-1);
  const rootRef = useRef<HTMLDivElement>(null);

  const selectedLabel = options.find((o) => o.value === value)?.label;

  useEffect(() => {
    const outsideClick = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node))
        setOpen(false);
    };
    document.addEventListener("mousedown", outsideClick);
    return () => document.removeEventListener("mousedown", outsideClick);
  }, []);

  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      switch (e.key) {
        case "Escape": {
          setOpen(false);
          break;
        }
        case "Enter": {
          onChange(options[highlighted].value);
          setOpen(false);
          break;
        }
        case "ArrowUp": {
          setHighlighted((h) => (h - 1 + options.length) % options.length);
          break;
        }
        case "ArrowDown": {
          setHighlighted((h) => (h + 1) % options.length);
          break;
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, highlighted, options, onChange]);

  return (
    <div ref={rootRef} className="relative w-full">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full text-left font-light rounded-tr-[1vh] rounded-b-[1vh] text-white/70 text-[.7vw] pt-[1.3vh] pb-[0.5vh] px-[0.3vw] italic bg-dark-200 transition cursor-pointer"
      >
        {selectedLabel || placeholder}
      </button>

      {open && (
        <div className="absolute z-30 w-full max-h-[15vh] overflow-y-auto bg-dark-200 rounded-b-[1vh] shadow-md">
          {options.map((opt, idx) => (
            <div
              key={opt.value}
              onClick={() => {
                onChange(opt.value);
                setOpen(false);
              }}
              onMouseEnter={() => setHighlighted(idx)}
              className={`px-[0.3vw] py-[0.6vh] text-white text-[.7vw] cursor-pointer transition ${
                idx === highlighted ? "bg-primary" : ""
              } hover:bg-primary`}
            >
              {opt.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
