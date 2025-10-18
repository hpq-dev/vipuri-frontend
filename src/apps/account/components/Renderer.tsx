import {
  registerSteps,
  accountForms,
  type IFormInputField,
  nationalities,
} from "../data";
import { isGameEnv, showNotify } from "@/utils/helpers";
import { useAccountStore } from "@/stores/apps/account";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/common";
import { useRef, useState } from "react";
import { HeaderAuth } from "./Header";
import { Forms } from "./Forms";
import { Note } from "./Note";
import clsx from "clsx"; 
import { isStrongPassword } from "../utils/isStrongPassword";
 

interface CheckboxProps {
  label: string;
}

const Checkbox: React.FC<CheckboxProps> = ({ label }) => {
  const { data, setData, page } = useAccountStore();
  const checked = page === "register" ? data.acceptRules : data.rememberMe;
  return (
    <div className="flex w-full items-center gap-[0.5vw] rounded-[1.2vh] bg-dark-200 px-[0.5vw] py-[1vh]">
      <div
        onClick={() => {
          if (page === "register") {
            setData({ ...data, acceptRules: !data.acceptRules });
          } else if (page === "login") {
            setData({ ...data, rememberMe: !data.rememberMe });
          }
        }}
        className={clsx(
          "flex cursor-pointer items-center justify-center rounded-[1vh] border-[0.3vw] border-dark-300 px-[0.35vw] py-[0.7vh] transition",
          checked ? "bg-primary" : "bg-dark-100 hover:bg-primary",
        )}
      />
      <h1 className="text-[0.7vw] italic text-light/50">{label}</h1>
    </div>
  );
};

export const Renderer = () => {
  const { page, registerStep, setRegisterStep, data } = useAccountStore();
  const hasSubmitted = useRef(false);
  const [loading, setLoading] = useState(false);

  const onSubmitAccount = (page: "register" | "login") => {
    if (hasSubmitted.current) return;
    hasSubmitted.current = true;
    setLoading(true);

    const showError = (msg: string) => {
      showNotify("error", "Error", msg);
      hasSubmitted.current = false;
      setLoading(false);
    };

    const {
      firstName,
      lastName,
      nationality,
      birthDate,
      email,
      password,
      repeatPassword,
      acceptRules,
    } = data;

    if (page === "register") {
      if (!firstName || !lastName)
        return showError("First name and last name are required");
      if (!repeatPassword) return showError("Repeat your password");
      if (password !== repeatPassword)
        return showError("Passwords do not match");
      if (!acceptRules) return showError("You must accept the rules");
      if (!nationality) return showError("Please select a nationality");
      if (!/^\d{2}\.\d{2}\.\d{4}$/.test(birthDate!))
        return showError("Invalid birth date format");

      const [day, month, year] = birthDate!.split(".").map(Number);
      const birthDateObj = new Date(year, month - 1, day);
      const today = new Date();
      const age = today.getFullYear() - birthDateObj.getFullYear();
      const monthDiff = today.getMonth() - birthDateObj.getMonth();

      if (age < 18 || age > 80 || (age === 18 && monthDiff < 0)) {
        return showError("You must be between 18 and 80 years old");
      }

      const nationalityData = nationalities.find(
        (n) => n.value === nationality,
      );

      if (!isGameEnv()) {
        showNotify("error", "Error", "You are not in RAGE:MP");
        return;
      }
 
    } else { 
    }

    setTimeout(() => {
      hasSubmitted.current = false;
      setLoading(false);
    }, 1500);
  };

  if (page === "register") {
    const currentStep = registerSteps[registerStep];

    const handleNext = () => {
      if (registerStep < registerSteps.length - 1) {
        const currentFields = currentStep.inputs.flatMap((input) =>
          "fields" in input ? input.fields : [input],
        );

        const hasPasswordField = currentFields.some(
          (f) => f.type === "password",
        );
        if (hasPasswordField && !isStrongPassword(data.password)) {
          showNotify(
            "error",
            "Error",
            "Password must be strong: at least 6 characters, including a capital letter and a number.",
          );
          return;
        }

        if (!data.email || !data.password)
          return showNotify(
            "error",
            "Error",
            "Email and password are required",
          );

        setRegisterStep(registerStep + 1); 
      } else {
        onSubmitAccount("register");
      }
    };

    const handlePrev = () => {
      if (registerStep > 0) setRegisterStep(registerStep - 1);
    };

    return (
      <AnimatePresence mode="wait">
        <motion.form
          onSubmit={(e) => {
            e.preventDefault();
            handleNext();
          }}
          key={registerStep}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -30 }}
          transition={{ duration: 0.4, type: "spring" }}
          className="bg-dark-700 w-full max-w-[22vw] space-y-[3.5vh] px-[2vw] shadow-lg"
        >
          <HeaderAuth
            withLogo={false}
            title={currentStep.title}
            description={currentStep.description}
          />
          <div className="flex w-full flex-col items-center justify-center gap-[2vh]">
            {currentStep.inputs.map((input) => {
              if ("row" in input && input.row && input.fields) {
                return (
                  <div
                    key={input.id}
                    className="flex w-full flex-row gap-[.3vw]"
                  >
                    {input.fields.map((field) => (
                      <div key={field.id} className="w-1/2">
                        <Forms {...field} />
                      </div>
                    ))}
                  </div>
                );
              }
              return (
                <div key={input.id} className="flex w-full flex-col gap-[2vh]">
                  <Forms {...(input as IFormInputField)} />
                </div>
              );
            })}
            <div className="flex w-full items-start gap-[2vh] flex-col">
              {registerStep > 0 && (
                <Checkbox label="I accept the terms and conditions" />
              )}
              <div className="flex justify-center items-center w-full gap-2">
                {registerStep > 0 && (
                  <Button
                    onClick={handlePrev}
                    type="button"
                    variant="secondary"
                    className="flex w-full items-center justify-center text-[0.7vw]"
                  >
                    Back
                  </Button>
                )}
                <Button
                  type="submit"
                  disabled={loading}
                  className="flex w-full items-center justify-center text-[0.7vw]"
                  scale="sm"
                  variant="primary"
                >
                  {loading ? "Submitting..." : currentStep.button}
                </Button>
              </div>
              {currentStep.note && <Note note={currentStep.note} />}
            </div>
          </div>
        </motion.form>
      </AnimatePresence>
    );
  }

  if (page === "login") {
    const form = accountForms[0];

    const handleLogin = () => {
      onSubmitAccount("login");
    };

    return (
      <motion.form
        onSubmit={(e) => {
          e.preventDefault();
          handleLogin();
        }}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -30 }}
        transition={{ duration: 0.4, type: "spring" }}
        className="bg-dark-700 w-full max-w-[22vw] space-y-[3.5vh] px-[2vw] shadow-lg"
      >
        <HeaderAuth
          withLogo={true}
          title={form.title}
          description={form.description}
        />
        <div className="flex w-full flex-col items-center justify-center gap-[2vh]">
          {form.inputs.map((input) => (
            <div key={input.id} className="flex w-full flex-col gap-[2vh]">
              <Forms {...(input as IFormInputField)} />
            </div>
          ))}
          <div className="mt-[2vh] flex w-full flex-col items-start gap-[2vh]">
            <Checkbox label="Remember me" />
            <Button
              type="submit"
              className="flex h-[4vh] w-full items-center justify-center text-[0.7vw]"
              scale="sm"
              variant="primary"
            >
              {form.button}
            </Button>
            {form.note && <Note note={form.note} />}
          </div>
        </div>
      </motion.form>
    );
  }

  return null;
};
