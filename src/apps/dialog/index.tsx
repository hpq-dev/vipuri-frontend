import { Button } from "@/components/common";
import { dialogStore } from "@/stores/apps";
import { InfoIcon } from "@/utils/icons/dialog";

export const Dialog = () => {
  const { variant, title, message, setInputValue } = dialogStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const handleClose = () => {};

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (setInputValue) {
      setInputValue(e.target.value);
    }
  };

  return (
    <form
      className="absolute inset-0 flex items-center justify-center"
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col items-start justify-center gap-[1vh] bg-dark-400 rounded-[1vh] px-[0.5vw] py-[1vh] w-[17vw]">
        <h1 className="text-[.9vw] uppercase font-black italic text-primary">
          {title}
        </h1>
        <div className="flex justify-start items-center bg-dark-300 gap-[0.5vw] rounded-[1vh] w-full px-[0.5vw] py-[1vh]">
          <InfoIcon className="w-[1.3vw] text-warning" />
          <h1 className="text-warning text-[.6vw] font-medium italic">
            {message}
          </h1>
        </div>
        {variant === "input" && (
          <input
            type="text"
            className="w-full bg-dark-300 text-white/70 placeholder:text-white/70 text-[0.7vw] px-[0.5vw] py-[.7vh] rounded-[.5vh]"
            placeholder="Enter your input here..."
            onChange={handleInputChange}
          />
        )}
        <div className="flex justify-center items-center w-full gap-2">
          <Button
            type="button"
            onClick={handleClose}
            className="w-full flex justify-center items-center text-[0.8vw]"
            variant="dark"
          >
            Refuz
          </Button>
          <Button
            className="w-full flex justify-center items-center text-[0.8vw]"
            variant="primary"
            type="submit"
          >
            Accept
          </Button>
        </div>
      </div>
    </form>
  );
};
