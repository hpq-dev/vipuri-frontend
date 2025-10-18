// DatePicker.tsx
import { Icon as Iconify } from "@iconify/react";
import { useState } from "react";
import clsx from "clsx";

interface DatePickerProps {
  id: string;
  title: string;
  value: string;
  onChange: (value: string) => void;
}

export const DatePicker = ({ id, title, value, onChange }: DatePickerProps) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let input = e.target.value.replace(/\D/g, "");

    if (input.length > 8) {
      input = input.slice(0, 8);
    }

    let formatted = input;
    if (input.length >= 2) {
      formatted = input.slice(0, 2) + "." + input.slice(2);
    }
    if (input.length >= 4) {
      formatted = input.slice(0, 2) + "." + input.slice(2, 4) + "." + input.slice(4);
    }

    onChange(formatted);
  };

  return (
    <div className="relative w-full">
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
        <Iconify icon="mdi:calendar" className="absolute left-[0.8vw] w-[0.7vw] text-primary" />
        <input
          type="text"
          id={id}
          value={value}
          onChange={handleChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="DD.MM.YYYY"
          maxLength={10}
          className="w-full rounded-[1.7vh] border-[0.5vh] border-dark-300 bg-dark-200 py-[1.5vh] pl-[1.7vw] pr-[0.5vw] text-[0.65vw] italic text-light transition placeholder:text-light hover:bg-dark-200/80 focus:bg-dark-200/70"
        />
      </div>
    </div>
  );
};
