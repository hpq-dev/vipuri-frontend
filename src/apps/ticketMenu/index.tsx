import { useTicketMenuStore } from "@/stores/apps";
import { useGameEnvEffect } from "@/utils/hooks";
import { RPCManager } from "@/utils/rpc";
import { useState } from "react";
import { CustomSelect } from "./components/CustomSelect";
import { Button } from "@/components/common";
import { UserIcon } from "@/utils/icons/ticketMenu";
import { showNotify } from "@/utils/helpers";


export const TicketMenu = () => {
  const {
    selectedIdentifierOption,
    staffOnDuty,
    options,
    setStaffOnDuty,
    setSelectedIdentifierOption,
  } = useTicketMenuStore();

  const [formData, setFormData] = useState<Record<string, string>>({});

  useGameEnvEffect(() => {
    RPCManager.registerApp(TicketMenu.name, true);
    return () => RPCManager.unregisterApp(TicketMenu.name);
  }, []);

  const selectedOption = options.find(
    (option) => option.identifier === selectedIdentifierOption
  );

  const handleFieldChange = (identifier: string, value: string) => {
    setFormData((prev) => ({ ...prev, [identifier]: value }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!selectedOption) return false;

    selectedOption.fields.forEach((field) => {
      if (!formData[field.identifier]?.trim()) {
        newErrors[field.identifier] = `${field.placeholder} is required`;
      }
    });
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm() && selectedOption) {
    } else {
      selectedOption?.fields.forEach((field) => {
        if (!formData[field.identifier]?.trim()) {
          showNotify(
            "error",
            `Ticket Menu`,
            `${field.placeholder} trebuie completat`,
            5000
          );
        }
      });
    }
  };

  const handleCancel = () => {
    setSelectedIdentifierOption(null);
    setFormData({});
  };

  return (
    <div className="absolute flex justify-center items-center min-h-screen w-full">
      <div className="flex justify-center items-center flex-col px-[0.7vw] py-[1vh] rounded-[0.7vh] gap-[1.5vh] bg-dark-300 w-[20vw]">
        <div className="flex justify-between items-center w-full">
          <h1 className="text-primary text-[.9vw] italic font-black">
            CREAZA UN TICKET
          </h1>
          <div className="flex justify-center items-center px-[0.4vw] py-[0.2vh] bg-error rounded-[0.7vh]">
            <h1 className="text-[.6vw] text-white italic font-medium">ESC</h1>
          </div>
        </div>

        <div className="flex justify-between w-full items-center gap-[0.5vw]">
          {options.map((option) => (
            <div
              key={option.identifier}
              onClick={() => setSelectedIdentifierOption(option.identifier)}
              className={`flex group justify-center items-center flex-col gap-[1vh] transition cursor-pointer bg-dark-200/40 w-[6vw] rounded-[2vh] px-[0.5vw] py-[1vh] ${
                selectedIdentifierOption === option.identifier
                  ? "bg-primary"
                  : "hover:bg-primary"
              }`}
            >
              <option.icon
                className={`w-[2.5vw] transition ${
                  selectedIdentifierOption === option.identifier
                    ? "text-white"
                    : "text-white/25 group-hover:text-white"
                }`}
              />
              <h1
                className={`uppercase text-[.7vw] font-bold text-center transition ${
                  selectedIdentifierOption === option.identifier
                    ? "text-white"
                    : "text-white/25 group-hover:text-white"
                }`}
              >
                {option.label}
              </h1>
            </div>
          ))}
        </div>

        <div className="flex justify-between items-center w-full">
          <h1 className="text-warning w-full text-[.55vw] font-medium">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry.
          </h1>
          <div className="flex justify-center items-center gap-[0.5vw] bg-dark-200/40 px-[0.5vw] w-[11vw] py-[.5vh] rounded-[.7vh]">
            <UserIcon className="w-[.8vw]" />
            <div className="flex justify-start items-start flex-col">
              <h1 className="text-success text-[.6vw] font-medium">
                STAFF ON DUTY
              </h1>
              <h1 className="text-success text-[.6vw] font-medium">
                {staffOnDuty}
              </h1>
            </div>
          </div>
        </div>

        {selectedOption && (
          <div className="flex justify-center items-center flex-col w-full gap-[1vh]">
            <div className="flex justify-center items-center flex-col gap-[2vh] w-full">
              {selectedOption.fields.map((field) => (
                <div
                  key={field.identifier}
                  className="flex justify-start items-start w-full"
                >
                  <div className="absolute z-20 pointer-events-none">
                    <div className="flex justify-center relative bottom-[1.2vh] items-center bg-dark-200 px-[.3vw] rounded-t-[1vh] py-[.3vh]">
                      <h1 className="text-white/50 italic uppercase text-[.55vw]">
                        {field.placeholder}
                      </h1>
                    </div>
                  </div>

                  {field.type === "textarea" && (
                    <textarea
                      rows={5}
                      maxLength={100}
                      value={formData[field.identifier] || ""}
                      onChange={(e) =>
                        handleFieldChange(field.identifier, e.target.value)
                      }
                      className="w-full font-light placeholder:text-white/30 rounded-tr-[1vh] rounded-b-[1vh] text-white/30 text-[.7vw] pt-[1.3vh] pb-[0.5vh] px-[0.3vw] italic resize-none bg-dark-200 [&::-webkit-scrollbar-thumb]:rounded-[0.1vw] [&::-webkit-scrollbar-thumb]:bg-dark-100 [&::-webkit-scrollbar-track]:bg-dark-200 [&::-webkit-scrollbar]:w-[0.5vw]"
                      placeholder={field.placeholder}
                    />
                  )}

                  {field.type === "input" && (
                    <input
                      type="text"
                      maxLength={100}
                      value={formData[field.identifier] || ""}
                      onChange={(e) =>
                        handleFieldChange(field.identifier, e.target.value)
                      }
                      className={`w-full font-light placeholder:text-white/30 rounded-tr-[1vh] rounded-b-[1vh] text-white/30 text-[.7vw] pt-[1.3vh] pb-[0.5vh] px-[0.3vw] italic bg-dark-200`}
                      placeholder={field.placeholder}
                    />
                  )}

                  {field.type === "select" && "options" in field && (
                    <CustomSelect
                      placeholder={field.placeholder}
                      options={field.options}
                      value={formData[field.identifier] || ""}
                      onChange={(val) =>
                        handleFieldChange(field.identifier, val)
                      }
                    />
                  )}
                </div>
              ))}
            </div>

            <div className="flex justify-center items-center w-full gap-[0.5vw]">
              <Button
                variant="dark"
                onClick={handleCancel}
                className="flex w-full items-center justify-center gap-1 rounded-[.5vh] py-[.8vh] text-[.7vw] font-extrabold uppercase italic tracking-wide transition"
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                onClick={handleSubmit}
                className="flex w-full items-center justify-center gap-1 rounded-[.5vh] py-[.8vh] text-[.7vw] font-extrabold uppercase italic tracking-wide transition"
              >
                Send
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
