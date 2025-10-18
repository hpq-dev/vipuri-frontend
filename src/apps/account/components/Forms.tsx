import { ErrorIcon, SuccessIcon } from "@/utils/icons";
import { nationalities } from "../data/Forms";
import { useEffect, useRef, useState } from "react";
import { useAccountStore } from "@/stores/apps";
import type { IFormInputField } from "../data";
import { isGameEnv } from "@/utils/helpers";
import { DatePicker } from "./DatePicker";
import { Dropdown } from "./Dropdown";
import clsx from "clsx"; 
 

export const Forms = ({
  id,
  title,
  placeholder,
  type,
  icon: Icon,
}: IFormInputField) => {
  const [isEmailLocked, setIsEmailLocked] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const { setData, data, page } = useAccountStore();
  const inputRef = useRef<HTMLInputElement>(null);

  const isValid = {
    password:
      data.password &&
      data.password.length >= 8 &&
      /[A-Z]/.test(data.password) &&
      /\d/.test(data.password),
  };

  const showValidationIcon = type === "password" && id !== "repeatPassword";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;

    if (id === "firstName" || id === "lastName") {
      value = value.replace(/[^a-zA-ZăîâșțĂÎÂȘȚ\s]/g, "");
    }

    setData({
      ...data,
      [id]: value,
    });
  };

  const inputValue =
    typeof data[id as keyof typeof data] === "string" ||
    typeof data[id as keyof typeof data] === "number"
      ? String(data[id as keyof typeof data])
      : "";

  useEffect(() => {
    if (!isGameEnv()) return;

    if (page !== "login" || id !== "email") return;
 
  }, [page, id, setData]);

  if (type === "select") {
    const options = id === "nationality" ? nationalities.slice() : [];

    return (
      <Dropdown
        id={id}
        title={title}
        placeholder={placeholder}
        options={options}
        value={(data[id as keyof typeof data] as string) || ""}
        onChange={(value) => {
          const newData = { ...data, [id]: value };
          if (id === "nationality") {
            const nationality = nationalities.find((n) => n.value === value);
            newData.releasedBy = nationality?.releasedBy;
          }
          setData(newData);
        }}
        icon={Icon}
      />
    );
  }

  if (type === "date") {
    return (
      <DatePicker
        id={id}
        title={title}
        value={data.birthDate || ""}
        onChange={(value) => setData({ ...data, birthDate: value })}
      />
    );
  }

  return (
    <div className="relative w-full">
      <label
        htmlFor={id}
        className={clsx(
          "absolute -top-[0.8vh] left-[0.3vw] z-10 rounded-t-[.8vh] px-[0.5vw] py-[0.2vh] text-[0.6vw] italic text-light/50",
          isFocused ? "bg-dark-200/70" : "bg-dark-200",
        )}
      >
        {title}
      </label>
      <div className="relative flex items-center">
        {Icon && (
          <Icon className="absolute left-[0.8vw] w-[0.7vw] text-primary" />
        )}
        <input
          ref={inputRef}
          id={id}
          name={id}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onMouseEnter={() => setIsFocused(true)}
          onMouseLeave={() => setIsFocused(false)}
          placeholder={placeholder}
          type={type}
          maxLength={
            id === "firstName"
              ? 30
              : id === "lastName"
                ? 30
                : id === "email"
                  ? 100
                  : undefined
          }
          max={
            id === "firstName"
              ? 30
              : id === "lastName"
                ? 30
                : id === "email"
                  ? 100
                  : undefined
          }
          onChange={handleChange}
          value={inputValue}
          disabled={page === "login" && id === "email" && isEmailLocked}
          autoFocus={
            page === "register" && id === "email"
              ? true
              : page === "login" && id === "password"
                ? true
                : false
          }
          autoComplete="off"
          className={clsx(
            "w-full rounded-[1.7vh] border-[0.5vh] border-dark-300 bg-dark-200 py-[1.5vh] pl-[1.7vw] text-[0.65vw] italic text-light transition placeholder:text-light hover:bg-dark-200/80 focus:bg-dark-200/70",
            showValidationIcon ? "pr-[2vw]" : "pr-[0.5vw]",
          )}
        />
        {showValidationIcon && (
          <span className="absolute right-[0.8vw]">
            {isValid[type as keyof typeof isValid] ? (
              <SuccessIcon className="w-[0.8vw] text-green-500" />
            ) : (
              <ErrorIcon className="w-[0.8vw] text-error" />
            )}
          </span>
        )}
      </div>
    </div>
  );
};
